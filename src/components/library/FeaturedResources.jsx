import React from 'react';
import { ArrowRight } from 'lucide-react';

function FeaturedResources() {
  const featuredResources = [
    {
      id: 1,
      category: 'SkinCare',
      title: 'Advanced Anti-Aging Treatments in 2025',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: '/src/assets/Images/arm.jpg'
    },
    {
      id: 2,
      category: 'Treatment',
      title: 'Latest Advances in Dermatological Procedures',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: '/src/assets/Images/Med2.jpg'
    },
    {
      id: 3,
      category: 'Research',
      title: 'Skincare Routines for Different Skin Types',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: '/src/assets/Images/Med3.jpg'
    }
  ];

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-8">Features Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredResources.map((resource) => (
          <div 
            key={resource.id} 
            className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-borderColor"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-primary mb-2 font-medium">
                {resource.category}
              </div>
              <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-placeholderText">
                  <span>{resource.author}</span>
                  <span className="mx-2">•</span>
                  <span>{resource.date}</span>
                </div>
                <a href="#" className="text-primary flex items-center font-medium text-sm hover:underline">
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedResources;
