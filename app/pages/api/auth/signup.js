import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  const { method, body } = req;
  if (method != "PUT") {
    res.status(401).json({
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
  const secret = process.env.JWT_SECRET;
  let user = body.user;
  // verify user format using ZOD

  const check = await User.findOne({ email: user.email });
  if (check) {
    res.status(402).json({
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
    // res.setHeader("Set-Cookie", [`token=${token}; Max-Age=36000; HttpOnly`]);
    res.json({ success: true });
  } catch (err) {
    res.send({ success: false, message: "some error occurred" });
  }
};

export default handler;
