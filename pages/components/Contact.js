import styles from '../../styles/Home.module.css';

function Contact() {
    return (
        <>
        <div className={styles.fullScreen}>
          <section className={styles.glass + " " + styles.contact}>
            <h1 className={styles.text}>Contact Me</h1>
            <form>
                <input type="text" className={styles.textInput + " " + styles.glass} placeholder="Full Name" />
                <input type="email" className={styles.textInput + " " + styles.glass} placeholder="Email" />
                <textarea className={styles.textArea + " " + styles.glass} placeholder="Your Message" />
                <button type="submit" className={styles.submitButton + " " + styles.glass} rows="5">Submit</button>
            </form>
          </section>  
        </div>
        </>
    )
}

export default Contact;
