import React, { useState } from "react";
import { Home, Music, PlaySquare, List, Radio, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for toggling menu visibility
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: List, label: "Playlists", path: "/playlists" },
    { icon: Music, label: "Music", path: "/music" },
    { icon: PlaySquare, label: "Videos", path: "/videos" },
    { icon: Radio, label: "Live Streaming", path: "/live" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-gray-800 rounded-lg text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <nav
        className={`fixed top-0 left-0 h-100% w-64 bg-gray-900 text-white p-4 transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative`}
      >
        <div className="flex items-center gap-2 mb-8">
          <Radio className="w-8 h-8 text-purple-500" />
          <h1 className="text-xl font-bold">MediaStream</h1>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive(item.path) ? "bg-purple-600" : "hover:bg-gray-800"
              }`}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
