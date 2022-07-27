import { useTheme } from 'next-themes';

import DarkMoon from '~/svg/DarkMoon.svg';
import Firebase from '~/svg/Firebase.svg';

export default function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <div className='flex h-14 w-full items-center justify-center'>
      <div className=' w-26 text-left'>
        <Firebase className='flex h-14 w-12 items-center text-center' />
      </div>
      <div className=' w-11/12 text-left'>
        <h2 className='mx-6  md:text-xl text-base  font-bold'>Firebase Push Notifiaction</h2>
      </div>
      <button className=' w-27 rounded-md border p-3 text-right hover:bg-slate-200' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <DarkMoon className='flex h-5 w-5 items-center text-center' />
      </button>
    </div>
  );
}
