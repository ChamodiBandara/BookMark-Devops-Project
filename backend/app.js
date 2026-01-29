import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

// Routes
import bookmarkRoutes from "./Route/bookmarkRoutes.js";
import authRoutes from "./Route/authRoutes.js";
import folderRoutes from "./Route/folderRoutes.js"; // <-- added

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes); // <-- added

app.get("/", (req, res) => res.send("Backend running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
