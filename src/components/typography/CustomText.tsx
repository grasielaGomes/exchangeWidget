import { TextI } from "./interfaces";

export const CustomText = ({
  color = "",
  children,
  isBold = false,
  variant = "body"
}: TextI) => {
  const styleBase = isBold ? "font-medium" : "font-normal";
  const variants = {
    body: `${styleBase} text-base leading-6`,
    small: `${styleBase} text-sm leading-5`,
    tiny: `${styleBase} text-xs leading-4`
  };
  return <p className={`${variants[variant]} text-${color}`}>{children}</p>;
};
