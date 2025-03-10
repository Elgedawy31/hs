import React from 'react';
import { ArrowRight } from 'lucide-react';
import NoDataMsg from '../NoDataMsg';
import { Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourceItem = ({ resource }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-background rounded-lg overflow-hidden border border-borderColor hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate(`/resource/${resource.id}`)}
    >
      <div className="p-6">
        <div className="text-primary mb-2 font-medium">
          {resource.category}
        </div>
        
        <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
        
        <p className="text-placeholderText mb-6 text-sm">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between">
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
  );
};

const ResourceList = ({ resources = [] }) => {
  if (!resources || resources.length === 0) {
    return (
      <NoDataMsg 
        icon={Filter}
        title="No resources found"
        description="No resources match your current filter criteria"
        additionalMessage="Try adjusting your filters or clear them to see all resources"
        iconBgColor="bg-[#F7F3E9]"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {resources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;
