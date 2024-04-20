import sendVerificationEmail from "@/Helper/sendVerificationEmail";
import { defaultConfig } from "next/dist/server/config-shared";
const User = require("@/models/user.js");
import dbConnect from "@/lib/dbConnect";
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const handler = async (req, res) => {
  const token = req.body.token;

  if (token == null) {
    return res.status(400).send("Token must be provided");
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

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const em = decoded.email;
    const fn = decoded.firstName;

    const activation_token = jwt.sign(
      {
        email: em,
        firstName: fn,
      },
      SECRET_KEY
    );

    const filter = { email: em };
    const update = {
      $set: { Act_token: activation_token, Act_token_lastSentDate: new Date() },
    };
    const options = { new: true };

    User.findOneAndUpdate(filter, update, options)
      .then((updatedUser) => {
        console.log("Data updated: ", updatedUser);
        try {
          sendVerificationEmail(em, fn, activation_token);
          console.log("!!Email is sent again Successfully!!");
          res.status(200).send("Email sent successfully");
        } catch (err) {
          res.status(500).json({ success: false, message: "Server Error" });
        }
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        res.status(401).send("Error updating user");
      });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).send("Invalid or expired token");
  }
};

export default handler;
