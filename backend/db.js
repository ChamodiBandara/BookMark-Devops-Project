// // import mongoose from "mongoose";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URI);
// //     console.log("MongoDB connected");
// //   } catch (err) {
// //     console.error("MongoDB connection failed:", err.message);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;

// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js"; // ✅ Import the DB connection function
// import cors from "cors"; // Optional, if your frontend needs it

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Example route (you can replace this with your actual routes)
// app.get("/", (req, res) => {
//   res.send("Backend server is running 🚀");
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
  import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
