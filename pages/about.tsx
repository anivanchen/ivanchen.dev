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
      title: "Vice President of Software Engineering",
      company: "StuyPulse",
      link: "https://stuypulse.com",
      start: "May 2022",
      end: "May 2023",
      contributions: [
        "Led a team of 130+ members through the FRC season, to multiple competitions, and world championships.",
        "Managed a department of 40+ members to write clean and functional code.",
        "Worked extensively with members and fellow leadership members to design, build, program, and test world-class FRC robots with advanced controls and engineering knowledge.",
        "Led efforts in exploring innovative technologies through dedicated research initiatives.",
      ],
    },
    {
        title: "Software Engineer / Webmaster",
        company: "StuyPulse",
        link: "https://stuypulse.com",
        start: "October 2020",
        end: "Current",
      contributions: [
        "Developed and tested the code for two highly esteemed robots, ranked #24 and #26 in the world during the 2022 and 2023 seasons.",
        "Mentored newcomers to the team and taught them programming, vital robotics concepts, and advanced topics.",
        "Took on the responsibility of creating educational resources to impart knowledge to new team members and ensure the preservation of our existing expertise.",  
        "Maintained the StuyPulse website with most updated information.",
        "Wrote concise documentation to guide future members on various topics related to both physical hardware and software.",
        ],
    },
    {
      title: "Lead Developer & Designer",
      company: "The Stuyvesant Spectator",
      link: "https://stuyspec.com",
      start: "November 2021",
      end: "Current",
      contributions: [
        "Wrote modern, performant, and maintainable code for a redesign of the existing website.",
        "Led effort to completely redesign and build a new website that was more stable and featured a modern new design.",
        "Reworked the workflow of uploading articles to the website for greater efficiency and a better user experience.",
      ],
    },
    {
      title: "Director of IT",
      company: "StuySU Junior Caucus",
      link: "https://junior.stuysu.org",
      start: "August 2022",
      end: "Current",
      contributions: [
        "Co-led and worked on creating a new website design.",
      ],
    },
    {
      title: "Director of IT",
      company: "StuySU Sophomore Caucus",
      link: "https://sophomore.stuysu.org",
      start: "September 2021",
      end: "July 2022",
      contributions: [
        "Modernize and redesign the CMS of the Sophomore Caucus website.",
        "Worked on loading speed optimization of the website.",
        "Updated landing page to reflect new school year.",
        "Led a project to create a centralized search engine for information in the school.",
      ],
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | About</title>
        <meta
          name="description"
          content="Ivan Chen's portfolio, built with Next.js and Typescript."
        />
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
          I'm currently a rising senior at Stuyvesant High School.
          I'm currently a Lead Software Engineer at StuyPulse and
          was the Vice President of Software Engineering for the
          2023 FRC season. I'm also currently a part of The Stuyvesant
          Spectator as the Lead Web Developer. I was involved in the
          Stuyvesant Student Union as a Director of IT for the Sophomore
          and Junior caucuses.
        </p>

        {/* <p className={styles.title}>Technologies I use:</p>
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
        </div> */}

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
          <a href="mailto:me@ivanchen.dev">
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
