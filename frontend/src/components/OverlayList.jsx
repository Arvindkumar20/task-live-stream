import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { deleteOverlay } from "../services/overlayApi";

const OverlayList = ({ overlays, onDelete, onEdit }) => {
  if (!overlays.length) {
    return (
      <p className="text-gray-500 text-sm mt-6 text-center">
        ⚠️ No overlays saved yet. Add one above 👆
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
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-5 text-gray-800 text-center">
        🎨 Saved Overlays
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overlays.map((overlay) => {
          const {
            _id,
            content,
            position,
            size,
            design = {},
            createdAt,
          } = overlay;

          return (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between border border-gray-100"
            >
              {/* Preview Box */}
              <div
                className="rounded-lg flex items-center justify-center text-center mb-3"
                style={{
                  backgroundColor: design.showBg
                    ? design.bgColor + Math.round((design.bgOpacity / 100) * 255).toString(16).padStart(2, "0")
                    : "transparent",
                  color: design.textColor,
                  fontSize: `${design.fontSize || 18}px`,
                  width: size?.width,
                  height: size?.height,
                  minHeight: 40,
                }}
              >
                {content}
              </div>

              {/* Meta Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Position:</span> ({position?.x}%, {position?.y}%)
                </p>
                <p>
                  <span className="font-medium">Size:</span> {size?.width}×{size?.height}px
                </p>
                <p>
                  <span className="font-medium">Font:</span> {design.fontSize || 18}px
                </p>
                <p>
                  <span className="font-medium">Colors:</span>{" "}
                  <span style={{ color: design.textColor }}>Text</span>,{" "}
                  <span
                    style={{
                      backgroundColor: design.bgColor,
                      display: "inline-block",
                      width: "14px",
                      height: "14px",
                      borderRadius: "3px",
                    }}
                  />{" "}
                  Bg ({design.bgOpacity}%)
                </p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => onEdit(overlay)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverlayList;
