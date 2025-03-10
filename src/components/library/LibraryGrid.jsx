import React from 'react';
import ResourceCard from './ResourceCard';
import { ClipboardList, BookOpen, FileText, Flag } from 'lucide-react';

function LibraryGrid() {
  const resourceCategories = [
    {
      id: 1,
      icon: <ClipboardList className="w-6 h-6 text-primary" />,
      title: "Skin Conditions",
      description: "Comprehensive guides on various skin conditions",
      resourceCount: 80
    },
    {
      id: 2,
      icon: <Flag className="w-6 h-6 text-primary" />,
      title: "Treatment Guides",
      description: "Step-by-step treatment protocols and guidelines",
      resourceCount: 80
    },
    {
      id: 3,
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Patient Education",
      description: "Educational materials for better understanding",
      resourceCount: 98
    },
    {
      id: 4,
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "Research Papers",
      description: "Latest dermatological research and findings",
      resourceCount: 240
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {resourceCategories.map((category) => (
        <ResourceCard
          key={category.id}
          icon={category.icon}
          title={category.title}
          description={category.description}
          resourceCount={category.resourceCount}
        />
      ))}
    </div>
  );
}

export default LibraryGrid;
