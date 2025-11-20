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
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
default: "bg-stone-300 hover:bg-stone-400 text-stone-700 hover:text-stone-800 focus:ring-stone-400/50",
    secondary: "bg-secondary hover:bg-gray-600 text-white focus:ring-secondary/50",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-primary dark:text-dark-primary focus:ring-primary/50",
    outline: "border border-secondary hover:bg-secondary hover:text-white text-secondary focus:ring-secondary/50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
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
        !disabled && "hover:scale-[0.98] active:scale-95",
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