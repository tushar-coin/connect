import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  salt: String,
  emailVerified: Boolean,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
