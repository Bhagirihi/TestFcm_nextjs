import { ToastContainer } from 'react-toastify';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Emailpage from '@/pages/_emailview';
import Header from '@/pages/_header';
import Notification from '@/pages/_notificationfield';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-transparent'>
          <div className='flex text-center'>
            <div className='hidden min-h-screen w-1/2  flex-col p-8 dark:bg-darkd  md:flex '>
              <Emailpage />
            </div>
            <div className=' flex min-h-screen w-full p-5  dark:bg-darkl md:w-1/2 md:p-8'>
              <div className='flex w-full flex-col'>
                <Header />
                <div className='w-full  p-1 md:p-6'>
                  <Notification />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </Layout>
  );
}
