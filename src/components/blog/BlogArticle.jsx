import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BlogArticle({ article }) {
  const navigate = useNavigate();
  
  const handleArticleClick = () => {
    navigate(`/blog/${article.id}`);
  };
  
  return (
    <div 
      className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-borderColor cursor-pointer"
      onClick={handleArticleClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-primary mb-2 font-medium">
          {article.category}
        </div>
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-placeholderText mb-4 text-sm">{article.description}</p>
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
              handleArticleClick();
            }}
          >
            Read More <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogArticle;
