import { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Seo from '@/components/Seo';

import { wrapper } from '../../redux/store';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV !== 'development' && (
        <Script id='BLOBK_INSPECT'>
          {`
        // Disable right-click
        document.addEventListener('contextmenu', (e) => e.preventDefault());

        function ctrlShiftKey(e, keyCode) {
          return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
        }

        document.onkeydown = (e) => {
          // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
          if (
            event.keyCode === 123 ||
            ctrlShiftKey(e, 'I') ||
            ctrlShiftKey(e, 'J') ||
            ctrlShiftKey(e, 'C') ||
            (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
          )
            return false;
        };
        `}
        </Script>
      )}

      <Script
        id='GOOGLE_ANALYTICS_ID'
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id='GOOGLE_ANALYTICS_SCRIPT' strategy='lazyOnload'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>

      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5363029561384244'
        crossorigin='anonymous'
      ></Script>

      <Seo />
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
