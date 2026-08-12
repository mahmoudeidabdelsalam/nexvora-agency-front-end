import { wordpressFetch } from "../client";
import { BLOG_POSTS_QUERY, BLOG_POST_BY_SLUG_QUERY } from "../queries/blog";
import type { BlogPostDetail, BlogPostSummary } from "../types/blog";

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const data = await wordpressFetch<{ posts: { nodes: BlogPostSummary[] } }>(BLOG_POSTS_QUERY, undefined, {
    revalidate: 3600,
  });

  return data?.posts?.nodes ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const data = await wordpressFetch<{ post: BlogPostDetail }>(BLOG_POST_BY_SLUG_QUERY, { slug }, {
    revalidate: 3600,
  });

  return data?.post ?? null;
}
