import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const UniPagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  showControls = true,
  isCompact = true,
  className = '',
  size = 'md',
  color = 'primary',
}) => {
  // Calculate the range of pages to display
  const paginationRange = useMemo(() => {
    const siblingCount = isCompact ? 1 : 2;
    const totalPageNumbers = siblingCount + 5; // siblings + first + last + current + 2 ellipses
    
    // Case 1: If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    // Case 2: No left dots to show, but right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'DOTS', totalPages];
    }
    
    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, 'DOTS', ...rightRange];
    }
    
    // Case 4: Both left and right dots to be shown
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, 'DOTS', ...middleRange, 'DOTS', totalPages];
  }, [currentPage, totalPages, isCompact]);
  
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-7 min-w-7 text-xs';
      case 'lg':
        return 'h-10 min-w-10 text-base';
      case 'md':
      default:
        return 'h-9 min-w-9 text-sm';
    }
  };
  
  // Get color-specific classes
  const getColorClasses = (isActive) => {
    if (isActive) {
      switch (color) {
        case 'primary':
          return 'bg-primary text-white';
        case 'secondary':
          return 'bg-secondary text-white';
        case 'success':
          return 'bg-success text-white';
        case 'warning':
          return 'bg-warning text-white';
        case 'danger':
          return 'bg-danger text-white';
        default:
          return 'bg-primary text-white';
      }
    }
    return 'bg-transparent text-text hover:text-primary';
  };
  
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
      {/* Previous button */}
      {showControls && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${getSizeClasses()} px-2 flex items-center justify-center rounded-md transition-all duration-300 transform ${
            currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 hover:shadow-md'
          } border border-borderColor`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} className='text-text' />
        </button>
      )}
      
      {/* Page numbers */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return (
            <span 
              key={`dots-${index}`} 
              className={`${getSizeClasses()} flex items-center justify-center text-placeholderText`}
            >
              <MoreHorizontal size={16} />
            </span>
          );
        }
        
        const isActive = pageNumber === currentPage;
        
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`${getSizeClasses()} px-2 flex items-center justify-center rounded-md transition-all duration-300 transform ${
              isActive 
                ? `${getColorClasses(true)} shadow-md` 
                : `${getColorClasses(false)} border border-borderColor hover:scale-105 hover:shadow-md`
            }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </button>
        );
      })}
      
      {/* Next button */}
      {showControls && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${getSizeClasses()} px-2 flex items-center justify-center rounded-md transition-all duration-300 transform ${
            currentPage === totalPages 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 hover:shadow-md'
          } border border-borderColor`}
          aria-label="Next page"
        >
          <ChevronRight size={16} className='text-text' />
        </button>
      )}
    </nav>
  );
};

UniPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  showControls: PropTypes.bool,
  isCompact: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger'])
};

export default UniPagination;
