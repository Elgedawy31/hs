import React, { useState } from 'react';
import UniPagination from '../components/UniPagination';

const PaginationTest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-2xl font-bold mb-8">Pagination Test</h1>
      
      <div className="mb-8">
        <p className="text-center mb-2">Current Page: {currentPage}</p>
        <UniPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
      <div className="mb-8">
        <p className="text-center mb-2">Primary Color</p>
        <UniPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          color="primary"
        />
      </div>
      
      <div className="mb-8">
        <p className="text-center mb-2">Secondary Color</p>
        <UniPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          color="secondary"
        />
      </div>
      
      <div className="mb-8">
        <p className="text-center mb-2">Success Color</p>
        <UniPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          color="success"
        />
      </div>
      
      <div className="mb-8">
        <p className="text-center mb-2">Warning Color</p>
        <UniPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          color="warning"
        />
      </div>
      
      <div className="mb-8">
        <p className="text-center mb-2">Danger Color</p>
        <UniPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          color="danger"
        />
      </div>
    </div>
  );
};

export default PaginationTest;
