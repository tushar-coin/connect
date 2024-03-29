import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const User = require("@/models/user.js");
import { z } from "zod";
import nodemailer from "nodemailer";

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
  let activation_token = await bcrypt.genSalt(10);

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
    sendVerificationEmail(user.email, user.firstName,activation_token);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }

};

const sendVerificationEmail = async (userEmail, firstName,activation_token) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajancoding597@gmail.com",
        pass: "funzmtuwnobqjvya", // Use a secure method to store and access passwords
      },
    });

    let info = await transporter.sendMail({
      from: '"Connect" <rajancoding597@gmail.com>',
      to: userEmail,
      subject: "Verify Your Email Address",
      text: `Hello ${firstName},\nPlease verify your email address by clicking on the following link: [Verification Link Here]`,
      html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
          .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello ${firstName},</h1>
          <p>Please verify your email address by clicking on the following button:</p>
          <a class="button" href="https://localhost:3000/api/auth/verifyEmail?ActivationToken='${activation_token}'">Verify Email</a>
        </div>
      </body>
      </html>
      `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err); // Log error for debugging
  }
};

export default handler;
