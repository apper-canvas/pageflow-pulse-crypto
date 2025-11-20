import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Slider = forwardRef(({ 
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange && onChange(parseInt(e.target.value))}
        className={cn(
"w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer slider shadow-inner",
          "focus:outline-none focus:ring-2 focus:ring-accent/50",
          className
        )}
        style={{
          background: `linear-gradient(to right, #E74C3C 0%, #E74C3C ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #E74C3C;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #E74C3C;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;