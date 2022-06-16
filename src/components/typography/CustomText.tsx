import { TextI } from "./interfaces";

export const CustomText = ({
  color = "",
  children,
  variant = "body"
}: TextI) => {
  const styleBase = "font-normal";
  const variants = {
    body: `${styleBase} text-base leading-6`,
    small: `${styleBase} text-sm leading-5`,
    tiny: `${styleBase} text-xs leading-4`
  };
  return <p className={`${variants[variant]} text-${color}`}>{children}</p>;
};
