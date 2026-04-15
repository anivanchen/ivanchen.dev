"use client";

import { useRef, useEffect } from "react";

const projects = [
  {
    title: "rit formula sae",
    description: "develop autonomous vehicle algorithms in perception, localization, and controls stack. utilize a software-in-loop testing methodology with vehicle dynamics simulation and lidar data simulation. analyze algorithms to improve robustness and efficiency. targeting real-time performance.",
    tech: ["#c/cpp", "#python", "#embedded", "#clustering", "#lidar", "#MLP", "#point cloud", "#A-BIRCH"],
    link: "https://www.ritformula.com/"
  },
  {
    title: "autonomous glider",
    description: "developed control system for autonomous glider with imu, gps, barometer, and servos. wrote c drivers for sensor and servo interfacing and implemented PID for control surface control.",
    tech: ["#embedded-c", "#pid", "#finite-state-machine", "#sensors"]
  },
  {
    title: "first robotics team - stuypulse 694",
    description: "led software development for 5 award-winning FRC robots. wrote software for 8 robots. implemented and tested autonomous routines with path planning and localization. utilized advanced control loops with PID and feedforward for mechanism control. perform data driven root cause analysis and testing.",
    tech: ["#java", "#wpilib", "#opencv", "#robotics"],
    link: "https://stuypulse.com/"
  },
  {
    title: "theia - ArUco localization system",
    description: "designed a sub-inch accurate localization system with global shutter cameras and headless linux coprocessor to estimate pose using apriltags. data transmitted using pub-sub network. utilized UKF sensor fusion w/ odometry, tuned covariance values, developed data validation strategies.",
    tech: ["#python", "#opencv", "#apriltags", "#aruco", "#charuco"],
    link: "https://github.com/stuypulse/theia"
  },
  {
    title: "low level two wheel odometry",
    description: "implemented two wheel dead reckoning odometry on msp432. interfaced with hall effect rotary encoder using hardware interrupts. includes wandering, homing, and bluetooth control features.",
    tech: ["#msp432", "#embedded-c"],
    link: "https://cpet253.ivanchen.dev/"
  },
  {
    title: "automated tax data processing",
    description: "automated daily collection of tax revenue data for analysis. utilized robust scraping techniques and data cleaning pipelines to ensure high-fidelity datasets. orchestrated crystal report automation, python scripting, and power apps automations.",
    tech: ["#python", "#selenium", "#pandas", "#automation", "#powerapps"],
  },
  {
    title: "stuyspec.com",
    description: "rebuilt the website for the stuyvesant spectator. modernized the architecture to improve performance and accessibility for thousands of readers.",
    tech: ["#nextjs", "#typescript", "#react", "#nodejs"],
    link: "https://stuyspec.com/"
  }
];

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current || !scrollContainerRef.current) return;
      
      const { top, height } = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const maxScroll = scrollContainerRef.current.scrollWidth - window.innerWidth;
      
      scrollContainerRef.current.style.transform = `translateX(-${progress * maxScroll}px)`;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={targetRef} className="bg-primary3 relative h-[300vh] md:h-[400vh] text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div 
          ref={scrollContainerRef} 
          className="flex items-center gap-6 md:gap-12 pl-4 md:pl-8 lg:pl-16 pr-4 md:pr-8 lg:pr-16 w-max will-change-transform"
        >
          {/* Introductory Title Box */}
          <div className="shrink-0 w-[75vw] md:w-[60vw] lg:w-[40vw] max-w-xl">
            <h2 className="text-accent2 text-3xl md:text-4xl lg:text-5xl font-bold mb-4">projects...</h2>
            <p className="text-secondary1 text-sm md:text-base lg:text-lg opacity-50 font-mono">
              {"[ scroll to explore ]"}
            </p>
          </div>

          {projects.map((project, index) => (
            <div 
              key={index} 
              className="shrink-0 w-[75vw] md:w-[50vw] lg:w-[30vw] max-w-xl h-[75vh] md:h-[65vh] min-h-[350px] md:min-h-[500px] border-4 border-secondary2/30 rounded-lg p-4 md:p-8 flex flex-col hover:border-accent2 transition-all group bg-primary3/50 backdrop-blur-sm"
            >
              <h3 className="text-secondary2 text-lg md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-accent1 transition-colors uppercase tracking-widest">{project.title}</h3>
              <p className="text-secondary1 text-xs md:text-base lg:text-lg flex-grow mb-4 md:mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] md:text-sm text-accent1 font-mono">{t}</span>
                ))}
              </div>

              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent2 text-sm md:text-xl underline decoration-2 underline-offset-4 hover:text-accent3 transition-colors self-start font-bold"
              >
                view project {'>'}
              </a>
            </div>
          ))}
          
          {/* Final Spacer to ensure last card reaches end */}
          <div className="shrink-0 w-[20vw] md:w-8" />
        </div>
        
        {/* Progress Bar Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary3 border-t border-secondary2/10">
          <div 
            ref={progressRef} 
            className="h-full bg-accent2 w-0 transition-all duration-75 ease-out will-change-[width]" 
          />
        </div>
      </div>
    </section>
  );
}
