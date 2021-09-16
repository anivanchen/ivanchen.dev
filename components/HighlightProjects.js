import styles from '../styles/Home.module.css'

export default function HighlightProjects() {
    return (
      <>
        <a id="projects"></a>
        <div className={styles.highlightProjects}>
          <div className={styles.grid}>
            <div className={styles.highlightProject}>
              <div className={styles.projectImage}>
                <img src="/logo.png" width="200" height="200" alt="" />
              </div>
              <h2>anivanchen.github.io</h2>
              <p>My personal website built with Next.js.</p>
              <p><a href="https://github.com/anivanchen/anivanchen.github.io" className={styles.link}>View Code →</a></p>
              <p><a href="https://anivanchen.github.io" className={styles.link}>View Project →</a></p>
            </div>
            <div className={styles.highlightProject}>
              <div className={styles.projectImage}>
                <img src="/algorithms.png" width="200" height="200" alt="" />
              </div>
              <h2>algorithms</h2>
              <p>This project contains my implementations of various algorithms in JavaScript and Python.</p>
              <p><a href="https://github.com/anivanchen/algorithms" className={styles.link}>View Code →</a></p>
            </div>
            <div className={styles.highlightProject}>
              <div className={styles.projectImage}>
                <div className={styles.placeholderImage} />
              </div>
              <h2>file-server</h2>
              <p>A simple file server with authentication built using the PERN (PostgreSQL, Express, React, Node.js) stack.</p>
              <p><a href="https://github.com/anivanchen/file-server" className={styles.link}>View Code →</a></p>
              {/* <a href="https://" className={styles.link}>View Project →</a> */}
            </div>
          </div>
        </div>
      </>
    )
}