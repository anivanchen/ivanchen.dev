export function Contact() {
  return (
    <main className="bg-primary3 text-white text-center">
      <div className="flex items-center justify-center p-4 md:p-8 lg:p-16 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-32 max-w-6xl w-full">
        <div className="flex flex-col justify-center text-center space-y-4 md:space-y-6 text-3xl md:text-4xl lg:text-5xl font-bold">
          <a 
            href="https://linkedin.com/in/anivanchen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent2 hover:text-accent3 transition-colors"
          >
            linkedin
          </a>
          <a 
            href="https://github.com/anivanchen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent2 hover:text-accent3 transition-colors"
          >
            github
          </a>
          <a 
            href="/Ivan_Chen_Resume.pdf"
            className="text-accent2 hover:text-accent3 transition-colors"
          >
            resume
          </a>
        </div>

        <div className="flex flex-col justify-center text-center">
          <h2 className="text-secondary2 text-3xl md:text-4xl lg:text-5xl font-bold mb-4">contact me</h2>
          <p className="text-secondary1 text-base md:text-lg lg:text-xl mb-4">i don't bite</p>
          <div className="space-y-4">
            <a 
              href="mailto:ic8437@rit.edu"
              className="text-accent2 text-xl md:text-2xl lg:text-3xl underline decoration-2 underline-offset-4 hover:text-accent3 transition-colors block break-all"
            >
              ic8437 [at] rit [dot] edu
            </a>
          </div>
        </div>
      </div>
      </div>
      <p className="p-4 text-xs md:text-sm lg:text-base text-secondary1">website by [at] anivanchen | (c) 2026 Ivan Chen</p>
    </main>
  );
}
