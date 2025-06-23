// src/components/BlogNavigation.tsx
import { useState, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

interface BlogNavigationProps {
  categories: string[];
  currentCategory?: string;
}

function BlogNavigation({ categories, currentCategory }: BlogNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const formatCategoryUrl = (category: string) => {
    return `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-secondary/20 sticky top-20 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Blog Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-lg">
              <BookOpen size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="font-bold text-primary">Blog</h2>
              <p className="text-xs text-primary/60">Insights & Perspectives</p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="/blog"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                !currentCategory 
                  ? 'bg-accent text-white' 
                  : 'text-primary hover:text-accent hover:bg-accent/10'
              }`}
            >
              All Articles
            </a>

            {categories.slice(0, 4).map((category) => (
              <a
                key={category}
                href={formatCategoryUrl(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentCategory === category
                    ? 'bg-accent text-white'
                    : 'text-primary hover:text-accent hover:bg-accent/10'
                }`}
              >
                {category}
              </a>
            ))}

            {categories.length > 4 && (
              <div data-dropdown className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-primary hover:text-accent hover:bg-accent/10 transition-all duration-200"
                >
                  More
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-secondary/20 overflow-hidden z-50">
                    <div className="py-2">
                      {categories.slice(4).map((category) => (
                        <a
                          key={category}
                          href={formatCategoryUrl(category)}
                          className={`block px-4 py-2 font-medium transition-all duration-200 ${
                            currentCategory === category
                              ? 'bg-accent text-white'
                              : 'text-primary hover:text-accent hover:bg-accent/10'
                          }`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden" data-dropdown>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-primary hover:text-accent hover:bg-accent/10 transition-all duration-200"
            >
              Categories
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-4 mt-2 w-64 bg-white rounded-lg shadow-xl border border-secondary/20 overflow-hidden z-50">
                <div className="py-2">
                  <a 
                    href="/blog"
                    className={`block px-4 py-2 font-medium transition-all duration-200 ${
                      !currentCategory 
                        ? 'bg-accent text-white' 
                        : 'text-primary hover:text-accent hover:bg-accent/10'
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    All Articles
                  </a>

                  {categories.map((category) => (
                    <a
                      key={category}
                      href={formatCategoryUrl(category)}
                      className={`block px-4 py-2 font-medium transition-all duration-200 ${
                        currentCategory === category
                          ? 'bg-accent text-white'
                          : 'text-primary hover:text-accent hover:bg-accent/10'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BlogNavigation;