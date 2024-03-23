import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://admin:m4nkZIgCePQr4TdK@cluster0.kpmkdm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  console.log("CONNECTING TO DB");
  cached.conn = await cached.promise;
  console.log("CONNECTED TO DB");
  return cached.conn;
}

export default dbConnect;
