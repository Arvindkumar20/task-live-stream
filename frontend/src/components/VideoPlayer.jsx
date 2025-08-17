import React, { useRef } from "react";

const VideoPlayer = ({ url, overlays }) => {
  const videoRef = useRef(null);

  return (
    <div className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden">
      <video ref={videoRef} src={url} controls className="w-full h-full object-cover" />
      {overlays.map((overlay, idx) => (
        <div
          key={idx}
          className="absolute bg-white/70 text-black px-2 py-1 rounded"
          style={{
            top: overlay.position.y,
            left: overlay.position.x,
            width: overlay.size.width,
            height: overlay.size.height
          }}
        >
          {overlay.content}
        </div>
      ))}
    </div>
  );
};

export default VideoPlayer;
