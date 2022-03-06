import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/Head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ivan Chen</title>
        <meta name="description" content="Ivan Chen's portfolio, built with Next.js and Typescript." />
        <meta property="og:title" content="Ivan Chen" />
        <meta property="og:site_name" content="Ivan Chen" />
        <meta property="og:description" content="Ivan Chen's portfolio, built with Next.js and Typescript." />
        <meta property="og:url" content="https://anivanchen.vercel.app" />
        {/* <meta property="og:image" content="https://anivanchen.github.io/seoimage.png" /> */}
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* <meta name="google-site-verification" content="X4_LgSQJICGZZM7kYShP-XXRpkoEc4Oy9l2vmo1JW_w" /> */}
        
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
