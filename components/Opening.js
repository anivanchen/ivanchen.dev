import styles from '../styles/Home.module.css'

export default function Opening() {
    return (
      <div className={styles.opening}>
        <div className={styles.centered}>
          <h2>Hey, I&apos;m</h2>
          <h1 className={styles.white}>Ivan Chen</h1>
          <p>I&apos;m a sophmore at <a href="https://stuy.enschool.org" className={styles.link}> Stuyvesant High School</a> {" "}
            who enjoys doing <a href="#projects" className={styles.link}>programming projects</a>
            {" "}in my spare time. I am interested in anything
            related to technology ranging from artificial
            intelligence to IT infrastructure to cyber security.
            I am a passionate software engineer and web developer,
            as well as a music lover.
          </p>
          <a href="#about"><button>About</button></a>
          <a href="#projects"><button>Projects</button></a>
          <a href="#contact"><button>Contact</button></a>
          <p className={styles.downArrow}>↓</p>
        </div>
      </div>
    )
}