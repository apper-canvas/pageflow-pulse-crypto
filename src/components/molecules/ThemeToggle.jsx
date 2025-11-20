import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ThemeToggle = ({ onThemeChange, className }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const stored = localStorage.getItem("pageflow-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");
    
    setIsDark(initialTheme === "dark");
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("pageflow-theme", theme);
    onThemeChange?.(theme);
  };

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    applyTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`p-2 ${className}`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <ApperIcon 
        name={isDark ? "Sun" : "Moon"} 
        className="w-5 h-5 transition-transform duration-200 hover:scale-110" 
      />
    </Button>
  );
};

export default ThemeToggle;