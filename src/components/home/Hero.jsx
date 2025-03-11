import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import hero1 from '../../assets/Images/hero-1.svg';
import hero2 from '../../assets/Images/hero-2.svg';
import { Star } from 'lucide-react';
import UniHeading from '../UniHeading';

function Hero() {
  const { theme } = useTheme();
  
  // Features data array
  const features = [
    {
      id: 1,
      title: "Experienced Dermatologist",
      icon: <Star size={20} strokeWidth={2} />
    },
    {
      id: 2,
      title: "Advanced Technology",
      icon: <Star size={20} strokeWidth={2} />
    },
    {
      id: 3,
      title: "Personalized Treatment",
      icon: <Star size={20} strokeWidth={2} />
    },
    {
      id: 4,
      title: "10+ Years Experiences",
      icon: <Star size={20} strokeWidth={2} />
    }
  ];
  
  return (
    <div className="py-2 md:py-4">
      {/* Hero Images */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
        <div className="w-full md:w-1/2">
          <img  draggable="false" 
            src={hero1} 
            alt="Skin treatment procedure" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <img  draggable="false" 
            src={hero2} 
            alt="Dermatology examination" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      
      {/* Hero title */}
      <div className="max-w-3xl mx-auto mb-6">
        <p 
          className="text-center text-lg md:text-2xl"
          style={{ color: theme.text ,
            fontFamily: 'Montaga, serif'

           }}
        >
        Glow with Confidence , Your  Skin is our care
        </p>
      </div>
      
      {/* Hero Description */}
      <div className="max-w-3xl mx-auto mb-12">
        <p 
          className="text-center text-sm md:text-lg"
          style={{ color: theme.placeholderText ,
            fontFamily: 'Montaga, serif'

          }}
        >
          At Dermatology Clinic , we believe that healthy skin is the key to
          confidence. Our expert dermatologists provide advanced treatments
          and personalized care to help you achieve radiant, flawless skin.
        </p>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center">
            <div 
              className="mr-3 flex-shrink-0"
              style={{ color: theme.primary }}
            >
              {feature.icon}
            </div>
            <h3 
              className="text-lg font-semibold"
              style={{ color: theme.text, textShadow: '0px 8px 4px rgba(0, 0, 0, 0.25)' }}
            >
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
