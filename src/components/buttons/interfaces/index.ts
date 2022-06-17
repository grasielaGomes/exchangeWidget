import React from "react";

export interface ButtonsI {
  ariaLabel?: string;
  children: string | JSX.Element | JSX.Element[];
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface FullButtonI extends ButtonsI {
  isFull?: boolean;
  variant?: "primary" | "secondary";
}

export interface TextButtonI extends ButtonsI {
  isActive?: boolean;
  variant?: "primary" | "icon";
}