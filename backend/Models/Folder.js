import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: String,
  parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Folder", FolderSchema);
