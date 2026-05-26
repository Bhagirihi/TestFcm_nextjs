import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Seo from '@/components/Seo';

export default function NotFound() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />
      <Navbar />
      <main className='pt-20'>
        <section className='mx-auto flex min-h-[50vh] max-w-lg items-center justify-center px-4 py-16'>
          <div className='panel-card w-full text-center'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/50'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='h-7 w-7 text-primary-600 dark:text-primary-400'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>Page not found</h1>
            <p className='mt-3 text-sm text-slate-500 dark:text-slate-400'>
              The page you are looking for doesn&apos;t exist.
            </p>
            <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center'>
              <Link href='/' className='tf-btn-primary inline-flex !w-auto justify-center px-8'>
                Take me home
              </Link>
              <Link href='/contactus' className='tf-btn-secondary inline-flex !w-auto justify-center px-8'>
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
