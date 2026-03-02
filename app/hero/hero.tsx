import ScrollingTaglines from "./scrolling-taglines";

export function Hero() {
  return (
    <main className="bg-primary3">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-2 md:gap-4 p-4 md:p-8 lg:p-16 min-h-dvh text-white text-center md:text-left">
        <div className="col-span-1 md:col-span-10">
          <p className="text-xs md:text-sm lg:text-base text-secondary1">architecture cool_profile of ivan is</p>
          <p className="text-xs md:text-sm lg:text-base text-secondary1">begin</p>
        </div>
        <div className="col-span-1 md:col-span-4 flex flex-col justify-center">
          <h3 className="text-lg md:text-2xl lg:text-[36px] leading-none text-secondary1">hi, i&apos;m</h3>
        <h1 className="text-6xl md:text-8xl lg:text-[196px] leading-none font-bold text-secondary2">ivan</h1>
          <h3 className="text-lg md:text-2xl lg:text-[36px] leading-none text-accent2 underline decoration-2 mt-4 md:decoration-4 underline-offset-4 md:underline-offset-8 hover:text-accent3 transition-colors"><a href="#about">about me {'>'}</a></h3>
          
        </div>
        <div className="hidden md:flex md:col-span-2 items-center justify-center">
          <h2 className="text-5xl lg:text-[96px] leading-none font-bold text-secondary1">{"<="}</h2>
        </div>
        <div className="col-span-1 md:col-span-4 flex items-center mt-4 md:mt-0">
          <div className="w-full">
            <ScrollingTaglines taglines={["new yorker", "huge nerd", "cet [at] rit", "computer engineer", "encyclopedia", "philomath", "philosopher"]} />
          </div>
        </div>
        <div className="col-span-1 md:col-span-10">
          <p className="text-xs md:text-sm lg:text-base text-secondary1">end cool_profile;</p>
        </div>
      </div>
    </main>
  );
}
