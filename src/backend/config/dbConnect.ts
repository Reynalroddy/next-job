import mongoose from "mongoose";
const DB_URI: string = process.env.DB_URI || ''
const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.set("strictQuery", false);
  
  mongoose.connect(DB_URI);
};

export default dbConnect;