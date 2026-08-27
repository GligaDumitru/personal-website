interface ThemedImageProps {
  src: string;
  srcDark?: string;
  alt: string;
  className: string;
}

// Plain <img>, not next/image: sources are .svg (vector, no size to optimize)
// swapped between two fill-sized layout contexts (fixed box or intrinsic
// lightbox sizing) that next/image's width/height or fill modes don't both fit.
const ThemedImage = ({ src, srcDark, alt, className }: ThemedImageProps) => (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={`${className} dark:hidden`} src={`/${src}`} alt={alt} />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      className={`${className} hidden dark:block`}
      src={`/${srcDark ?? src}`}
      alt={alt}
    />
  </>
);

export default ThemedImage;
