import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const PhotosSection = ({ venueData, onChange }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // In a real app, you would upload these files to a server
    // Here we'll create object URLs for preview
    const newPhotos = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      isFeatured: false
    }));
    
    const updatedPhotos = [...(venueData.photos || []), ...newPhotos];
    
    // If this is the first photo, make it featured
    if (updatedPhotos.length === newPhotos.length) {
      updatedPhotos[0].isFeatured = true;
    }
    
    onChange('photos', updatedPhotos);
  };

  const handleRemovePhoto = (photoId) => {
    const updatedPhotos = venueData.photos.filter(photo => photo.id !== photoId);
    
    // If we removed the featured photo, make the first one featured
    if (venueData.photos.find(p => p.id === photoId)?.isFeatured && updatedPhotos.length > 0) {
      updatedPhotos[0].isFeatured = true;
    }
    
    onChange('photos', updatedPhotos);
  };

  const handleSetFeatured = (photoId) => {
    const updatedPhotos = venueData.photos.map(photo => ({
      ...photo,
      isFeatured: photo.id === photoId
    }));
    
    onChange('photos', updatedPhotos);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
    setIsDragging(true);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    if (draggedIndex !== index) {
      const newPhotos = [...venueData.photos];
      const draggedItem = newPhotos[draggedIndex];
      
      // Remove the dragged item
      newPhotos.splice(draggedIndex, 1);
      // Insert it at the new position
      newPhotos.splice(index, 0, draggedItem);
      
      onChange('photos', newPhotos);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setIsDragging(false);
  };

  return (
    <section id="photos" className="py-6 border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-h3 mb-2">Photos</h2>
        <p className="text-gray-600">
          Upload high-quality photos of your venue to attract more players
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Icon name="Image" size={40} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-h4 mb-2">Upload Venue Photos</h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop your photos here, or click to browse
          </p>
          
          <input
            type="file" id="photo-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label htmlFor="photo-upload" className="btn-primary cursor-pointer inline-block">
            <span>Select Photos</span>
          </label>
          
          <p className="mt-4 text-xs text-gray-500">
            Recommended: Upload at least 5 photos. Max 10MB per image. Formats: JPG, PNG.
          </p>
        </div>
        
        {/* Photo Gallery */}
        {venueData.photos && venueData.photos.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-h4">Gallery ({venueData.photos.length} photos)</h3>
              <p className="text-sm text-gray-600">Drag to reorder</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {venueData.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`relative rounded-lg overflow-hidden border ${
                    photo.isFeatured ? 'border-primary-500' : 'border-gray-200' } ${isDragging && draggedIndex === index ?'opacity-50' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <Image
                      src={photo.url}
                      alt={photo.name || `Venue photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSetFeatured(photo.id)}
                        className={`p-1.5 rounded-full ${
                          photo.isFeatured ? 'bg-primary-600 text-white' : 'bg-white text-gray-800'
                        }`}
                        title={photo.isFeatured ? 'Featured Photo' : 'Set as Featured'}
                      >
                        <Icon name="Star" size={16} />
                      </button>
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="p-1.5 rounded-full bg-white text-gray-800" title="Remove Photo"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {photo.isFeatured && (
                    <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Photo Tips */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-h4 mb-3">Photo Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <Icon name="Check" size={16} className="text-primary-600 mr-2 mt-0.5" />
              <span>Include photos of the pitch, facilities, and surrounding area</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={16} className="text-primary-600 mr-2 mt-0.5" />
              <span>Take photos in good lighting conditions (preferably daytime)</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={16} className="text-primary-600 mr-2 mt-0.5" />
              <span>Show your venue from different angles</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={16} className="text-primary-600 mr-2 mt-0.5" />
              <span>Highlight special features like floodlights, seating areas, etc.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PhotosSection;