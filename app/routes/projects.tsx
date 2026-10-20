import { useRef } from "react";
import type { Route } from "./+types/projects";
import { AutonomousArena } from "../components/autonomous-arena";

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

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 6; // Lean into cursor vertically
    const rotY = x * 6;  // Lean into cursor horizontally
    el.style.transform = `perspective(800px) translateY(-5px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  };

  const handlePointerEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.1s ease-out, box-shadow 0.25s ease-out, background-color 0.25s ease-out, border-color 0.25s ease-out";
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out";
    el.style.transform = "perspective(800px) translateY(0px) rotateX(0deg) rotateY(0deg)";
  };

  if (project.link) {
    return (
      <a
        ref={cardRef}
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        data-no-underline
        data-project-card
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="flex flex-col group p-5 -m-5 rounded-2xl border border-transparent hover:border-[#7D7D7D]/20 hover:bg-[#F4F4F4]/50 hover:shadow-[0_12px_24px_-8px_rgba(46,52,53,0.08)] will-change-transform cursor-pointer select-none transition-colors no-underline"
        style={{
          transform: "perspective(800px) translateY(0px) rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Header: Project Name (24px) & Year */}
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#009E8E] flex items-center gap-2">
            <span className="project-title-link">{project.title}</span>
            <svg
              className="w-4 h-4 text-[#009E8E] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </h3>
          <span className="text-base sm:text-lg font-semibold text-[#2E3435] shrink-0">
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#2E3435] font-normal leading-relaxed">
          {project.description}
        </p>
      </a>
    );
  }

  return (
    <div className="flex flex-col p-5 -m-5 rounded-2xl">
      {/* Header: Project Name (24px) & Year */}
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#009E8E]">
          {project.title}
        </h3>
        <span className="text-base sm:text-lg font-semibold text-[#2E3435] shrink-0">
          {project.year}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#2E3435] font-normal leading-relaxed">
        {project.description}
      </p>
    </div>
  );
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
      <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-semibold text-[#2E3435] leading-tight mb-8">
        Projects
      </h2>

      {/* Autonomous Multi-Agent Arena */}
      <div className="mb-12">
        <AutonomousArena id="projects" rows={8} />
      </div>

      {/* 2-Column Projects Grid matching Frame 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
