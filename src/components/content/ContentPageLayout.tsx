import Link from 'next/link';
import type { ReactNode } from 'react';

import AdSense from '@/components/AdSense';
import DocImage, { DocImageData } from '@/components/content/DocImage';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Seo from '@/components/Seo';

import { ADSENSE_SLOTS } from '@/lib/adsense';

type ContentPageLayoutProps = {
  title: string;
  description: string;
  badge?: string;
  updated?: string;
  showAd?: boolean;
  coverImage?: DocImageData;
  children: ReactNode;
};

export default function ContentPageLayout({
  title,
  description,
  badge = 'Guide',
  updated = 'May 2026',
  showAd = true,
  coverImage,
  children,
}: ContentPageLayoutProps) {
  return (
    <Layout>
      <Seo templateTitle={title} description={description} />
      <Navbar />
      <main className='pt-20 pb-24'>
        <article className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
          <header className='mb-10 text-center'>
            <span className='tf-badge'>{badge}</span>
            <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>{title}</h1>
            <p className='mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
              {description}
            </p>
            <p className='mt-2 text-xs text-slate-400 dark:text-slate-500'>Last updated: {updated}</p>
          </header>

          {coverImage && (
            <DocImage {...coverImage} className='mb-8' />
          )}

          <div className='panel-card prose-content text-left'>{children}</div>

          {showAd && (
            <AdSense slot={ADSENSE_SLOTS.sidebar} className='mx-auto mt-10 max-w-2xl' format='horizontal' />
          )}

          <p className='mt-10 text-center text-sm text-slate-500 dark:text-slate-400'>
            Ready to test?{' '}
            <Link href='/' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
              Open the FCM tester
            </Link>
            {' · '}
            <Link href='/docs' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
              Browse all guides
            </Link>
          </p>
          <p className='mt-4 text-center text-[10px] text-slate-400 dark:text-slate-500'>
            Guide photos from{' '}
            <a href='https://unsplash.com' target='_blank' rel='noopener noreferrer' className='hover:underline'>
              Unsplash
            </a>{' '}
            &amp;{' '}
            <a href='https://www.pexels.com' target='_blank' rel='noopener noreferrer' className='hover:underline'>
              Pexels
            </a>{' '}
            (free license)
          </p>
        </article>
      </main>
    </Layout>
  );
}
