"use client";

import { ReactNode } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function RevealScope({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
