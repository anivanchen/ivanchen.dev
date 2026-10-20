import { Link, data, useLocation } from "react-router";
import type { Route } from "./+types/blog-article";
import { getPostBySlug } from "../data/blog-posts";
import { MarkdownRenderer } from "../components/markdown-renderer";
import { setSlideDirection } from "../utils/navigation";

export function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw data("Article not found", { status: 404 });
  }
  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Article Not Found | Ivan Chen" }];
  }
  return [
    { title: `${data.post.title} | Ivan Chen` },
    { name: "description", content: data.post.description },
  ];
}

import type { BlogPost } from "../data/blog-posts";

export function BlogArticleContent({ post }: { post: BlogPost }) {
  return (
    <div className="w-full font-cal">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-base font-semibold text-[#009E8E] hover:underline decoration-2 underline-offset-4 transition-all"
        >
          <svg
            className="w-4 h-4 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-[#2E3435] leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-[#7D7D7D] font-semibold">
          <span>{post.date}</span>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#7D7D7D] mt-3">
          {post.tags.map((tag) => (
            <span key={tag}>&lt;{tag}&gt;</span>
          ))}
        </div>
      </header>

      {/* Divider */}
      <hr className="border-0 border-t border-[#7D7D7D] mb-10" />

      {/* Article Content */}
      <MarkdownRenderer content={post.content} />

      {/* Footer Navigation */}
      <footer className="mt-16 pt-8 border-t border-[#7D7D7D]">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-base font-semibold text-[#009E8E] hover:underline decoration-2 underline-offset-4"
        >
          ← Back to all articles
        </Link>
      </footer>
    </div>
  );
}

export default function BlogArticleRoute({ loaderData }: Route.ComponentProps) {
  return <BlogArticleContent post={loaderData.post} />;
}
