import React from "react";
import clsx from "classnames";

/* ------- Card ------- */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("rounded-lg border bg-white shadow-sm", className)}
      {...props}
    />
  );
}

/* ------- CardContent ------- */
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-4", className)} {...props} />;
}
