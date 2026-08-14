import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[76rem] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
