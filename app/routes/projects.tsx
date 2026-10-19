import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Ivan Chen" },
    {
      name: "description",
      content: "Engineering and software projects by Ivan Chen.",
    },
  ];
}

interface Project {
  title: string;
  year: string;
  description: string;
  link?: string;
}

export default function ProjectsRoute() {
  const projects: Project[] = [
    {
      title: "Autonomous Race Car Development with Simulation",
      year: "2025",
      description:
        "High-fidelity multi-threaded vehicle dynamics simulation in C using a bicycle model and torque vectoring to test a full perception, planning, and control stack. Built a 3D perception pipeline for LiDAR point clouds with RANSAC ground plane removal, A-BIRCH cone clustering, MLP classification, and Stanley trajectory tracking.",
      link: "https://www.ritformula.com/",
    },
    {
      title: "Autonomous Glider System",
      year: "2024",
      description:
        "Flight control system with low-level C drivers interfacing with inertial sensors, GPS, and control surface servos. Implemented a high-level finite state machine to manage navigation states and applied Unscented Kalman Filtering (UKF) with PID control for autonomous flight.",
    },
    {
      title: "Theia - Robot Localization System",
      year: "2024",
      description:
        "Sub-inch accurate robot localization system using AprilTags and OpenCV running on headless Linux coprocessors. Fused multi-camera pose estimation with wheel odometry via Unscented Kalman Filtering (UKF) for real-time field navigation.",
      link: "https://github.com/stuypulse/theia",
    },
    {
      title: "Tax Data Pipelines",
      year: "2025",
      description:
        "Automated end-to-end data pipelines with MS Power Automate, slashing daily processing time by 93% to 1.5 minutes. Architected an internal municipal tax legislation research LLM and Retrieval-Augmented Generation (RAG) system using ChromaDB and LLaMA.",
    },
    {
      title: "Low-Level Two-Wheel Odometry",
      year: "2024",
      description:
        "Two-wheel dead reckoning odometry on MSP432 microcontroller. Interfaced with Hall effect rotary encoders via hardware interrupts, featuring autonomous wandering, homing routines, and Bluetooth communication.",
      link: "https://cpet253.ivanchen.dev/",
    },
    {
      title: "stuyspec.com",
      year: "2023",
      description:
        "Digital web publication and content platform for The Spectator, Stuyvesant High School's student-run newspaper. Maintained frontend web architecture, streamlined digital publication workflows, and delivered content to thousands of monthly readers.",
      link: "https://stuyspec.com/",
    },
  ];

  return (
    <div className="w-full font-cal">
      {/* Page Heading: 48px */}
      <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-semibold text-[#2E3435] leading-tight mb-10">
        Projects
      </h2>

      {/* 2-Column Projects Grid matching Frame 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-12">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col group">
            {/* Header: Project Name (24px) & Year */}
            <div className="flex items-baseline justify-between gap-4 mb-3">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[22px] sm:text-[24px] font-semibold text-[#009E8E] hover:underline decoration-2 underline-offset-4 transition-all"
                >
                  {project.title}
                </a>
              ) : (
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#009E8E]">
                  {project.title}
                </h3>
              )}
              <span className="text-base sm:text-lg font-semibold text-[#2E3435] shrink-0">
                {project.year}
              </span>
            </div>

            {/* Image Placeholder Frame matching Frame 3: #F4F4F4 */}
            {/*
            <div className="w-full aspect-[16/10] bg-[#F4F4F4] mb-4 relative overflow-hidden flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#7D7D7D]/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            */}

            {/* Description */}
            <p className="text-sm sm:text-base text-[#2E3435] font-normal leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
