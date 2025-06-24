// src/components/BlogPreview.tsx
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import type { StoryblokStory } from '../types/storyblok';
import type { ArticleStoryblok } from '../types/storyblok';

interface BlogPreviewProps {
  articles: (StoryblokStory & { content: ArticleStoryblok })[];
}

function BlogPreview({ articles }: BlogPreviewProps) {
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
    <section id="blog-featured" className="py-16 lg:py-24 bg-light folder-mask">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen size={16} />
            Latest Insights
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">
            From Our Blog
          </h2>
          
          <p className="text-lg text-primary/80 max-w-2xl mx-auto leading-relaxed">
            Stay ahead with the latest trends in executive search, leadership development, 
            and digital transformation strategies.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.slice(0, 3).map((article) => (
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
                      <BookOpen size={48} />
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

        {/* View All CTA */}
        <div className="text-center">
          <a 
            href="/blog" 
            className="inline-flex items-center gap-3 bg-accent text-white hover:bg-white hover:text-dark transition-colors px-8 py-4 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <BookOpen size={20} />
            View All Articles
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default BlogPreview;