import styles from '../styles/Home.module.css'

import Opening from '../components/Opening'
import About from '../components/About'
import Navbar from '../components/Navbar'
import HighlightProjects from '../components/HighlightProjects'
import OtherProjects from '../components/OtherProjects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Opening />
      <Navbar />
      <About />
      <HighlightProjects />
      <OtherProjects />
      <Contact />
      <Footer />
    </div>
  )
}
