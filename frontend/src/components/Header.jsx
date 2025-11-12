
import React from "react";
import { Bookmark } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 text-white shadow-lg py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-white" />
        <h1 className="text-2xl font-bold tracking-wide">Smart Bookmark Dashboard</h1>
      </div>
      <div className="text-sm text-gray-200">
        Manage • Organize • Access
      </div>
    </header>
  );
};

export default Header;
