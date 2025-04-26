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
        return 'h-8 min-w-8 text-xs';
      case 'lg':
        return 'h-11 min-w-11 text-base';
      case 'md':
      default:
        return 'h-10 min-w-10 text-sm';
    }
  };
  
  // Get color-specific classes for active state
  const getActiveClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary border-primary';
      case 'secondary':
        return 'text-secondary border-secondary';
      case 'success':
        return 'text-success border-success';
      case 'warning':
        return 'text-warning border-warning';
      case 'danger':
        return 'text-danger border-danger';
      default:
        return 'text-primary border-primary';
    }
  };
  
  // Get color-specific classes for hover state
  const getHoverClasses = () => {
    switch (color) {
      case 'primary':
        return 'hover:text-primary hover:border-primary';
      case 'secondary':
        return 'hover:text-secondary hover:border-secondary';
      case 'success':
        return 'hover:text-success hover:border-success';
      case 'warning':
        return 'hover:text-warning hover:border-warning';
      case 'danger':
        return 'hover:text-danger hover:border-danger';
      default:
        return 'hover:text-primary hover:border-primary';
    }
  };
  
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <nav
      className={`flex items-center justify-center gap-2 py-2 ${className} overflow-hidden`}
      aria-label="Pagination"
      data-aos="zoom-in"
      data-aos-duration="800"
    >
      {/* Previous button */}
      {showControls && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            ${getSizeClasses()} 
            px-3 
            flex 
            items-center 
            justify-center 
            rounded-full 
            transition-all 
            duration-300 
            ${currentPage === 1 
              ? 'opacity-50 cursor-not-allowed bg-background' 
              : `${getHoverClasses()} hover:bg-background/80 active:scale-95`
            } 
            border 
            border-borderColor
            backdrop-blur-sm
          `}
          aria-label="Previous page"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <ChevronLeft size={18} className={currentPage === 1 ? 'text-text/50' : 'text-text'} />
        </button>
      )}
      
      {/* Page numbers */}
      <div className="flex items-center gap-1.5 px-1" data-aos="fade-up" data-aos-delay="200">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === 'DOTS') {
            return (
              <span 
                key={`dots-${index}`} 
                className={`
                  ${getSizeClasses()} 
                  flex 
                  items-center 
                  justify-center 
                  text-placeholderText
                  px-1
                `}
              >
                <MoreHorizontal size={18} className="opacity-70" />
              </span>
            );
          }
          
          const isActive = pageNumber === currentPage;
          
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`
                ${getSizeClasses()} 
                px-1.5 
                flex 
                items-center 
                justify-center 
                rounded-full 
                font-medium
                transition-all 
                duration-300 
                border
                ${isActive 
                  ? `${getActiveClasses()} bg-background shadow-sm scale-110` 
                  : `bg-background/80 backdrop-blur-sm text-text ${getHoverClasses()} border-borderColor hover:shadow-sm active:scale-95`
                }
              `}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      
      {/* Next button */}
      {showControls && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            ${getSizeClasses()} 
            px-3 
            flex 
            items-center 
            justify-center 
            rounded-full 
            transition-all 
            duration-300 
            ${currentPage === totalPages 
              ? 'opacity-50 cursor-not-allowed bg-background' 
              : `${getHoverClasses()} hover:bg-background/80 active:scale-95`
            } 
            border 
            border-borderColor
            backdrop-blur-sm
          `}
          aria-label="Next page"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <ChevronRight size={18} className={currentPage === totalPages ? 'text-text/50' : 'text-text'} />
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
