import Layout from '@/components/layout/Layout';
import AdSense from '@/components/AdSense';
import Seo from '@/components/Seo';

import { ADSENSE_SLOTS } from '@/lib/adsense';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Navbar from '@/components/Navbar';

function contactus(props: any) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState("Let's Connect");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    const tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors['fullname'] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors['email'] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors['subject'] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors['message'] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log('errors', errors);
    return isValid;
  };

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText('Connecting ...');
      const res = await fetch('/api/contactus', {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (res.status == 200) {
        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setButtonText('Connected');
        // Reset form fields
        setFullname('');
        setEmail('');
        setMessage('');
        setSubject('');
        toast.success(`Thank you ! Your Message has been delivered.`, {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.log('--- in', error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Let's Connect");

        // Reset form fields
        setFullname('');
        setEmail('');
        setMessage('');
        setSubject('');
        toast.error(`Oops! Something went wrong, please try again.`, {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
        return true;
      }
    }
    console.log('-----LAST', fullname, email, subject, message);
  };

  return (
    <Layout>
  <Seo templateTitle='Contact us' />
  <Navbar />
        <SpeedInsights />

      <section id='LetsConnect' className='mx-auto max-w-5xl px-4 pt-24 pb-8 text-center sm:px-6'>
        <span className='tf-badge'>Get in touch</span>
        <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl'>
          Connect With Us
        </h1>
        <p className='mx-auto mt-3 max-w-lg text-sm text-slate-500 dark:text-slate-400'>
          Have feedback or found an issue? We would love to hear from you.
        </p>
        <AdSense slot={ADSENSE_SLOTS.contact} className='mx-auto mt-6 max-w-2xl' format='horizontal' />
      </section>

      <div className='mx-auto max-w-5xl px-4 pb-24 sm:px-6'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='panel-card flex flex-col justify-center'>
            <span className='tf-badge w-fit'>Let&apos;s talk</span>
            <h2 className='mt-4 text-2xl font-bold text-slate-900 dark:text-white'>Upgrading to FCM HTTP v1</h2>
            <p className='mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
              TestFCM.in uses the FCM HTTP v1 protocol only. If you encounter any issues,
              please share feedback using the form on this page.
            </p>
            <p className='mt-4 text-sm text-slate-500 dark:text-slate-400'>Thank you for your support.</p>
          </div>

          <form onSubmit={handleSubmit} className='panel-card space-y-5'>
            <h2 className='panel-title'>Send a message</h2>

            <div>
              <label htmlFor='fullname' className='tf-label'>
                Full name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                name='fullname'
                className='tf-input'
              />
              {errors?.fullname && <p className='mt-1 text-xs text-red-500'>Fullname cannot be empty.</p>}
            </div>

            <div>
              <label htmlFor='email' className='tf-label'>
                E-mail <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='tf-input'
              />
              {errors?.email && <p className='mt-1 text-xs text-red-500'>Email cannot be empty.</p>}
            </div>

            <div>
              <label htmlFor='subject' className='tf-label'>
                Subject <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className='tf-input'
              />
              {errors?.subject && <p className='mt-1 text-xs text-red-500'>Subject cannot be empty.</p>}
            </div>

            <div>
              <label htmlFor='message' className='tf-label'>
                Message <span className='text-red-500'>*</span>
              </label>
              <textarea
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='tf-input min-h-[120px]'
              />
              {errors?.message && <p className='mt-1 text-xs text-red-500'>Message body cannot be empty.</p>}
            </div>

            <button aria-label='Notification_Save' type='submit' className='tf-btn-primary !w-auto px-8'>
              {buttonText}
            </button>
          </form>
        </div>
      </div>

    </Layout>
  );
}
const mapStateToProps = (state: { main: { user: unknown[] } }) => ({
  user: state.main.user,
});

export default connect(mapStateToProps, [])(contactus);
