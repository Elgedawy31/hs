import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

function BlogSearch({ 
  searchQuery, 
  setSearchQuery, 
  categoryFilter, 
  setCategoryFilter, 
  sortBy, 
  setSortBy 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-placeholderText" />
        </div>
        <input
          type="text"
          placeholder="Search Articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-borderColor"
        />
      </div>
      
      <div className="flex gap-4">
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-lg bg-background border border-borderColor"
          >
            <option value="all">All Categories</option>
            <option value="Treatment Guides">Treatment Guides</option>
            <option value="Research Papers">Research Papers</option>
            <option value="Patient Education">Patient Education</option>
            <option value="Clinical Cases">Clinical Cases</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ArrowRight className="w-5 h-5 text-placeholderText rotate-90" />
          </div>
        </div>
        
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-lg bg-background border border-borderColor"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">Title (A-Z)</option>
            <option value="z-a">Title (Z-A)</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ArrowRight className="w-5 h-5 text-placeholderText rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSearch;
