import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen</title>
        <meta name="description" content="Ivan Chen's Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.opening}>
        <h2>Hey, I'm</h2>
        <h1>Ivan Chen</h1>
        <p>I'm a sophmore at <a> Stuyvesant High School </a>
          who enjoys doing <a href="#highlightProjects"> programming projects </a>
          in my spare time. I am interested in anything
          related to technology ranging from artificial
          intelligence to IT infrastructure to cyber security.
          I am a passionate software engineer and web developer,
          as well as a music lover.
        </p>
        <button>About</button>
        <button>Projects</button>
        <button>Contact</button>
        <p>↓</p>
      </div>
      
      <div className={styles.about}>
        <img />
        <h2>Who Am I?</h2>

        <p>I am a student at
          <a href="https://stuy.enschool.org"> Stuyvesant High School </a>
          and am involved in <a href="https://stuypulse.com"> StuyPulse</a>,
          Stuyvesant's FIRST robotics team, where I work on creating
          material to teach future members and work with
          others to write code for our robot. I also work
          on other side projects in my free time such as
          web development and Python command line scripts,
          some of which are publically shown on my
          <a href="https://github.com/anivanchen"> GitHub profile </a>.
        </p>

        <p>My favorite programming languages are JavaScript,
          Python, and Next. I use Docker and Heroku for deployment,
          React for front-end, Express for middle-ware, Node for
          back-end, and PostgreSQL and MongoDB for database management.
        </p>
      </div>

      <div className={styles.highlightProjects}>
        <div className={styles.highlightProject}>
          <img />
          <h2>Title</h2>
          <p>Description</p>
          <p>View Project Source →</p>
          <p>View Project →</p>
        </div>
        <div className={styles.highlightProject}>
          <img />
          <h2>Title</h2>
          <p>Description</p>
          <p>View Project Source →</p>
          <p>View Project →</p>
        </div>
        <div className={styles.highlightProject}>
          <img />
          <h2>Title</h2>
          <p>Description</p>
          <p>View Project Source →</p>
          <p>View Project →</p>
        </div>
      </div>

      <div className={styles.otherProjects}>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
      </div>

      <div className={styles.contact}>
        <h2>Get in touch</h2>
        <p>Feel free to reach out! I would love to talk with anyone about
          anything. I usually reply within about a couple hours to a
          day during all hours (I'm a night owl) depending on my schedule.
          you can reach me at
          <a href="mailto:ivanchen07@gmail.com"> ivanchen07@gmail.com</a>,
          or on Discord either at
          <a href="https://discordapp.com/channels/@me/822130958148435980/"> TinyPixl#8196 </a>
          or at this <a href="https://discord.gg/YWtm6Q7JQP"> server</a>.</p>
      </div>

      <footer className={styles.footer}>
        <a className=""><i></i></a>
        <a className=""><i></i></a>
        <a className=""><i></i></a>
        <p>Report a Bug</p>
        <p>Copyright © 2021 Ivan Chen</p>
      </footer>
    </div>
  )
}
