import dbConnect from "@/lib/dbConnect";
const User = require("@/models/user.js");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const handler = async (req, res) => {

    try {
        const db = await dbConnect();
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Database connection failed",
        });
        return;
      }
    
    console.log(req.body);
    console.log("verified link clicked");
    console.log(req.body)
    const token = req.body.token;
    console.log(token);

    if (!token) {
        return res.status(400).send("Token must be provided");
    }

    try {
        // Verify and decode the token
        console.log("secret is "+ SECRET_KEY);
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("token verified");
        // Find the user by their email or ID from the decoded token
        // Assuming the decoded token contains the user's email in a 'sub' claim
        const user = await User.findOne({ email: decoded.sub });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the user's verification status
        user.emailVerified = true;
        await user.save();

        res.send("Email verified successfully");
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).send("Invalid or expired token");
    }
};

export default handler;


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
