import ScrollingTaglines from "./scrolling-taglines";

export function Hero() {
  return (
    <main className="bg-primary3">
      <div className="grid grid-cols-10 gap-4 p-16 h-dvh text-white">
        <div className="col-span-10">
          <p className="text-secondary1">architecture cool_profile of ivan is</p>
          <p className="text-secondary1">begin</p>
        </div>
        <div className="col-span-4 flex flex-col justify-center">
          <h3 className="text-[36px] leading-none text-secondary1">hi, i&apos;m</h3>
        <h1 className="text-[196px] leading-none font-bold text-secondary2">ivan</h1>
          <h3 className="text-[36px] leading-none text-accent2 underline decoration-4 underline-offset-8 hover:text-accent3 transition-colors"><a href="#about">about me {'>'}</a></h3>
          
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <h2 className="text-[96px] leading-none font-bold text-secondary1">{"<="}</h2>
        </div>
        <div className="col-span-4 flex items-center">
          <div className="">
            <ScrollingTaglines taglines={["computer engineer", "autonomous systems", "silly robotics guy", "encyclopedia", "cet [at] rit", "proud nerd", "new yorker"]} />
          </div>
        </div>
        <div className="col-span-10">
          <p className="text-secondary1">end cool_profile;</p>
        </div>
      </div>
    </main>
  );
}
