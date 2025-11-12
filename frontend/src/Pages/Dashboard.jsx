import React, { useState, useEffect } from "react";
import {
  Search, Plus, Youtube, Code2, Layers, Edit2, Trash2, Save, X
} from "lucide-react";

// Mock API for demonstration - replace with your actual API
const API = {
  get: async (url) => {
    return { data: [] };
  },
  post: async (url, data) => {
    return { data: { ...data, _id: Date.now() } };
  },
  put: async (url, data) => {
    return { data };
  },
  delete: async (url) => {
    return { data: {} };
  }
};

// Mock Header component - replace with your actual Header
const Header = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Add your logout logic here
      console.log("Logging out...");
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-purple-200 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          📚 My Bookmarks
        </h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium shadow-lg shadow-rose-500/30 transition-all duration-200 hover:scale-105"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

// Mock Footer component - replace with your actual Footer
const Footer = () => (
  <footer className="bg-white/80 backdrop-blur-lg border-t border-purple-200 py-4 px-6 text-center text-gray-600 text-sm">
    <p>© 2024 Bookmarks Manager. All rights reserved.</p>
  </footer>
);

const URLBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedBookmark, setEditedBookmark] = useState({ title: "", url: "", description: "", tags: [], category: "" });
  const [showForm, setShowForm] = useState(false);
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "", description: "", category: "", tags: [] });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const { data } = await API.get("/bookmarks");
      setBookmarks(data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  };

  const addBookmark = async () => {
    if (!newBookmark.title || !newBookmark.url || !newBookmark.category) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const { data } = await API.post("/bookmarks", newBookmark);
      setBookmarks((prev) => [...prev, data]);
      setNewBookmark({ title: "", url: "", description: "", category: "", tags: [] });
      setTagInput("");
      setShowForm(false);
    } catch (err) {
      console.error("Error adding bookmark:", err);
    }
  };

  const deleteBookmark = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bookmark?")) return;
    try {
      await API.delete(`/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting bookmark:", err);
    }
  };

  const startEdit = (bookmark) => {
    setEditingId(bookmark._id);
    setEditedBookmark({ ...bookmark, tags: bookmark.tags || [] });
  };

  const saveEdit = async (id) => {
    try {
      const { data } = await API.put(`/bookmarks/${id}`, editedBookmark);
      setBookmarks((prev) => prev.map((b) => (b._id === id ? data : b)));
      setEditingId(null);
    } catch (err) {
      console.error("Error updating bookmark:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedBookmark({ title: "", url: "", description: "", tags: [], category: "" });
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !newBookmark.tags.includes(trimmed)) {
      setNewBookmark({ ...newBookmark, tags: [...newBookmark.tags, trimmed] });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setNewBookmark({
      ...newBookmark,
      tags: newBookmark.tags.filter((t) => t !== tag),
    });
  };

  const getFavicon = (url) => {
    if (url.includes("youtube")) return <Youtube className="w-6 h-6 text-rose-500" />;
    if (url.includes("react")) return <Code2 className="w-6 h-6 text-cyan-400" />;
    if (url.includes("tailwind")) return <Layers className="w-6 h-6 text-sky-400" />;
    return <Layers className="w-6 h-6 text-purple-400" />;
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase()) ||
      (b.tags && b.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 flex flex-col">
      <Header />

      <main className="flex-grow px-6 py-8 max-w-7xl mx-auto w-full">
        {/* Search + Add */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-lg rounded-2xl p-5 border border-purple-200 shadow-xl">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 placeholder-gray-500 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-purple-500/30 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" /> Add Bookmark
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="mb-8 p-8 bg-gradient-to-br from-white to-purple-50 backdrop-blur-lg border-2 border-purple-300 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ✨ Add New Bookmark
                </h2>
                <p className="text-gray-600 text-sm mt-1">Save your favorite links in one place</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-purple-600">📝</span> Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React Documentation"
                    value={newBookmark.title}
                    onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-pink-600">🔗</span> URL *
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-indigo-600">📁</span> Category *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Education, Work, Entertainment"
                  value={newBookmark.category}
                  onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-cyan-600">🏷️</span> Tags
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-purple-50 rounded-xl border-2 border-purple-200 min-h-[60px]">
                  {newBookmark.tags.length === 0 ? (
                    <span className="text-gray-400 text-sm italic">No tags added yet</span>
                  ) : (
                    newBookmark.tags.map((tag) => (
                      <span key={tag} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg transition-all">
                        {tag} 
                        <X className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded-full transition-colors" onClick={() => removeTag(tag)} />
                      </span>
                    ))
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:border-purple-300"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setShowForm(false)} 
                className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 rounded-xl text-gray-700 font-semibold transition-all duration-200 hover:scale-105 shadow-md"
              >
                Cancel
              </button>
              <button 
                onClick={addBookmark} 
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl text-white font-semibold shadow-lg shadow-emerald-500/40 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Bookmark
              </button>
            </div>
          </div>
        )}

        {/* Bookmarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBookmarks.map((b) => (
            <div
              key={b._id}
              className="group p-5 bg-white/80 backdrop-blur-md border border-purple-200 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {getFavicon(b.url)}
                  </div>
                  {editingId === b._id ? (
                    <input
                      type="text"
                      value={editedBookmark.title}
                      onChange={(e) => setEditedBookmark({ ...editedBookmark, title: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-purple-200 focus:ring-2 focus:ring-purple-400 outline-none text-gray-800 text-sm shadow-sm"
                    />
                  ) : (
                    <a
                      href={b.url.startsWith("http") ? b.url : `https://${b.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors truncate flex-1"
                    >
                      {b.title}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {editingId === b._id ? (
                    <>
                      <Save className="w-5 h-5 cursor-pointer text-emerald-500 hover:text-emerald-600 transition-colors" onClick={() => saveEdit(b._id)} />
                      <X className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600 transition-colors" onClick={cancelEdit} />
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-600 transition-colors" onClick={() => startEdit(b)} />
                      <Trash2 className="w-5 h-5 cursor-pointer text-rose-500 hover:text-rose-600 transition-colors" onClick={() => deleteBookmark(b._id)} />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {b.tags?.map((tag) => (
                  <span key={tag} className="bg-indigo-100 border border-indigo-300 px-3 py-1 text-xs rounded-full text-indigo-700 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-2xl border border-purple-200 shadow-lg">
            <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">No bookmarks found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or add a new bookmark</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default URLBookmarks;