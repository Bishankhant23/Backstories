import  { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const menuItems = [
  { key: 'seasons', label: 'Seasons' },
  { key: 'about', label: 'About' },
  { key: 'favourites', label: 'Favourites' },
];

function ProfileMenus({ activeTab, setActiveTab }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-6">
      <button
        className="md:hidden flex items-center px-4 py-2 bg-gray-200 rounded"
        onClick={() => setOpen(!open)}
      >
        <FaBars className="mr-2" /> Menu
      </button>

      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-6 border-b border-gray-200 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`py-2 px-3 font-medium border-b-2 ${
              activeTab === item.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute z-10 bg-white border rounded w-40 mt-2 shadow">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileMenus;
