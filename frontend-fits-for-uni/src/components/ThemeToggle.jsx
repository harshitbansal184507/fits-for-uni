import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); 
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label
      onClick={toggleTheme}
      className="px-4 py-2 bg-white dark:bg-gray-900  dark:text-white text-black rounded-md shadow-lg"
    ><span class="slider"></span>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </label>
  );
};

export default ThemeToggle;
