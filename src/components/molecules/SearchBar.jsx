import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ value, onChange, placeholder = "Search books...", className }) => {
  return (
<div className={`relative ${className || ''}`}>
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-5 h-5 text-stone-400 dark:text-dark-secondary" />
      </div>
      <Input
type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-14 pr-6 py-4 rounded-xl border border-stone-200 dark:border-gray-600 bg-white dark:bg-dark-surface focus:ring-2 focus:ring-stone-300/50 dark:focus:ring-stone-600 focus:border-stone-400 dark:focus:border-stone-500 w-full shadow-sm hover:shadow-md transition-all duration-200 text-base"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;