import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import OverlayEditor from "../components/OverlayEditor";
import OverlayList from "../components/OverlayList";
import {
  getOverlays,
  createOverlay,
  updateOverlay,
} from "../services/overlayApi";
const videoUrl = import.meta.env.VITE_STREAM_URL;

const LandingPage = () => {
  const [overlays, setOverlays] = useState([]);
  const [editingOverlay, setEditingOverlay] = useState(null);
   // change to RTSP proxy if needed

  // load overlays on mount
  useEffect(() => {
    getOverlays().then(setOverlays);
  }, []);

  // save new overlay
  const handleSaveOverlay = async (overlay) => {
    if (editingOverlay) {
      // update existing overlay
      const updated = await updateOverlay(editingOverlay._id, overlay);
      setOverlays(
        overlays.map((o) => (o._id === editingOverlay._id ? updated : o))
      );
      setEditingOverlay(null);
    } else {
      // create new overlay
      const newOverlay = await createOverlay(overlay);
      setOverlays([...overlays, newOverlay]);
    }
  };

  // cancel edit
  const handleCancelEdit = () => setEditingOverlay(null);

  return (
    <div className="p-4 my-10">
      <h1 className="text-xl font-bold mb-4">📺 Live Stream with Overlays</h1>

      {/* Video Player */}
      <VideoPlayer url={videoUrl} overlays={overlays} />

      {/* Overlay Editor */}
      <OverlayEditor
        onSave={handleSaveOverlay}
        editingOverlay={editingOverlay}
        onCancel={handleCancelEdit}
      />

      {/* Overlay List */}
      <OverlayList
        overlays={overlays}
        onDelete={(id) =>
          setOverlays(overlays.filter((o) => o._id !== id))
        }
        onEdit={(overlay) => setEditingOverlay(overlay)}
      />
    </div>
  );
};

export default LandingPage;
