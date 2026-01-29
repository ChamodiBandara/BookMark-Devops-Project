// import React, { useState, useEffect } from "react";
// import {
//   Search, Plus, Youtube, Code2, Layers, Edit2, Trash2, Save, X
// } from "lucide-react";

// // Mock API for demonstration - replace with your actual API
// const API = {
//   get: async (url) => {
//     return { data: [] };
//   },
//   post: async (url, data) => {
//     return { data: { ...data, _id: Date.now() } };
//   },
//   put: async (url, data) => {
//     return { data };
//   },
//   delete: async (url) => {
//     return { data: {} };
//   }
// };

// // Mock Header component - replace with your actual Header
// const Header = () => {
//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       // Add your logout logic here
//       console.log("Logging out...");
//     }
//   };

//   return (
//     <header className="bg-white/80 backdrop-blur-lg border-b border-purple-200 py-4 px-6 shadow-sm">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//           📚 My Bookmarks
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium shadow-lg shadow-rose-500/30 transition-all duration-200 hover:scale-105"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// // Mock Footer component - replace with your actual Footer
// const Footer = () => (
//   <footer className="bg-white/80 backdrop-blur-lg border-t border-purple-200 py-4 px-6 text-center text-gray-600 text-sm">
//     <p>© 2024 Bookmarks Manager. All rights reserved.</p>
//   </footer>
// );

// const URLBookmarks = () => {
//   const [bookmarks, setBookmarks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editedBookmark, setEditedBookmark] = useState({ title: "", url: "", description: "", tags: [], category: "" });
//   const [showForm, setShowForm] = useState(false);
//   const [newBookmark, setNewBookmark] = useState({ title: "", url: "", description: "", category: "", tags: [] });
//   const [tagInput, setTagInput] = useState("");

//   useEffect(() => {
//     fetchBookmarks();
//   }, []);

//   const fetchBookmarks = async () => {
//     try {
//       const { data } = await API.get("/bookmarks");
//       setBookmarks(data);
//     } catch (err) {
//       console.error("Error fetching bookmarks:", err);
//     }
//   };

//   const addBookmark = async () => {
//     if (!newBookmark.title || !newBookmark.url || !newBookmark.category) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     try {
//       const { data } = await API.post("/bookmarks", newBookmark);
//       setBookmarks((prev) => [...prev, data]);
//       setNewBookmark({ title: "", url: "", description: "", category: "", tags: [] });
//       setTagInput("");
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error adding bookmark:", err);
//     }
//   };

//   const deleteBookmark = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this bookmark?")) return;
//     try {
//       await API.delete(`/bookmarks/${id}`);
//       setBookmarks((prev) => prev.filter((b) => b._id !== id));
//     } catch (err) {
//       console.error("Error deleting bookmark:", err);
//     }
//   };

//   const startEdit = (bookmark) => {
//     setEditingId(bookmark._id);
//     setEditedBookmark({ ...bookmark, tags: bookmark.tags || [] });
//   };

//   const saveEdit = async (id) => {
//     try {
//       const { data } = await API.put(`/bookmarks/${id}`, editedBookmark);
//       setBookmarks((prev) => prev.map((b) => (b._id === id ? data : b)));
//       setEditingId(null);
//     } catch (err) {
//       console.error("Error updating bookmark:", err);
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditedBookmark({ title: "", url: "", description: "", tags: [], category: "" });
//   };

//   const addTag = () => {
//     const trimmed = tagInput.trim();
//     if (trimmed && !newBookmark.tags.includes(trimmed)) {
//       setNewBookmark({ ...newBookmark, tags: [...newBookmark.tags, trimmed] });
//       setTagInput("");
//     }
//   };

//   const removeTag = (tag) => {
//     setNewBookmark({
//       ...newBookmark,
//       tags: newBookmark.tags.filter((t) => t !== tag),
//     });
//   };

//   const getFavicon = (url) => {
//     if (url.includes("youtube")) return <Youtube className="w-6 h-6 text-rose-500" />;
//     if (url.includes("react")) return <Code2 className="w-6 h-6 text-cyan-400" />;
//     if (url.includes("tailwind")) return <Layers className="w-6 h-6 text-sky-400" />;
//     return <Layers className="w-6 h-6 text-purple-400" />;
//   };

//   const filteredBookmarks = bookmarks.filter((b) => {
//     const matchesSearch =
//       b.title.toLowerCase().includes(search.toLowerCase()) ||
//       b.url.toLowerCase().includes(search.toLowerCase()) ||
//       (b.tags && b.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));
//     return matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 flex flex-col">
//       <Header />

//       <main className="flex-grow px-6 py-8 max-w-7xl mx-auto w-full">
//         {/* Search + Add */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-lg rounded-2xl p-5 border border-purple-200 shadow-xl">
//           <div className="relative w-full md:w-2/3">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search bookmarks..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 placeholder-gray-500 transition-all shadow-sm"
//             />
//           </div>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-purple-500/30 transition-all duration-200 hover:scale-105"
//           >
//             <Plus className="w-5 h-5" /> Add Bookmark
//           </button>
//         </div>

//         {/* Add Form */}
//         {showForm && (
//           <div className="mb-8 p-8 bg-gradient-to-br from-white to-purple-50 backdrop-blur-lg border-2 border-purple-300 rounded-3xl shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   ✨ Add New Bookmark
//                 </h2>
//                 <p className="text-gray-600 text-sm mt-1">Save your favorite links in one place</p>
//               </div>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-6 h-6 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                     <span className="text-purple-600">📝</span> Title *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., React Documentation"
//                     value={newBookmark.title}
//                     onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
//                     className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                     <span className="text-pink-600">🔗</span> URL *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="https://example.com"
//                     value={newBookmark.url}
//                     onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
//                     className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                   <span className="text-indigo-600">📁</span> Category *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Education, Work, Entertainment"
//                   value={newBookmark.category}
//                   onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })}
//                   className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                   <span className="text-cyan-600">🏷️</span> Tags
//                 </label>
//                 <div className="flex flex-wrap gap-2 p-3 bg-purple-50 rounded-xl border-2 border-purple-200 min-h-[60px]">
//                   {newBookmark.tags.length === 0 ? (
//                     <span className="text-gray-400 text-sm italic">No tags added yet</span>
//                   ) : (
//                     newBookmark.tags.map((tag) => (
//                       <span key={tag} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg transition-all">
//                         {tag} 
//                         <X className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded-full transition-colors" onClick={() => removeTag(tag)} />
//                       </span>
//                     ))
//                   )}
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Type a tag and press Enter"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && addTag()}
//                   className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
//                 />
//               </div>
//             </div>

//             <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
//               <button 
//                 onClick={() => setShowForm(false)} 
//                 className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 rounded-xl text-gray-700 font-semibold transition-all duration-200 hover:scale-105 shadow-md"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={addBookmark} 
//                 className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl text-white font-semibold shadow-lg shadow-emerald-500/40 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <Save className="w-5 h-5" />
//                 Save Bookmark
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Bookmarks */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {filteredBookmarks.map((b) => (
//             <div
//               key={b._id}
//               className="group p-5 bg-white/80 backdrop-blur-md border border-purple-200 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:scale-[1.02]"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex items-center gap-3 flex-1 min-w-0">
//                   <div className="flex-shrink-0">
//                     {getFavicon(b.url)}
//                   </div>
//                   {editingId === b._id ? (
//                     <input
//                       type="text"
//                       value={editedBookmark.title}
//                       onChange={(e) => setEditedBookmark({ ...editedBookmark, title: e.target.value })}
//                       className="flex-1 px-3 py-2 rounded-lg bg-white border border-purple-200 focus:ring-2 focus:ring-purple-400 outline-none text-gray-800 text-sm shadow-sm"
//                     />
//                   ) : (
//                     <a
//                       href={b.url.startsWith("http") ? b.url : `https://${b.url}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors truncate flex-1"
//                     >
//                       {b.title}
//                     </a>
//                   )}
//                 </div>
//                 <div className="flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                   {editingId === b._id ? (
//                     <>
//                       <Save className="w-5 h-5 cursor-pointer text-emerald-500 hover:text-emerald-600 transition-colors" onClick={() => saveEdit(b._id)} />
//                       <X className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600 transition-colors" onClick={cancelEdit} />
//                     </>
//                   ) : (
//                     <>
//                       <Edit2 className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-600 transition-colors" onClick={() => startEdit(b)} />
//                       <Trash2 className="w-5 h-5 cursor-pointer text-rose-500 hover:text-rose-600 transition-colors" onClick={() => deleteBookmark(b._id)} />
//                     </>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {b.tags?.map((tag) => (
//                   <span key={tag} className="bg-indigo-100 border border-indigo-300 px-3 py-1 text-xs rounded-full text-indigo-700 font-medium">
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredBookmarks.length === 0 && (
//           <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-2xl border border-purple-200 shadow-lg">
//             <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg font-medium">No bookmarks found</p>
//             <p className="text-gray-500 text-sm mt-2">Try adjusting your search or add a new bookmark</p>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default URLBookmarks;

import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, FolderPlus, ChevronDown, ChevronRight, X } from "lucide-react";
import API from "../services/API";

const formatDate = (d) => new Date(d).toLocaleDateString();

const urlHost = (url) => {
  try {
    const u = url.startsWith("http") ? new URL(url) : new URL(`https://${url}`);
    return u.hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const flattenTreeToOptions = (tree, depth = 0) => {
  const out = [];
  for (const node of tree) {
    out.push({ _id: node._id, label: `${"— ".repeat(depth)}${node.name}` });
    if (node.children?.length) out.push(...flattenTreeToOptions(node.children, depth + 1));
  }
  return out;
};

const FolderTree = ({
  tree,
  selectedFolderId,
  onSelectFolder,
  onAddFolder,
}) => {
  const [openMap, setOpenMap] = useState({});

  const toggle = (id) => setOpenMap((m) => ({ ...m, [id]: !m[id] }));

  const Node = ({ node, depth }) => {
    const isOpen = !!openMap[node._id];
    const hasKids = node.children?.length > 0;
    const isSelected = selectedFolderId === node._id;

    return (
      <div>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
            isSelected ? "bg-white/10" : "hover:bg-white/5"
          }`}
          style={{ paddingLeft: 12 + depth * 12 }}
          onClick={() => onSelectFolder(node._id)}
        >
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              if (hasKids) toggle(node._id);
            }}
          >
            {hasKids ? (
              isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              <span className="w-4 h-4 inline-block" />
            )}
          </button>

          <span className="text-sm font-medium truncate">{node.name}</span>

          <button
            type="button"
            className="ml-auto p-1 rounded hover:bg-white/10 opacity-70 hover:opacity-100"
            title="Add subfolder"
            onClick={(e) => {
              e.stopPropagation();
              onAddFolder(node._id);
            }}
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </div>

        {hasKids && isOpen && (
          <div className="mt-1">
            {node.children.map((c) => (
              <Node key={c._id} node={c} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {tree.map((n) => (
        <Node key={n._id} node={n} depth={0} />
      ))}
    </div>
  );
};

const AddFolderModal = ({ open, onClose, parentFolderId, onCreated }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  if (!open) return null;

  const create = async () => {
    if (!name.trim()) return alert("Folder name required");
    const { data } = await API.post("/folders", { name, parentFolder: parentFolderId || null });
    onCreated?.(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {parentFolderId ? "Add Subfolder" : "Add Folder"}
          </h3>
          <button className="p-2 rounded hover:bg-white/10" onClick={onClose}>
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm text-white/80 font-medium">Folder name</label>
            <input
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Music, Work, Projects"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              onClick={create}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddBookmarkModal = ({ open, onClose, folderOptions, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
    category: "",
    folder: "",
  });

  useEffect(() => {
    if (open) {
      setForm({ title: "", url: "", description: "", tags: "", category: "", folder: "" });
    }
  }, [open]);

  if (!open) return null;

  const save = async () => {
    if (!form.title || !form.url) {
      return alert("Title and URL are required");
    }

    const payload = {
      title: form.title,
      url: form.url,
      description: form.description,
      category: form.category || "",
      folder: form.folder || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const { data } = await API.post("/bookmarks", payload);
    onSaved?.(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-6 overflow-auto">
      <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">Add New Bookmark</h3>
          <button className="p-2 rounded hover:bg-white/10" onClick={onClose}>
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="text-sm font-semibold text-white/80">Title*</label>
            <input
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bookmark title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80">URL*</label>
            <input
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80">Description</label>
            <textarea
              className="mt-2 w-full min-h-[110px] rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a description (optional)"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80">Tags</label>
            <input
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas (e.g. music, favorite, important)"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
            <p className="text-xs text-white/50 mt-2">
              Separate tags with commas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-white/80">Category</label>
              <input
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional (e.g. Work, Learning)"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white/80">Folder</label>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={form.folder}
                onChange={(e) => setForm((f) => ({ ...f, folder: e.target.value }))}
              >
                <option value="">(No folder)</option>
                {folderOptions.map((opt) => (
                  <option key={opt._id} value={opt._id} className="bg-[#111827]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              onClick={save}
            >
              Save Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookmarkCard = ({ b }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition shadow-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <h4 className="text-white font-semibold truncate">{b.title}</h4>
          </div>

          <a
            href={b.url?.startsWith("http") ? b.url : `https://${b.url}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm break-all"
          >
            {b.url}
          </a>

          {b.description ? (
            <p className="text-white/70 text-sm mt-2">{b.description}</p>
          ) : null}

          {b.tags?.length ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {b.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="text-right text-xs text-white/50 flex-shrink-0">
          <div className="opacity-80">{urlHost(b.url || "")}</div>
          <div className="mt-1">Added {formatDate(b.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default function BookmarksDashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [foldersTree, setFoldersTree] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [openBookmarkModal, setOpenBookmarkModal] = useState(false);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [folderParentForModal, setFolderParentForModal] = useState(null);

  const loadFolders = async () => {
    const { data } = await API.get("/folders?tree=true");
    setFoldersTree(data);
  };

  const loadBookmarks = async (params = {}) => {
    const { data } = await API.get("/bookmarks", { params });
    setBookmarks(data);
  };

  useEffect(() => {
    loadFolders();
    loadBookmarks();
  }, []);

  // server-side filter by folder, client-side by search (like your screenshot)
  useEffect(() => {
    const params = {};
    if (selectedFolderId) params.folder = selectedFolderId;
    loadBookmarks(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  const folderOptions = useMemo(() => flattenTreeToOptions(foldersTree), [foldersTree]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bookmarks;

    return bookmarks.filter((b) => {
      return (
        (b.title || "").toLowerCase().includes(q) ||
        (b.url || "").toLowerCase().includes(q) ||
        (b.tags || []).some((t) => (t || "").toLowerCase().includes(q))
      );
    });
  }, [bookmarks, search]);

  const openAddRootFolder = () => {
    setFolderParentForModal(null);
    setOpenFolderModal(true);
  };

  const openAddSubFolder = (parentId) => {
    setFolderParentForModal(parentId);
    setOpenFolderModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-[280px] border-r border-white/10 bg-[#0a1324]">
          <div className="px-6 py-5 border-b border-white/10">
            <h1 className="text-xl font-bold">My Bookmarks</h1>
          </div>

          <div className="px-4 py-4">
            <button
              className={`w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition font-semibold ${
                !selectedFolderId ? "ring-1 ring-white/10" : ""
              }`}
              onClick={() => setSelectedFolderId(null)}
            >
              All Bookmarks
            </button>
          </div>

          <div className="px-4 py-2 flex items-center justify-between">
            <p className="text-white/70 font-semibold">Categories</p>
            <button
              className="p-2 rounded-lg hover:bg-white/10"
              onClick={openAddRootFolder}
              title="Add folder"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="px-2 pb-6">
            {foldersTree.length === 0 ? (
              <div className="px-4 py-3 text-sm text-white/60">
                No folders yet. Click + to create one.
              </div>
            ) : (
              <FolderTree
                tree={foldersTree}
                selectedFolderId={selectedFolderId}
                onSelectFolder={setSelectedFolderId}
                onAddFolder={openAddSubFolder}
              />
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="px-10 py-8">
            <div className="flex items-center justify-between gap-6">
              <h2 className="text-3xl font-extrabold">All Bookmarks</h2>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search bookmarks..."
                    className="w-[320px] rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => setOpenBookmarkModal(true)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 font-semibold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Bookmark
                </button>
              </div>
            </div>

            {/* Cards grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((b) => (
                <BookmarkCard key={b._id} b={b} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-14 text-center text-white/60">
                No bookmarks found.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddBookmarkModal
        open={openBookmarkModal}
        onClose={() => setOpenBookmarkModal(false)}
        folderOptions={folderOptions}
        onSaved={(created) => setBookmarks((prev) => [created, ...prev])}
      />

      <AddFolderModal
        open={openFolderModal}
        onClose={() => setOpenFolderModal(false)}
        parentFolderId={folderParentForModal}
        onCreated={async () => {
          await loadFolders(); // ✅ refresh tree
        }}
      />
    </div>
  );
}
