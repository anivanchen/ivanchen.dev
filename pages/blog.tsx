import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/About.module.css";

const Blog: NextPage = () => {
  // const [data, setData] = useState({});

  // async function fetchData() {
  //   await fetch("api/getMediumArticles")
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data)
  //     })
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // const posts: string = JSON.stringify(data)

  // if (data == null) return <p>Loading</p>

  // if (data != null) return (
  return (
    <div className={styles.container}>
      <Head>
        <title>Ivan Chen | Blog</title>
        <meta
          name="description"
          content="Ivan Chen's portfolio, built with Next.js and Typescript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* {posts.map((post: any, key: number) => (} */}

        <p className={styles.title}>Page Coming Soon...</p>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
