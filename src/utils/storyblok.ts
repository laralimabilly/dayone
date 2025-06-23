// src/utils/storyblok.ts
import { useStoryblokApi } from '@storyblok/astro';
import type { 
  StoryblokResponse, 
  StoryblokStoriesResponse, 
  ArticleStoryblok,
  StoryblokStory 
} from '../types/storyblok';

// Get single story by slug
export async function getStoryBySlug(slug: string, version: 'draft' | 'published' = 'published') {
  const storyblokApi = useStoryblokApi();
  
  try {
    const response = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: version,
      resolve_links: 'url',
      resolve_relations: ['article.author'],
    });
    
    return response.data as StoryblokResponse;
  } catch (error) {
    console.error(`Error fetching story with slug "${slug}":`, error);
    return null;
  }
}

// Get all blog articles
export async function getBlogArticles(params: {
  page?: number;
  per_page?: number;
  featured?: boolean;
  category?: string;
  tag?: string;
  version?: 'draft' | 'published';
} = {}) {
  const storyblokApi = useStoryblokApi();
  
  const {
    page = 1,
    per_page = 10,
    featured,
    category,
    tag,
    version = 'published'
  } = params;

  const searchParams: any = {
    version: version,
    starts_with: 'blog/',
    is_startpage: false,
    sort_by: 'first_published_at:desc',
    page: page,
    per_page: per_page,
    resolve_links: 'url',
  };

  // Alternative approach: Use individual filter parameters
  if (featured !== undefined) {
    searchParams['filter_query[featured][in]'] = featured.toString();
  }
  
  if (category) {
    searchParams['filter_query[category][in]'] = category;
  }
  
  if (tag) {
    searchParams['filter_query[tags][any_in_array]'] = tag;
  }

  try {
    console.log('Storyblok API call params:', searchParams);
    const response = await storyblokApi.get('cdn/stories', searchParams);
    return response.data as StoryblokStoriesResponse<ArticleStoryblok>;
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return null;
  }
}

// Get featured articles
export async function getFeaturedArticles(limit: number = 3) {
  return getBlogArticles({
    featured: true,
    per_page: limit,
  });
}

// Get articles by category
export async function getArticlesByCategory(category: string, limit: number = 6) {
  return getBlogArticles({
    category: category,
    per_page: limit,
  });
}

// Get all categories (from articles)
export async function getBlogCategories() {
  const storyblokApi = useStoryblokApi();
  
  try {
    const response = await storyblokApi.get('cdn/stories', {
      version: 'published',
      starts_with: 'blog/',
      is_startpage: false,
      per_page: 100, // Get more articles to extract categories
    });
    
    const stories = response.data.stories as (StoryblokStory & { content: ArticleStoryblok })[];
    const categories = new Set<string>();
    
    stories.forEach(story => {
      if (story.content.category) {
        categories.add(story.content.category);
      }
    });
    
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

// Get all tags (from articles)
export async function getBlogTags() {
  const storyblokApi = useStoryblokApi();
  
  try {
    const response = await storyblokApi.get('cdn/stories', {
      version: 'published',
      starts_with: 'blog/',
      is_startpage: false,
      per_page: 100, // Get more articles to extract tags
    });
    
    const stories = response.data.stories as (StoryblokStory & { content: ArticleStoryblok })[];
    const tags = new Set<string>();
    
    stories.forEach(story => {
      // Safely handle different tag formats
      const storyTags = story.content.tags;
      
      if (Array.isArray(storyTags)) {
        storyTags.forEach((tag: string) => {
          if (tag && typeof tag === 'string' && tag.trim()) {
            tags.add(tag.trim());
          }
        });
      } else if (typeof storyTags === 'string' && storyTags.trim()) {
        // Handle comma-separated string tags
        storyTags.split(',').forEach(tag => {
          const trimmedTag = tag.trim();
          if (trimmedTag) {
            tags.add(trimmedTag);
          }
        });
      }
    });
    
    return Array.from(tags).sort();
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
}

// Helper function to safely get tags from an article
export function getTagsArray(tags: any): string[] {
  if (Array.isArray(tags)) {
    return tags.filter(tag => tag && typeof tag === 'string' && tag.trim()).map(tag => tag.trim());
  }
  
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
  
  return [];
}

// Calculate reading time (approximate)
export function calculateReadingTime(content: any): number {
  if (!content) return 0;
  
  const wordsPerMinute = 200;
  let wordCount = 0;
  
  function countWords(node: any): void {
    if (node.text) {
      wordCount += node.text.split(/\s+/).filter((word: string) => word.length > 0).length;
    }
    
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(countWords);
    }
  }
  
  countWords(content);
  
  return Math.ceil(wordCount / wordsPerMinute);
}

// Format date
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate SEO-friendly excerpt from rich text content
export function generateExcerpt(content: any, maxLength: number = 160): string {
  if (!content) return '';
  
  let text = '';
  
  function extractText(node: any): void {
    if (node.text) {
      text += node.text + ' ';
    }
    
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(extractText);
    }
  }
  
  extractText(content);
  
  // Clean up and truncate
  text = text.trim().replace(/\s+/g, ' ');
  
  if (text.length <= maxLength) {
    return text;
  }
  
  // Truncate at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}