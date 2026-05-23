import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex rounded-lg", className)}>{children}</div>
  );
};
