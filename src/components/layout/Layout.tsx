import * as React from 'react';

import Footer from '@/components/layout/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='page-shell flex min-h-screen flex-col'>
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  );
}
