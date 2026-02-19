import type { ReactNode } from "react";

export const Island = ({
  children,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5),0_1px_0_0_rgba(255,255,255,0.1)]">
      {children}
    </div>
  );
};
