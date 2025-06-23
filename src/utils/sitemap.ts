// src/utils/sitemap.ts
import { getBlogArticles, getBlogCategories } from './storyblok';

export async function getBlogSitemapUrls() {
  const baseUrl = 'https://dayonetalent.com';
  const urls: { url: string; lastmod?: string; changefreq?: string; priority?: number }[] = [];

  try {
    // Add main blog page
    urls.push({
      url: `${baseUrl}/blog`,
      changefreq: 'daily',
      priority: 0.8
    });

    // Get all blog articles
    const blogData = await getBlogArticles({ per_page: 100 });
    const articles = blogData?.stories || [];

    // Add individual article pages
    articles.forEach(article => {
      urls.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastmod: article.published_at,
        changefreq: 'monthly',
        priority: 0.7
      });
    });

    // Get all categories
    const categories = await getBlogCategories();
    
    // Add category pages
    categories.forEach(category => {
      const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
      urls.push({
        url: `${baseUrl}/blog/category/${categorySlug}`,
        changefreq: 'weekly',
        priority: 0.6
      });
    });

  } catch (error) {
    console.error('Error generating blog sitemap URLs:', error);
  }

  return urls;
}