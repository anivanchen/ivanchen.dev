import type { Route } from "./+types/about";
import { AutonomousArena } from "../components/autonomous-arena";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ivan Chen" },
    {
      name: "description",
      content:
        "Junior undergraduate student at RIT double-majoring in Electrical and Computer Engineering Technology.",
    },
  ];
}

export default function AboutRoute() {
  return (
    <div className="w-full">
      {/* Main Greeting Heading: 48px */}
      <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-semibold text-[#2E3435] leading-tight mb-8">
        Hi, I’m Ivan!
      </h2>

      {/* Intro Paragraphs */}
      <div className="space-y-6 text-[#2E3435] text-base sm:text-lg leading-relaxed font-normal">
        <p>
          I am a junior undergraduate student at{" "}
          <a
            href="https://www.rit.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#009E8E] font-semibold hover:underline decoration-2 underline-offset-4"
          >
            RIT
          </a>
          , double-majoring in Electrical and Computer Engineering Technology. I
          work a lot on end-to-end automation, whether that be robots, cars, or
          data pipelines.
        </p>

        <p>
          I specialize in systems design, control theory, data processing, and
          embedded intelligence. My work lives a lot on the physical-digital
          boundary, using data to drive decision making and produce actions in
          the real and messy world. Much of it consists of developing end-to-end
          processes with a focus on first principles.
        </p>

        <p>
          Outside engineering, I enjoy developing a deep understanding of the
          human experience through a variety of media: literature, films, and
          TV shows. I also love photography, badminton, and snowboarding!
          Sometimes I bring a little bit of engineering magic back into making
          coffee. And during late nights, you might catch me jamming to music,
          obsessing over something, or editing photos.
        </p>
      </div>

      {/* Autonomous Multi-Agent Arena */}
      <div className="mt-12 sm:mt-12">
        <AutonomousArena id="about" rows={8} />
      </div>

      {/* Updates Section: 32px */}
      <div className="mt-16 sm:mt-12">
        <h3 className="text-[28px] sm:text-[32px] font-semibold text-[#2E3435] mb-6">
          Updates
        </h3>

        <div className="border-t border-[#7D7D7D]">
          <div className="py-3.5 border-b border-[#7D7D7D] flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
            <div className="w-28 sm:w-36 shrink-0 font-semibold text-[#7D7D7D] text-base sm:text-lg">
              Sept 2026
            </div>
            <div className="font-semibold text-[#2E3435] text-base sm:text-lg leading-snug">
              Hunting new roles for January - August!
            </div>
          </div>

          <div className="py-3.5 border-b border-[#7D7D7D] flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
            <div className="w-28 sm:w-36 shrink-0 font-semibold text-[#7D7D7D] text-base sm:text-lg">
              May 2026
            </div>
            <div className="font-semibold text-[#2E3435] text-base sm:text-lg leading-snug">
              Propulsion Controls SWE Internship @{" "}
              <a
                href="https://rivianvw.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-2 underline-offset-4"
              >
                Rivian and Volkswagen Group Technologies
              </a>
            </div>
          </div>

          <div className="py-3.5 border-b border-[#7D7D7D] flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
            <div className="w-28 sm:w-36 shrink-0 font-semibold text-[#7D7D7D] text-base sm:text-lg">
              June 2025
            </div>
            <div className="font-semibold text-[#2E3435] text-base sm:text-lg leading-snug">
              Data Engineering SWE Internship @{" "}
              <a
                href="https://www.nyc.gov/site/omb/index.page"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-2 underline-offset-4"
              >
                NYC OMB
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
