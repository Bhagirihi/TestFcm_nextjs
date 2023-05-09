import { useTheme } from 'next-themes';
import { connect } from 'react-redux';

import Firebaseauth from '@/components/Firebase';

import DarkMoon from '~/svg/DarkMoon.svg';
import Firebase from '~/svg/Firebase.svg';
function Header(props: any) {
  const { theme, setTheme } = useTheme();

  const DarkMode = () => {
    return (
      <button
        className=' w-27 rounded-md border p-3 text-right dark:border-4 dark:border-sunborderd dark:hover:bg-hoverd'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <DarkMoon className='flex h-5 w-5 items-center text-center' />
      </button>
    );
  };

  const google = () => {
    return (
      // <button
      //   className='w-27 mx-2 rounded-md border p-3 text-right dark:border-4 dark:border-sunborderd dark:hover:bg-hoverd'
      //   onClick={signIn}
      // >
      //   <Google className='flex h-5 w-5 items-center text-center' />
      // </button>
      <Firebaseauth />
    );
  };
  return (
    <div className='flex  w-full items-center justify-center'>
      <div className=' w-26 text-left'>
        <Firebase className='flex h-12 w-12 items-center text-center' />
      </div>
      <div className=' w-11/12 text-left'>
        <h1 className='mx-6  text-base font-bold  md:text-xl'>
          Test Mobile Notification
        </h1>
      </div>
      {DarkMode()}
      {google()}
    </div>
  );
}
const mapStateToProps = (state: any) => {
  console.log('SATE REDUX', state);
  return {
    user: state.main.user,
  };
};

export default connect(mapStateToProps, [])(Header);
