import type { Route } from "./+types/experiences";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Experiences | Ivan Chen" },
    {
      name: "description",
      content: "Professional experiences and roles of Ivan Chen.",
    },
  ];
}

interface Experience {
  company: string;
  link?: string;
  location?: string;
  role: string;
  period: string;
  bullets: string[];
}

export default function ExperiencesRoute() {
  const experiences: Experience[] = [
    {
      company: "Rivian and Volkswagen Group Technologies",
      link: "https://rivianvw.tech/",
      location: "Irvine, CA",
      role: "Software Engineering Intern",
      period: "May 2026 – August 2026",
      bullets: [
        "Engineered a platform agnostic modeling framework and gray box system identification methodology for Software-in-the-Loop testing of EV inverters, achieving 96% model fidelity in normal and current limited regimes.",
        "Implemented and validated a real-time active speed limiting vehicle feature in C through SIL and in-vehicle testing.",
        "Built a RESTful API-driven vehicle data manipulation tool with a GUI for users and MCP server for LLM agents.",
        "Performed root cause analysis on bug tickets and assisted with vehicle tests and resolution solution tuning.",
      ],
    },
    {
      company: "NYC Mayor’s Office of Management and Budget",
      link: "https://www.nyc.gov/site/omb/index.page",
      location: "New York, NY",
      role: "Software Engineering Intern",
      period: "June 2025 – August 2025",
      bullets: [
        "Automated end-to-end tax data pipelines with automated report generation/notification with MS Power Automate.",
        "Reduced daily data cleaning / processing time by 93% to 1.5 minutes, using Pandas and Python.",
        "Architected internal tax legislation research LLM + RAG system, with ChromaDB and LLaMA.",
      ],
    },
    {
      company: "Rochester Institute of Technology",
      link: "https://www.rit.edu/",
      location: "Rochester, NY",
      role: "Teaching Assistant",
      period: "August 2025 - Present",
      bullets: [
        "Mentor students in low-level C programming, microcontroller peripherals (timers, interrupts, PWM), and digital logic design.",
        "Facilitate weekly open office hours for the mechatronics senior design course in electrical, computer, and control systems.",
      ],
    },
    {
      company: "StuyPulse, FIRST Robotics",
      link: "https://stuypulse.com/",
      location: "New York, NY",
      role: "Vice President of Software Engineering",
      period: "October 2020 – June 2024",
      bullets: [
        "Developed a robot localization system (1” accuracy) using AprilTags + OpenCV on headless Linux coprocessors.",
        "Engineered PID+FF control systems for mechanisms on 8 highly performing robots using Java, including a double-jointed arm, telescoping mechanism, a color-sorted conveyor system, and autonomous driving systems.",
        "Led 50+ and taught over 200+ members in software and robotics topics and managing interdepartmental relations.",
        "Performed root cause analysis on software/hardware issues for 48+ teams; presented workshops to 400+ attendees.",
      ],
    },
  ];

  return (
    <div className="w-full font-cal">
      {/* Page Heading: 48px */}
      <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-semibold text-[#2E3435] leading-tight mb-10">
        Experiences
      </h2>

      {/* Experience List */}
      <div className="space-y-10 sm:space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="flex flex-col">
            {/* Header: Company (24px) & Date */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#009E8E] leading-snug">
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-2 underline-offset-4 transition-all"
                  >
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </h3>
              <span className="text-sm sm:text-base font-semibold text-[#2E3435] shrink-0">
                {exp.period}
              </span>
            </div>

            {/* Role Title */}
            <h4 className="text-base sm:text-lg font-semibold text-[#2E3435] mt-1 mb-3">
              {exp.role}
            </h4>

            {/* Bullets */}
            <ul className="space-y-2 text-sm sm:text-base text-[#2E3435] leading-relaxed list-disc list-outside ml-5 font-sans font-normal">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="pl-1">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
