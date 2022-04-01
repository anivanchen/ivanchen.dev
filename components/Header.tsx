import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header: NextPage = () => {
  let pageName = useRouter().pathname.split("/").pop();
  if (pageName != undefined) {
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        Home
      </Link>
      <Link href="/projects" passHref>
        Projects
      </Link>
      <Link href="/about" passHref>
        About
      </Link>
      <Link href="/card" passHref>
        Card
      </Link>
      <Link href="/blog" passHref>
        Blog
      </Link>
    </header>
  );
};

export default Header;
