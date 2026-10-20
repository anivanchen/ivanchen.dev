import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/portfolio-layout.tsx", [
    index("routes/about.tsx"),
    route("about", "routes/about-redirect.tsx"),
    route("experiences", "routes/experiences.tsx"),
    route("projects", "routes/projects.tsx"),
    route("blog", "routes/blog.tsx"),
    route("blog/:slug", "routes/blog-article.tsx"),
  ]),
] satisfies RouteConfig;
