import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ThemeToggle = ({ onThemeChange, className }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or system preference
    const stored = localStorage.getItem("pageflow-settings");
    let initialTheme = "light";
    
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        initialTheme = settings.theme || "light";
      } catch (error) {
        console.error("Error parsing stored settings:", error);
      }
    } else {
      // Use system preference if no stored setting
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = prefersDark ? "dark" : "light";
    }
    
    setIsDark(initialTheme === "dark");
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Update localStorage with new theme
    try {
      const stored = localStorage.getItem("pageflow-settings");
      const settings = stored ? JSON.parse(stored) : {
        theme: "light",
        fontSize: 18,
        lineSpacing: 1.8,
        pageWidth: 700
      };
      
      settings.theme = theme;
      localStorage.setItem("pageflow-settings", JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving theme to settings:", error);
    }
    
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
      className={`p-2 ${className || ""}`}
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