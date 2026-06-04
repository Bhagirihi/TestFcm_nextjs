import Image from 'next/image';

export type DocImageData = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export default function DocImage({
  src,
  alt,
  caption,
  width = 960,
  height = 540,
  className = '',
}: DocImageData & { className?: string }) {
  const isSvg = src.endsWith('.svg');

  return (
    <figure
      className={`my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 ${className}`}
    >
      <div className='relative flex items-center justify-center p-4'>
        {isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className='max-h-48 w-auto max-w-full object-contain' />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className='h-auto w-full object-cover'
            sizes='(max-width: 768px) 100vw, 720px'
          />
        )}
      </div>
      {caption && (
        <figcaption className='border-t border-slate-200 px-4 py-2.5 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
