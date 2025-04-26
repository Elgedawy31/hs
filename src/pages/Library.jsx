import React, { useState, useEffect, useMemo } from 'react';
import LibraryHeader from '../components/library/LibraryHeader';
import LibraryGrid from '../components/library/LibraryGrid';
import FeaturedResources from '../components/library/FeaturedResources';
import LibraryFilter from '../components/library/LibraryFilter';
import LibrarySort from '../components/library/LibrarySort';
import LibraryTags from '../components/library/LibraryTags';
import ResourceList from '../components/library/ResourceList';
import UniPagination from '../components/UniPagination';
import SEO from '../components/SEO';

function Library() {
  // Sample resources data
  const sampleResources = [
    {
      id: 1,
      category: 'Skin Conditions',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'articles',
      topics: ['eczema-dermatitis'],
      language: 'english',
      publicationDate: 'last-week'
    },
    {
      id: 2,
      category: 'Skin Conditions2',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'articles',
      topics: ['eczema-dermatitis'],
      language: 'english',
      publicationDate: 'last-month'
    },
    {
      id: 3,
      category: 'Skin Conditions3',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'videos',
      topics: ['eczema-dermatitis'],
      language: 'arabic',
      publicationDate: 'last-year'
    },
    {
      id: 4,
      category: 'Skin Conditions4',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'guides',
      topics: ['acne-pimples'],
      language: 'english',
      publicationDate: 'last-week'
    },
    {
      id: 5,
      category: 'Skin Conditions5',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'research-papers',
      topics: ['vitiligo'],
      language: 'german',
      publicationDate: 'all-time'
    },
    {
      id: 6,
      category: 'Skin Conditions6',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'articles',
      topics: ['scars-keloids'],
      language: 'spanish',
      publicationDate: 'last-month'
    },
    {
      id: 7,
      category: 'Skin Conditions7',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'videos',
      topics: ['eczema-dermatitis'],
      language: 'english',
      publicationDate: 'last-week'
    },
    {
      id: 8,
      category: 'Skin Conditions',
      title: 'Understanding Different Types of Dermatitis',
      description: 'A comprehensive guide to identifying and treating various forms of dermatitis.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      type: 'guides',
      topics: ['acne-pimples'],
      language: 'arabic',
      publicationDate: 'last-year'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState({
    resourceType: [],
    topics: [],
    languages: [],
    publicationDate: []
  });
  const [filteredResources, setFilteredResources] = useState(sampleResources);
  const resourcesPerPage = 4;
  
  // Calculate paginated resources
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * resourcesPerPage;
    const endIndex = startIndex + resourcesPerPage;
    return filteredResources.slice(startIndex, endIndex);
  }, [filteredResources, currentPage, resourcesPerPage]);
  
  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update active tags based on filters
    const newTags = [
      ...newFilters.resourceType.map(type => {
        switch(type) {
          case 'articles': return 'Articles';
          case 'videos': return 'Videos';
          case 'guides': return 'Guides';
          case 'research-papers': return 'Research Papers';
          default: return type;
        }
      }),
      ...newFilters.topics.map(topic => {
        switch(topic) {
          case 'eczema-dermatitis': return 'Eczema & Dermatitis';
          case 'acne-pimples': return 'Acne & Pimples';
          case 'scars-keloids': return 'Scars & Keloids';
          case 'vitiligo': return 'Vitiligo';
          default: return topic;
        }
      }),
      ...newFilters.languages.map(lang => {
        switch(lang) {
          case 'arabic': return 'Arabic';
          case 'english': return 'English';
          case 'german': return 'German';
          case 'spanish': return 'Spanish';
          default: return lang;
        }
      }),
      ...newFilters.publicationDate.map(date => {
        switch(date) {
          case 'last-week': return 'Last Week';
          case 'last-month': return 'Last Month';
          case 'last-year': return 'Last Year';
          case 'all-time': return 'All Time';
          default: return date;
        }
      })
    ];
    
    setActiveTags(newTags);
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
    
    // Update filters based on removed tag
    const newFilters = { ...filters };
    
    // Check resource type
    if (['Articles', 'Videos', 'Guides', 'Research Papers'].includes(tagToRemove)) {
      const typeMap = {
        'Articles': 'articles',
        'Videos': 'videos',
        'Guides': 'guides',
        'Research Papers': 'research-papers'
      };
      const typeValue = typeMap[tagToRemove];
      if (newFilters.resourceType.includes(typeValue)) {
        newFilters.resourceType = newFilters.resourceType.filter(type => type !== typeValue);
      }
    }
    
    // Check topics
    if (['Eczema & Dermatitis', 'Acne & Pimples', 'Scars & Keloids', 'Vitiligo'].includes(tagToRemove)) {
      const topicMap = {
        'Eczema & Dermatitis': 'eczema-dermatitis',
        'Acne & Pimples': 'acne-pimples',
        'Scars & Keloids': 'scars-keloids',
        'Vitiligo': 'vitiligo'
      };
      const topicValue = topicMap[tagToRemove];
      if (newFilters.topics.includes(topicValue)) {
        newFilters.topics = newFilters.topics.filter(topic => topic !== topicValue);
      }
    }
    
    // Check languages
    if (['Arabic', 'English', 'German', 'Spanish'].includes(tagToRemove)) {
      const langMap = {
        'Arabic': 'arabic',
        'English': 'english',
        'German': 'german',
        'Spanish': 'spanish'
      };
      const langValue = langMap[tagToRemove];
      if (newFilters.languages.includes(langValue)) {
        newFilters.languages = newFilters.languages.filter(lang => lang !== langValue);
      }
    }
    
    // Check publication date
    if (['Last Week', 'Last Month', 'Last Year', 'All Time'].includes(tagToRemove)) {
      const dateMap = {
        'Last Week': 'last-week',
        'Last Month': 'last-month',
        'Last Year': 'last-year',
        'All Time': 'all-time'
      };
      const dateValue = dateMap[tagToRemove];
      if (newFilters.publicationDate.includes(dateValue)) {
        newFilters.publicationDate = newFilters.publicationDate.filter(date => date !== dateValue);
      }
    }
    
    setFilters(newFilters);
  };
  
  // Reset to first page when filters or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);
  
  // Filter and sort resources based on selected filters and sort option
  useEffect(() => {
    let result = sampleResources;
    
    // Filter by resource type
    if (filters.resourceType.length > 0) {
      result = result.filter(resource => 
        filters.resourceType.includes(resource.type)
      );
    }
    
    // Filter by topics
    if (filters.topics.length > 0) {
      result = result.filter(resource => 
        filters.topics.some(topic => resource.topics.includes(topic))
      );
    }
    
    // Filter by languages
    if (filters.languages.length > 0) {
      result = result.filter(resource => 
        filters.languages.includes(resource.language)
      );
    }
    
    // Filter by publication date
    if (filters.publicationDate.length > 0) {
      result = result.filter(resource => 
        filters.publicationDate.includes(resource.publicationDate)
      );
    }
    
    // Sort resources based on selected sort option
    switch (sortBy) {
      case 'oldest':
        result = [...result].sort((a, b) => a.id - b.id);
        break;
      case 'title-asc':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'latest':
      default:
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }
    
    setFilteredResources(result);
  }, [filters, sortBy]);
  
  return (
    <div className="bg-body">
      <SEO 
        title="HS - Healthcare Solutions - Library"
        description="Access our comprehensive library of healthcare resources, articles, and research papers."
        keywords="healthcare library, medical resources, health articles, dermatology research"
        ogImage="/src/assets/Images/logo.svg"
      />
      
      <div className="container mx-auto px-4 py-16" data-aos="fade-in">
        <LibraryHeader />
        <div className="my-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold mb-8">Resource Categories</h2>
          <LibraryGrid />
        </div>
        <FeaturedResources data-aos="fade-up" data-aos-delay="300"/>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="lg:w-1/4 w-full" data-aos="fade-right" data-aos-delay="400">
            <LibraryFilter 
              onFilterChange={handleFilterChange} 
              currentFilters={filters}
            />
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4 w-full" data-aos="fade-left" data-aos-delay="400">
            <LibrarySort
              data-aos="fade-down" 
              data-aos-delay="500"
              sortBy={sortBy}
              onSortChange={handleSortChange}
              totalResources={filteredResources.length}
            />
            
            {activeTags.length > 0 && (
              <LibraryTags 
                tags={activeTags} 
                onRemoveTag={handleRemoveTag} 
              />
            )}
            
            <ResourceList resources={paginatedResources} data-aos="fade-up" data-aos-delay="600"/>
            
            <UniPagination
              data-aos="zoom-in"
              data-aos-delay="700"
              currentPage={currentPage}
              totalPages={Math.ceil(filteredResources.length / resourcesPerPage)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        
       
      </div>
    </div>
  );
}

export default Library;
