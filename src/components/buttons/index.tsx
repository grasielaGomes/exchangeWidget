import { FullButtonI } from "./interfaces";

export const FullButton = ({
  ariaLabel,
  children,
  handleClick,
  isDisabled,
  variant = "primary"
}: FullButtonI) => {
  const buttonAnimation = "transition-colors duration-300 ease-in-out";
  const buttonBase = "py-3 px-6 rounded-lg text-base leading-4";

  const fullButtonVariants = {
    primary: `${buttonAnimation} ${buttonBase} font-semibold bg-primary border border-transparent text-white hover:bg-secondary disabled:bg-neutral disabled:hover:bg-neutral`,
    secondary: `${buttonAnimation} ${buttonBase} font-normal rounded-lg bg-transparent border border-secondary text-secondary hover:bg-tertiary hover:text-white hover:border-tertiary disabled:bg-white disabled:text-disabled disabled:border-neutral disabled:hover:bg-white  disabled:hover:border-neutral`
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={handleClick}
      className={fullButtonVariants[variant]}
    >
      {children}
    </button>
  );
};
