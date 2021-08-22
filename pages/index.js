import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>

        </h1>

        <p className={styles.description}>

        </p>

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>&rarr;</h2>
            <p></p>
          </a>

          <a href="" className={styles.card}>
            <h2>&rarr;</h2>
            <p></p>
          </a>

          <a
            href=""
            className={styles.card}
          >
            <h2>&rarr;</h2>
            <p></p>
          </a>

          <a
            href=""
            className={styles.card}
          >
            <h2>&rarr;</h2>
            <p>

            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
