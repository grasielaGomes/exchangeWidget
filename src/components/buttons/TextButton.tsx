import { TextButtonI } from "./interfaces";

export const TextButton = ({
  ariaLabel,
  children,
  handleClick,
  isActive = false,
  isDisabled,
  type = "button",
  variant = "primary"
}: TextButtonI) => {
  const buttonAnimation = "transition-colors duration-200 ease-in-out";
  const buttonBase = `rounded-lg bg-transparent text-base leading-4 underline-offset-1 disabled:bg-neutral disabled:hover:bg-neutral focus:outline-none focus:border focus:border-dark focus:ring-dark focus:ring-0 ${
    isActive ? "bg-dark text-white" : "bg-white text-dark hover:underline"
  }`;

  const fullButtonVariants = {
    primary: `${buttonAnimation} ${buttonBase} h-10 w-10`,
    icon: `${buttonAnimation} ${buttonBase} flex items-center h-10 w-fit gap-2 px-4 group`
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={handleClick}
      className={fullButtonVariants[variant]}
    >
      {children}
    </button>
  );
};
