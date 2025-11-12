// const Bookmark = require('../Models/Bookmark');

// // Get all bookmarks (filter by category/tags/search)
// exports.getBookmarks = async (req, res) => {
//   try {
//     const { category, q, tags, folder } = req.query;
//     const filter = { user: req.user.id };

//     if (category) filter.category = category;
//     if (folder) filter.folder = folder;
//     if (tags) filter.tags = { $in: tags.split(',') };
//     if (q) filter.title = new RegExp(q, 'i');

//     const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
//     res.json(bookmarks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create bookmark
// exports.createBookmark = async (req, res) => {
//   try {
//     const bookmark = await Bookmark.create({ ...req.body, user: req.user.id });
//     res.status(201).json(bookmark);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Update bookmark
// exports.updateBookmark = async (req, res) => {
//   try {
//     const updated = await Bookmark.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete bookmark
// exports.deleteBookmark = async (req, res) => {
//   try {
//     await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user.id });
//     res.json({ message: 'Bookmark deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import Bookmark from "../Models/Bookmark.js";

// Get all bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const { category, q, tags, folder } = req.query;
    const filter = { user: req.user.id };

    if (category) filter.category = category;
    if (folder) filter.folder = folder;
    if (tags) filter.tags = { $in: tags.split(",") };
    if (q) filter.title = new RegExp(q, "i");

    const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create bookmark
export const createBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create({ ...req.body, user: req.user.id });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update bookmark
export const updateBookmark = async (req, res) => {
  try {
    const updated = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete bookmark
export const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Bookmark deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
