import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Filter, X, Star } from 'lucide-react';

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

const ProductFilter = ({ onFilterChange }) => {
  const { theme } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filters, setFilters] = useState({
    skinType: [],
    productType: [],
    categories: [],
    rating: null,
    priceRange: { min: "", max: "" }
  });

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value];

      return {
        ...prevFilters,
        [category]: updatedCategory
      };
    });
  };

  const handleRatingChange = (rating) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      rating: prevFilters.rating === rating ? null : rating
    }));
  };

  const handlePriceChange = (type, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: {
        ...prevFilters.priceRange,
        [type]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      skinType: [],
      productType: [],
      categories: [],
      rating: null,
      priceRange: { min: "", max: "" }
    });
  };

  // Update parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

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
          <FilterSection title="Skin Type">
            <FilterCheckbox 
              id="dry" 
              label="Dry" 
              checked={filters.skinType.includes('dry')}
              onChange={() => handleCheckboxChange('skinType', 'dry')}
            />
            <FilterCheckbox 
              id="oily" 
              label="Oily" 
              checked={filters.skinType.includes('oily')}
              onChange={() => handleCheckboxChange('skinType', 'oily')}
            />
            <FilterCheckbox 
              id="sensitive" 
              label="Sensitive" 
              checked={filters.skinType.includes('sensitive')}
              onChange={() => handleCheckboxChange('skinType', 'sensitive')}
            />
            <FilterCheckbox 
              id="combination" 
              label="Combination" 
              checked={filters.skinType.includes('combination')}
              onChange={() => handleCheckboxChange('skinType', 'combination')}
            />
          </FilterSection>

          <FilterSection title="Product Type">
            <FilterCheckbox 
              id="cleanser" 
              label="Cleanser" 
              checked={filters.productType.includes('cleanser')}
              onChange={() => handleCheckboxChange('productType', 'cleanser')}
            />
            <FilterCheckbox 
              id="toner" 
              label="Toner" 
              checked={filters.productType.includes('toner')}
              onChange={() => handleCheckboxChange('productType', 'toner')}
            />
            <FilterCheckbox 
              id="serum" 
              label="Serum" 
              checked={filters.productType.includes('serum')}
              onChange={() => handleCheckboxChange('productType', 'serum')}
            />
            <FilterCheckbox 
              id="moisturizer" 
              label="Moisturizer" 
              checked={filters.productType.includes('moisturizer')}
              onChange={() => handleCheckboxChange('productType', 'moisturizer')}
            />
          </FilterSection>

          <FilterSection title="Categories">
            <FilterCheckbox 
              id="eczema" 
              label="Eczema & Dermatitis" 
              checked={filters.categories.includes('eczema')}
              onChange={() => handleCheckboxChange('categories', 'eczema')}
            />
            <FilterCheckbox 
              id="acne" 
              label="Acne & Pimples" 
              checked={filters.categories.includes('acne')}
              onChange={() => handleCheckboxChange('categories', 'acne')}
            />
            <FilterCheckbox 
              id="scars" 
              label="Scars & Keloids" 
              checked={filters.categories.includes('scars')}
              onChange={() => handleCheckboxChange('categories', 'scars')}
            />
            <FilterCheckbox 
              id="vitiligo" 
              label="Vitiligo" 
              checked={filters.categories.includes('vitiligo')}
              onChange={() => handleCheckboxChange('categories', 'vitiligo')}
            />
          </FilterSection>

          <FilterSection title="Rating">
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

          <FilterSection title="Price Range">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="px-4 py-1 border rounded text-sm w-full"
                style={{ borderColor: theme.borderColor }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="px-4 py-1 border rounded text-sm w-full"
                style={{ borderColor: theme.borderColor }}
              />
            </div>
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

export default ProductFilter;
