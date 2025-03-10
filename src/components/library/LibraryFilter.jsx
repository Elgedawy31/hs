import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Filter, X } from 'lucide-react';

const FilterSection = ({ title, children }) => {
  return (
    <div className="mb-8">
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

const LibraryFilter = ({ onFilterChange, currentFilters }) => {
  const { theme } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  
  // Use currentFilters directly instead of maintaining a separate state
  const filters = currentFilters || {
    resourceType: [],
    topics: [],
    languages: [],
    publicationDate: []
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

  const clearFilters = () => {
    const emptyFilters = {
      resourceType: [],
      topics: [],
      languages: [],
      publicationDate: []
    };
    
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };

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
          <FilterSection title="Resource Type">
            <FilterCheckbox 
              id="articles" 
              label="Articles" 
              checked={filters.resourceType.includes('articles')}
              onChange={() => handleCheckboxChange('resourceType', 'articles')}
            />
            <FilterCheckbox 
              id="videos" 
              label="Videos" 
              checked={filters.resourceType.includes('videos')}
              onChange={() => handleCheckboxChange('resourceType', 'videos')}
            />
            <FilterCheckbox 
              id="guides" 
              label="Guides" 
              checked={filters.resourceType.includes('guides')}
              onChange={() => handleCheckboxChange('resourceType', 'guides')}
            />
            <FilterCheckbox 
              id="research-papers" 
              label="Research Papers" 
              checked={filters.resourceType.includes('research-papers')}
              onChange={() => handleCheckboxChange('resourceType', 'research-papers')}
            />
          </FilterSection>

          <FilterSection title="Topics">
            <FilterCheckbox 
              id="eczema-dermatitis" 
              label="Eczema & Dermatitis" 
              checked={filters.topics.includes('eczema-dermatitis')}
              onChange={() => handleCheckboxChange('topics', 'eczema-dermatitis')}
            />
            <FilterCheckbox 
              id="acne-pimples" 
              label="Acne & Pimples" 
              checked={filters.topics.includes('acne-pimples')}
              onChange={() => handleCheckboxChange('topics', 'acne-pimples')}
            />
            <FilterCheckbox 
              id="scars-keloids" 
              label="Scars & Keloids" 
              checked={filters.topics.includes('scars-keloids')}
              onChange={() => handleCheckboxChange('topics', 'scars-keloids')}
            />
            <FilterCheckbox 
              id="vitiligo" 
              label="Vitiligo" 
              checked={filters.topics.includes('vitiligo')}
              onChange={() => handleCheckboxChange('topics', 'vitiligo')}
            />
          </FilterSection>

          <FilterSection title="Languages">
            <FilterCheckbox 
              id="arabic" 
              label="Arabic" 
              checked={filters.languages.includes('arabic')}
              onChange={() => handleCheckboxChange('languages', 'arabic')}
            />
            <FilterCheckbox 
              id="english" 
              label="English" 
              checked={filters.languages.includes('english')}
              onChange={() => handleCheckboxChange('languages', 'english')}
            />
            <FilterCheckbox 
              id="german" 
              label="German" 
              checked={filters.languages.includes('german')}
              onChange={() => handleCheckboxChange('languages', 'german')}
            />
            <FilterCheckbox 
              id="spanish" 
              label="Spanish" 
              checked={filters.languages.includes('spanish')}
              onChange={() => handleCheckboxChange('languages', 'spanish')}
            />
          </FilterSection>

          <FilterSection title="Publication Date">
            <FilterCheckbox 
              id="last-week" 
              label="Last Week" 
              checked={filters.publicationDate.includes('last-week')}
              onChange={() => handleCheckboxChange('publicationDate', 'last-week')}
            />
            <FilterCheckbox 
              id="last-month" 
              label="Last Month" 
              checked={filters.publicationDate.includes('last-month')}
              onChange={() => handleCheckboxChange('publicationDate', 'last-month')}
            />
            <FilterCheckbox 
              id="last-year" 
              label="Last Year" 
              checked={filters.publicationDate.includes('last-year')}
              onChange={() => handleCheckboxChange('publicationDate', 'last-year')}
            />
            <FilterCheckbox 
              id="all-time" 
              label="All Time" 
              checked={filters.publicationDate.includes('all-time')}
              onChange={() => handleCheckboxChange('publicationDate', 'all-time')}
            />
          </FilterSection>

          <div className="flex mt-6 space-x-2">
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

export default LibraryFilter;
