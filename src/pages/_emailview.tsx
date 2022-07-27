import Email from '~/svg/Email.svg';
/**
 * Just Display Email Image on this page
 */
export default function EmailPage() {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <Email className='h-5/6  w-7/12' width='60%' height='0' />
        <h2 className='p-14 text-4xl font-bold leading-relaxed'>
          Just a simple tool to test your firebase push notifications.
        </h2>
      </div>
    </>
  );
}
