import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const PhotoCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
      <div className={`relative ${isFullscreen ? "h-screen" : "h-[400px] md:h-[500px]"}`}>
        {/* Main Image */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className={`w-full h-full object-cover ${isFullscreen ? "object-contain" : ""}`}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
          aria-label="Next image"
        >
          <Icon name="ChevronRight" size={24} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none" aria-label={isFullscreen ?"Exit fullscreen" : "View fullscreen"}
        >
          <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {!isFullscreen && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 focus:outline-none ${
                index === currentIndex ? "border-primary-600" : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Close Button for Fullscreen */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none" aria-label="Close fullscreen"
        >
          <Icon name="X" size={24} />
        </button>
      )}
    </div>
  );
};

export default PhotoCarousel;