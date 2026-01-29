// // const mongoose = require('mongoose');

// // const BookmarkSchema = new mongoose.Schema({
// //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   title: { type: String, required: true },
// //   url: { type: String, required: true },
// //   description: String,
// //   tags: [String],
// //   category: String,
// //   folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
// //   favicon: String,
// //   starred: { type: Boolean, default: false },
// //   createdAt: { type: Date, default: Date.now },
// // });

// // module.exports = mongoose.model('Bookmark', BookmarkSchema);
// import mongoose from "mongoose";

// const BookmarkSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional for now
//   title: { type: String, required: true },
//   url: { type: String, required: true },
//   description: String,
//   tags: [String],
//   category: { type: String, required: true },
//   folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
//   favicon: String,
//   starred: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Bookmark", BookmarkSchema);
import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  tags: [String],
  category: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  favicon: String,
  starred: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bookmark", BookmarkSchema);
