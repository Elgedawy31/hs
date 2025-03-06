import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Filter, Star } from 'lucide-react';

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

const FilterCheckbox = ({ id, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

const StarRating = ({ stars }) => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center">
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

const ProductFilter = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-secondary bg-opacity-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button>
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <FilterSection title="Skin Type">
        <FilterCheckbox id="dry" label="Dry" />
        <FilterCheckbox id="oily" label="Oily" />
        <FilterCheckbox id="sensitive" label="Sensitive" />
        <FilterCheckbox id="combination" label="Combination" />
      </FilterSection>

      <FilterSection title="Product Type">
        <FilterCheckbox id="cleanser" label="Cleanser" />
        <FilterCheckbox id="toner" label="Toner" />
        <FilterCheckbox id="serum" label="Serum" />
        <FilterCheckbox id="moisturizer" label="Moisturizer" />
      </FilterSection>

      <FilterSection title="Categories">
        <FilterCheckbox id="eczema" label="Eczema & Dermatitis" />
        <FilterCheckbox id="acne" label="Acne & Pimples" />
        <FilterCheckbox id="scars" label="Scars & Keloids" />
        <FilterCheckbox id="vitiligo" label="Vitiligo" />
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-1">
          <StarRating stars={5} />
          <StarRating stars={4} />
          <StarRating stars={3} />
          <StarRating stars={2} />
          <StarRating stars={1} />
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex space-x-2">
          <button className="px-4 py-1 border border-gray-300 rounded text-sm">Max</button>
          <button className="px-4 py-1 border border-gray-300 rounded text-sm">Min</button>
        </div>
      </FilterSection>

      <button 
        className="w-full py-2 rounded text-white mt-6"
        style={{ backgroundColor: theme.primary }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;
