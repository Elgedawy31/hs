import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Video, Download } from 'lucide-react';
import SEO from '../components/SEO';
import UniPagination from '../components/UniPagination';
import BlogHeader from '../components/blog/BlogHeader';
import BlogSearch from '../components/blog/BlogSearch';
import FeaturedArticles from '../components/blog/FeaturedArticles';
import RelatedResources from '../components/blog/RelatedResources';
import Newsletter from '../components/blog/Newsletter';
import BlogArticleList from '../components/blog/BlogArticleList';

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample featured articles data
  const featuredArticles = [
    {
      id: 1,
      category: 'Treatment Guides',
      title: 'Understanding the Impact of Sun Exposure on Skin Health',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: '/src/assets/Images/arm.jpg'
    },
    {
      id: 2,
      category: 'Research Papers',
      title: 'Advanced Acne Treatment Methods in 2025',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: '/src/assets/Images/Med2.jpg'
    },
    {
      id: 3,
      category: 'Patient Education',
      title: 'Breakthrough in Dermatological Research',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: '/src/assets/Images/Med3.jpg'
    }
  ];
  
  // Sample related resources data
  const relatedResources = [
    {
      id: 1,
      title: 'Skin Treatment Guide',
      description: 'Comprehensive guide for daily skin care routines',
      icon: <FileText className="w-8 h-8 text-primary" />,
      action: 'Download'
    },
    {
      id: 2,
      title: 'Treatment Procedures',
      description: 'Video series on common dermatological procedures',
      icon: <Video className="w-8 h-8 text-primary" />,
      action: 'Watch'
    },
    {
      id: 3,
      title: 'Research Papers',
      description: 'Latest dermatological research publications',
      icon: <FileText className="w-8 h-8 text-primary" />,
      action: 'Read'
    },
    {
      id: 4,
      title: 'Patient Resources',
      description: 'Forms and educational materials',
      icon: <Download className="w-8 h-8 text-primary" />,
      action: 'Download'
    }
  ];
  
  // Sample blog articles data (for pagination)
  const allArticles = [
    ...Array(12).fill(0).map((_, index) => ({
      id: index + 4,
      category: ['Treatment Guides', 'Research Papers', 'Patient Education', 'Clinical Cases'][index % 4],
      title: `Dermatology Article ${index + 4}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Dr. Lukas Weber',
      date: '12 April 2025',
      image: `/src/assets/Images/${['arm', 'Med2', 'Med3'][index % 3]}.jpg`
    }))
  ];
  
  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...allArticles];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(article => article.category === categoryFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        result = [...result].sort((a, b) => a.id - b.id);
        break;
      case 'a-z':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'recent':
      default:
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }
    
    return result;
  }, [allArticles, searchQuery, categoryFilter, sortBy]);
  
  // Pagination
  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage, articlesPerPage]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, sortBy]);
  
  return (
    <div className="bg-body">
      <SEO 
        title="HS - Healthcare Solutions - Blog"
        description="Expert insights and educational resources for healthy skin"
        keywords="dermatology blog, skin health, medical articles, healthcare news"
        ogImage="/src/assets/Images/logo.svg"
      />
      
      <div className="container mx-auto px-4 py-16" data-aos="fade-in">
        <BlogHeader data-aos="fade-up" data-aos-delay="200"/>
        
        <BlogSearch
          data-aos="fade-up" 
          data-aos-delay="300"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        <FeaturedArticles articles={featuredArticles} data-aos="fade-up" data-aos-delay="400"/>
        
        <RelatedResources resources={relatedResources} data-aos="fade-up" data-aos-delay="500"/>
        
        <Newsletter data-aos="fade-up" data-aos-delay="600"/>
        
        <BlogArticleList articles={paginatedArticles} data-aos="fade-up" data-aos-delay="700"/>
        
        <div className="flex justify-center">
          <UniPagination
            data-aos="zoom-in"
            data-aos-delay="800"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Blog;
