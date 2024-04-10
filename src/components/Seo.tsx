import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

// !STARTERCONF Change these default meta
const defaultMeta = {
  title: 'Push Notification Tester |  Test Mobile Push Notification',
  siteName: 'Push Notification Tester',
  description:
    'Online Testing Site for Firebase Cloud Messaging (FCM) push notification from your Mobile Applications.',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://www.testfcm.in',
  type: 'website',
  robots: 'follow, index',
  /**
   * No need to be filled, will be populated with openGraph function
   * If you wish to use a normal image, just specify the path below
   */
  image: 'https://www.testfcm.in/images/og.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();

  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // Use siteName if there is templateTitle
  // but show full title if there is none
  // !STARTERCONF Follow config for opengraph, by deploying one on https://github.com/theodorusclarence/og
  // ? Uncomment code below if you want to use default open graph
  // meta['image'] = openGraph({
  //   description: meta.description,
  //   siteName: props.templateTitle ? meta.siteName : meta.title,
  //   templateTitle: props.templateTitle,
  // });

  return (
    <>
      <Script id='schema' type='application/ld+json'>
        {`

      {
        "@context": "https://schema.org/",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
      "@id": "https://www.testfcm.in/"
},
      "headline": "Push Notification Tester | Test Mobile Push Notification",
      "description": "Online Testing Site for Firebase Cloud Messaging (FCM) push notification from your Mobile Applications.",
      "image": {
        "@type": "ImageObject",
      "url": "https://www.testfcm.in/images/og.png",
      "width": "2280",
      "height": "1580"
},
      "author": {
        "@type": "Person",
      "name": "Dhruv Dave"
},
      "publisher": {
        "@type": "Organization",
      "name": "Dhruv Dave",
      "logo": {
        "@type": "ImageObject",
      "url": "https://www.testfcm.in/favicon/favicon-57x57.png",
      "width": "57",
      "height": "57"
  }
},
      "datePublished": "2022-08-09",
      "dateModified": "2022-10-22"
}
`}
      </Script>
      <Head>
        <title>{meta.title}</title>

        <meta
          name='google-site-verification'
          content='W6UjtF3maZMRBigZE1n56Z8nsQXPaSbDvdnL-a8sLC8'
        />
        <meta name='robots' content={meta.robots} />
        <meta name='description' content={meta.description} />
        <meta
          name='keywords'
          content='Test FCM, Online FCM testing tool, Firebase Cloud Messaging, Try Firebase Cloud Messaging,
        Test Push Notifiaction Online, FCM messages test notification, CM, Firebase iOS, FCM Tester, FCM iOS,
        Firebase Android, apns production ios, ios push notifications, push notifications for iOS and android,
        apps with push notifications, Apple push notification service for iPhone and iPad, push messaging,
        google cloud messaging ios, gcm push notification and android push test, push testers, online testing apns,
        test gcm online, send gcm notification online, gcm message, GCM, APNS'
          className='next-head'
        />
        <meta property='og:url' content={`${meta.url}${router.asPath}`} />
        <link rel='canonical' href={`${meta.url}${router.asPath}`} />
        {/* Open Graph */}
        <link rel='manifest' href='/manifest.json' />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content={meta.siteName} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta name='image' property='og:image' content={meta.image} />
        {/* Twitter */}
        <meta name='twitter:card' content={meta.image} />
        <meta name='twitter:site' content='https://www.testfcm.in/' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
        {meta.date && (
          <>
            <meta property='article:published_time' content={meta.date} />
            <meta
              name='publish_date'
              property='og:publish_date'
              content={meta.date}
            />
            <meta
              name='author'
              property='article:author'
              content='Theodorus Clarence'
            />
          </>
        )}

        {/* Favicons */}
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta
          name='msapplication-TileImage'
          content='https://www.testfcm.in/favicon/ms-icon-144x144.png'
        />
        <meta name='theme-color' content='#ffffff' />
      </Head>
    </>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

// !STARTERCONF this is the default favicon, you can generate your own from https://www.favicon-generator.org/ then replace the whole /public/favicon folder
const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: 'https://www.testfcm.in/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: 'https://www.testfcm.in/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: 'https://www.testfcm.in/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: 'https://www.testfcm.in/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: 'https://www.testfcm.in/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: 'https://www.testfcm.in/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: 'https://www.testfcm.in/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: 'https://www.testfcm.in/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: 'https://www.testfcm.in/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/https://www.testfcm.infavicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: 'https://www.testfcm.in/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: 'https://www.testfcm.in/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: 'https://www.testfcm.in/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: 'https://www.testfcm.in/favicon/manifest.json',
  },
];
