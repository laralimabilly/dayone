// src/components/BlogSearchResults.tsx - Fixed version with safe tag handling
import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, ArrowRight, X } from 'lucide-react';
import type { StoryblokStory } from '../types/storyblok';
import type { ArticleStoryblok } from '../types/storyblok';

interface BlogSearchResultsProps {
  articles: (StoryblokStory & { content: ArticleStoryblok })[];
  categories: string[];
  initialQuery?: string;
  initialCategory?: string;
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

function BlogSearchResults({ articles, categories, initialQuery = '', initialCategory = '' }: BlogSearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchResults, setSearchResults] = useState<typeof articles>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Perform search
  useEffect(() => {
    setIsSearching(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      let filtered = [...articles];

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(article => {
          // Get tags safely as an array
          const tagsArray = getTagsArray(article.content.tags);
          
          return (
            article.content.title.toLowerCase().includes(query) ||
            article.content.intro?.toLowerCase().includes(query) ||
            article.content.category?.toLowerCase().includes(query) ||
            article.content.author?.toLowerCase().includes(query) ||
            tagsArray.some((tag: string) => tag.toLowerCase().includes(query))
          );
        });
      }

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(article => 
          article.content.category === selectedCategory
        );
      }

      // Sort by relevance (if there's a search query) or date
      if (searchQuery.trim()) {
        filtered.sort((a, b) => {
          const query = searchQuery.toLowerCase();
          const aTitle = a.content.title.toLowerCase();
          const bTitle = b.content.title.toLowerCase();
          
          // Prioritize title matches
          const aTitleMatch = aTitle.includes(query) ? 1 : 0;
          const bTitleMatch = bTitle.includes(query) ? 1 : 0;
          
          if (aTitleMatch !== bTitleMatch) {
            return bTitleMatch - aTitleMatch;
          }
          
          // Then sort by date
          return new Date(b.first_published_at).getTime() - new Date(a.first_published_at).getTime();
        });
      } else {
        // Just sort by date if no search query
        filtered.sort((a, b) => 
          new Date(b.first_published_at).getTime() - new Date(a.first_published_at).getTime()
        );
      }

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, articles]);

  // Update URL when search changes
  useEffect(() => {
    const url = new URL(window.location.href);
    
    if (searchQuery.trim()) {
      url.searchParams.set('q', searchQuery);
    } else {
      url.searchParams.delete('q');
    }
    
    if (selectedCategory !== 'All') {
      url.searchParams.set('category', selectedCategory);
    } else {
      url.searchParams.delete('category');
    }
    
    // Update URL without page reload
    window.history.replaceState({}, '', url.toString());
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent font-medium">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <section id="search" className="space-y-8">
      {/* Search Interface */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-secondary/30 sticky top-24 z-40">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-primary/50" />
          </div>
          <input
            type="text"
            placeholder="Search articles, topics, authors..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-12 py-4 bg-secondary/50 text-primary rounded-lg border border-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/50 hover:text-accent transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-primary/70 text-sm font-medium">Filter by category:</span>
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

        {/* Active Filters & Results Count */}
        <div className="mt-4 pt-4 border-t border-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary/60">
              {isSearching ? 'Searching...' : `${searchResults.length} results found`}
            </span>
            
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={clearSearch}
                className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1"
              >
                <X size={14} />
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="space-y-6">
          {searchResults.map((article) => (
            <article
              key={article.uuid}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-secondary/20"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Article Image */}
                {article.content.image && article.content.image.filename && (
                  <div className="lg:w-1/4 flex-shrink-0">
                    <div className="aspect-video lg:aspect-square overflow-hidden rounded-lg">
                      <img
                        src={`${article.content.image.filename}/m/300x200/smart`}
                        alt={article.content.image.alt || article.content.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="flex-1">
                  {/* Category & Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    {article.content.category && (
                      <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                        {article.content.category}
                      </span>
                    )}
                    <div className="flex items-center gap-3 text-xs text-primary/60">
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

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 hover:text-accent transition-colors duration-200">
                    <a href={`/blog/${article.slug}`}>
                      {highlightText(article.content.title, searchQuery)}
                    </a>
                  </h3>

                  {/* Intro */}
                  {article.content.intro && (
                    <p className="text-primary/70 leading-relaxed mb-4">
                      {highlightText(article.content.intro.substring(0, 200) + '...', searchQuery)}
                    </p>
                  )}

                  {/* Tags */}
                  {article.content.tags && getTagsArray(article.content.tags).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getTagsArray(article.content.tags).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="bg-secondary/50 text-primary px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <a 
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-accent hover:text-accent-light transition-colors duration-200 font-medium"
                  >
                    Read Full Article
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-secondary/30 inline-block max-w-md">
            <Search size={64} className="text-primary/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No results found</h3>
            <p className="text-primary/60 mb-4">
              {searchQuery 
                ? `We couldn't find any articles matching "${searchQuery}"`
                : 'Try entering a search term to find relevant articles'
              }
            </p>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={clearSearch}
                className="bg-accent text-white hover:bg-accent-light transition-colors px-6 py-2 rounded-lg font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default BlogSearchResults;