import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { deleteOverlay } from "../services/overlayApi";

const OverlayList = ({ overlays, onDelete, onEdit }) => {
  if (!overlays.length) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No overlays saved yet. Add one above 👆
      </p>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteOverlay(id);
      onDelete(id); // parent state update
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete overlay. Try again.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">🎨 Saved Overlays</h2>
      <ul className="space-y-3">
        {overlays.map((overlay) => (
          <li
            key={overlay._id}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <div>
              <p className="font-medium">{overlay.content}</p>
              <p className="text-xs text-gray-500">
                Position: ({overlay.position?.x}, {overlay.position?.y}) | Size:{" "}
                {overlay.size?.width}×{overlay.size?.height}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onEdit(overlay)}
                className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(overlay._id)}
                className="p-2 rounded-full hover:bg-red-100 text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverlayList;
