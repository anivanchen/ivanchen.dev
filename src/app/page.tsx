import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="flex w-full flex-row-reverse items-end p-8 pr-48 pl-48">
        <Link href="/" className="text-lg font-bold ml-8">Home</Link>
        <Link href="/" className="text-lg ml-8">About</Link>
        <Link href="/" className="text-lg ml-8">Projects</Link>
        <Link href="/" className="text-lg ml-8">Card</Link>
        <Link href="/" className="text-lg ml-8">Blog</Link>
      </header>

      <div id="hero" className="flex flex-row items-center justify-center h-full">
        <div className="pl-48 pr-16">
          <h4>Hi I'm</h4>
          <h1>Ivan Chen</h1>
          <h6 className="mb-8">I'm a junior at Stuyvesant High School. I’m a software engineer <Link href="https://github.com/stuypulse" id="special-text" passHref>@StuyPulse</Link> and a web developer <Link href="https://github.com/stuysu" id="special-text" passHref>@StuySU</Link> and <Link href="https://github.com/stuyspec" id="special-text" passHref>@TheStuyvesantSpectator</Link>.</h6>
          <h6 className="mb-8">I'm passionate about robotics, web development, IT infrastructure, cybersecurity, game design, and 3D modeling. I use Java, TypeScript, Next.js, Unity, and Blender for my projects.</h6>
        
          <button id="button">
            <Link href="/about">Learn More</Link>
          </button>
        </div>

        <div className="pl-16 pr-48">
          <div className="rounded-full">
            <Image src="https://avatars.githubusercontent.com/u/51217025" width={384} height={384} alt="Ivan Chen's Github profile picture." />
          </div>
        </div>
      </div>
    </main>
  )
}
