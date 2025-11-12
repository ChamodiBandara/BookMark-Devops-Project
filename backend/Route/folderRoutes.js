// const express = require('express');
// const router = express.Router();
// const {
//   getFolders,
//   createFolder,
//   updateFolder,
//   deleteFolder,
// } = require('../Controllers/folderController');
// const protect = require('../Middleware/authMiddleware');

// router.get('/', protect, getFolders);
// router.post('/', protect, createFolder);
// router.put('/:id', protect, updateFolder);
// router.delete('/:id', protect, deleteFolder);

// module.exports = router;
import express from "express";
import { getFolders, createFolder, updateFolder, deleteFolder } from "../Controllers/folderController.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFolders);
router.post("/", protect, createFolder);
router.put("/:id", protect, updateFolder);
router.delete("/:id", protect, deleteFolder);

export default router;
