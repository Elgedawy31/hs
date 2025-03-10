import React from 'react';

function ResourceCard({ icon, title, description, resourceCount }) {
  return (
    <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-borderColor">
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-placeholderText mb-4 flex-grow text-sm">{description}</p>
      <div className="text-primary text-sm font-medium">
        {resourceCount} resources
      </div>
    </div>
  );
}

export default ResourceCard;
