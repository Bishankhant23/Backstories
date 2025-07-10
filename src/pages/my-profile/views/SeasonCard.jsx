import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeasonCard({ season, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit(season);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete(season._id);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    document.addEventListener("click",closeMenu)

    return () => {
        document.removeEventListener("click",closeMenu)
    }
  },[])

  const navigateToSeason = (e) => {
    const id = season._id;
    navigate(`/episodes/list/${id}`)

    
  }
 

  return (
    <div onClick={(e) => navigateToSeason(e)} className="relative cursor-pointer bg-white p-4 shadow rounded-lg hover:shadow-md transition group">
      {/* Context Menu Button */}
      <div className="absolute  top-2 right-2">
        <button
          onClick={toggleMenu}
          className="text-gray-600 cursor-pointer hover:text-black px-2 py-1 rounded-full"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white border shadow-lg rounded-md z-10">
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left text-red-600"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Season Info */}
      <h3 className="text-xl font-semibold mb-1">
        {season.name || `Season ${season.seasonNumber}`}
      </h3>
      <p className="text-sm text-gray-500 mb-2">Year: {season.year}</p>
      <p className="text-sm text-gray-700 line-clamp-3">
        {season.description || 'No description provided.'}
      </p>
    </div>
  );
}

export default SeasonCard;
