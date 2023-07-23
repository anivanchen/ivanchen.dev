import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ivan Chen</title>
        <meta
          name="description"
          content="Ivan Chen's personal website. Ivan Chen is a high school student at Stuyvesant High School. Ivan is also a software engineer based in New York City, working at StuyPulse and The Stuyvesant Spectator. He's also working for the Chinatown East Neighborhood Council."
        />
        <meta name="robots" content="all" />


        <meta property="og:title" content="Ivan Chen" />
        <meta property="og:site_name" content="Ivan Chen" />
        <meta
          property="og:description"
          content="Ivan Chen's personal website. Ivan Chen is a high school student at Stuyvesant High School. Ivan is also a software engineer based in New York City, working at StuyPulse and The Stuyvesant Spectator. He's also working for the Chinatown East Neighborhood Council."
        />
        <meta property="og:url" content="https://ivanchen.dev" />
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
      <Analytics />
    </>
  );
}

export default MyApp;
