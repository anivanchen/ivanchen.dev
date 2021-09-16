import styles from '../styles/Home.module.css'

export default function OtherProjects() {
    return (
      <div className={styles.smallProjects}>
        <div className={styles.grid}>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/crypto">
              <p>crypto →</p>
              <p>A quick cryptography solution using crypto.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/pycrypt">
              <p>pycrypt →</p>
              <p>A series of standalone scripts built with Cryptography for encryption and decryption of files / strings.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/discordbot-public">
              <p>discordbot →</p>
              <p>A discord bot built with discord.js.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/updated-manga">
              <p>updated-manga →</p>
              <p>A web scraper bot with automatic emails built with Cheerio, Axios, and NodeMailer.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/QR">
              <p>QR →</p>
              <p>A QR code generator and reader with encryption.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/morsecode">
              <p>morsecode →</p>
              <p>A Morse code encoder and decoder in Python.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/blog">
              <p>blog →</p>
              <p>A simple blog made with React, Next, GraphQL, and SQLite.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/dummytext">
              <p>dummytext →</p>
              <p>A dummy text generator.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/conversions">
              <p>conversions →</p>
              <p>A site with many unit conversions.</p>
            </a>
          </div>
          <div className={styles.smallProject}>
            <a href="https://github.com/anivanchen/my-card">
              <p>my-card →</p>
              <p>My digital contact card.</p>
            </a>
          </div>
        </div>
      </div>
    )
}