import React from "react";

const VideoSection = () => {
  return (
    <div className="w-full h-screen bg-[#1a1a21] flex items-center justify-center">
      <div className="w-full max-w-[80%] h-[80%] relative">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/FEOISjC7BYM?autoplay=1&mute=1&loop=1&playlist=FEOISjC7BYM&controls=0"
          title="Car Repair Video"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoSection;
