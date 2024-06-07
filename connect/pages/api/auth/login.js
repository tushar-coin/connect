import getToken from "@/Helper/getToken";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  const token = getToken(req);
  if (token) {
    res.status(200).json({ success: true, message: "Logged in" });
    return;
  }
  const { method, body } = req;
  if (method != "POST") {
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

  const check = await User.findOne({ email: user.email });
  if (!check) {
    res.status(401).json({
      success: false,
      message: "User Not Found",
    });
    return;
  }

  try {
    const comp = await bcrypt.compareSync(user.password, check.password);
    if (comp) {
      const token = jwt.sign(
        {
          email: user.email,
          firstName: check.firstName,
          lastName: check.lastName,
        },
        secret,
        {
          expiresIn: 3600,
        }
      );
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Max-Age=3600; Path=/; HttpOnly`
      );
      res.status(200).json({ success: true, message: "Logged in" });
    } else {
      res.status(401).json({
        success: false,
        message: "User Not Found",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error, try again later",
    });
    return;
  }
};

export default handler;

// /api/auth/login
