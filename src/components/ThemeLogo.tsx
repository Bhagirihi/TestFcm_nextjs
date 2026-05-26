import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
};

/** Renders a stable logo on SSR; swaps to theme-specific asset after mount. */
export default function ThemeLogo({
  width = 48,
  height = 48,
  className = 'h-10 w-10 rounded-xl shadow-sm',
  alt = 'TestFCM',
}: ThemeLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const src =
    mounted && resolvedTheme === 'light'
      ? '/images/testfcm_dark.png'
      : '/images/testfcm_white.png';

  return (
    <Image width={width} height={height} className={className} src={src} alt={alt} priority />
  );
}
