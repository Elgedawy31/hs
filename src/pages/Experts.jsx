import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import UniPagination from '../components/UniPagination';
import ExpertFilter from '../components/experts/ExpertFilter';
import ExpertSort from '../components/experts/ExpertSort';
import ExpertList from '../components/experts/ExpertList';
import ExpertSearch from '../components/experts/ExpertSearch';
import ExpertTags from '../components/experts/ExpertTags';

// Sample experts data
const sampleExperts = [
  {
    id: 1,
    name: 'Dr. Alejandro Gómez',
    image: '/src/assets/Images/doctor-1.svg',
    specializations: ['Surgical Dermatology', 'Medical Dermatology'],
    experience: 15,
    languages: ['Spanish'],
    availability: {
      nextAvailable: 'Fri, 6:00 PM',
      days: ['Monday', 'Friday']
    },
    rating: 5
  },
  {
    id: 2,
    name: 'Dr. Emily Watson',
    image: '/src/assets/Images/doctor-2.svg',
    specializations: ['Surgical Dermatology'],
    experience: 6,
    languages: ['English'],
    availability: {
      nextAvailable: 'Tomorrow, 11:00 AM',
      days: ['Tuesday', 'Thursday']
    },
    rating: 4
  },
  {
    id: 3,
    name: 'Dr. William Harris',
    image: '/src/assets/Images/doctor-3.svg',
    specializations: ['Surgical Dermatology'],
    experience: 8,
    languages: ['English', 'Spanish'],
    availability: {
      nextAvailable: 'Tomorrow, 11:00 AM',
      days: ['Wednesday', 'Friday']
    },
    rating: 5
  },
  {
    id: 4,
    name: 'Dr. Lukas Weber',
    image: '/src/assets/Images/doctor-1.svg',
    specializations: ['Pediatric Dermatology', 'Medical Dermatology'],
    experience: 11,
    languages: ['German'],
    availability: {
      nextAvailable: 'Tomorrow, 12:00 PM',
      days: ['Monday', 'Wednesday']
    },
    rating: 4
  },
  {
    id: 5,
    name: 'Dr. Mohamed Nabil',
    image: '/src/assets/Images/doctor-2.svg',
    specializations: ['Surgical Dermatology'],
    experience: 6,
    languages: ['German', 'Arabic'],
    availability: {
      nextAvailable: 'Tomorrow, 11:00 AM',
      days: ['Tuesday', 'Thursday']
    },
    rating: 3
  },
  {
    id: 6,
    name: 'Dr. Anna Schneider',
    image: '/src/assets/Images/doctor-3.svg',
    specializations: ['Surgical Dermatology'],
    experience: 6,
    languages: ['English', 'German'],
    availability: {
      nextAvailable: 'Tomorrow, 11:00 AM',
      days: ['Monday', 'Friday']
    },
    rating: 5
  },
  {
    id: 7,
    name: 'Dr. Sophia Anderson',
    image: '/src/assets/Images/doctor-1.svg',
    specializations: ['Cosmetic Dermatology', 'Pediatric Dermatology'],
    experience: 10,
    languages: ['English', 'Spanish'],
    availability: {
      nextAvailable: 'Today, 3:00 PM',
      days: ['Tuesday', 'Thursday']
    },
    rating: 4
  },
  {
    id: 8,
    name: 'Dr. Elena Vargas',
    image: '/src/assets/Images/doctor-2.svg',
    specializations: ['Surgical Dermatology'],
    experience: 6,
    languages: ['English', 'Spanish'],
    availability: {
      nextAvailable: 'Tomorrow, 11:00 AM',
      days: ['Wednesday', 'Friday']
    },
    rating: 4
  },
  {
    id: 9,
    name: 'Dr. Omar Abdelrahman',
    image: '/src/assets/Images/doctor-3.svg',
    specializations: ['Cosmetic Dermatology', 'Medical Dermatology'],
    experience: 7,
    languages: ['Arabic', 'English'],
    availability: {
      nextAvailable: 'Tomorrow, 3:15 PM',
      days: ['Monday', 'Wednesday']
    },
    rating: 5
  },
  {
    id: 90,
    name: 'Dr. Omar Abdelrahman',
    image: '/src/assets/Images/doctor-3.svg',
    specializations: ['Cosmetic Dermatology', 'Medical Dermatology'],
    experience: 7,
    languages: ['Arabic', 'English'],
    availability: {
      nextAvailable: 'Tomorrow, 3:15 PM',
      days: ['Monday', 'Wednesday']
    },
    rating: 5
  }
];

function Experts() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [activeTags, setActiveTags] = useState([]);
  const [filters, setFilters] = useState({
    specialization: [],
    experience: [],
    languages: [],
    availability: [],
    rating: null
  });
  const [filteredExperts, setFilteredExperts] = useState(sampleExperts);
  const expertsPerPage = 9;
  
  // Calculate paginated experts
  const paginatedExperts = useMemo(() => {
    const startIndex = (currentPage - 1) * expertsPerPage;
    const endIndex = startIndex + expertsPerPage;
    return filteredExperts.slice(startIndex, endIndex);
  }, [filteredExperts, currentPage, expertsPerPage]);
  
  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  
  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update active tags based on filters
    const newTags = [];
    
    // Add specialization tags
    newFilters.specialization.forEach(spec => {
      switch(spec) {
        case 'general': newTags.push('General Dermatology'); break;
        case 'cosmetic': newTags.push('Cosmetic Dermatology'); break;
        case 'medical': newTags.push('Medical Dermatology'); break;
        case 'surgical': newTags.push('Surgical Dermatology'); break;
        case 'pediatric': newTags.push('Pediatric Dermatology'); break;
      }
    });
    
    // Add experience tags
    newFilters.experience.forEach(exp => {
      switch(exp) {
        case '0-5': newTags.push('0-5 years'); break;
        case '5-10': newTags.push('5-10 years'); break;
        case '10+': newTags.push('10+ years'); break;
      }
    });
    
    // Add language tags
    newFilters.languages.forEach(lang => {
      switch(lang) {
        case 'arabic': newTags.push('Arabic'); break;
        case 'english': newTags.push('English'); break;
        case 'german': newTags.push('German'); break;
        case 'spanish': newTags.push('Spanish'); break;
      }
    });
    
    // Add availability tags
    newFilters.availability.forEach(avail => {
      switch(avail) {
        case 'this-week': newTags.push('This Week'); break;
        case 'next-week': newTags.push('Next Week'); break;
        case 'morning': newTags.push('Morning Hours'); break;
        case 'evening': newTags.push('Evening Hours'); break;
      }
    });
    
    // Add rating tag if present
    if (newFilters.rating) {
      newTags.push(`${newFilters.rating}+ Stars`);
    }
    
    setActiveTags(newTags);
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
    
    // Update filters based on removed tag
    const newFilters = { ...filters };
    
    // Check if the tag is a specialization
    if (tagToRemove === 'General Dermatology') newFilters.specialization = newFilters.specialization.filter(s => s !== 'general');
    if (tagToRemove === 'Cosmetic Dermatology') newFilters.specialization = newFilters.specialization.filter(s => s !== 'cosmetic');
    if (tagToRemove === 'Medical Dermatology') newFilters.specialization = newFilters.specialization.filter(s => s !== 'medical');
    if (tagToRemove === 'Surgical Dermatology') newFilters.specialization = newFilters.specialization.filter(s => s !== 'surgical');
    if (tagToRemove === 'Pediatric Dermatology') newFilters.specialization = newFilters.specialization.filter(s => s !== 'pediatric');
    
    // Check if the tag is an experience range
    if (tagToRemove === '0-5 years') newFilters.experience = newFilters.experience.filter(e => e !== '0-5');
    if (tagToRemove === '5-10 years') newFilters.experience = newFilters.experience.filter(e => e !== '5-10');
    if (tagToRemove === '10+ years') newFilters.experience = newFilters.experience.filter(e => e !== '10+');
    
    // Check if the tag is a language
    if (tagToRemove === 'Arabic') newFilters.languages = newFilters.languages.filter(l => l !== 'arabic');
    if (tagToRemove === 'English') newFilters.languages = newFilters.languages.filter(l => l !== 'english');
    if (tagToRemove === 'German') newFilters.languages = newFilters.languages.filter(l => l !== 'german');
    if (tagToRemove === 'Spanish') newFilters.languages = newFilters.languages.filter(l => l !== 'spanish');
    
    // Check if the tag is an availability option
    if (tagToRemove === 'This Week') newFilters.availability = newFilters.availability.filter(a => a !== 'this-week');
    if (tagToRemove === 'Next Week') newFilters.availability = newFilters.availability.filter(a => a !== 'next-week');
    if (tagToRemove === 'Morning Hours') newFilters.availability = newFilters.availability.filter(a => a !== 'morning');
    if (tagToRemove === 'Evening Hours') newFilters.availability = newFilters.availability.filter(a => a !== 'evening');
    
    // Check if the tag is a rating
    if (tagToRemove.includes('Stars')) {
      newFilters.rating = null;
    }
    
    setFilters(newFilters);
  };
  
  // Reset to first page when filters or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);
  
  // Filter and sort experts based on selected filters and sort option
  useEffect(() => {
    let result = sampleExperts;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(query) ||
        expert.specializations.some(spec => spec.toLowerCase().includes(query))
      );
    }
    
    // Filter by specialization
    if (filters.specialization.length > 0) {
      result = result.filter(expert => 
        filters.specialization.some(spec => {
          switch(spec) {
            case 'general': return expert.specializations.some(s => s.includes('General'));
            case 'cosmetic': return expert.specializations.some(s => s.includes('Cosmetic'));
            case 'medical': return expert.specializations.some(s => s.includes('Medical'));
            case 'surgical': return expert.specializations.some(s => s.includes('Surgical'));
            case 'pediatric': return expert.specializations.some(s => s.includes('Pediatric'));
            default: return false;
          }
        })
      );
    }
    
    // Filter by experience
    if (filters.experience.length > 0) {
      result = result.filter(expert => {
        return filters.experience.some(exp => {
          if (exp === '0-5') return expert.experience >= 0 && expert.experience <= 5;
          if (exp === '5-10') return expert.experience > 5 && expert.experience <= 10;
          if (exp === '10+') return expert.experience > 10;
          return false;
        });
      });
    }
    
    // Filter by languages
    if (filters.languages.length > 0) {
      result = result.filter(expert => 
        filters.languages.some(lang => {
          switch(lang) {
            case 'arabic': return expert.languages.includes('Arabic');
            case 'english': return expert.languages.includes('English');
            case 'german': return expert.languages.includes('German');
            case 'spanish': return expert.languages.includes('Spanish');
            default: return false;
          }
        })
      );
    }
    
    // Filter by availability
    if (filters.availability.length > 0) {
      // This is a simplified implementation
      // In a real app, you would have more complex availability filtering
      result = result.filter(expert => 
        filters.availability.some(avail => {
          if (avail === 'this-week') return expert.availability.nextAvailable.includes('Today') || 
                                           expert.availability.nextAvailable.includes('Tomorrow') ||
                                           expert.availability.nextAvailable.includes('Fri');
          if (avail === 'next-week') return !expert.availability.nextAvailable.includes('Today') && 
                                           !expert.availability.nextAvailable.includes('Tomorrow') &&
                                           !expert.availability.nextAvailable.includes('Fri');
          if (avail === 'morning') return expert.availability.nextAvailable.includes('AM');
          if (avail === 'evening') return expert.availability.nextAvailable.includes('PM');
          return false;
        })
      );
    }
    
    // Filter by rating
    if (filters.rating) {
      result = result.filter(expert => expert.rating >= filters.rating);
    }
    
    // Sort experts based on selected sort option
    switch (sortBy) {
      case 'experience-high':
        result = [...result].sort((a, b) => b.experience - a.experience);
        break;
      case 'experience-low':
        result = [...result].sort((a, b) => a.experience - b.experience);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recommended':
      default:
        // For 'recommended', we'll use a combination of rating and experience
        result = [...result].sort((a, b) => {
          const scoreA = a.rating * 2 + a.experience / 5;
          const scoreB = b.rating * 2 + b.experience / 5;
          return scoreB - scoreA;
        });
        break;
    }
    
    setFilteredExperts(result);
  }, [filters, sortBy, searchQuery]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="HS - Healthcare Solutions - Our Dermatology Experts"
        description="Find the right specialist for your skin concerns at HS Healthcare Solutions."
        keywords="dermatology, skin specialists, doctors, healthcare, appointments"
        ogImage="/src/assets/Images/logo.svg"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
          Our Dermatology Experts
        </h1>
        <p className="text-lg" style={{ color: theme.placeholderText }}>
          Find the right specialist for your skin concerns
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        {/* Search bar */}
        <ExpertSearch 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        {/* Sort dropdown */}
        <ExpertSort 
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalExperts={filteredExperts.length}
        />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="lg:w-1/4 w-full">
          <ExpertFilter 
            onFilterChange={handleFilterChange} 
            currentFilters={filters}
          />
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4 w-full">
          {activeTags.length > 0 && (
            <ExpertTags 
              tags={activeTags} 
              onRemoveTag={handleRemoveTag} 
            />
          )}
          
          <ExpertList experts={paginatedExperts} />
          
          <UniPagination 
            currentPage={currentPage}
            totalPages={Math.ceil(filteredExperts.length / expertsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Experts;
