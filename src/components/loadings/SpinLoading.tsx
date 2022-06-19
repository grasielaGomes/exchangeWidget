import { CircleNotch } from "phosphor-react";

export const SpinLoading = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
    </div>
  );
};
