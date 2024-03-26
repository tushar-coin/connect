import getToken from "@/Helper/getToken";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    const token = getToken(req);

    if (!token) {
      res.status(404).json({ success: false, message: "User Not Logged In" });
      return;
    }
    const { method } = req;
    if (method != "GET") {
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
    // verify user format using ZOD

    const user = jwt.verify(token, secret);

    const check = await User.findOne({ email: user.email });
    if (!check) {
      res.status(402).json({
        success: false,
        message: "User Not Found",
      });
      return;
    }
    const data = {
      email: user.email,
      firstName: check.firstName,
      lastName: check.lastName,
    };
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: "User Not Logged In" });
  }
};

export default handler;
