import styles from '../styles/Home.module.css'

export default function Contact() {
    return (
      < div className = { styles.contact } >
        <a id="contact"></a>
        <div className={styles.centered}>
          <h2 className={styles.red}>Get in touch</h2>
          <p>Feel free to reach out! I would love to talk with anyone about
            anything. I usually reply within about a couple hours to a
            day during all hours (I&apos;m a night owl) depending on my schedule.
            You can reach me at {" "}
            <a href="mailto:ivanchen07@gmail.com" className={styles.red + " " + styles.link}>ivanchen07@gmail.com</a>,
            or on Discord either at {" "}
            <a href="https://discordapp.com/channels/@me/822130958148435980/" className={styles.red + " " + styles.link}>TinyPixl#8196</a>
            {" "}or at this <a href="https://discord.gg/YWtm6Q7JQP" className={styles.red + " " + styles.link}>server</a>.
          </p>
        </div>
      </div>
    )
}