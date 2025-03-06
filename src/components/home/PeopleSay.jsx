import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';

// Import user images
import user1 from '../../assets/Images/user-1.svg';
import user2 from '../../assets/Images/user-2.svg';
import user3 from '../../assets/Images/user-3.svg';
import { Star } from 'lucide-react';

function PeopleSay() {
  const { theme } = useTheme();

  const testimonials = [
    {
      id: 1,
      image: user1,
      name: 'Ahmed Mahmoud',
      review: 'The best dermatology clinic I\'ve ever visited! The doctors are highly professional, and the treatment really transformed my skin. Highly recommended!'
    },
    {
      id: 2,
      image: user2,
      name: 'Eman Essam',
      review: 'I was struggling with eczema for years, I finally found relief. The doctor was compassionate and prescribed an effective treatment that worked within days. I\'m so grateful for their help!'
    },
    {
      id: 3,
      image: user3,
      name: 'Salah Ahmed',
      review: 'The dermatologist was very experienced and made me feel at ease. The skin treatment I received was practical and effective. Definitely the best clinic I\'ve been to!'
    }
  ];

  // Function to render stars using Lucide React
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        fill="#FFD700" 
        color="#FFD700"
      />
    ));
  };

  return (
    <section className="mb-16 px-4">
      <UniHeading title="What Our Patients Say" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="flex flex-col p-6 rounded-lg shadow-md"
            style={{ 
              backgroundColor: theme.altPrimary,
              border: `1px solid ${theme.borderColor}`
            }}
          >
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 
                  className="text-2xl font-medium mb-1"
                  style={{ 
                    color: theme.text,
                    fontFamily: 'Montaga, serif'
                  }}
                >
                  {testimonial.name}
                </h3>
                <div className="flex">
                  {renderStars()}
                </div>
              </div>
            </div>
            
            <p 
              className="text-base leading-relaxed"
              style={{ color: theme.text }}
            >
              {testimonial.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PeopleSay;
