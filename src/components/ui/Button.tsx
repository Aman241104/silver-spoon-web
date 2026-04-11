import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "full";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-charcoal text-white hover:bg-silver-800",
      outline: "border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white",
      ghost: "text-charcoal hover:bg-silver-50",
      gold: "bg-gold text-white hover:bg-gold-dark",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-10 py-4 text-base",
      full: "w-full py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300 font-sans font-medium tracking-ultra uppercase text-center",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
