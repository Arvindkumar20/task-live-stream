import React, { forwardRef } from 'react';

const Video = forwardRef(({
  src, 
  className, 
  onPlay, 
  onPause, 
  onLoadedData, 
  onClick
}, ref) => {
  return (
    <video
      ref={ref}
      src={src}
      className={className}
      onPlay={onPlay}
      onPause={onPause}
      onLoadedData={onLoadedData}
      onClick={onClick}
      controls // Show native controls
      autoPlay // Automatically start playback
      muted // Required for autoplay in most browsers
      playsInline // For iOS support
      loop // Loop the video
    >
        <source  src={src}/>
        </video>
  );
});

export default Video;