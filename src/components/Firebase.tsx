import { onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from 'redux/actions/main';

import addData from '@/components/addData';
import { firebaseAuth, firebaseProvider } from '@/components/Initializetion';

import Google from '~/svg/Google.svg';

function Firebaseauth(props: any) {
  const { saveUser, user } = props;
  const [gcall, setgcall] = useState(false);
  const [userCondition, setuserCondition] = useState(false);
  const router = useRouter();
  // Sign in and sign out functins
  const signIn = () =>
    signInWithPopup(firebaseAuth, firebaseProvider)
      .then((r) => setgcall(!gcall))
      .catch((e) => console.log('Error', e));

  const signOut = () =>
    firebaseAuth
      .signOut()
      .then((r) => [
        window.localStorage.clear(),
        router.reload(window.location.pathname),
      ])
      .catch((e) => console.log('Error', e));

  useEffect(() => {
    const data = onAuthStateChanged(firebaseAuth, async (user) => {
      const Authuser = [user?.providerData[0]];
      const firebaseUser = {
        email: user?.providerData[0].email,
        uid: user?.providerData[0].uid,
      };
      console.log('user -----', user);
      if (user != null) {
        saveUser(Authuser);
        const { result, error } = await addData(
          firebaseUser.email,
          'data',
          firebaseUser
        );

        setuserCondition(true);
        console.log(result, error, 'STORE IN FIREBASE');
      } else {
        console.log('not length found');
      }
    });
  }, [gcall]);

  useEffect(() => {
    console.log('name user', user, user.length);
  }, [props]);

  const google = () => {
    return (
      <button
        className='w-27 mx-2 rounded-md border p-3 text-right dark:border-4 dark:border-sunborderd dark:hover:bg-hoverd'
        onClick={signIn}
      >
        <Google className='flex h-5 w-5 items-center text-center' />
      </button>
    );
  };

  const authUser = () => {
    console.log('authUSER', user[0]?.photoURL);
    return (
      <button className='w-27 mx-2 rounded-md ' onClick={() => signOut()}>
        <img
          className='h-12 w-14 rounded-md object-cover '
          src={user[0]?.photoURL}
          // alt='Bordered avatar'
        />
      </button>
    );
  };

  if (userCondition) {
    return authUser();
  }
  return google();
}

const mapStateToProps = (state: any) => {
  console.log('FIREBASE STATE ---', state);
  return {
    user: state.main.user,
  };
};

const mapDispatchToProps = {
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Firebaseauth);
