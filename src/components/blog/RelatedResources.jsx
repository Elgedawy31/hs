import React from 'react';
import { ArrowRight } from 'lucide-react';

function RelatedResources({ resources }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8">Related Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <div 
            key={resource.id} 
            className="bg-background rounded-lg p-6 border border-borderColor hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-altPrimary flex items-center justify-center">
                {resource.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">{resource.title}</h3>
            <p className="text-placeholderText text-sm text-center mb-4">{resource.description}</p>
            <div className="flex justify-center">
              <a href="#" className="text-primary flex items-center font-medium text-sm hover:underline">
                {resource.action} <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedResources;
