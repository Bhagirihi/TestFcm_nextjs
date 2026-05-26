import { onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup, getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { saveUser } from 'redux/actions/main';
import { getData, setData } from '@/lib/helper/firebaseHelper';

import logger from '@/lib/logger';

import { firebaseAuth, firebaseDB, firebaseProvider } from '@/components/Initializetion';

import Google from '~/svg/Google.svg';

function Firebaseauth(props: any) {
  const { saveUser, user } = props;

  const [userCondition, setuserCondition] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuserCondition(!!currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const signIn = () =>
    signInWithPopup(firebaseAuth, firebaseProvider)
      .then(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
          if (user != null) {
            const Authuser = [user?.providerData[0]];
            const rootRef = doc(firebaseDB, 'users', user?.providerData[0].uid);
            const dataStore = {
              uid: user?.providerData[0].uid,
              name: user?.providerData[0].displayName,
              email: user?.providerData[0].email,
              image: user?.providerData[0].photoURL,
              creationTime: user?.metadata?.creationTime,
              lastLogin: user?.metadata?.lastSignInTime,
            };

            await getData(rootRef).then(async (data) => {
              if (data?.email) {
                await toast.success(`Welcome Back !!! ${data?.name}`, {
                  position: 'top-left',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              } else {
                await sendWelcomeEmail(user);
              }
            });

            await setData(rootRef, dataStore);
            saveUser(Authuser);
          }
        });
      })
      .catch((e) => logger(e, 'Firebase sign-in failed'));

  const signOut = () =>
    firebaseAuth
      .signOut()
      .then((r) => [
        //window.localStorage.clear(),
        router.reload(window.location.pathname),
      ])
      .catch((e) => logger(e, 'Firebase sign-out failed'));

  const sendWelcomeEmail = async (user: any) => {
    await fetch('/api/welcome', {
      body: JSON.stringify({
        email: user?.providerData[0].email,
        fullname: user?.providerData[0].displayName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .catch((e) => logger(e, 'Welcome email failed'));
  };

  const google = () => {
    return (
      <div className='px-4 py-2'>
        <Google onClick={signIn} className='flex h-5 w-5 items-center text-center' />
        {/* <button
          className='dark:border-1 content-center items-center justify-center text-right dark:border-sunborderd dark:hover:bg-hoverd'

        >

        </button> */}
      </div>
    );
  };

  const authUser = () => (
    <button
      aria-label='user_signout'
      className='rounded-md border text-right dark:border dark:border-sunborderd dark:hover:bg-hoverd '
      onClick={() => signOut()}
    >
      <img className='h-10 w-10 rounded-md object-cover' src={user[0]?.photoURL} alt='User_Image' />
    </button>
  );

  if (userCondition) {
    return authUser();
  }
  return google();
}

const mapStateToProps = (state: { main: { user: unknown[]; name3: unknown[] } }) => ({
  user: state.main.user,
  name3: state.main.name3,
});

const mapDispatchToProps = {
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Firebaseauth);
