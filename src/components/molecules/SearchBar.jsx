import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ value, onChange, placeholder = "Search books...", className }) => {
  return (
<div className={`relative ${className || ''}`}>
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-5 h-5 text-stone-400 dark:text-dark-secondary" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-16 pr-12 py-5 rounded-full border-2 border-stone-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm focus:ring-4 focus:ring-stone-300/30 dark:focus:ring-stone-600/30 focus:border-stone-400/70 dark:focus:border-stone-500/70 w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base placeholder:text-stone-400/60 placeholder:text-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-stone-400 hover:text-stone-600 dark:text-dark-secondary dark:hover:text-dark-primary transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;