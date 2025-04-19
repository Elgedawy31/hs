import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Import user images
import Ahmed from '../../assets/Images/Ahmed.jpg';
import Amira from '../../assets/Images/Amira.jpg';
import Karan from '../../assets/Images/karan.jpg';
import Kareem from '../../assets/Images/kareem.jpg';
import Mar from '../../assets/Images/mar.jpg';
import Omar from '../../assets/Images/Omar.jpg';
import Sofia from '../../assets/Images/sofia.jpg';

function PeopleSay() {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // 'prev' or 'next'
  const [key, setKey] = useState(0); // Used to force re-render of avatar row

  const testimonials = [
    {
      id: 1,
      image: Ahmed,
      name: 'Ahmed Mahmoud',
      title: 'The Best Dermatologist I\'ve Found!',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      rating: 5.0,
      status: 'Happy Customer'
    },
    {
      id: 2,
      image: Amira,
      name: 'Amira Hassan',
      title: 'Amazing Results for My Skin!',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      rating: 4.8,
      status: 'Loyal Patient'
    },
    {
      id: 3,
      image: Sofia,
      name: 'Bessie Cooper',
      title: 'The Best Thing I\'ve Used for My Skin!',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      rating: 5.0,
      status: 'Happy Customer'
    },
    {
      id: 4,
      image: Karan,
      name: 'Karan Patel',
      title: 'Transformed My Skincare Routine',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      rating: 4.9,
      status: 'Regular Client'
    },
    {
      id: 5,
      image: Omar,
      name: 'Omar Farooq',
      title: 'Exceptional Service and Results',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      rating: 4.7,
      status: 'New Customer'
    }
  ];

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    
    // Force re-render of avatar row with new key
    setKey(prevKey => prevKey + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    
    // Force re-render of avatar row with new key
    setKey(prevKey => prevKey + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === activeIndex) return;
    
    // Determine direction based on index
    const newDirection = index > activeIndex ? 'next' : 'prev';
    setDirection(newDirection);
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Force re-render of avatar row with new key
    setKey(prevKey => prevKey + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 500);
  };

  // Function to render stars using Lucide React
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={24} 
        fill="#FFD700" 
        color="#FFD700"
      />
    ));
  };

  // Calculate indices for the avatar display
  const getAvatarIndices = () => {
    const totalTestimonials = testimonials.length;
    const indices = [];
    
    // Always include 5 avatars if possible
    for (let i = -2; i <= 2; i++) {
      let index = (activeIndex + i + totalTestimonials) % totalTestimonials;
      indices.push(index);
    }
    
    return indices;
  };

  const avatarIndices = getAvatarIndices();

  // Get animation class based on direction
  const getAnimationClass = () => {
    if (!direction) return '';
    return direction === 'next' ? 'slide-next' : 'slide-prev';
  };

  return (
    <section className="mb-16 px-4 py-12 relative overflow-hidden">
      <style jsx="true">{`
        @keyframes slideInNext {
          from { transform: translate(20px, -50%); opacity: 0; }
          to { transform: translate(-50%, -50%); opacity: 1; }
        }
        
        @keyframes slideOutNext {
          from { transform: translate(-50%, -50%); opacity: 1; }
          to { transform: translate(-120px, -50%); opacity: 0; }
        }
        
        @keyframes slideInPrev {
          from { transform: translate(-120px, -50%); opacity: 0; }
          to { transform: translate(-50%, -50%); opacity: 1; }
        }
        
        @keyframes slideOutPrev {
          from { transform: translate(-50%, -50%); opacity: 1; }
          to { transform: translate(20px, -50%); opacity: 0; }
        }
        
        .slide-next .avatar-entering {
          animation: slideInNext 0.5s forwards;
        }
        
        .slide-next .avatar-exiting {
          animation: slideOutNext 0.5s forwards;
        }
        
        .slide-prev .avatar-entering {
          animation: slideInPrev 0.5s forwards;
        }
        
        .slide-prev .avatar-exiting {
          animation: slideOutPrev 0.5s forwards;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        {/* Avatar row */}
        <div className={`h-[120px] mb-12 relative ${getAnimationClass()}`} key={key}>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            {avatarIndices.map((index, i) => {
              const isActive = index === activeIndex;
              const position = i - 2; // -2, -1, 0, 1, 2
              
              // Determine if this avatar is entering or exiting
              let animationClass = '';
              if (direction) {
                if (direction === 'next' && i === 4) animationClass = 'avatar-entering';
                if (direction === 'next' && i === 0) animationClass = 'avatar-exiting';
                if (direction === 'prev' && i === 0) animationClass = 'avatar-entering';
                if (direction === 'prev' && i === 4) animationClass = 'avatar-exiting';
              }
              
              return (
                <div 
                  key={`${index}-${i}`}
                  className={`transition-all duration-500 ease-in-out cursor-pointer absolute ${
                    isActive ? 'z-10' : 'z-0'
                  } ${animationClass}`}
                  style={{
                    width: isActive ? '100px' : '60px',
                    height: isActive ? '100px' : '60px',
                    left: `calc(50% + ${position * 70}px)`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleDotClick(index)}
                >
                  <img
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    className="rounded-full object-cover w-full h-full border-2 border-white shadow-md transition-all duration-500"
                    style={{
                      opacity: isActive ? 1 : 0.7,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial content */}
        <div className="text-center relative">
          <div 
            className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ color: theme.text }}
            >
              {testimonials[activeIndex].title}
            </h2>
            
            <p 
              className="text-lg mb-6 max-w-2xl mx-auto"
              style={{ color: theme.textSecondary }}
            >
              {testimonials[activeIndex].review}
            </p>
            
            <div className="flex justify-center items-center mb-2">
              {renderStars(testimonials[activeIndex].rating)}
              <span 
                className="ml-2 text-xl font-bold"
                style={{ color: theme.text }}
              >
                {testimonials[activeIndex].rating.toFixed(1)}
              </span>
            </div>
            
            <h3 
              className="text-2xl font-semibold"
              style={{ color: theme.text }}
            >
              {testimonials[activeIndex].name}
            </h3>
            
            <p 
              className="text-md"
              style={{ color: theme.textSecondary }}
            >
              {testimonials[activeIndex].status}
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -mt-6">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: theme.primary,
              color: 'white'
            }}
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: '#2D5A3C',
              color: 'white'
            }}
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PeopleSay;
