
    import '../styles/globals.css'
    import { useEffect } from 'react'
    import Script from 'next/script'

    export default function App({ Component, pageProps }) {
      useEffect(() => {
        if (typeof window !== 'undefined') {
          const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
          document.documentElement.classList.toggle('dark', isDarkMode)
        }
      }, [])

      return (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script strategy="lazyOnload" id="ga-script">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
          <Component {...pageProps} />
        </>
      )
    }
    