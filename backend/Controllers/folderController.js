// const Folder = require('../Models/Folder');

// exports.getFolders = async (req, res) => {
//   try {
//     const folders = await Folder.find({ user: req.user.id });
//     res.json(folders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createFolder = async (req, res) => {
//   try {
//     const folder = await Folder.create({ ...req.body, user: req.user.id });
//     res.status(201).json(folder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateFolder = async (req, res) => {
//   try {
//     const updated = await Folder.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteFolder = async (req, res) => {
//   try {
//     await Folder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
//     res.json({ message: 'Folder deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import Folder from "../Models/Folder.js";

// Get all folders for the user
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new folder
export const createFolder = async (req, res) => {
  try {
    const folder = await Folder.create({ ...req.body, user: req.user.id });
    res.status(201).json(folder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update folder
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

// Delete folder
export const deleteFolder = async (req, res) => {
  try {
    await Folder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
