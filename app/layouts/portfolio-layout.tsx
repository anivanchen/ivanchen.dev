import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import AboutRoute from "../routes/about";
import ExperiencesRoute from "../routes/experiences";
import ProjectsRoute from "../routes/projects";
import BlogRoute from "../routes/blog";
import { getPostBySlug, type BlogPost } from "../data/blog-posts";
import { BlogArticleContent } from "../routes/blog-article";
import { DotMatrixPfp } from "../components/dot-matrix-pfp";

const ROUTE_INDEX_MAP: Record<string, number> = {
  "/": 0,
  "/about": 0,
  "/experiences": 1,
  "/projects": 2,
  "/blog": 3,
};

function getActiveIndex(pathname: string): number {
  if (pathname in ROUTE_INDEX_MAP) return ROUTE_INDEX_MAP[pathname];
  if (pathname.startsWith("/blog/")) return 4;
  return 0;
}

export function PortfolioLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isArticlePage =
    location.pathname.startsWith("/blog/") && location.pathname !== "/blog";
  const activeIndex = getActiveIndex(location.pathname);

  // Track the current article post so it never disappears during slide-out transitions
  const articleSlugMatch = location.pathname.match(/^\/blog\/(.+)$/);
  const articleSlug = articleSlugMatch ? articleSlugMatch[1] : null;
  const currentArticlePost = articleSlug ? getPostBySlug(articleSlug) : null;
  const lastArticlePostRef = useRef<BlogPost | null>(null);

  if (currentArticlePost) {
    lastArticlePostRef.current = currentArticlePost;
  }

  const articleToRender = currentArticlePost ?? lastArticlePostRef.current;

  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [highlightIndex, setHighlightIndex] = useState(activeIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(480);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const currentNavIndexRef = useRef(activeIndex);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  // Animate track and nav items when activeIndex changes
  useEffect(() => {
    const fromIndex = currentNavIndexRef.current;
    const toIndex = activeIndex;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (fromIndex !== toIndex) {
      const steps = Math.abs(toIndex - fromIndex);
      // Duration scales with step distance so skipping intermediate items feels natural
      const duration = steps === 3 ? 640 : steps === 2 ? 520 : 420;
      setTransitionDuration(duration);
      setIsAnimating(true);
      setDisplayIndex(toIndex);

      const updateHighlight = (idx: number) => {
        currentNavIndexRef.current = idx;
        setHighlightIndex(idx);
      };

      // Staggered nav item illumination: illuminate intermediate steps as the track glides
      if (steps > 1) {
        const stepDirection = toIndex > fromIndex ? 1 : -1;
        const intermediateSteps: number[] = [];
        for (let i = fromIndex + stepDirection; i !== toIndex; i += stepDirection) {
          intermediateSteps.push(i);
        }

        const timePerStep = duration / (steps + 1);
        intermediateSteps.forEach((stepIdx, idx) => {
          const t = setTimeout(() => {
            updateHighlight(stepIdx);
          }, timePerStep * (idx + 1));
          timeouts.push(t);
        });

        const finalT = setTimeout(() => {
          updateHighlight(toIndex);
        }, timePerStep * steps);
        timeouts.push(finalT);
      } else {
        updateHighlight(toIndex);
      }

      // Instant scroll to top when changing views to prevent scroll thrashing during view transitions
      window.scrollTo({ top: 0, behavior: "instant" });

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
      timeouts.push(timer);

      return () => {
        timeouts.forEach(clearTimeout);
      };
    } else {
      currentNavIndexRef.current = toIndex;
      setHighlightIndex(toIndex);
      setDisplayIndex(toIndex);
    }
  }, [activeIndex]);

  const navItems = [
    { name: "About", to: "/" },
    { name: "Experiences", to: "/experiences" },
    { name: "Projects", to: "/projects" },
    { name: "Blog", to: "/blog" },
    { name: "CV", to: "/Ivan_Chen_Resume.pdf", external: true },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const SocialLinks = ({ iconSize = "w-5 h-5", gap = "gap-3" }: { iconSize?: string; gap?: string }) => (
    <div className={`flex items-center ${gap} shrink-0`}>
      {/* LinkedIn */}
      <a
        href="https://linkedin.com/in/anivanchen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        data-no-underline
        className="social-link text-[#2E3435] hover:text-[#009E8E] transition-colors p-1 no-underline"
      >
        <svg
          className={`${iconSize} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* Email */}
      <a
        href="mailto:ic8437@rit.edu"
        aria-label="Email"
        data-no-underline
        className="social-link text-[#2E3435] hover:text-[#009E8E] transition-colors p-1 no-underline"
      >
        <svg
          className={`${iconSize} fill-none stroke-current stroke-2`}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/anivanchen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        data-no-underline
        className="social-link text-[#2E3435] hover:text-[#009E8E] transition-colors p-1 no-underline"
      >
        <svg
          className={`${iconSize} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#2E3435] selection:bg-[#009E8E]/20 selection:text-[#009E8E] font-cal">
      {/* Expanding Mobile Header & Full-Screen Menu (Screen < lg) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white lg:hidden transition-[height] duration-500 ease-in-out overflow-hidden flex flex-col ${
          isMobileMenuOpen
            ? "h-screen h-[100dvh]"
            : "h-16 border-b border-[#7D7D7D]/15 bg-white/95 backdrop-blur-md"
        }`}
      >
        {/* Permanent Top Bar: "Ivan Chen" and toggle button in identical position */}
        <div className="h-16 px-6 sm:px-10 flex items-center justify-between shrink-0">
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            data-no-underline
            className="text-[26px] sm:text-[30px] font-semibold text-[#009E8E] leading-none hover:opacity-90 transition-opacity no-underline"
          >
            Ivan Chen
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="w-10 h-10 -mr-2 flex items-center justify-center text-[#2E3435] hover:text-[#009E8E] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current rounded-full transition-transform duration-500 ease-in-out origin-center ${
                  isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current rounded-full transition-opacity duration-300 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current rounded-full transition-transform duration-500 ease-in-out origin-center ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Sliding Menu Panel: expands down smoothly with the header without layout reflow */}
        <div
          className={`w-full h-[calc(100dvh-4rem)] shrink-0 flex flex-col justify-between px-6 sm:px-10 pb-8 pt-4 overflow-y-auto transition-opacity duration-300 ease-out ${
            isMobileMenuOpen
              ? "opacity-100 delay-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Navigation Links: Large Cal Sans with refined spacing */}
          <nav className="flex flex-col gap-4 sm:gap-5 my-auto py-4 shrink-0">
            {navItems.map((item, index) => {
              if (item.external) {
                return (
                  <a
                    key={item.name}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[36px] sm:text-[42px] font-semibold text-[#2E3435] hover:text-[#009E8E] transition-colors duration-250 block w-fit"
                  >
                    {item.name}
                  </a>
                );
              }

              const isActive = highlightIndex === index || (highlightIndex === 4 && index === 3);

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[36px] sm:text-[42px] font-semibold transition-colors duration-250 block w-fit ${
                    isActive
                      ? "text-[#009E8E]"
                      : "text-[#2E3435] hover:text-[#009E8E]"
                  }`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Footer in Mobile Menu */}
          <div className="pt-6 border-t border-[#7D7D7D]/20 flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base sm:text-lg text-[#2E3435] whitespace-nowrap shrink-0">
                Nice to meet you!
              </span>
              <SocialLinks iconSize="w-6 h-6" gap="gap-4" />
            </div>
            <p className="text-sm font-semibold text-[#2E3435]">
              &copy; 2026 Ivan Chen
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-16 lg:pt-0">
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 items-start">
          {/* Desktop Left Sidebar: full height, permanently fixed, NEVER scrolls */}
          {/* Desktop Left Sidebar: full height, permanently fixed, NEVER scrolls.
              In article mode (Option A), sidebar smoothly narrows to a slim typographic rail and collapses the profile image. */}
          {/* Desktop Left Sidebar: full height, permanently fixed, NEVER scrolls.
              In article mode, profile image is hidden and media link buttons sit directly under name. */}
          <aside
            className={`hidden lg:flex shrink-0 py-8 lg:py-10 xl:py-12 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen flex-col justify-between overflow-hidden transition-[width] duration-400 ease-in-out ${
              isArticlePage
                ? "w-[200px] xl:w-[220px]"
                : "w-full lg:w-[320px] xl:w-[360px]"
            }`}
          >
            {/* Top Block: Title, Image, Greeting Row */}
            <div className="flex flex-col shrink-0">
              {/* Site Name / Title: 48px */}
              <h1 className="text-[38px] sm:text-[44px] lg:text-[48px] font-semibold text-[#009E8E] leading-none shrink-0">
                <NavLink
                  to="/"
                  data-no-underline
                  className="hover:opacity-90 transition-opacity no-underline"
                >
                  Ivan Chen
                </NavLink>
              </h1>

              {/* In Article View: media links smoothly slide in under name, aligned flush to the text edge */}
              <div
                className={`transition-all duration-400 ease-in-out ${
                  isArticlePage
                    ? "opacity-100 translate-x-0 max-h-16 mt-3 pointer-events-auto"
                    : "opacity-0 -translate-x-6 max-h-0 overflow-hidden pointer-events-none mt-0"
                }`}
              >
                <div className="flex items-center -ml-1">
                  <SocialLinks gap="gap-3" />
                </div>
              </div>

              {/* Profile Image & Greeting Box: smooth slide-away collapse in article mode */}
              <div
                className={`grid transition-[grid-template-rows] duration-400 ease-in-out ${
                  isArticlePage
                    ? "grid-rows-[0fr]"
                    : "grid-rows-[1fr]"
                }`}
              >
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out origin-left ${
                    isArticlePage
                      ? "opacity-0 -translate-x-12 mt-0"
                      : "opacity-100 translate-x-0 mt-4 lg:mt-6"
                  }`}
                >
                  {/* Profile Image Box: strictly maintains 1:1 square ratio matching sidebar width */}
                  <DotMatrixPfp className="shrink-0" />

                  {/* Greeting & Social Icons Row */}
                  <div className="flex items-center justify-between mt-3 lg:mt-4 text-[#2E3435] shrink-0">
                    <span className="font-semibold text-base sm:text-lg whitespace-nowrap shrink-0">
                      Nice to meet you!
                    </span>
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links: floating evenly between Top Block and Copyright */}
            <nav className="flex flex-col gap-2 my-auto py-2 shrink-0 transition-[margin,transform] duration-400 ease-in-out">
              {navItems.map((item, index) => {
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[22px] sm:text-[24px] font-semibold text-[#2E3435] hover:text-[#009E8E] transition-colors duration-250 block w-fit"
                    >
                      {item.name}
                    </a>
                  );
                }

                const isActive = highlightIndex === index || (highlightIndex === 4 && index === 3);

                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={`text-[22px] sm:text-[24px] font-semibold transition-colors duration-250 block w-fit ${
                      isActive
                        ? "text-[#009E8E]"
                        : "text-[#2E3435] hover:text-[#009E8E]"
                    }`}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Copyright: pinned at bottom */}
            <div className="pt-4 shrink-0">
              <p className="text-sm sm:text-base font-semibold text-[#2E3435]">
                &copy; 2026 Ivan Chen
              </p>
            </div>
          </aside>

          {/* Right Main Content Area: independently scrollable with horizontal filmstrip track */}
          <main className="flex-1 w-full py-8 lg:py-10 xl:py-12 min-w-0 overflow-x-clip">
            <div className="portfolio-track-container w-full">
              <div
                className="portfolio-track flex items-start w-full"
                style={{
                  transform: `translateX(-${displayIndex * 100}%)`,
                  transitionProperty: isInitialLoad ? "none" : "transform",
                  transitionDuration: isInitialLoad ? "0ms" : `${transitionDuration}ms`,
                  transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                {/* Slide 0: About */}
                <div
                  className={`portfolio-slide w-full shrink-0 min-w-0 ${
                    !isAnimating && displayIndex !== 0
                      ? "h-0 overflow-hidden invisible"
                      : "h-auto"
                  }`}
                  aria-hidden={displayIndex !== 0}
                  inert={displayIndex !== 0}
                >
                  {/* Mobile Profile Card on About route */}
                  <div className="lg:hidden mb-8 flex flex-col items-center">
                    <div className="w-[280px] sm:w-[320px] mb-3">
                      <DotMatrixPfp />
                    </div>
                    <div className="w-[280px] sm:w-[320px] flex items-center justify-between text-[#2E3435]">
                      <span className="font-semibold text-base sm:text-lg whitespace-nowrap shrink-0">
                        Nice to meet you!
                      </span>
                      <SocialLinks />
                    </div>
                  </div>
                  <AboutRoute />
                </div>

                {/* Slide 1: Experiences */}
                <div
                  className={`portfolio-slide w-full shrink-0 min-w-0 ${
                    !isAnimating && displayIndex !== 1
                      ? "h-0 overflow-hidden invisible"
                      : "h-auto"
                  }`}
                  aria-hidden={displayIndex !== 1}
                  inert={displayIndex !== 1}
                >
                  <ExperiencesRoute />
                </div>

                {/* Slide 2: Projects */}
                <div
                  className={`portfolio-slide w-full shrink-0 min-w-0 ${
                    !isAnimating && displayIndex !== 2
                      ? "h-0 overflow-hidden invisible"
                      : "h-auto"
                  }`}
                  aria-hidden={displayIndex !== 2}
                  inert={displayIndex !== 2}
                >
                  <ProjectsRoute />
                </div>

                {/* Slide 3: Blog */}
                <div
                  className={`portfolio-slide w-full shrink-0 min-w-0 ${
                    !isAnimating && displayIndex !== 3
                      ? "h-0 overflow-hidden invisible"
                      : "h-auto"
                  }`}
                  aria-hidden={displayIndex !== 3}
                  inert={displayIndex !== 3}
                >
                  <BlogRoute />
                </div>

                {/* Slide 4: Blog Article */}
                <div
                  className={`portfolio-slide w-full shrink-0 min-w-0 ${
                    !isAnimating && displayIndex !== 4
                      ? "h-0 overflow-hidden invisible"
                      : "h-auto"
                  }`}
                  aria-hidden={displayIndex !== 4}
                  inert={displayIndex !== 4}
                >
                  {articleToRender ? (
                    <BlogArticleContent post={articleToRender} />
                  ) : (
                    <Outlet />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default PortfolioLayout;
