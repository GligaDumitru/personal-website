import { IconProps } from "./icons.types";

const Css = ({ className, height = "24", width = "24" }: IconProps) => {
  return (
    <svg
      className={className}
      width={height}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.3448 21.6009L1.41895 0H22.5809L20.653 21.5975L11.987 24L3.3448 21.6009Z"
        fill="currentColor"
      ></path>
      <path
        d="M19.0026 20.2227L20.6501 1.7666H12V22.1641L19.0026 20.2227Z"
        fill="currentColor"
      ></path>
      <path
        d="M5.83407 9.77721L6.0715 12.4264H12V9.77721H5.83407ZM5.59778 7.06432H12V4.41504H5.35693L5.59778 7.06432ZM12 16.6576L11.9884 16.6607L9.03789 15.864L8.84931 13.7511H6.18981L6.56101 17.9108L11.9878 19.4174L12 19.414V16.6576Z"
        fill="white"
        fill-opacity="0.8"
      ></path>
      <path
        d="M11.9907 9.77721V12.4264H15.253L14.9455 15.8623L11.9907 16.6598V19.4161L17.4218 17.9108L17.4617 17.4632L18.0842 10.4886L18.1489 9.77721L18.6271 4.41504H11.9907V7.06432H15.7238L15.4827 9.77721H11.9907Z"
        fill="white"
      ></path>
    </svg>
  );
};

export default Css;
