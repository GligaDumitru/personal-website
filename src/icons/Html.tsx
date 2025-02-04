import { IconProps } from "./icons.types";

const Html = ({ className, height = "24", width = "24" }: IconProps) => {
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
        d="M3.41014 21.6082L1.5 0H22.5L20.5899 21.5965L11.9826 24"
        fill="currentColor"
      ></path>
      <path d="M12.5 22V2H20.5L18.9734 20.083" fill="currentColor"></path>
      <path
        d="M5.5 4H12.5V6.64672H8.55789L8.81579 9.35756H12.5V11.9984H6.2614M6.38421 13.3276H9.18421L9.3807 15.4438L12.5 16.2367V19L6.77719 17.4843"
        fill="white"
        fill-opacity="0.8"
      ></path>
      <path
        d="M18.5 4H12.5V6.64877H18.2786M18.0624 9.36173H12.5V12.0105H15.4525L15.1731 15.4527L12.5 16.2462V19L17.4033 17.4948"
        fill="white"
      ></path>
    </svg>
  );
};

export default Html;
