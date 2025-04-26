import React, { useState } from 'react';
import { Heart } from 'lucide-react';

function Favorites() {
  const [activeTab, setActiveTab] = useState('all');
  
  // Dummy data for favorites
  const favorites = [
    {
      id: 1,
      type: 'treatment',
      title: 'Microdermabrasion Treatment',
      description: 'Deep exfoliation for renewed skin texture',
      price: '180 LE',
      image: '/src/assets/Images/arm.jpg',
      time: '45 min ago',
      isFavorite: true
    },
    {
      id: 2,
      type: 'product',
      title: 'Hydrating Recovery Mask',
      description: 'Intensive moisture treatment for dry skin',
      price: '200 LE',
      image: '/src/assets/Images/Med2.jpg',
      time: '45 min ago',
      isFavorite: true
    },
    {
      id: 3,
      type: 'article',
      title: 'Understanding Adult Acne Treatment',
      description: 'Expert insights on managing adult acne',
      image: '/src/assets/Images/Med3.jpg',
      time: '45 min ago',
      isFavorite: true
    },
    {
      id: 4,
      type: 'product',
      title: 'Medical-Grade Retinol Serum',
      description: 'Professional strength anti-aging formula',
      price: '250 LE',
      image: '/src/assets/Images/Med2.jpg',
      time: '45 min ago',
      isFavorite: true
    },
    {
      id: 5,
      type: 'treatment',
      title: 'Acne Treatment Package',
      description: 'Comprehensive acne treatment program with proven results',
      price: '180 LE',
      image: '/src/assets/Images/Med3.jpg',
      time: '45 min ago',
      isFavorite: true
    },
    {
      id: 6,
      type: 'expert',
      title: 'Dr. Omar Abdelrahman',
      description: 'Expert in medical dermatology and skin cancer treatment',
      image: '/src/assets/Images/Omar.jpg',
      time: '45 min ago',
      isFavorite: true
    }
  ];

  // Filter favorites based on active tab
  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(item => item.type === activeTab.toLowerCase());

  // Toggle favorite status
  const toggleFavorite = (id) => {
    // In a real app, this would update state or call an API
    console.log(`Toggled favorite for item ${id}`);
  };

  // Render appropriate button based on item type
  const renderActionButton = (item) => {
    switch(item.type) {
      case 'treatment':
        return (
          <button className="px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors">
            Read More
          </button>
        );
      case 'product':
        return (
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors">
            Add To Cart
          </button>
        );
      case 'article':
        return (
          <button className="px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors">
            Read More
          </button>
        );
      case 'expert':
        return (
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors">
            Book Appointment
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" data-aos="fade-in">
      {/* Header */}
      <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
        <h1 className="text-3xl font-bold text-text">My Favorites</h1>
        <p className="text-placeholderText">Your saved treatments and services</p>
      </div>
      
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" data-aos="fade-up" data-aos-delay="300">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-altPrimary text-text hover:bg-primary hover:text-white'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('treatment')}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'treatment' 
              ? 'bg-primary text-white' 
              : 'bg-altPrimary text-text hover:bg-primary hover:text-white'
          }`}
        >
          Treatments
        </button>
        <button 
          onClick={() => setActiveTab('product')}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'product' 
              ? 'bg-primary text-white' 
              : 'bg-altPrimary text-text hover:bg-primary hover:text-white'
          }`}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('article')}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'article' 
              ? 'bg-primary text-white' 
              : 'bg-altPrimary text-text hover:bg-primary hover:text-white'
          }`}
        >
          Articles
        </button>
        <button 
          onClick={() => setActiveTab('expert')}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'expert' 
              ? 'bg-primary text-white' 
              : 'bg-altPrimary text-text hover:bg-primary hover:text-white'
          }`}
        >
          Experts
        </button>
      </div>
      
      {/* Favorites grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
        {filteredFavorites.map((item) => (
          <div key={item.id} className="bg-background rounded-lg overflow-hidden shadow-md relative" data-aos="fade-up" data-aos-delay={500 + (item.id * 50)}>
            {/* Favorite button */}
            <button 
              onClick={() => toggleFavorite(item.id)}
              className="absolute top-4 left-4 z-10"
            >
              <Heart 
                size={24} 
                className={`${item.isFavorite ? 'fill-primary text-primary' : 'text-white'}`} 
              />
            </button>
            
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-4">
              {/* Type label */}
              <div className="text-primary text-sm font-medium mb-2 capitalize">
                {item.type}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
              
              {/* Description */}
              <p className="text-placeholderText text-sm mb-3">{item.description}</p>
              
              {/* Price if applicable */}
              {item.price && (
                <p className="text-text font-bold mb-2">{item.price}</p>
              )}
              
              {/* Time */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-placeholderText text-sm">{item.time}</span>
                {renderActionButton(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredFavorites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-placeholderText text-lg">No favorites found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
