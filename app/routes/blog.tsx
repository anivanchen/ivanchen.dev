import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/blog";
import { getAllPostSummaries, type BlogPostSummary } from "../data/blog-posts";
import { setSlideDirection } from "../utils/navigation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog | Ivan Chen" },
    {
      name: "description",
      content: "Articles and technical writings by Ivan Chen.",
    },
  ];
}

export function loader() {
  const posts = getAllPostSummaries();
  return { posts };
}

interface BlogPostCardProps {
  post: BlogPostSummary;
  selectedTag: string;
  onTagClick: (tag: string) => void;
}

function BlogPostCard({ post, selectedTag, onTagClick }: BlogPostCardProps) {
  return (
    <article className="border-b border-[#7D7D7D] pb-6 last:border-b-0">
      {/* Header: Title (24px) & Date */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
        <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#009E8E] leading-snug">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:underline decoration-2 underline-offset-4 transition-all"
          >
            {post.title}
          </Link>
        </h3>
        <time
          dateTime={post.date}
          className="text-sm sm:text-base font-semibold text-[#2E3435] shrink-0"
        >
          {post.date}
        </time>
      </div>

      {/* Tags in #7D7D7D: e.g. <Math> <Embedded> <Estimation> */}
      <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#7D7D7D] mt-1 mb-2">
        {post.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick(tag)}
            className={`cursor-pointer transition-colors ${
              selectedTag === tag
                ? "text-[#009E8E] underline decoration-2 underline-offset-2"
                : "hover:text-[#009E8E] hover:underline decoration-2 underline-offset-2"
            }`}
          >
            &lt;{tag}&gt;
          </button>
        ))}
      </div>

      {/* Description in #2E3435 */}
      <p className="text-sm sm:text-base text-[#2E3435] font-normal leading-relaxed">
        {post.description}
      </p>
    </article>
  );
}

export default function BlogRoute({
  loaderData,
}: {
  loaderData?: { posts: BlogPostSummary[] };
} = {}) {
  const posts = loaderData?.posts ?? getAllPostSummaries();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag") || "All";

  // Collect all unique tags sorted alphabetically
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet).sort();
  }, [posts]);

  const handleTagClick = (tag: string) => {
    if (tag === "All" || tag === selectedTag) {
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }
  };

  const filteredPosts = useMemo(() => {
    if (selectedTag === "All") return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="w-full font-cal">
      {/* Page Heading: 48px */}
      <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-semibold text-[#2E3435] leading-tight mb-6">
        Blog
      </h2>

      {/* Filter by Tag Bar at the top */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-1">
        <button
          type="button"
          onClick={() => handleTagClick("All")}
          className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            selectedTag === "All"
              ? "bg-[#009E8E] text-white shadow-xs"
              : "bg-[#F4F4F4] text-[#2E3435] hover:bg-[#009E8E]/10 hover:text-[#009E8E]"
          }`}
        >
          All
        </button>

        {allTags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#009E8E] text-white shadow-xs"
                  : "bg-[#F4F4F4] text-[#7D7D7D] hover:bg-[#009E8E]/10 hover:text-[#009E8E]"
              }`}
            >
              &lt;{tag}&gt;
            </button>
          );
        })}
      </div>

      {/* Blog Posts List */}
      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-[#7D7D7D]">
            <p className="text-base sm:text-lg mb-4">
              No articles found with tag &lt;{selectedTag}&gt;.
            </p>
            <button
              type="button"
              onClick={() => handleTagClick("All")}
              className="text-[#009E8E] font-semibold hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              selectedTag={selectedTag}
              onTagClick={handleTagClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
