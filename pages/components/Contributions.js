import styles from '../../styles/Home.module.css';

function Contributions() {
    return (
        <>
        <section className={styles.glass + " " + styles.title}>
          <h1 className={styles.text}>Contributions</h1>
        </section>
        <div className={styles.grid}>
          <a href="https://github.com/stuyspec/stuyspec.com" target="_blank" rel="noopener noreferrer" className={styles.card + " " + styles.glass + " " + styles.wide}>
            <h2 className={styles.text}>stuyspec.com &rarr;</h2>
            <i className="devicon-react-plain" />
            <i className="devicon-graphql-plain" />
            <i className="devicon-nodejs-plain" />
            <i class="devicon-typescript-plain" />
            <i className="devicon-javascript-plain" />
            <i className="devicon-html5-plain" />
            <i className="devicon-css3-plain" />
            <i class="devicon-rails-plain" />
            <p className={styles.text}>The Stuyvesant Spectator's website, built with React, GraphQL, and Rails.</p>
          </a>
        </div>
      </>
    )
}

export default Contributions;
