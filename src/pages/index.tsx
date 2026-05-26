import { SpeedInsights } from '@vercel/speed-insights/next';
import { ToastContainer } from 'react-toastify';

import AdSense from '@/components/AdSense';
import BetaWarning from '@/components/BetaWarning';
import EmailView from '@/components/EmailView';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import NotificationField from '@/components/NotificationField';
import Seo from '@/components/Seo';

import { ADSENSE_SLOTS } from '@/lib/adsense';

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <SpeedInsights />
      <Navbar />
      <BetaWarning />
      <main className='pt-20 pb-24'>
        <section id='TestFCM' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 text-center md:mb-10'>
            <span className='tf-badge mb-3'>Firebase Cloud Messaging</span>
            <h1 className='text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl'>
              Test Push Notifications Online
            </h1>
            <p className='mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400'>
              Send FCM notifications via HTTP v1 — no backend required.
            </p>
            <AdSense slot={ADSENSE_SLOTS.home} className='mx-auto mt-6 max-w-3xl' format='horizontal' />
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-8'>
            <div className='order-2 flex flex-col lg:order-1 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto'>
              <EmailView />
            </div>
            <div className='order-1 flex flex-col lg:order-2 lg:sticky lg:top-24'>
              <NotificationField />
            </div>
          </div>
        </section>
      </main>
      <ToastContainer
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Layout>
  );
}
