import React from 'react';
import BlogArticle from './BlogArticle';
import NoDataMsg from '../NoDataMsg';
import { Search } from 'lucide-react';

function BlogArticleList({ articles = [] }) {
  if (!articles || articles.length === 0) {
    return (
      <NoDataMsg 
        icon={Search}
        title="No articles found"
        description="No articles match your search criteria"
        additionalMessage="Try adjusting your search or browse our featured articles"
        iconBgColor="bg-[#F7F3E9]"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {articles.map((article) => (
        <BlogArticle key={article.id} article={article} />
      ))}
    </div>
  );
}

export default BlogArticleList;
