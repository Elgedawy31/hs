import React from 'react';
import ProductCard from './ProductCard';
import NoDataMsg from '../NoDataMsg';
import { Filter } from 'lucide-react';

const ProductList = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <NoDataMsg 
        icon={Filter}
        title="No products found"
        description="No products match your current filter criteria"
        additionalMessage="Try adjusting your filters or clear them to see all products"
        iconBgColor="bg-[#F7F3E9]"
      />
    );
  }

  return (
    <div className="grid mb-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div 
          key={product.id || index} 
          data-aos="fade-up" 
          data-aos-delay={100 + (index * 50)} 
          data-aos-duration="800"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
