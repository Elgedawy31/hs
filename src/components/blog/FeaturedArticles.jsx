import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FeaturedArticles({ articles }) {
  const navigate = useNavigate();
  
  const handleArticleClick = (articleId) => {
    navigate(`/blog/${articleId}`);
  };
  
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-borderColor cursor-pointer"
            onClick={() => handleArticleClick(article.id)}
          >
            <div className="h-48 overflow-hidden">
              <img  draggable="false" 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-primary mb-2 font-medium">
                {article.category}
              </div>
              <h3 className="text-xl font-semibold mb-4">{article.title}</h3>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-placeholderText">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                </div>
                <a 
                  href="#" 
                  className="text-primary flex items-center font-medium text-sm hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(article.id);
                  }}
                >
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedArticles;
