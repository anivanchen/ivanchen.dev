import styles from '../styles/Home.module.css';

import Landing from './components/Landing';
import About from './components/About';
import Projects from './components/Projects';
import Contributions from './components/Contributions';
import Contact from './components/Contact';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.fullGlass}/>
        <Landing />
        <About />
        <Projects />
        <Contributions />
        <Contact />
      </main>
    </div>
  )
}
