import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>Ivan Chen</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.13.0/devicon.min.css" />
    </Head>
      
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
