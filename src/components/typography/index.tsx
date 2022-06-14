import { HeadingI, TextI } from "./interfaces";

export const Heading = ({ color = "", children, variant = "h2" }: HeadingI) => {
  const styleBase = "font-bold";
  const variants = {
    h1: `${styleBase} text-2xl`,
    h2: `${styleBase} text-xl`,
    h3: `${styleBase} text-lg`
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
    body: `${styleBase} text-base`,
    small: `${styleBase} text-sm`,
    tiny: `${styleBase} text-xs`
  };
  return <p className={`${variants[variant]} ${color}`}>{children}</p>;
};
