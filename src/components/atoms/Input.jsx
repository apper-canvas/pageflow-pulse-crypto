import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
"flex w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-primary dark:text-dark-primary placeholder:text-secondary/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;