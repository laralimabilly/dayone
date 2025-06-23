// src/types/storyblok.ts - Updated with proper types
import type { StoryblokRichTextNode } from '@storyblok/astro';

export interface StoryblokAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}

// Use the official Storyblok rich text type
export type StoryblokRichText = StoryblokRichTextNode<any>;

export interface StoryblokStory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  default_full_slug: string;
  created_at: string;
  published_at: string;
  first_published_at: string;
  content: any;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number;
  meta_data: any;
  group_id: string;
  alternates: any[];
  translated_slugs: any[];
}

// Article Content Type
export interface ArticleStoryblok {
  title: string;
  intro: string;
  image: StoryblokAsset;
  content: StoryblokRichText;
  author: string;
  date: string;
  tags: string[] | string | any; // More flexible tags type
  seo_title?: string;
  seo_description?: string;
  featured: boolean;
  category: string;
  reading_time?: number;
  _uid: string;
  component: 'article';
  [k: string]: any;
}

// Teaser Content Type (for blog listing)
export interface TeaserStoryblok {
  headline: string;
  subheadline: string;
  image: StoryblokAsset;
  link: {
    cached_url: string;
    linktype: string;
    story?: StoryblokStory;
  };
  _uid: string;
  component: 'teaser';
  [k: string]: any;
}

// Page Content Type
export interface PageStoryblok {
  title: string;
  body: any[];
  seo_title?: string;
  seo_description?: string;
  _uid: string;
  component: 'page';
  [k: string]: any;
}

export interface StoryblokResponse<T = any> {
  story: StoryblokStory & { content: T };
  cv: number;
  rels: any[];
  links: any[];
}

export interface StoryblokStoriesResponse<T = any> {
  stories: (StoryblokStory & { content: T })[];
  cv: number;
  rels: any[];
  links: any[];
  total: number;
  per_page: number;
  page: number;
}