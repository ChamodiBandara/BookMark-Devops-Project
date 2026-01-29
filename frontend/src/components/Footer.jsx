
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-4 mt-8 border-t border-slate-700 text-center text-sm">
      <p>© {new Date().getFullYear()} Smart Bookmark Dashboard. All rights reserved.</p>
      <p className="text-xs text-gray-500">Store your BookMarks Here</p>
    </footer>
  );
};

export default Footer;
