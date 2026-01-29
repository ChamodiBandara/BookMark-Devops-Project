// import express from "express";
// import {
//   getBookmarks,
//   createBookmark,
//   updateBookmark,
//   deleteBookmark,
// } from "../Controllers/bookmarkController.js";
// import protect from "../Middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", protect, getBookmarks);
// router.post("/", protect, createBookmark);
// router.put("/:id", protect, updateBookmark);
// router.delete("/:id", protect, deleteBookmark);

// export default router;
import express from "express";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark } from "../Controllers/bookmarkController.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getBookmarks);
router.post("/", protect, createBookmark);
router.put("/:id", protect, updateBookmark);
router.delete("/:id", protect, deleteBookmark);

export default router;
;
