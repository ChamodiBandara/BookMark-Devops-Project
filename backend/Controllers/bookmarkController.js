
import Bookmark from "../Models/Bookmark.js";
import Folder from "../Models/Folder.js";

// GET /api/bookmarks?folder=...&q=...&tags=...
export const getBookmarks = async (req, res) => {
  try {
    const { category, q, tags, folder } = req.query;
    const filter = { user: req.user.id };

    if (category) filter.category = category;
    if (folder) filter.folder = folder;
    if (tags) filter.tags = { $in: tags.split(",").map((t) => t.trim()).filter(Boolean) };
    if (q) filter.title = new RegExp(q, "i");

    const bookmarks = await Bookmark.find(filter)
      .sort({ createdAt: -1 })
      .populate("folder", "name parentFolder");

    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/bookmarks
export const createBookmark = async (req, res) => {
  try {
    const { folder } = req.body;

    // validate folder belongs to user if provided
    if (folder) {
      const f = await Folder.findOne({ _id: folder, user: req.user.id });
      if (!f) return res.status(400).json({ message: "Invalid folder selected." });
    }

    const bookmark = await Bookmark.create({ ...req.body, user: req.user.id });
    const populated = await Bookmark.findById(bookmark._id).populate("folder", "name parentFolder");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBookmark = async (req, res) => {
  try {
    const { folder } = req.body;

    if (folder) {
      const f = await Folder.findOne({ _id: folder, user: req.user.id });
      if (!f) return res.status(400).json({ message: "Invalid folder selected." });
    }

    const updated = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    ).populate("folder", "name parentFolder");

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Bookmark deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
