import Image from 'next/image';
import Link from 'next/link';

import ContentPageLayout from '@/components/content/ContentPageLayout';
import { docArticles } from '@/content/docs';

export default function DocsIndexPage() {
  return (
    <ContentPageLayout
      title='FCM Documentation & Guides'
      description='Original guides for testing Firebase Cloud Messaging HTTP v1 — setup, OAuth tokens, device tokens, and troubleshooting.'
      badge='Documentation'
      showAd={true}
    >
      <p>
        Browse step-by-step articles written for TestFCM.in users. Each guide includes screenshots and
        illustrations to help you configure and test push notifications without a custom backend.
      </p>
      <ul className='!mt-8 !list-none !pl-0'>
        {docArticles.map((article) => (
          <li
            key={article.slug}
            className='mb-6 overflow-hidden rounded-xl border border-slate-200 last:mb-0 dark:border-slate-700'
          >
            <Link href={`/docs/${article.slug}`} className='flex flex-col sm:flex-row'>
              {article.coverImage && !article.coverImage.src.endsWith('.svg') && (
                <div className='relative h-40 w-full shrink-0 sm:h-auto sm:w-44'>
                  <Image
                    src={article.coverImage.src}
                    alt={article.coverImage.alt}
                    fill
                    className='object-cover'
                    sizes='176px'
                  />
                </div>
              )}
              <div className='flex flex-1 flex-col justify-center p-4'>
                <span className='text-base font-semibold text-slate-900 dark:text-white'>{article.title}</span>
                <p className='mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400'>{article.description}</p>
                <span className='mt-2 text-xs text-primary-600 dark:text-primary-400'>
                  {article.readTime} →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </ContentPageLayout>
  );
}
