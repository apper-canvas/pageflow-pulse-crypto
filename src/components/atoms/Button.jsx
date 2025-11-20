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
const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg";
  
  const variants = {
    default: "bg-gradient-to-r from-stone-300 to-stone-400 hover:from-stone-400 hover:to-stone-500 text-stone-700 hover:text-stone-800 focus:ring-stone-400/50",
    secondary: "bg-gradient-to-r from-secondary to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white focus:ring-secondary/50",
    ghost: "bg-transparent hover:bg-stone-100/70 dark:hover:bg-gray-800/70 text-primary dark:text-dark-primary focus:ring-primary/50 shadow-none hover:shadow-md",
    outline: "border-2 border-secondary hover:bg-secondary hover:text-white text-secondary focus:ring-secondary/50 bg-white/50 backdrop-blur-sm"
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
        !disabled && "hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5",
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