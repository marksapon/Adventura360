/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ReferenceStrip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Import useNavigate hook
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Dummy image URLs
  const dummyImages = [
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    "/assets/Other/1.webp",
    // Add more image URLs as needed
  ];

  const images = dummyImages.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  // Function to handle the click event on the "Show Gallery" button
  const handleShowGalleryClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // If the gallery is currently open
      setSelectedImageIndex(null); // Reset selected image index
    }
  };
  // Function to handle the click event on the "Go to Landing Page" button
  const handleGoToLandingPageClick = () => {
    // Redirect to the landing page
    navigate("/"); // Replace "/landing-page" with your actual landing page route
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 w-auto">
      <div className="flex justify-center">
        <button
          className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded- inline-flex items-center"
          onClick={handleShowGalleryClick}
        >
          {isOpen ? "Hide Gallery" : "Show Gallery"}
        </button>
      </div>
      {isOpen && (
        <div className="bg-gray-200 w-full py-4 px-4 overflow-x-auto flex items-center">
          <div
            className={`w-full ${
              selectedImageIndex !== null ? "h-[60vh]" : "h-[12vh]"
            }`}
          >
            <style>
              {`
            .image-gallery-icon::before {
              font-size: 20px !important;
            }
            
            .image-gallery-slide .image-gallery-image {
              height: 450px !important;
            }
            .image-gallery-thumbnail {
              width: 200px !important; /* Adjust as needed */
              height: 100px !important; /* Adjust as needed */
          `}
            </style>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={selectedImageIndex}
              startIndex={selectedImageIndex}
              onThumbnailClick={(event, index) => setSelectedImageIndex(index)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferenceStrip;
