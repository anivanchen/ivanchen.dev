import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

export function PortfolioLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAboutPage =
    location.pathname === "/" || location.pathname === "/about";

  const navItems = [
    { name: "About", to: "/" },
    { name: "Experiences", to: "/experiences" },
    { name: "Projects", to: "/projects" },
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
        className="text-[#2E3435] hover:text-[#009E8E] transition-colors p-1"
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
        className="text-[#2E3435] hover:text-[#009E8E] transition-colors p-1"
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
        className="text-[#2E3435] hover:text-[#009E8E] transition-colors p-1"
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
            className="text-[26px] sm:text-[30px] font-semibold text-[#009E8E] tracking-tight leading-none hover:opacity-90 transition-opacity"
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

        {/* Sliding Menu Panel: expands down smoothly with the header */}
        <div
          className={`flex-1 flex flex-col justify-between px-6 sm:px-10 pb-8 pt-4 overflow-y-auto transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6 pointer-events-none"
          }`}
        >
          {/* Navigation Links: Large Cal Sans */}
          <nav className="flex flex-col gap-6 sm:gap-8 my-auto py-6 shrink-0">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/" || location.pathname === "/about"
                  : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[36px] sm:text-[42px] font-semibold tracking-tight transition-colors block w-fit ${
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
          <aside className="hidden lg:flex w-full lg:w-[320px] xl:w-[360px] shrink-0 py-8 lg:py-10 xl:py-12 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen flex-col justify-between overflow-hidden">
            <div className="flex flex-col min-h-0">
              {/* Site Name / Title: 48px */}
              <h1 className="text-[38px] sm:text-[44px] lg:text-[48px] font-semibold text-[#009E8E] tracking-tight leading-none mb-4 lg:mb-6 shrink-0">
                <NavLink to="/" className="hover:opacity-90 transition-opacity">
                  Ivan Chen
                </NavLink>
              </h1>

              {/* Profile Image Box: strictly maintains 1:1 square ratio matching sidebar width */}
              <div className="w-full aspect-square bg-[#F4F4F4] relative overflow-hidden shrink-0">
                <img
                  src="/pfp.jpg"
                  alt="Ivan Chen"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Greeting & Social Icons Row */}
              <div className="flex items-center justify-between mt-3 lg:mt-4 text-[#2E3435] shrink-0">
                <span className="font-semibold text-base sm:text-lg whitespace-nowrap shrink-0">
                  Nice to meet you!
                </span>
                <SocialLinks />
              </div>

              {/* Navigation Links: 24px */}
              <nav className="flex flex-col gap-2 sm:gap-2.5 mt-6 lg:mt-8 xl:mt-12 shrink-0">
                {navItems.map((item) => {
                  const isActive =
                    item.to === "/"
                      ? location.pathname === "/" || location.pathname === "/about"
                      : location.pathname.startsWith(item.to);

                  return (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={`text-[22px] sm:text-[24px] font-semibold transition-colors block w-fit ${
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
            </div>

            {/* Copyright: pinned at bottom */}
            <div className="pt-4 shrink-0">
              <p className="text-sm sm:text-base font-semibold text-[#2E3435]">
                &copy; 2026 Ivan Chen
              </p>
            </div>
          </aside>

          {/* Right Main Content Area: independently scrollable */}
          <main className="flex-1 w-full py-8 lg:py-10 xl:py-12 min-w-0">
            {/* Mobile Profile Card on About route: image width ensures "Nice to meet you!" stays on one line without overflow */}
            {isAboutPage && (
              <div className="lg:hidden mb-8 flex flex-col items-center">
                <div className="w-[280px] sm:w-[320px] aspect-square bg-[#F4F4F4] relative overflow-hidden shrink-0 mb-3 shadow-xs">
                  <img
                    src="/pfp.jpg"
                    alt="Ivan Chen"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-[280px] sm:w-[320px] flex items-center justify-between text-[#2E3435]">
                  <span className="font-semibold text-base sm:text-lg whitespace-nowrap shrink-0">
                    Nice to meet you!
                  </span>
                  <SocialLinks />
                </div>
              </div>
            )}

            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default PortfolioLayout;
