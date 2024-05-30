import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { connect } from 'react-redux';
import Seo from '@/components/Seo';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/pages/_navbar';
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';

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

      <section id='LetsConnect' className='mt-10 bg-transparent'>
        <Link href='#LetsConnect'>
          <h3 className='pt-10 text-center text-4xl  font-bold text-black dark:text-white'>Connect With US</h3>
        </Link>
      </section>
      <div className='mt-6 grid grid-cols-1 gap-4 rounded-lg bg-gray-900 p-8 pt-10 dark:bg-darkd  md:h-96 md:grid-cols-2 lg:px-40'>
        <div className='mx-auto mb-10 md:mt-20'>
          <div className='badge inline-block rounded-xl bg-green-500'>
            <p className='px-2 py-1 text-base font-light  text-gray-900 dark:text-white'>Lets talk</p>
          </div>
          <h4 className='mt-4 text-4xl font-bold text-white'>Lets talk about ...</h4>
          <p className='mt-4 text-sm font-light text-white'>
            {`As the Firebase FCM Legacy API is deprecated, we are upgrading to
            the FCM HTTP v1 protocol.  If you encounter any issues while using
            TestFCM.in, please provide feedback on Connect With US
            .`}
          </p>

          <p className='mt-4 text-sm font-light text-white'>{` Thank you for your support.`}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col rounded-lg border-2 border-gray-900 bg-white px-8 py-8 shadow-xl  dark:border-white dark:bg-gray-900'
        >
          <h2 className='text-2xl font-bold dark:text-gray-50'>Send a message</h2>

          <label htmlFor='fullname' className='mt-8 font-light text-gray-500 dark:text-gray-50'>
            Full name
            <span className='text-red-500 dark:text-gray-50'>*</span>
          </label>
          <input
            type='text'
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            name='fullname'
            className='border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1'
          />
          {errors?.fullname && <p className='text-red-500'>Fullname cannot be empty.</p>}

          <label htmlFor='email' className='mt-4 font-light text-gray-500 dark:text-gray-50'>
            E-mail<span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1'
          />
          {errors?.email && <p className='text-red-500'>Email cannot be empty.</p>}

          <label htmlFor='subject' className='mt-4 font-light text-gray-500 dark:text-gray-50'>
            Subject<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='subject'
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            className='border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1'
          />
          {errors?.subject && <p className='text-red-500'>Subject cannot be empty.</p>}
          <label htmlFor='message' className='mt-4 font-light text-gray-500 dark:text-gray-50'>
            Message<span className='text-red-500'>*</span>
          </label>
          <textarea
            name='message'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className='border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1'
          ></textarea>
          {errors?.message && <p className='text-red-500'>Message body cannot be empty.</p>}
          <div className='flex flex-row items-center justify-start'>
            <button
            aria-label="Notification_Save"
              type='submit'
              className='mt-8 flex flex-row items-center rounded-md bg-indigo-500 px-10 py-2 text-lg font-light text-white hover:bg-gray-400'
            >
              {buttonText}
            </button>
          </div>

        </form>

      </div>

    </Layout>
  );
}
const mapStateToProps = (state: any) => {
  console.log('SATE REDUX', state);
  return {
    user: state.main.user,
  };
};

export default connect(mapStateToProps, [])(contactus);
