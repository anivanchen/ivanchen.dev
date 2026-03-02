export function About() {
  return (
    <main id="about" className="flex bg-primary3 min-h-screen text-white p-4 md:p-8 lg:p-16 items-center">
      <div className="flex flex-col lg:flex-row max-w-screen items-center lg:items-start gap-8 lg:gap-16">
        <div className="flex flex-col w-full lg:min-w-1/2">
          <div className="mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-accent2 text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-8 font-bold">i'm...</h2>
            <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-base md:text-xl lg:text-2xl">
              <li className="text-secondary1">studying CE and Math [at] <a href="https://www.rit.edu/" className="underline decoration-2 underline-offset-4">rit</a></li>
              <li className="text-secondary1">automating <a href="https://www.ritformula.com/" className="underline decoration-2 underline-offset-4">race cars</a></li>
              <li className="text-secondary1">learning about artificial intelligence</li>
              <li className="text-secondary1">helping students learn computer engineering</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-accent2 text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-8 font-bold">i've...</h2>
            <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-base md:text-xl lg:text-2xl">
              <li className="text-secondary1">automated daily tax data collection</li>
              <li className="text-secondary1">led a <a href="https://stuypulse.com/" className="underline decoration-2 underline-offset-4">competitive robotics team</a></li>
              <li className="text-secondary1">worked on 8 awesome robots</li>
              <li className="text-secondary1">rebuilt <a href="https://stuyspec.com/" className="underline decoration-2 underline-offset-4">stuyspec.com</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-full lg:max-w-1/2 mt-16 md:mt-0">
          <p className="text-secondary1 text-sm md:text-lg lg:text-xl py-2 md:py-3 lg:py-4">I&apos;m a <b className="text-secondary2">sophomore</b> at the <b className="text-accent2">Rochester Institute of Technology</b> studying computer engineering.</p>
          <p className="text-secondary1 text-sm md:text-lg lg:text-xl py-2 md:py-3 lg:py-4">I live by the doctrine that <b className="text-secondary2">the more I learn, the less I know</b>. As such, I&apos;m interested in many fields (and why):</p>
            <ul className="text-sm md:text-base lg:text-base">
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">computer engineering</b>: the basis of logical computing platforms that process data</li>
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">robotics</b>: medium for granting computers access to the real world</li>
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">artificial intelligence</b>: reverse engineering entropy to provide meaningful outcomes</li>
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">quantum computing</b>: exploiting the universe for accelerated problem solving</li>
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">economics</b>: mapping how value influences human behavior</li>
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">psychology</b>: studying the original processor; the human psyche</li>
              <li className="text-secondary1 mb-2 ml-4"><b className="text-secondary2">philosophy</b>: study of thinking, ideas, and truths</li>
            </ul>
          <p className="text-secondary1 text-sm md:text-lg lg:text-xl py-2 md:py-3 lg:py-4">Currently Reading:{" "}
            <a href="https://press.princeton.edu/books/paperback/9780691175911/dr-eulers-fabulous-formula" 
               className="underline decoration-2 underline-offset-4">
              Dr. Euler's Fabulous Formula: Cures Many Mathematical Ills
            </a> 
            {" "}by Paul J. Nahin
          </p>
          <p className="text-secondary1 text-sm md:text-lg lg:text-xl py-2 md:py-3 lg:py-4">Listening to:{" "}
            <a href="https://open.spotify.com/album/3oyndt1RMCFGQLnZMYPmML" 
               className="underline decoration-2 underline-offset-4">
              Vivarium
            </a> 
            {" "}by Ado
          </p>
        </div>
      </div>
    </main>
  );
}
