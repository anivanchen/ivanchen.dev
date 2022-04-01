import type { NextPage } from "next";
import styles from "../styles/Footer.module.css";

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/anivanchen"
        target="_blank"
        rel="noopener noreferrer"
      >
        Designed and built by&nbsp;
        <p id="fancy-text">@anivanchen</p>
      </a>
    </footer>
  );
};

export default Footer;
