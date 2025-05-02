import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';

// Service Card component with consistent theme
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { _id, name, description, duration, price, category, imageUrl1, imageUrl2, imageUrl3 } = service;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Theme colors for consistent styling
  const theme = {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#E0E0E0',
    lightGray: '#F5F5F5',
    mediumGray: '#BDBDBD',
    darkGray: '#424242'
  };

  // Filter out empty or invalid image URLs
  const images = [imageUrl1, imageUrl2, imageUrl3].filter(url => url && url.trim() !== '');
  // Default image as data URL
  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';

  // Navigate to booking page
  const handleBooking = () => {
    navigate(`/booking/${_id}`);
  };

  // Image carousel navigation handlers
  const nextImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = (e) => {
    // Prevent infinite loop by checking if the current src is already the default image
    if (e.target.src !== defaultImage) {
      setImageLoading(false);
      setImageError(true);
      e.target.src = defaultImage;
    }
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden"
      style={{
        border: `1px solid ${theme.mediumGray}`,
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = theme.primary;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = theme.mediumGray;
      }}
    >
      {/* Image Section */}
      <div className="relative h-56" style={{ backgroundColor: theme.lightGray }}>
        {/* Loading Spinner */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent" style={{ borderColor: theme.primary, borderTopColor: 'transparent' }}></div>
          </div>
        )}

        {/* Error State Overlay */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12" style={{ color: theme.mediumGray }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm" style={{ color: theme.darkGray }}>Image not available</p>
            </div>
          </div>
        )}

        <img
          src={images.length > 0 ? images[currentImageIndex] : defaultImage}
          alt={name}
          className="w-full h-full object-cover"
          style={{
            transition: 'all 0.3s ease',
            opacity: imageLoading ? 0 : 1,
            transform: !imageError ? 'scale(1.01)' : 'none' // Slightly larger to prevent white edges
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Category Tag */}
        {category && (
          <div 
            className="absolute top-3 left-3 z-10 px-2 py-1 rounded text-xs font-medium capitalize"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: theme.primary
            }}
          >
            {category}
          </div>
        )}
        
        {/* Price Tag */}
        <div 
          className="absolute top-3 right-3 z-10 px-2 py-1 rounded text-xs font-bold"
          style={{ 
            backgroundColor: theme.primary,
            color: theme.secondary
          }}
        >
          ${price}
        </div>
        
        {/* Image Navigation Arrows (only show if there are multiple valid images) */}
        {images.length > 1 && !imageError && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white'
              }}
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white'
              }}
            >
              <FaChevronRight className="w-3 h-3" />
            </button>
          </>
        )}

        {/* Image Dots Indicator (only show if there are multiple valid images) */}
        {images.length > 1 && !imageError && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-30 rounded-full px-2 py-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentImageIndex !== index) {
                    setImageLoading(true);
                    setCurrentImageIndex(index);
                  }
                }}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  transform: index === currentImageIndex ? 'scale(1.1)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: theme.primary }}
        >
          {name}
        </h3>

        {/* Description */}
        <p 
          className="text-sm mb-4 line-clamp-3 flex-grow"
          style={{ color: theme.darkGray }}
        >
          {description}
        </p>

        {/* Duration */}
        <div 
          className="flex items-center mb-4"
          style={{ color: theme.darkGray }}
        >
          <FaClock className="w-4 h-4 mr-2" />
          <span className="text-sm">{duration} min</span>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          className="w-full py-2 text-sm font-medium rounded transition-colors duration-200"
          style={{ 
            backgroundColor: theme.primary,
            color: theme.secondary,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme.darkGray;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;