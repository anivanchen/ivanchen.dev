import styles from '../../styles/Home.module.css';

function Projects() {
    return (
        <>
        <section className={styles.glass + " " + styles.title}>
          <h1 className={styles.text}>My Projects</h1>
        </section>
        <div className={styles.grid}>
          <a href="https://github.com/anivanchen/anivanchen.github.io" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass}>
            <h2 className={styles.text}>anivanchen.github.io &rarr;</h2>
            <i className="devicon-react-plain" />
            <i className="devicon-nextjs-plain" />
            <i className="devicon-nodejs-plain" />
            <i className="devicon-javascript-plain" />
            <i className="devicon-html5-plain" />
            <i className="devicon-css3-plain" />
            <p className={styles.text}>My personal website. Built with Reactjs and Nextjs. Deployed to Github Pages.</p>
          </a>
          <a href="https://github.com/anivanchen/algorithms" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass}>
            <h2 className={styles.text}>algorithms &rarr;</h2>
            <i className="devicon-javascript-plain" />
            <i className="devicon-python-plain" />
            <p className={styles.text}>Implementation of algorithms in JavaScript and Python.</p>
          </a>
          <a href="https://github.com/anivanchen/file-server" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass}>
            <h2 className={styles.text}>file-server &rarr;</h2>
            <i className="devicon-postgresql-plain" />
            <i className="devicon-express-original" />
            <i className="devicon-react-plain" />
            <i className="devicon-nodejs-plain" />
            <i className="devicon-javascript-plain" />
            <p className={styles.text}>A simple file server with authentication built using the PERN (PostgreSQL, Express, React, Node.js) stack.</p>
          </a>
          <a href="https://github.com/anivanchen/pycrypt" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass}>
            <h2 className={styles.text}>pycrypt &rarr;</h2>
            <i className="devicon-python-plain" />
            <p className={styles.text}>A series of standalone scripts built with Cryptography for encryption and decryption of files / strings.</p>
          </a>
          <a href="https://github.com/anivanchen/DiscordBotOS" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass}>
            <h2 className={styles.text}>DiscordBotOS &rarr;</h2>
            <i className="devicon-nodejs-plain" />
            <i className="devicon-javascript-plain" />
            <p className={styles.text}>Built using Discord.js.</p>
          </a>
          <a href="https://github.com/anivanchen/crypto" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass}>
            <h2 className={styles.text}>crypto &rarr;</h2>
            <i className="devicon-react-plain" />
            <i className="devicon-nodejs-plain" />
            <i className="devicon-javascript-plain" />
            <p className={styles.text}>A quick cryptography solution using crypto.</p>
          </a>
        </div>
      </>
    )
}

export default Projects;