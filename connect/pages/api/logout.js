import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    const cookies = req.headers.cookie;
    const cookieArray = cookies.split(";").map((cookie) => cookie.trim());
    const tokenCookie = cookieArray.find((cookie) =>
      cookie.startsWith("token=")
    );
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (!token) {
      res.status(404).json({ success: false, message: "User Not Logged In" });
      return;
    }
    const { method } = req;
    if (method != "PUT") {
      res.status(401).json({
        success: false,
        message: "Method not allowed",
      });
      return;
    }
    const secret = process.env.JWT_SECRET;
    // verify user format using ZOD

    const user = jwt.verify(token, secret);
    res.setHeader(
      "Set-Cookie",
      "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
    );
    res.status(200).json({ success: true, message: "User logged out" });
    // res.status(200).json({ success: true, message: "User Logged Out" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, message: "User Not Logged In" });
  }
};

export default handler;
