import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password must contain at least one special character",
  });

const handler = async (req, res) => {
  const { method, body } = req;
  if (method != "PUT") {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
    return;
  }

  try {
    const db = await dbConnect();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
    return;
  }
  let user = body.user;
  // verify user format using ZOD

  try {
    await passwordSchema.parseAsync(user.password);
  } catch (err) {
    res.status(400).json({
      success: false,
      message:
        "Password must contain atleast 8 character, a capital and small letter and a special character",
    });
    console.log(err);
  }

  const check = await User.findOne({ email: user.email });
  if (check) {
    res.status(403).json({
      success: false,
      message: "User already exists",
    });
    return;
  }

  // encrypt password using bcrypt and add salt
  let salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(user.password, salt);

  user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    password: password,
    email: user.email,
    salt: salt,
    emailVerified: false,
  });

  try {
    const result = await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default handler;
