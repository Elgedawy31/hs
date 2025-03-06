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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id || index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
