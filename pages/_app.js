import Head from 'next/head'
import '../styles/globals.css'

import seoimage from '../public/seoimage.png'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Ivan Chen</title>
      <meta name="description" content="My portfolio!" />
      <meta property="og:title" content="Ivan Chen" />
      <meta property="og:description" content="My portfolio!" />
      <meta property="og:url" content="https://anivanchen.github.io/" />
      <meta property="og:image" content={seoimage} />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
        
      <meta name="google-site-verification" content="X4_LgSQJICGZZM7kYShP-XXRpkoEc4Oy9l2vmo1JW_w" />
        
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta name="twitter:creator" content="anivanchen_" key="twhandle" />
        
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
