import { SpeedInsights } from '@vercel/speed-insights/next';
import { ToastContainer } from 'react-toastify';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Betawarning from '@/pages/_betawarning';
import Contactus from '@/pages/_contactus';
import Emailpage from '@/pages/_emailview';
import Navbar from '@/pages/_navbar';
import Notification from '@/pages/_notificationfield';

export default function HomePage() {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <SpeedInsights />
      <main>
        <Navbar />
        <Betawarning />
        <section className='my-20 bg-transparent' id='TestFCM'>
          <div className='flex flex-col-reverse text-center md:flex-row'>
            <div className=' h-auto w-full flex-col p-8  dark:bg-darkd md:flex md:min-h-screen  md:w-1/2 '>
              <Emailpage />
            </div>
            <div className=' flex min-h-screen w-full p-5  dark:bg-darkl md:w-1/2 md:p-8'>
              <Notification />
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </Layout>
  );
}
