import ScrollingTaglines from "./scrolling-taglines";

export function Hero() {
  return (
    <main className="">
      <div className="grid grid-cols-10 gap-4 p-16 h-dvh">
        <div className="col-span-10">
          <p>architecture cool_profile of ivan is</p>
          <p>begin</p>
        </div>
        <div className="col-span-4 flex flex-col justify-center">
          <h3 className="text-[36px] leading-none">hi, i&apos;m</h3>
        <h1 className="text-[196px] leading-none font-bold">ivan</h1>
          <h3 className="text-[36px] leading-none">about me {'>'}</h3>
          
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <h2 className="text-[96px] leading-none font-bold">{"<="}</h2>
        </div>
        <div className="col-span-4 flex items-center">
          <ScrollingTaglines taglines={["computer engineer", "autonomous systems", "silly robotics guy", "encyclopedia", "cet [at] rit", "new yorker", "coffee lover"]} />
        </div>
        <div className="col-span-10">
          <p>end cool_profile;</p>
        </div>
      </div>
    </main>
  );
}
