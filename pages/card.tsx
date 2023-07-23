import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Card.module.css";

const Card: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | Card</title>
        <meta
          name="description"
          content="Ivan Chen's personal website. Ivan Chen is a high school student at Stuyvesant High School. Ivan is also a software engineer based in New York City, working at StuyPulse and The Stuyvesant Spectator. He's also working for the Chinatown East Neighborhood Council."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.front}>
              <div className={styles.cardImage}>
                <div className={styles.imageContainer}>
                  <Image
                    src="https://avatars.githubusercontent.com/u/51217025"
                    alt="pfp"
                    width={192}
                    height={192}
                  />
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inline}>
                  <h1 className={styles.cardTitle} id="fancy-text">
                    Ivan Chen
                  </h1>
                  <p className={styles.cardSubtitle}>@anivanchen</p>
                </div>
                <p>Software Engineer | Web Developer | Designer</p>
                <p>Stuyvesant High School</p>
              </div>
            </div>
            <div className={styles.back}>
              <div className={styles.githubUserContent}>
                <div className={styles.item}>
                  <h1 id="fancy-text">50</h1>
                  <p>repos</p>
                </div>
                <div className={styles.item}>
                  <h1 id="fancy-text">1,318</h1>
                  <p>contributions</p>
                </div>
                <div className={styles.item}>
                  <h1 id="fancy-text">20</h1>
                  <p>followers</p>
                </div>
              </div>
              <div className={styles.orgs}>
                <a href="mailto:me@ivanchen.dev">me@ivanchen.dev</a>
                <p>@stuypulse | @stuysu | @stuyspectator</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Card;
