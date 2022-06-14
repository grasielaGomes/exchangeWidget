import { HeadingI, TextI } from "./interfaces";

export const Heading = ({ color = "", children, variant = "h2" }: HeadingI) => {
  const styleBase = "font-bold";
  const variants = {
    h1: `${styleBase} text-2xl leading-9`,
    h2: `${styleBase} text-xl leading-8`,
    h3: `${styleBase} text-lg leading-7`,
  };
  return <p className={`${variants[variant]} ${color}`}>{children}</p>;
};

export const CustomText = ({
  color = "",
  children,
  variant = "body"
}: TextI) => {
  const styleBase = "font-normal";
  const variants = {
    body: `${styleBase} text-base leading-6`,
    small: `${styleBase} text-sm leading-5`,
    tiny: `${styleBase} text-xs leading-4`,
  };
  return <p className={`${variants[variant]} ${color}`}>{children}</p>;
};
