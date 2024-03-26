import mongoose from "mongoose";

const EmailVerification = new mongoose.Schema({
  email: String,
  token: String,
});

module.exports =
  mongoose.models.EmailVerification ||
  mongoose.model("EmailVerification", EmailVerification);
