
import Folder from "../Models/Folder.js";

// Build a nested tree from flat folders list
const buildTree = (folders) => {
  const map = new Map();
  const roots = [];

  folders.forEach((f) => {
    map.set(String(f._id), { ...f.toObject(), children: [] });
  });

  folders.forEach((f) => {
    const id = String(f._id);
    const parentId = f.parentFolder ? String(f.parentFolder) : null;

    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(map.get(id));
    } else {
      roots.push(map.get(id));
    }
  });

  // optional: sort by name
  const sortRec = (nodes) => {
    nodes.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    nodes.forEach((n) => sortRec(n.children || []));
  };
  sortRec(roots);

  return roots;
};

// GET /api/folders?tree=true  OR  /api/folders (flat)
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (req.query.tree === "true") {
      return res.json(buildTree(folders));
    }
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/folders  { name, category?, parentFolder? }
export const createFolder = async (req, res) => {
  try {
    const { name, category, parentFolder } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Folder name is required." });
    }

    // Validate parent belongs to user (if provided)
    if (parentFolder) {
      const parent = await Folder.findOne({ _id: parentFolder, user: req.user.id });
      if (!parent) return res.status(400).json({ message: "Invalid parent folder." });
    }

    const folder = await Folder.create({
      user: req.user.id,
      name: name.trim(),
      category: category || "",
      parentFolder: parentFolder || null,
    });

    res.status(201).json(folder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateFolder = async (req, res) => {
  try {
    const updated = await Folder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    // Optional safety: prevent delete if folder has children
    const child = await Folder.findOne({ user: req.user.id, parentFolder: req.params.id });
    if (child) return res.status(400).json({ message: "Delete subfolders first." });

    await Folder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
