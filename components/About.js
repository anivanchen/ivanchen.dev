import styles from '../styles/Home.module.css'

export default function About() {
    return (
      <>
        <a id="about"></a>
        <div className={styles.about}>
          <div className={styles.aboutImage}>
            <img src="/ivan2.png" width="300" height="300" alt="Ivan Chen" id="aboutImg" />
          </div>
          <div className={styles.centered}>
          <h2 className={styles.red}>Who Am I?</h2>

          <p>I am a student at {" "}
            <a href="https://stuy.enschool.org" className={styles.red + " " + styles.link}>Stuyvesant High School</a>
            {" "} and am involved in <a href="https://stuypulse.com" className={styles.red + " " + styles.link}>StuyPulse</a>,
            Stuyvesant&apos;s FIRST robotics team, where I work on creating
            material to teach future members and work with
            others to write code for our robot. I also work
            on other side projects in my free time such as
            web development and Python command line scripts,
            some of which are publically shown on my {" "}
            <a href="https://github.com/anivanchen" className={styles.red + " " + styles.link}>GitHub profile</a>.
          </p>

          <p>My favorite programming languages are JavaScript,
            Python, and Next. I use Docker and Heroku for deployment,
            React for front-end, Express for middle-ware, Node for
            back-end, and PostgreSQL and MongoDB for database management.
          </p>
          </div>
        </div>
      </>
    )
}