import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen</title>
        <meta
          name="description"
          content="Ivan Chen's personal website. Ivan Chen is a high school student at Stuyvesant High School. Ivan is also a software engineer based in New York City, working at StuyPulse and The Stuyvesant Spectator. He's also working for the Chinatown East Neighborhood Council."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h2 style={{fontSize: "2rem", marginBottom: "0"}}>
            Hi! I&apos;m
          </h2>
          <h1 className={styles.title} id="fancy-text">
            Ivan Chen
          </h1>
          <div className={styles.inline} style={{ marginBottom: "4rem" }}>
            <div className={styles.link}>
              <a href="https://github.com/anivanchen" className={styles.inline}>
                <div>
                  <Image
                    src="/github.svg"
                    alt="github"
                    width={14}
                    height={14}
                    layout="fixed"
                  />
                </div>
                GitHub
                <div>
                  <Image
                    src="/link.svg"
                    alt="link"
                    width={14}
                    height={14}
                    layout="fixed"
                  />
                </div>
              </a>
            </div>
            <div className={styles.link}>
              <a
                href="https://linkedin.com/in/anivanchen"
                className={styles.inline}
              >
                <div>
                  <Image
                    src="/linkedin.svg"
                    alt="linkedin"
                    width={14}
                    height={14}
                    layout="fixed"
                  />
                </div>
                Linkedin
                <div>
                  <Image
                    src="/link.svg"
                    alt="link"
                    width={14}
                    height={14}
                    layout="fixed"
                  />
                </div>
              </a>
            </div>
          </div>
          <p className={styles.text}>
            I&apos;m a junior at{" "}
            <a href="https://stuy.enschool.org/" id="fancy-text">
              Stuyvesant High School
            </a>
            . I’m a software engineer{" "}
            <a href="https://stuypulse.com" id="fancy-text">
              @StuyPulse
            </a>{" "}
            and a web developer {""}
            <a href="https://junior.stuysu.org" id="fancy-text">
              @StuySU
            </a>{" "}
            and{" "}
            <a href="https://stuyspec.com" id="fancy-text">
              @StuyvesantSpectator
            </a>
            .
          </p>
          <p className={styles.text}>
            I&apos;m passionate about robotics, web development, IT infrastructure,
            embedded systems, game design, and 3D modeling. I use Java, TypeScript,
            Next.js, Unity, and Blender for my projects.
          </p>
          <Link href="/about" passHref legacyBehavior>
            {/* change to projects when completed */}
            <div className={styles.button}>
              <p>About</p>
              <div className={styles.icon}>
                <Image
                  src="/toProjects.svg"
                  alt="link"
                  height={14}
                  width={14}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="https://avatars.githubusercontent.com/u/51217025"
            alt="pfp"
            width={384}
            height={384}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
