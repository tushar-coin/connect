import mongoose from "mongoose";
import { object } from "zod";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  salt: String,
  email_verified: Boolean, // Indicates if the email is verified
  Act_token: String, // Verification token
  token_expiration: Number, // Expiration time of the token
  Act_token_lastSentDate: Date, // Last time the verification email was sent
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
