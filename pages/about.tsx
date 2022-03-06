import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/About.module.css";

const About: NextPage = () => {
  const socials: Array<{
    name: string;
    link: string;
  }> = [
    {
      name: "Discord",
      link: "https://discordapp.com/channels/@me/822130958148435980/",
    },
    {
      name: "Linkedin",
      link: "https://linkedin.com/in/anivanchen/",
    },
    {
      name: "Github",
      link: "https://github.com/anivanchen",
    },
    {
      name: "Instagram",
      link: "https://instagram.com/ivva_enn/",
    },
    {
      name: "Facebook",
      link: "https://facebook.com/profile.php?id=100052459366024",
    },
  ];

  const experience: Array<{
    title: string;
    company: string;
    link: string;
    start: string;
    end: string;
    contributions: Array<string>;
  }> = [
    {
      title: "Director of IT",
      company: "StuySU Sophomore Caucus",
      link: "https://sophomore.stuysu.org",
      start: "September 2021",
      end: "Current",
      contributions: [
        "Modernize and redesign the CMS of the Sophomore Caucus website.",
        "Worked on loading speed optimization of the website.",
        "Updated landing page to reflect new school year.",
      ],
    },
    {
      title: "Software Engineer / Webmaster",
      company: "StuyPulse",
      link: "https://stuypulse.com",
      start: "October 2020",
      end: "Current",
      contributions: [
        "Maintain the StuyPulse website with most updated information.",
        "Wrote concise documentation to guide future members on various topics related to both physical hardware and software.",
        "Created material used to teach new members programming using Java, WPILib, and StuyLib.",
        "Helped teach new members Java, WPILib, and StuyLib.",
        "Co-led team to successfully implement autonomous logic for a subsystem of the 2022 season robot.",
      ],
    },
    {
      title: "Fullstack Developer / Lead Designer",
      company: "The Stuyvesant Spectator",
      link: "https://stuyspec.com",
      start: "November 2021",
      end: "Current",
      contributions: [
        "Wrote modern, performant, and maintainable code for a redesign of the existing website.",
        "Worked on the design and prototype of the entire website.",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | About</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="https://avatars.githubusercontent.com/u/51217025"
            alt="pfp"
            width="192px"
            height="192px"
          />
        </div>
        <h1 className={styles.title} id="fancy-text">
          Ivan Chen
        </h1>
        <div className={styles.inline + " " + styles.centered}>
          {socials.map((social, key) => (
            <div className={styles.link} key={key}>
              <a href={social.link} className={styles.inline}>
                <div>
                  <Image
                    src={`/${social.name.toLowerCase()}.svg`}
                    alt={social.name}
                    width={14}
                    height={14}
                    layout="fixed"
                  />
                </div>
                {social.name}
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
          ))}
        </div>
        <p>
          I’m a passionate software engineer and web developer who loves playing
          around with new technologies for fun. I enjoy playing around with IT
          and writing code to automate various actions I do on a daily basis. As
          a student, I don’t have much time to program every day, but I try my
          best to write at least a couple lines of code a day. I’m also an avid
          music listener.
        </p>

        <p className={styles.title}>Technologies I use:</p>
        <div className={styles.techs}>
          <ul>
            <li>JavaScript</li>
            <li>Typescript</li>
            <li>Python</li>
            <li>Next.js</li>
            <li>React.js</li>
            <li>MongoDB</li>
            <li>Docker</li>
          </ul>
          <ul>
            <li>PostgreSQL</li>
            <li>Sequelize</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>CSS</li>
            <li>Heroku</li>
          </ul>
        </div>

        <h2 className={styles.heading} id="fancy-text">
          Experience:
        </h2>
        {experience.map((job, key) => (
          <div className={styles.item} key={key}>
            <h3>
              {job.title} -{" "}
              <a href={job.link} id="fancy-text">
                {job.company}
              </a>
            </h3>
            <p>
              {job.start} - {job.end}
            </p>
            <ul className={styles.list}>
              {job.contributions.map((contribution, key) => (
                <li key={key}>{contribution}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.centered}>
          <a href="mailto:ivanchen07@gmail.com">
            <div className={styles.button + " " + styles.centered}>
              <p>Contact Me</p>
              <div className={styles.icon}>
                <Image src="/mail.svg" alt="link" height="14px" width="14px" />
              </div>
            </div>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
