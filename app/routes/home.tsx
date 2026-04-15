import type { Route } from "./+types/home";
import { Hero } from "../hero/hero"
import { About } from "../about/about"
import { Projects } from "../projects/projects"
import { Contact } from "../contact/contact"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ivan Chen's Portfolio" },
    { name: "description", content: "Ivan is a second year at the Rochester Institute of Technology (RIT) studying computer engineering." },
  ];
}

export default function Home() {
  return (
    <body>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </body>
  );
}
