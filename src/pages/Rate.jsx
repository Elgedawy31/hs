import React, { useState } from 'react';
import { Star, ThumbsUp, Search, CheckCircle } from 'lucide-react';
import UniPagination from '../components/UniPagination';

function Rate() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('most-recent');
  const [treatmentFilter, setTreatmentFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Dummy data for reviews
  const allReviews = [
    {
      id: 1,
      patientName: 'Emily Davis',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'January 12, 2025',
      verified: true,
      treatment: 'Skin Consultation',
      title: 'Very thorough consultation',
      content: 'Comprehensive consultation with detailed treatment options. Appreciated the time taken to answer all my questions.',
      rating: 5,
      helpful: 30,
      userMarkedHelpful: false
    },
    {
      id: 2,
      patientName: 'Rachel T',
      patientImage: '/src/assets/Images/sofia.jpg',
      date: 'January 12, 2025',
      verified: true,
      treatment: 'Anti Aging',
      title: 'Exceptional care and amazing results',
      content: 'Dr. Thompson and the entire staff were incredibly professional and caring. The treatment exceeded my expectations, and the results are fantastic. The clinic is immaculate, and the whole experience was very comfortable.',
      rating: 5,
      helpful: 30,
      userMarkedHelpful: false
    },
    {
      id: 3,
      patientName: 'Jessica K',
      patientImage: '/src/assets/Images/mar.jpg',
      date: 'January 12, 2025',
      verified: true,
      treatment: 'Acne Treatment',
      title: 'Life-changing acne treatment',
      content: 'After struggling with acne for years, I finally found relief here. The personalized treatment plan and follow-up care were exceptional. My skin has never looked better!',
      rating: 4,
      helpful: 30,
      userMarkedHelpful: false
    },
    {
      id: 4,
      patientName: 'Michael Johnson',
      patientImage: '/src/assets/Images/kareem.jpg',
      date: 'January 10, 2025',
      verified: true,
      treatment: 'Skin Consultation',
      title: 'Professional and knowledgeable',
      content: 'The doctor was very knowledgeable and took the time to explain everything in detail. I felt very comfortable throughout the consultation.',
      rating: 5,
      helpful: 25,
      userMarkedHelpful: false
    },
    {
      id: 5,
      patientName: 'Sarah Williams',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'January 8, 2025',
      verified: true,
      treatment: 'Acne Treatment',
      title: 'Great improvement in my skin',
      content: "I've been struggling with acne for years and tried many treatments. This is the first one that has shown significant results. Very happy!",
      rating: 4,
      helpful: 18,
      userMarkedHelpful: false
    },
    {
      id: 6,
      patientName: 'David Brown',
      patientImage: '/src/assets/Images/Ahmed.jpg',
      date: 'January 5, 2025',
      verified: true,
      treatment: 'Anti Aging',
      title: 'Subtle but noticeable results',
      content: "I was looking for something that would give me natural-looking results, and that's exactly what I got. The staff was professional and the facility is top-notch.",
      rating: 5,
      helpful: 22,
      userMarkedHelpful: false
    },
    {
      id: 7,
      patientName: 'Jennifer Lee',
      patientImage: '/src/assets/Images/sofia.jpg',
      date: 'January 3, 2025',
      verified: true,
      treatment: 'Skin Consultation',
      title: 'Thorough and informative',
      content: 'The doctor took the time to listen to my concerns and provided detailed explanations about my skin condition and treatment options.',
      rating: 5,
      helpful: 15,
      userMarkedHelpful: false
    },
    {
      id: 8,
      patientName: 'Robert Miller',
      patientImage: '/src/assets/Images/karan.jpg',
      date: 'December 30, 2024',
      verified: true,
      treatment: 'Anti Aging',
      title: 'Worth every penny',
      content: "I was hesitant about the cost at first, but the results speak for themselves. My skin looks years younger, and the compliments I've received make it all worthwhile.",
      rating: 5,
      helpful: 28,
      userMarkedHelpful: false
    },
    {
      id: 9,
      patientName: 'Lisa Garcia',
      patientImage: '/src/assets/Images/mar.jpg',
      date: 'December 28, 2024',
      verified: true,
      treatment: 'Acne Treatment',
      title: 'Finally found something that works',
      content: 'After trying countless products and treatments, I finally found something that works for my stubborn acne. The staff is knowledgeable and supportive.',
      rating: 4,
      helpful: 20,
      userMarkedHelpful: false
    }
  ];

  // Filter and paginate reviews
  const filteredReviews = allReviews.filter(review => {
    // Filter by treatment
    if (treatmentFilter !== 'all' && review.treatment !== treatmentFilter) {
      return false;
    }
    
    // Filter by rating
    if (ratingFilter !== 'all' && review.rating !== parseInt(ratingFilter)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        review.patientName.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query) ||
        review.content.toLowerCase().includes(query) ||
        review.treatment.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'most-recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'highest-rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest-rating') {
      return a.rating - b.rating;
    } else if (sortBy === 'most-helpful') {
      return b.helpful - a.helpful;
    }
    return 0;
  });
  
  // Pagination
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of reviews
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle helpful button click
  const handleHelpfulClick = (reviewId) => {
    // In a real app, this would call an API to update the helpful count
    console.log(`Marked review ${reviewId} as helpful`);
  };
  
  // Handle submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (!reviewText.trim()) {
      alert('Please enter your review');
      return;
    }
    
    // In a real app, this would call an API to submit the review
    console.log('Submitted review:', {
      rating: userRating,
      text: reviewText
    });
    
    // Reset form
    setUserRating(0);
    setReviewText('');
    
    // Show success message
    alert('Thank you for your review!');
  };
  
  // Render star rating
  const renderStars = (rating, size = 20) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= rating
                ? 'text-primary fill-primary'
                : 'text-placeholderText'
            }`}
          />
        ))}
      </div>
    );
  };
  
  // Interactive star rating for review form
  const renderInteractiveStars = () => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setUserRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={`cursor-pointer ${
                (hoverRating || userRating) >= star
                  ? 'text-primary fill-primary'
                  : 'text-placeholderText'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-body">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text">Patient Reviews & Ratings</h1>
        <p className="text-placeholderText">Real experiences from our valued patients</p>
      </div>
      
      {/* Review submission form */}
      <div className="bg-background rounded-lg p-6 mb-8 border border-borderColor">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text mb-2">Share your Experience</h2>
            <p className="text-placeholderText mb-4">Help others make informed decisions about their care.</p>
            
            {/* Star rating */}
            <div className="mb-4">
              {renderInteractiveStars()}
            </div>
            
            {/* Review text */}
            <h3 className="text-text font-medium mb-2">Leave a Review</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write a review about your experience"
              className="w-full p-3 border border-borderColor rounded-lg bg-transparent text-text placeholder:text-placeholderText focus:outline-none focus:border-primary resize-none"
              rows={4}
            />
            
            {/* Submit buttons */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleSubmitReview}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Submit
              </button>
              <button 
                onClick={() => {
                  setUserRating(0);
                  setReviewText('');
                }}
                className="px-6 py-2 border border-borderColor text-text rounded-lg hover:bg-altPrimary transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          
          {/* Doctor info */}
          <div className="md:w-64 flex flex-col items-center">
            <img 
              src="/src/assets/Images/sofia.jpg" 
              alt="Dr. Sophia Anderson" 
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-text">Dr. Sophia Anderson</h3>
            <p className="text-placeholderText mb-2">Pediatric Dermatology</p>
            <div className="flex items-center">
              <Star size={16} className="text-primary fill-primary" />
              <span className="text-primary font-medium ml-1">4.5</span>
              <span className="text-placeholderText ml-1">(300 review)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-background border border-borderColor rounded-lg px-4 py-2 pr-8 text-text focus:outline-none focus:border-primary"
          >
            <option value="most-recent">Most Recent</option>
            <option value="highest-rating">Highest Rating</option>
            <option value="lowest-rating">Lowest Rating</option>
            <option value="most-helpful">Most Helpful</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        {/* Treatment filter */}
        <div className="relative">
          <select
            value={treatmentFilter}
            onChange={(e) => setTreatmentFilter(e.target.value)}
            className="appearance-none bg-background border border-borderColor rounded-lg px-4 py-2 pr-8 text-text focus:outline-none focus:border-primary"
          >
            <option value="all">All Treatments</option>
            <option value="Skin Consultation">Skin Consultation</option>
            <option value="Acne Treatment">Acne Treatment</option>
            <option value="Anti Aging">Anti Aging</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        {/* Rating filter */}
        <div className="relative">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="appearance-none bg-background border border-borderColor rounded-lg px-4 py-2 pr-8 text-text focus:outline-none focus:border-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Reviews..."
              className="w-full bg-background border border-borderColor rounded-lg pl-10 pr-4 py-2 text-text placeholder:text-placeholderText focus:outline-none focus:border-primary"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-placeholderText" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-6 mb-8">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <div key={review.id} className="border-b border-borderColor pb-6">
              <div className="flex items-start gap-4">
                {/* Patient image and info */}
                <div className="flex flex-col items-center">
                  <img 
                    src={review.patientImage} 
                    alt={review.patientName} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-text text-sm mt-1">{review.patientName}</p>
                  <p className="text-placeholderText text-xs">{review.date}</p>
                </div>
                
                {/* Review content */}
                <div className="flex-1">
                  {/* Verified badge */}
                  {review.verified && (
                    <div className="flex items-center text-primary text-sm mb-2">
                      <CheckCircle size={16} className="mr-1" />
                      <span>Verified Patient</span>
                    </div>
                  )}
                  
                  {/* Treatment tag */}
                  <div className="inline-block bg-altPrimary text-text text-xs px-3 py-1 rounded-full mb-2">
                    {review.treatment}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-text">{review.title}</h3>
                    {renderStars(review.rating)}
                  </div>
                  
                  {/* Review text */}
                  <p className="text-text mb-4">{review.content}</p>
                  
                  {/* Helpful button */}
                  <button 
                    onClick={() => handleHelpfulClick(review.id)}
                    className={`flex items-center gap-1 text-sm ${
                      review.userMarkedHelpful 
                        ? 'text-primary' 
                        : 'text-placeholderText hover:text-primary'
                    } transition-colors`}
                  >
                    <ThumbsUp size={16} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-placeholderText text-lg">No reviews found matching your filters.</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <UniPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
}

export default Rate;
