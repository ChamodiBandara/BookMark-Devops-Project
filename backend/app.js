import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';               // ✅ import cors
import connectDB from './db.js';
import authRoutes from "./Route/authRoutes.js"; // make sure folder name is Routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());                      // ✅ enable CORS for all origins
app.use(express.json());              // parse JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
