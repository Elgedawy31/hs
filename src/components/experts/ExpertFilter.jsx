import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Filter, X, Star } from 'lucide-react';

const FilterSection = ({ title, children, delay = 0 }) => {
  return (
    <div className="mb-8" data-aos="fade-right" data-aos-delay={delay}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

const FilterCheckbox = ({ id, label, checked, onChange }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border rounded"
        style={{ 
          borderColor: theme.primary,
          accentColor: theme.primary
        }}
      />
      <label htmlFor={id} className="ml-2 text-sm">
        {label}
      </label>
    </div>
  );
};

const StarRating = ({ stars, selected, onClick }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={() => onClick(stars)}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < stars ? theme.primary : "none"}
          stroke={theme.primary}
        />
      ))}
    </div>
  );
};

const ExpertFilter = ({ onFilterChange, currentFilters }) => {
  const { theme } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  
  // Use currentFilters directly instead of maintaining a separate state
  const filters = currentFilters || {
    specialization: [],
    experience: [],
    languages: [],
    availability: [],
    rating: null
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxChange = (category, value) => {
    const updatedCategory = filters[category].includes(value)
      ? filters[category].filter(item => item !== value)
      : [...filters[category], value];

    const updatedFilters = {
      ...filters,
      [category]: updatedCategory
    };
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const handleRatingChange = (rating) => {
    const updatedFilters = {
      ...filters,
      rating: filters.rating === rating ? null : rating
    };
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const clearFilters = () => {
    const emptyFilters = {
      specialization: [],
      experience: [],
      languages: [],
      availability: [],
      rating: null
    };
    
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };

  // Filter options
  const specializationOptions = [
    { id: 'general', label: 'General Dermatology' },
    { id: 'cosmetic', label: 'Cosmetic Dermatology' },
    { id: 'medical', label: 'Medical Dermatology' },
    { id: 'surgical', label: 'Surgical Dermatology' },
    { id: 'pediatric', label: 'Pediatric Dermatology' }
  ];

  const experienceOptions = [
    { id: '0-5', label: '0-5 years' },
    { id: '5-10', label: '5-10 years' },
    { id: '10+', label: '10+ years' }
  ];

  const languageOptions = [
    { id: 'arabic', label: 'Arabic' },
    { id: 'english', label: 'English' },
    { id: 'german', label: 'German' },
    { id: 'spanish', label: 'Spanish' }
  ];

  const availabilityOptions = [
    { id: 'this-week', label: 'This Week' },
    { id: 'next-week', label: 'Next Week' },
    { id: 'morning', label: 'Morning Hours' },
    { id: 'evening', label: 'Evening Hours' }
  ];

  return (
    <div 
      className="p-6 rounded-lg"
      style={{ backgroundColor: theme.body }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button onClick={handleFilterToggle}>
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {isFilterOpen && (
        <>
          <FilterSection title="Specialization" delay={100}>
            {specializationOptions.map(option => (
              <FilterCheckbox 
                key={option.id}
                id={option.id}
                label={option.label}
                checked={filters.specialization.includes(option.id)}
                onChange={() => handleCheckboxChange('specialization', option.id)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Experience" delay={200}>
            {experienceOptions.map(option => (
              <FilterCheckbox 
                key={option.id}
                id={option.id}
                label={option.label}
                checked={filters.experience.includes(option.id)}
                onChange={() => handleCheckboxChange('experience', option.id)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Languages" delay={300}>
            {languageOptions.map(option => (
              <FilterCheckbox 
                key={option.id}
                id={option.id}
                label={option.label}
                checked={filters.languages.includes(option.id)}
                onChange={() => handleCheckboxChange('languages', option.id)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Availability" delay={400}>
            {availabilityOptions.map(option => (
              <FilterCheckbox 
                key={option.id}
                id={option.id}
                label={option.label}
                checked={filters.availability.includes(option.id)}
                onChange={() => handleCheckboxChange('availability', option.id)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Rating" delay={500}>
            <div className="space-y-1">
              <StarRating 
                stars={5} 
                selected={filters.rating === 5}
                onClick={handleRatingChange}
              />
              <StarRating 
                stars={4} 
                selected={filters.rating === 4}
                onClick={handleRatingChange}
              />
              <StarRating 
                stars={3} 
                selected={filters.rating === 3}
                onClick={handleRatingChange}
              />
              <StarRating 
                stars={2} 
                selected={filters.rating === 2}
                onClick={handleRatingChange}
              />
              <StarRating 
                stars={1} 
                selected={filters.rating === 1}
                onClick={handleRatingChange}
              />
            </div>
          </FilterSection>

          <div className="flex mt-6 space-x-2" data-aos="fade-up" data-aos-delay="600">
            <button 
              className="flex-1 py-2 rounded text-white"
              style={{ backgroundColor: theme.primary }}
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full border"
              style={{ borderColor: theme.borderColor }}
              onClick={handleFilterToggle}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpertFilter;
