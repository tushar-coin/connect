const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import dbConnect from "@/lib/dbConnect";

const handler = async (req, res) => {
  const { method, headers } = req;
  if (method != "GET") {
    res.status(401).json({
      success: false,
      message: "Method not allowed",
    });
    return;
  }

  try {
    let token = headers.token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    let email = token.email;
    try {
      const check = await User.findOne({
        email,
        emailVerified: true,
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Server Error",
      });
    }

    if (check) {
      res.status(401).json({
        success: false,
        message: "Email already verified",
      });
      return;
    }

    // send email to user for verifying email

    res.json({
      success: true,
      message: "Verification mail sent",
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default handler;
