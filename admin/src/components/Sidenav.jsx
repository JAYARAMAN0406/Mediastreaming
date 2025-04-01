import { useState } from 'react';
import { Music, PlaySquare, Upload, List, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidenav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Mobile Menu Button */}
    
        <button
         className="fixed top-4 left-4 z-50 md:hidden p-2 bg-gray-800 rounded-lg text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Corrected here
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
   

      {/* Sidenav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 transform transition-transform z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64`}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-8 lg:block">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-purple-500" />
            <h1 className="text-xl font-bold">Media Stream</h1>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="lg:hidden p-2 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close on mobile link click
          >
            <Upload size={20} />
            <span>Upload Media</span>
          </NavLink>

          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close on mobile link click
          >
            <PlaySquare size={20} />
            <span>Playlists</span>
          </NavLink>

          <NavLink
            to="/media"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close on mobile link click
          >
            <List size={20} />
            <span>All Media</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
