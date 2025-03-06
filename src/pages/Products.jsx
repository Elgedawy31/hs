import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import ProductFilter from '../components/products/ProductFilter';
import ProductList from '../components/products/ProductList';
import ProductSort from '../components/products/ProductSort';
import ProductTags from '../components/products/ProductTags';
import UniPagination from '../components/UniPagination';

// Sample product data with unique IDs
const sampleProducts = [
  {
    id: 1,
    name: 'Body Firming Solution',
    category: 'Moisturizer',
    description: 'Activate, tone, and glow - the skincare essential you need',
    image: '/src/assets/Images/products-1.svg',
    rating: 4,
    price: 650,
    skinType: ['dry', 'sensitive'],
    productType: ['moisturizer'],
    categories: ['eczema']
  },
  {
    id: 2,
    name: 'Body Firming Solution',
    category: 'Toner',
    description: 'Deep hydration with advanced peptide complex',
    image: '/src/assets/Images/products-2.svg',
    rating: 5,
    price: 300,
    skinType: ['oily', 'combination'],
    productType: ['toner'],
    categories: ['acne']
  },
  {
    id: 3,
    name: 'Hydrating Toner',
    category: 'Toner',
    description: 'Clean, fresh, and refresh - gentle care for sensitive skin',
    image: '/src/assets/Images/products-3.svg',
    rating: 5,
    price: 700,
    skinType: ['sensitive'],
    productType: ['toner'],
    categories: ['eczema', 'vitiligo']
  },
  {
    id: 4,
    name: 'Colloidal Oatmeal Cream',
    category: 'Serum',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 4,
    price: 580,
    skinType: ['dry', 'sensitive'],
    productType: ['serum'],
    categories: ['eczema']
  },
  {
    id: 5,
    name: 'Psoralen-Based Cream',
    category: 'Serum',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-2.svg',
    rating: 4,
    price: 430,
    skinType: ['all'],
    productType: ['serum'],
    categories: ['vitiligo']
  },
  {
    id: 6,
    name: 'Acne Spot Treatment',
    category: 'SunScreen',
    description: 'Fast-acting blemish solution',
    image: '/src/assets/Images/products-3.svg',
    rating: 3,
    price: 1000,
    skinType: ['oily', 'combination'],
    productType: ['cleanser'],
    categories: ['acne']
  },
  {
    id: 7,
    name: 'Cooling Anti-Itch Spray',
    category: 'Moisturizer',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 3,
    price: 290,
    skinType: ['sensitive'],
    productType: ['moisturizer'],
    categories: ['eczema']
  },
  {
    id: 8,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-2.svg',
    rating: 3,
    price: 800,
    skinType: ['all'],
    productType: ['cleanser'],
    categories: ['vitiligo']
  },
  {
    id: 9,
    name: 'Coconut Oil with Turmeric',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-3.svg',
    rating: 3,
    price: 400,
    skinType: ['dry'],
    productType: ['cleanser'],
    categories: ['scars']
  },
  {
    id: 10,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 3,
    price: 800,
    skinType: ['all'],
    productType: ['cleanser'],
    categories: ['vitiligo']
  },
  {
    id: 11,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 3,
    price: 800,
    skinType: ['all'],
    productType: ['cleanser'],
    categories: ['vitiligo']
  },
  {
    id: 12,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 3,
    price: 800,
    skinType: ['all'],
    productType: ['cleanser'],
    categories: ['vitiligo']
  },
  {
    id: 13,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-2.svg',
    rating: 3,
    price: 800,
    skinType: ['all'],
    productType: ['cleanser'],
    categories: ['vitiligo']
  },
  {
    id: 14,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 3,
    price: 800,
    skinType: ['all'],
    productType: ['cleanser'],
    categories: ['vitiligo']
  }
];

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState({
    skinType: [],
    productType: [],
    categories: [],
    rating: null,
    priceRange: { min: "", max: "" }
  });
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const productsPerPage = 6;
  
  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);
  
  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };
  
  // Handle filter changes from ProductFilter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update active tags based on filters
    const newTags = [
      ...newFilters.skinType,
      ...newFilters.productType,
      ...newFilters.categories,
      ...(newFilters.rating ? [`${newFilters.rating} Stars`] : [])
    ];
    
    setActiveTags(newTags);
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
    
    // Update filters based on removed tag
    const newFilters = { ...filters };
    
    // Check if the tag is a skin type
    if (newFilters.skinType.includes(tagToRemove)) {
      newFilters.skinType = newFilters.skinType.filter(type => type !== tagToRemove);
    }
    
    // Check if the tag is a product type
    if (newFilters.productType.includes(tagToRemove)) {
      newFilters.productType = newFilters.productType.filter(type => type !== tagToRemove);
    }
    
    // Check if the tag is a category
    if (newFilters.categories.includes(tagToRemove)) {
      newFilters.categories = newFilters.categories.filter(category => category !== tagToRemove);
    }
    
    // Check if the tag is a rating
    if (tagToRemove.includes('Stars')) {
      newFilters.rating = null;
    }
    
    setFilters(newFilters);
  };
  
  // Reset to first page when filters or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);
  
  // Filter and sort products based on selected filters and sort option
  useEffect(() => {
    let result = sampleProducts;
    
    // Filter by skin type
    if (filters.skinType.length > 0) {
      result = result.filter(product => 
        filters.skinType.some(type => 
          product.skinType.includes(type) || product.skinType.includes('all')
        )
      );
    }
    
    // Filter by product type
    if (filters.productType.length > 0) {
      result = result.filter(product => 
        filters.productType.some(type => product.productType.includes(type))
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.some(category => product.categories.includes(category))
      );
    }
    
    // Filter by rating
    if (filters.rating) {
      result = result.filter(product => Math.floor(product.rating) === filters.rating);
    }
    
    // Filter by price range
    if (filters.priceRange.min || filters.priceRange.max) {
      const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
      const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
      
      result = result.filter(product => product.price >= min && product.price <= max);
    }
    
    // Sort products based on selected sort option
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'latest':
      default:
        // For 'latest', we'll use the ID as a proxy for recency (higher ID = more recent)
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, sortBy]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="HS - Healthcare Solutions - Products"
        description="HS provides innovative healthcare solutions and products to improve your health and wellbeing."
        keywords="healthcare, medical solutions, health products, doctors, wellness"
        ogImage="/src/assets/Images/logo.svg"
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="lg:w-1/4 w-full">
          <ProductFilter 
            onFilterChange={handleFilterChange} 
            currentFilters={filters}
          />
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4 w-full">
          <ProductSort 
            sortBy={sortBy}
            onSortChange={handleSortChange}
            totalProducts={filteredProducts.length}
          />
          
          {activeTags.length > 0 && (
            <ProductTags 
              tags={activeTags} 
              onRemoveTag={handleRemoveTag} 
            />
          )}
          
          <ProductList products={paginatedProducts} />
          
          <UniPagination 
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
