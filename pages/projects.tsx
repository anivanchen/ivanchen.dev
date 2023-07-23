import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/About.module.css";

const Projects: NextPage = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | Projects</title>
        <meta
          name="description"
          content="Ivan Chen's personal website. Ivan Chen is a high school student at Stuyvesant High School. Ivan is also a software engineer based in New York City, working at StuyPulse and The Stuyvesant Spectator. He's also working for the Chinatown East Neighborhood Council."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <p className={styles.title}>Page Coming Soon...</p>
        <a className={styles.centered} href="https://github.com/anivanchen"><h2>@anivanchen</h2></a>

        {/* <div className={styles.project}>
          <div className={styles.githubContent}>
            <div className={styles.inline}>
              <h1 className={styles.title}>Ariadne</h1>
              <Image src="/lightbulb.svg" width={20} height={20} />
              <p>Featured Project</p>
            </div>
            <h3>Web Development</h3>
            <div className={styles.descriptionBar}>
              <p>Ariadne is the information hub for Stuyvesant High School. Powered by NextJS and an Express REST API. </p>
            </div>
            <p>NextJS, Express, PostgreSQL, Natural.js, Sequelize, Node.js</p>
            <div className={styles.inline}>
              <a>
                <Image src="/github.svg" width={24} height={24} />
              </a>
              <a>
                <Image src="/link.svg" width={24} height={24} />
              </a>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <Image src="/test-image.png" width={572} height={402} />
          </div>
        </div>

        <div className={styles.centered}>
          <a href="mailto:ivanchen07@gmail.com">
            <div className={styles.button + " " + styles.centered}>
              <p>About Me</p>
              <div className={styles.icon}><Image src="/link-dark.svg" alt="link" height={14} width={14} /></div>
            </div>
          </a>
        </div> */}
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://api.github.com/users/anivanchen/repos");
  const repos = await response.json();

  return {
    props: {
      repos,
    },
  };
}

export default Projects;
