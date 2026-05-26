import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import DarkMoon from '~/svg/DarkMoon.svg';
import Light from '~/svg/light.svg';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <button
      aria-label='them_change'
      onClick={toggle}
      type='button'
      className='inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
    >
      {!mounted || resolvedTheme === 'dark' ? (
        <Light className='h-4 w-4' />
      ) : (
        <DarkMoon className='h-4 w-4' />
      )}
    </button>
  );
}
