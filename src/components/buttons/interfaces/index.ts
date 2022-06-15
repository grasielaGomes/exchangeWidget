import React from "react";

export interface ButtonsI {
  ariaLabel?: string;
  children: string | JSX.Element;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export interface FullButtonI extends ButtonsI {
  variant?: "primary" | "secondary";
}

export interface TextButtonI extends ButtonsI {
  variant?: "primary" | "secondary";
}