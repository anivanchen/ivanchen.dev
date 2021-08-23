import Image from 'next/image';
import styles from '../../styles/Home.module.css';

function Landing() {
    return (
        <>
        <div className={styles.fullScreen}>
          <section className={styles.glass + " " + styles.landing}>
            <h1 className={styles.text + " " + styles.ivan}>Ivan</h1>
            <h1 className={styles.text + " " + styles.chen}>Chen</h1>
            <p className={styles.text + " " + styles.descriptionLineOne}>Software Engineer</p>
            <p className={styles.text + " " + styles.descriptionLineTwo}>Web Developer</p>
            <p className={styles.text + " " + styles.descriptionLineThree}>Student</p>
            <div className={styles.glassCircle}><p/></div>
          </section>  
        </div>
          
            
          <div className={styles.circleRed}><p/></div>
          <div className={styles.circleGreen}><p/></div>
          <div className={styles.circleBlue}><p/></div>
          <div className={styles.circlePurple}><p/></div>
          <div className={styles.circleOrange}><p/></div>
      </>
    )
}

export default Landing;