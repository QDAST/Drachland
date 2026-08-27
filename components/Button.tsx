import type { ReactNode } from "react";

type ButtonProps = {
  childNodes?: ReactNode;
  className?: string;
  onClick?: any;
  children?: ReactNode;
};

export default function Button({
  childNodes,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`flex bg-amber-400 ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
