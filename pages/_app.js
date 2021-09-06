import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Ivan Chen</title>
      <meta name="description" content="Ivan Chen's Portfolio Website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
