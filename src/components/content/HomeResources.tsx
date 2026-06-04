import Image from 'next/image';
import Link from 'next/link';

import AdSense from '@/components/AdSense';
import { docArticles } from '@/content/docs';
import { ADSENSE_SLOTS } from '@/lib/adsense';

export default function HomeResources() {
  const featured = docArticles.slice(0, 4);

  return (
    <section className='mx-auto mt-16 max-w-4xl border-t border-slate-200 pt-12 dark:border-slate-700'>
      <div className='text-center'>
        <span className='tf-badge'>Resources</span>
        <h2 className='mt-3 text-2xl font-bold text-slate-900 dark:text-white'>
          FCM guides &amp; troubleshooting
        </h2>
        <p className='mx-auto mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400'>
          Original documentation written for TestFCM users — setup, tokens, platform tips, and error fixes.
        </p>
      </div>

      <div className='mt-8 grid gap-4 sm:grid-cols-2'>
        {featured.map((article) => (
          <Link
            key={article.slug}
            href={`/docs/${article.slug}`}
            className='panel-card block overflow-hidden p-0 transition hover:border-primary-300 dark:hover:border-primary-600'
          >
            {article.coverImage && !article.coverImage.src.endsWith('.svg') && (
              <div className='relative h-36 w-full'>
                <Image
                  src={article.coverImage.src}
                  alt={article.coverImage.alt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, 400px'
                />
              </div>
            )}
            <div className='p-5'>
              <h3 className='font-semibold text-slate-900 dark:text-white'>{article.title}</h3>
              <p className='mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400'>{article.description}</p>
              <span className='mt-3 inline-block text-xs font-medium text-primary-600 dark:text-primary-400'>
                {article.readTime} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className='mt-6 text-center text-sm'>
        <Link href='/docs' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
          View all {docArticles.length} guides
        </Link>
        {' · '}
        <Link href='/faq' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
          FAQ
        </Link>
        {' · '}
        <Link href='/about' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
          About TestFCM
        </Link>
      </p>

      <AdSense slot={ADSENSE_SLOTS.home} className='mx-auto mt-10 max-w-3xl' format='horizontal' />
    </section>
  );
}
