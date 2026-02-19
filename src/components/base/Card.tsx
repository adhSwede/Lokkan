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
    <div
      className={twMerge(
        "flex rounded bg-indigo-300/60 dark:text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};
