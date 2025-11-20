import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "default", 
  size = "default", 
  className,
  disabled,
  ...props 
}, ref) => {
const baseStyles = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl backdrop-blur-sm transform hover:-translate-y-0.5";
  
  const variants = {
    default: "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white focus:ring-slate-500/50",
    secondary: "bg-gradient-to-r from-secondary to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white focus:ring-secondary/50",
    ghost: "bg-transparent hover:bg-slate-100/70 dark:hover:bg-gray-800/70 text-primary dark:text-dark-primary focus:ring-primary/50 shadow-none hover:shadow-lg",
    outline: "border-2 border-secondary hover:bg-secondary hover:text-white text-secondary focus:ring-secondary/50 bg-white/60 backdrop-blur-md"
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    default: "px-5 py-3",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
disabled && "transform-none hover:transform-none",
        !disabled && "hover:scale-[1.05] active:scale-[0.95] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;