import { assetUrl } from "../../../utils/assetUrl";

interface ThemedImageProps {
  src: string;
  srcDark?: string;
  alt: string;
  className: string;
}

const ThemedImage = ({ src, srcDark, alt, className }: ThemedImageProps) => (
  <>
    <img className={`${className} dark:hidden`} src={assetUrl(src)} alt={alt} />
    <img
      className={`${className} hidden dark:block`}
      src={assetUrl(srcDark ?? src)}
      alt={alt}
    />
  </>
);

export default ThemedImage;
