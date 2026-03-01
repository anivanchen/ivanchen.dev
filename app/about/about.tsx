export function About() {
  return (
    <main id="about" className="flex bg-primary3 min-h-screen text-white p-16 items-center">
      <div className="flex max-w-screen items-center">
        <div className="flex flex-col min-w-5/8">
          <div className="mb-16">
            <h2 className="text-accent2 text-4xl mb-8 font-bold">i'm...</h2>
            <ul className="space-y-4 text-2xl">
              <li className="text-secondary1">studying CET and Math [at] <a href="https://www.rit.edu/" className="underline decoration-2 underline-offset-4">rit</a></li>
              <li className="text-secondary1">automating <a href="https://www.ritformula.com/" className="underline decoration-2 underline-offset-4">race cars</a></li>
              <li className="text-secondary1">learning about artificial intelligence</li>
              <li className="text-secondary1">helping students learn computer engineering</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-accent2 text-4xl mb-8 font-bold">i've...</h2>
            <ul className="space-y-4 text-2xl">
              <li className="text-secondary1">automated daily tax data collection</li>
              <li className="text-secondary1">led a <a href="https://stuypulse.com/" className="underline decoration-2 underline-offset-4">competitive robotics team</a></li>
              <li className="text-secondary1">worked on 8 awesome robots</li>
              <li className="text-secondary1">rebuilt <a href="https://stuyspec.com/" className="underline decoration-2 underline-offset-4">stuyspec.com</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col min-w-3/8">
          <p className="text-secondary1 text-xl py-4">I&apos;m a sophomore at the Rochester Institute of Technology studying computer engineering.</p>
          <p className="text-secondary1 text-xl py-4">Interested in many fields: computer engineering, robotics, autonomous decision making, quantum information theory, artificial intelligence, economics, psychology, and philosophy.</p>
          <p className="text-secondary1 text-xl py-4">Currently Reading:{" "}
            <a href="https://press.princeton.edu/books/paperback/9780691175911/dr-eulers-fabulous-formula" 
               className="underline decoration-2 underline-offset-4">
              Dr. Euler's Fabulous Formula: Cures Many Mathematical Ills
            </a> 
            {" "}by Paul J. Nahin
          </p>
          <p className="text-secondary1 text-xl py-4">Listening to:{" "}
            <a href="https://open.spotify.com/album/3oyndt1RMCFGQLnZMYPmML" 
               className="underline decoration-2 underline-offset-4">
              Vivarium
            </a> 
            {" "}by Ado
          </p>
          <p className="text-secondary1 text-xl py-4">My full <a href="/Ivan_Chen_Resume.pdf" className="underline decoration-2 underline-offset-4">resume</a></p>
        </div>
      </div>
    </main>
  );
}
