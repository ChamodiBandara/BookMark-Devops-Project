
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  FolderPlus,
  ChevronDown,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import API from "../Services/api"; // ✅ your axios instance (default export)

const formatDate = (d) => new Date(d).toLocaleDateString();

const urlHost = (url) => {
  try {
    const u = url.startsWith("http") ? new URL(url) : new URL(`https://${url}`);
    return u.hostname.replace("www.", "");
  } catch {
    return url;
  }
};

// ✅ stable “color dot” per folder (no hardcoding)
const colorClasses = [
  "bg-rose-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-fuchsia-400",
];

const hashToIndex = (str) => {
  // small deterministic hash
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % colorClasses.length;
};

const folderColorClass = (folderId) => {
  if (!folderId) return "bg-slate-400";
  return colorClasses[hashToIndex(String(folderId))];
};

const flattenTreeToOptions = (tree, depth = 0) => {
  const out = [];
  for (const node of tree) {
    out.push({ _id: node._id, label: `${"— ".repeat(depth)}${node.name}` });
    if (node.children?.length) out.push(...flattenTreeToOptions(node.children, depth + 1));
  }
  return out;
};

// ✅ frontend safety: dedupe tree by _id (prevents duplicates even if backend sends duplicates)
const dedupeTree = (nodes) => {
  const seen = new Set();

  const walk = (arr) => {
    const result = [];
    for (const n of arr || []) {
      if (!n?._id) continue;
      const id = String(n._id);
      if (seen.has(id)) continue;
      seen.add(id);

      const children = walk(n.children || []);
      result.push({ ...n, children });
    }
    return result;
  };

  return walk(nodes || []);
};

const FolderTree = ({ tree, selectedFolderId, onSelectFolder, onAddFolder }) => {
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
              isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <span className="w-4 h-4 inline-block" />
            )}
          </button>

          {/* ✅ colored dot like your previous UI */}
          <span
            className={`w-2.5 h-2.5 rounded-full ${folderColorClass(node._id)} shrink-0`}
          />

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  if (!open) return null;

  const create = async () => {
    try {
      if (!name.trim()) return alert("Folder name required");
      setLoading(true);

      const { data } = await API.post("/folders", {
        name,
        parentFolder: parentFolderId || null,
      });

      onCreated?.(data);
      onClose();
    } catch (err) {
      console.error("Create folder error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create folder");
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60"
              onClick={create}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ title: "", url: "", description: "", tags: "", category: "", folder: "" });
    }
  }, [open]);

  if (!open) return null;

  const save = async () => {
    try {
      if (!form.title || !form.url) return alert("Title and URL are required");
      setLoading(true);

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
    } catch (err) {
      console.error("Create bookmark error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create bookmark");
    } finally {
      setLoading(false);
    }
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
            <p className="text-xs text-white/50 mt-2">Separate tags with commas</p>
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60"
              onClick={save}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Bookmark"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookmarkCard = ({ b }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition shadow-lg p-5">
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

          {b.description ? <p className="text-white/70 text-sm mt-2">{b.description}</p> : null}

          {b.tags?.length ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {b.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">
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

  // ✅ Logout: clear token + go to http://localhost:5173/
  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5173/";
  };

  const loadFolders = async () => {
    const { data } = await API.get("/folders?tree=true");
    setFoldersTree(dedupeTree(data)); // ✅ dedupe to avoid duplicates in UI
  };

  const loadBookmarks = async (params = {}) => {
    const { data } = await API.get("/bookmarks", { params });
    setBookmarks(data);
  };

  useEffect(() => {
    loadFolders();
    loadBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <h1 className="text-xl font-bold">My Bookmarks</h1>

            {/* ✅ Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-white/10"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white/80" />
            </button>
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
              <div className="px-4 py-3 text-sm text-white/60">No folders yet. Click + to create one.</div>
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

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((b) => (
                <BookmarkCard key={b._id} b={b} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-14 text-center text-white/60">No bookmarks found.</div>
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
          await loadFolders(); // refresh folder tree + dropdown options
        }}
      />
    </div>
  );
}
