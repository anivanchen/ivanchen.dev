import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/About.module.css";

const Blog: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | Blog</title>
        <meta
          name="description"
          content="Ivan Chen's personal website. Ivan Chen is a high school student at Stuyvesant High School. Ivan is also a software engineer based in New York City, working at StuyPulse and The Stuyvesant Spectator. He's also working for the Chinatown East Neighborhood Council."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <p className={styles.title}>Page Coming Soon...</p>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
