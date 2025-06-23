// src/components/RelatedArticles.tsx
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { StoryblokStory } from '../types/storyblok';
import type { ArticleStoryblok } from '../types/storyblok';

interface RelatedArticlesProps {
  articles: (StoryblokStory & { content: ArticleStoryblok })[];
}

function RelatedArticles({ articles }: RelatedArticlesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article
          key={article.uuid}
          className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <a href={`/blog/${article.slug}`} className="block" title={article.content.title}>
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
              <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                {article.content.title}
              </h3>

              {/* Intro */}
              {article.content.intro && (
                <p className="text-primary/70 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.content.intro}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-primary/60 mb-4">
                <div className="flex items-center gap-3">
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
  );
}

export default RelatedArticles;