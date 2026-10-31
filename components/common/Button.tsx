"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300",
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary/90"
      : "border border-secondary text-secondary hover:bg-secondary hover:text-white",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}