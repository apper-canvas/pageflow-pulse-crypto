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
"w-full h-4 bg-slate-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer slider shadow-inner",
          "focus:outline-none focus:ring-3 focus:ring-accent/40 transition-all duration-200 hover:shadow-lg",
          className
        )}
        style={{
          background: `linear-gradient(to right, #E74C3C 0%, #E74C3C ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${((value - min) / (max - min)) * 100}%, #e2e8f0 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1);
          transition: all 200ms ease-out;
        }
        .slider:hover::-webkit-slider-thumb {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.15);
        }
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1);
          transition: all 200ms ease-out;
        }
        .slider:hover::-moz-range-thumb {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;