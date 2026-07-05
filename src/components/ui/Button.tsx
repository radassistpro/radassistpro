import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "outlineLight" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 border border-accent",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/15 border border-navy-900",
  outline:
    "border-2 border-navy-900/20 bg-white text-navy-900 shadow-sm hover:border-accent hover:text-accent hover:bg-cream-50",
  outlineLight:
    "border-2 border-white/70 bg-white text-navy-950 shadow-lg shadow-black/20 hover:bg-cream-50 hover:border-white",
  ghost:
    "border-2 border-transparent text-navy-800 hover:text-accent hover:bg-cream-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
