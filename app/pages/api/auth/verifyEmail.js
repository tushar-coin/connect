import dbConnect from "@/lib/dbConnect";
const User = require("@/models/user.js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    console.log(req.body);
    console.log("verified link clicked");
    res.send("hello world");
//   const { method, headers } = req;
//   if (method != "POST") {
//     res.status(401).json({
//       success: false,
//       message: "Method not allowed",
//     });
//     return;
//   }

//   try {
//     const db = await dbConnect();
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Database connection failed",
//     });
//     return;
//   }

//   try {
//     let token = headers.token;
//     token = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOneAndUpdate(
//       { email: token.email },
//       { $set: { emailVerified: true } },
//       { new: true }
//     );
//     res.json({ success: true });
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
};

export default handler;
