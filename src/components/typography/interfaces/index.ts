interface TypographyI {
  color?: string;
  children: string | JSX.Element;
}

export interface HeadingI extends TypographyI {
  variant?: "h1" | "h2" | "h3";
}

export interface TextI extends TypographyI {
  isBold?: boolean;
  variant?: "body" | "small" | "tiny";
}