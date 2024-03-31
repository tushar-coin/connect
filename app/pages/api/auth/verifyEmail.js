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
    
      const token = req.body.token;

    if (!token) {
        return res.status(400).send("Token must be provided");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log(decoded);
        console.log("token verified");
        const user = await User.findOne({ email: decoded.email});


        // console.log("user fetched from database: - "+ user);

        if (user==null) {
          console.log("user not found");
            return res.status(404).send("User not found");
        }

        // Calculate token expiration based on Act_token_lastSentDate and token_expiration
        const tokenExpirationDate = new Date(user.Act_token_lastSentDate.getTime() + user.token_expiration * 1000);
        const now = new Date();

        // console.log("Now time-> " + now);
        // console.log("Passed time-> " + tokenExpirationDate);
        
        // Check if the token has expired
        if (now > tokenExpirationDate) {
            return res.status(401).send("Token has expired");
        }

        // Proceed if the token is not expired
        if (user.email_verified==false) {
          const filter = { email: user.email };
          const update = { $set: { "email_verified": true } };
          const options = { new: true };
          
          User.findOneAndUpdate(filter, update, options)
            .then(updatedUser => {
              // console.log("Updated user:", updatedUser);
            })
            .catch(err => {
              console.error("Error updating user:", err);
            });

            res.send("Email is verified");
          
          } else {
              console.log("User's email was already verified, RESPONSE FROM BACKEND");
              res.status(200).send("Email is already verified");
          }

    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).send("Invalid or expired token");
    }
};

export default handler;

