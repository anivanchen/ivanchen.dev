import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Giveaway.module.css";

import Footer from "../components/Footer";

const Giveaways: NextPage = () => { 

  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | Giveaways</title>
        <meta
          name="description"
          content="Ivan Chen's portfolio, built with Next.js and Typescript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1 id="fancy-text">Happy April Fools Day!</h1>
          <h3>No free donut for you but here&apos;s a rick roll!</h3>
          {/* <video width="80%" loop autoPlay muted preload="auto" className={styles.centered}>
            <source src={"/rick.mp4"} type="video/mp4" />
          </video> */}
          <iframe data-v-8e62c10e="" id="video-frame" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?&amp;enablejsapi=1&amp;autoplay=1&amp;mute=0" frameBorder="0" width="100%" height="480px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{maxWidth: "720px"}} />
          <h3>Now don&apos;t spoil it for other people :3</h3>
        </div>
      </main>

      <Footer />

    </div>
  )
}

export default Giveaways;
