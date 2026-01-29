
import express from "express";
import { getFolders, createFolder, updateFolder, deleteFolder } from "../Controllers/folderController.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFolders);
router.post("/", protect, createFolder);
router.put("/:id", protect, updateFolder);
router.delete("/:id", protect, deleteFolder);

export default router;
