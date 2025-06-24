// src/components/BlogGrid.tsx - Fixed version with safe tag handling
import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StoryblokStory } from '../types/storyblok';
import type { ArticleStoryblok } from '../types/storyblok';

interface BlogGridProps {
  initialArticles: (StoryblokStory & { content: ArticleStoryblok })[];
  categories: string[];
  currentPage: number;
  totalPages: number;
  total: number;
}

// Helper function to safely get tags as an array
function getTagsArray(tags: any): string[] {
  if (Array.isArray(tags)) {
    return tags.filter(tag => tag && typeof tag === 'string' && tag.trim()).map(tag => tag.trim());
  }
  
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
  
  return [];
}

function BlogGrid({ initialArticles, categories, currentPage: initialPage, totalPages: initialTotalPages, total }: BlogGridProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [showFilters, setShowFilters] = useState(false);
  
  const articlesPerPage = 12;

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = [...articles];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => 
        article.content.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article => {
        // Get tags safely as an array
        const tagsArray = getTagsArray(article.content.tags);
        
        return (
          article.content.title.toLowerCase().includes(searchLower) ||
          article.content.intro?.toLowerCase().includes(searchLower) ||
          article.content.category?.toLowerCase().includes(searchLower) ||
          tagsArray.some((tag: string) => tag.toLowerCase().includes(searchLower))
        );
      });
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / articlesPerPage));
  }, [searchTerm, selectedCategory, articles]);

  // Get articles for current page
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowFilters(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog grid
    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentArticles = getCurrentPageArticles();

  return (
    <div id="blog-grid" className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-secondary/30 sticky top-24 z-40">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-primary/50" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-secondary/50 text-primary rounded-lg border border-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
            />
          </div>

          {/* Category Filter - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-primary/70 text-sm font-medium mr-2">Category:</span>
            <div className="flex gap-2 flex-wrap">
              {['All', ...categories].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-secondary/50 text-primary hover:bg-secondary hover:text-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-secondary/50 text-primary px-4 py-3 rounded-lg border border-secondary hover:bg-secondary transition-colors"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden mt-4 pt-4 border-t border-secondary/30">
            <div className="space-y-3">
              <span className="text-primary/70 text-sm font-medium">Category:</span>
              <div className="flex gap-2 flex-wrap">
                {['All', ...categories].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-accent text-white'
                        : 'bg-secondary/50 text-primary hover:bg-secondary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="mt-4 pt-4 border-t border-secondary/30 flex items-center justify-between text-sm text-primary/60">
          <span>
            Showing {currentArticles.length} of {filteredArticles.length} articles
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article) => (
            <article
              key={article.uuid}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <a href={`/blog/${article.slug}`} className="block">
                {/* Article Image */}
                {article.content.image && article.content.image.filename ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`${article.content.image.filename}/m/400x250/smart`}
                      alt={article.content.image.alt || article.content.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <div className="text-accent/50">
                      <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  {article.content.category && (
                    <div className="mb-3">
                      <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                        {article.content.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {article.content.title}
                  </h3>

                  {/* Intro */}
                  {article.content.intro && (
                    <p className="text-primary/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.content.intro}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-primary/60 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(article.first_published_at)}
                      </span>
                      {article.content.author && (
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {article.content.author}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-accent text-sm font-medium group-hover:text-accent-light transition-colors duration-200">
                    Read Article
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-secondary/30 p-8 rounded-xl border border-secondary/50 inline-block">
            <Search size={48} className="text-primary/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No articles found</h3>
            <p className="text-primary/60 mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-accent text-white hover:bg-accent-light transition-colors px-6 py-2 rounded-lg font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1
                ? 'bg-secondary/30 text-primary/30 cursor-not-allowed'
                : 'bg-secondary text-primary hover:bg-accent hover:text-white'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === pageNum
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-primary hover:bg-accent hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-secondary/30 text-primary/30 cursor-not-allowed'
                : 'bg-secondary text-primary hover:bg-accent hover:text-white'
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogGrid;