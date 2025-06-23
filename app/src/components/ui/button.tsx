import React from "react";
import clsx from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  /* --- ベース & バリアント定義 --- */
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition disabled:opacity-50";

  const variants = {
    default: "bg-brand text-white hover:bg-brand-light",
    secondary: "bg-accent text-white hover:opacity-90",
    ghost: "text-brand hover:bg-brand/10",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
