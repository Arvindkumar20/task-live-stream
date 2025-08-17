import React, { useRef, useState, useEffect } from "react";
import Video from "./Video";

const VideoPlayer = ({ url, overlays }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const controlsTimeoutRef = useRef(null);

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Handle mouse movement for showing controls
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Handle video loaded
  const handleLoadedData = () => {
    setVideoReady(true);
  };

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Function to convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Parse r, g, b values
    let r, g, b;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      return `rgba(255, 255, 255, ${opacity})`; // fallback to white
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div
      className="relative w-full bg-black rounded-xl overflow-hidden shadow-xl"
      onMouseMove={handleMouseMove}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Video element */}
      <Video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={handleLoadedData}
        onClick={togglePlay}
      />

      {/* Loading overlay */}
      {!videoReady && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="text-white hover:text-blue-300 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime -= 10;
                }
              }}
              className="text-white hover:text-blue-300 transition-colors"
              aria-label="Rewind 10 seconds"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime += 10;
                }
              }}
              className="text-white hover:text-blue-300 transition-colors"
              aria-label="Forward 10 seconds"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </button>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-300 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mt-2 w-full h-1 bg-gray-600 rounded-full overflow-hidden">
          {videoRef.current && (
            <div
              className="h-full bg-blue-500"
              style={{
                width: `${
                  (videoRef.current.currentTime / videoRef.current.duration) *
                  100
                }%`,
              }}
            />
          )}
        </div>
      </div>

      {/* Overlays */}
      {overlays.map((overlay, idx) => {
        // Calculate background color with opacity
        const bgWithOpacity = hexToRgba(
          overlay.design?.bgColor || "#ffffff",
          (overlay.design?.bgOpacity || 80) / 100
        );

        return (
          <div
            key={overlay._id || idx}
            className={`absolute transition-transform duration-200 rounded-lg ${
              activeOverlay === idx
                ? "ring-2 ring-blue-400 z-10 scale-105"
                : "z-0"
            }`}
            style={{
              top: `${overlay.position.y}%`,
              left: `${overlay.position.x}%`,
              width: `${overlay.size.width}px`,
              height: `${overlay.size.height}px`,
              cursor: "move",
              transform: "translate(-50%, -50%)",
              backgroundColor: overlay.design?.showBg
                ? bgWithOpacity
                : "transparent",
              color: overlay.design?.textColor || "#000000",
              fontSize: `${overlay.design?.fontSize || 18}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              textAlign: "center",
              fontWeight: "500",
            }}
            onClick={() => setActiveOverlay(idx === activeOverlay ? null : idx)}
            onMouseEnter={() => setActiveOverlay(idx)}
            onMouseLeave={() => setActiveOverlay(null)}
          >
            <p className="break-words w-full">{overlay.content}</p>

            {/* Overlay badge */}
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {idx + 1}
            </div>
          </div>
        );
      })}

      {/* Active overlay indicator */}
      {activeOverlay !== null && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg shadow-lg text-sm">
          Editing Overlay #{activeOverlay + 1}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
