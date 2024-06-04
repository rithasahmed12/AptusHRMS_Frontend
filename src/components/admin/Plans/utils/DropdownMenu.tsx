// DropdownMenu.tsx
import React from "react";

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <button
        onClick={onEdit}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Delete
      </button>
    </div>
  );
};

export default DropdownMenu;
