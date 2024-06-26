import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
import { z } from "zod";
import sendVerificationEmail from "@/Helper/sendVerificationEmail";
const jwt = require("jsonwebtoken");

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
  console.log("method"+method);
  // if (method != "PUT") {
  //   res.status(405).json({
  //     success: false,
  //     message: "Method not allowed",
  //   });
  //   return;
  // }

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
  console.log(user);
  // verify user format using ZOD

  try {
    await passwordSchema.parseAsync(user.password);
  } catch (err) {
    res.status(400).json({
      success: false,
      message:
        "Password must contain atleast 8 character, a capital and small letter and a number and a special character",
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

  const secret = process.env.JWT_SECRET;
  const activation_token = jwt.sign(
    {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    secret
  );

  try {
    const decoded = jwt.verify(activation_token, secret);
    console.log("token verified");
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).send("Invalid or expired token");
  }

  user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    password: password,
    email: user.email,
    salt: salt,
    email_verified: false,
    Act_token: activation_token,
    token_expiration: 3600,
    Act_token_lastSentDate: new Date(),
  });

  try {
    const result = await user.save();
    res.json({ success: true });
    console.log(user);
    sendVerificationEmail(user.email, user.firstName, activation_token);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default handler;
