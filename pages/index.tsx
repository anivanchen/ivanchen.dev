import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen</title>
        <meta name="description" content="Ivan Chen's portfolio, built with Next.js and Typescript." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1 className={styles.title} id="fancy-text">Ivan Chen</h1>
          <div className={styles.inline} style={{marginBottom: "4rem"}}>
            <div className={styles.link}>
              <a href="https://github.com/anivanchen" className={styles.inline}>
                <div><Image src="/github.svg" alt="github" width={14} height={14} layout="fixed" /></div>
                GitHub
                <div><Image src="/link.svg" alt="link" width={14} height={14} layout="fixed" /></div>
              </a>
            </div>
            <div className={styles.link}>
              <a href="https://linkedin.com/in/anivanchen" className={styles.inline}>
                <div><Image src="/linkedin.svg" alt="linkedin" width={14} height={14} layout="fixed" /></div>
                Linkedin
                <div><Image src="/link.svg" alt="link" width={14} height={14} layout="fixed" /></div>
              </a>
            </div>
          </div>
          <p className={styles.text}>
            Hi! My name is Ivan, and I am a sophomore at {" "}
            <a href="https://stuy.enschool.org/" id="fancy-text">Stuyvesant High School</a>.
            I’m a software engineer {" "}
            <a href="https://stuypulse.com" id="fancy-text">@StuyPulse</a> and a web developer {""}
            <a href="https://sophomore.stuysu.org" id="fancy-text">@StuySU</a> and {" "}
            <a href="https://stuyspec.com" id="fancy-text">@StuyvesantSpectator</a>.
          </p>
          <p className={styles.text}>
            I primarily work with Python and Javascript with NextJS, but lately,
            I’ve been getting into Typescript and Java. In addition, I am fairly
            well versed in IT infrastructure.
          </p>
          <Link href="/projects" passHref>
            <div className={styles.button}>
              <p>Projects</p>
              <div className={styles.icon}><Image src="/toProjects.svg" alt="link" height="14px" width="14px" /></div>
            </div>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <Image src="https://avatars.githubusercontent.com/u/51217025" alt="pfp" width="384px" height="384px" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
