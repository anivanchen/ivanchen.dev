export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  timestamp: number;
  tags: string[];
  description: string;
  readTime?: string;
  order?: number;
  content: string;
}

export type BlogPostSummary = Omit<BlogPost, "content">;

// Automatically load all .md files in the app/data folder at build/run time
const markdownModules = import.meta.glob("./*.md", {
  query: "?raw",
  eager: true,
  import: "default",
}) as Record<string, string>;

/**
 * Parses date strings (e.g. "OCT 2026", "2026-10-15", "October 2026") into numeric timestamps
 */
function parseDateToTimestamp(dateStr: string): number {
  if (!dateStr) return 0;

  // Handle "MMM YYYY" or "MMMM YYYY" (e.g. "OCT 2026", "May 2026")
  const match = dateStr.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const monthStr = match[1].slice(0, 3).toLowerCase();
    const year = parseInt(match[2], 10);
    const months: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const month = months[monthStr] !== undefined ? months[monthStr] : 0;
    return new Date(year, month, 1).getTime();
  }

  // Handle ISO or standard date formats
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Lightweight frontmatter parser for .md files (avoids eval/Node buffer bloat)
 */
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatterStr = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  let currentKey = "";
  for (const line of frontmatterStr.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Check for list item e.g. "  - Robotics"
    if (trimmed.startsWith("- ") && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx !== -1) {
      currentKey = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();

      // Check for inline array: [a, b, c]
      if (value.startsWith("[") && value.endsWith("]")) {
        data[currentKey] = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      } else if (value) {
        data[currentKey] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  return { data, content };
}

function loadPostsFromMarkdown(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filepath, rawContent] of Object.entries(markdownModules)) {
    // Extract slug from file path, e.g. "./building-autonomous-perception.md" -> "building-autonomous-perception"
    const match = filepath.match(/\/([^/]+)\.md$/);
    const slug = match ? match[1] : filepath.replace(/^\.\//, "").replace(/\.md$/, "");

    try {
      const { data, content } = parseFrontmatter(rawContent);
      const dateStr = data.date || "";
      const timestamp = parseDateToTimestamp(dateStr);
      const order = data.order !== undefined ? Number(data.order) : undefined;

      posts.push({
        slug,
        title: data.title || slug,
        date: dateStr,
        timestamp,
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description || "",
        readTime: data.readTime,
        order,
        content: content.trim(),
      });
    } catch {
      // Gracefully ignore file read/parse errors without logging to the browser console
    }
  }

  // Dynamic sorting:
  // 1. If explicit `order` frontmatter is provided, sort by order ascending
  // 2. Otherwise sort by date/timestamp descending (newest first)
  // 3. Fallback to alphabetical title comparison
  posts.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;

    if (b.timestamp !== a.timestamp) {
      return b.timestamp - a.timestamp;
    }

    return a.title.localeCompare(b.title);
  });

  return posts;
}

const ALL_POSTS = loadPostsFromMarkdown();

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getAllPostSummaries(): BlogPostSummary[] {
  return ALL_POSTS.map(({ content, ...summary }) => summary);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}
