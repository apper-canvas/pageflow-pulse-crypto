import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ value, onChange, placeholder = "Search books...", className }) => {
  return (
<div className={`relative ${className || ''} flex justify-center`}>
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
          <ApperIcon name="Search" className="w-5 h-5 text-slate-400 dark:text-dark-secondary" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-16 pr-14 py-6 rounded-full border-0 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md focus:ring-4 focus:ring-slate-300/40 dark:focus:ring-slate-600/40 w-full shadow-2xl hover:shadow-3xl focus:shadow-3xl transition-all duration-300 text-lg placeholder:text-slate-400/70 placeholder:text-base font-medium focus:bg-white/90 dark:focus:bg-dark-surface/90 outline-none ring-1 ring-slate-200/50 focus:ring-slate-400/60"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
          }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-slate-600 dark:text-dark-secondary dark:hover:text-dark-primary transition-colors duration-200 z-10 hover:scale-110"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;