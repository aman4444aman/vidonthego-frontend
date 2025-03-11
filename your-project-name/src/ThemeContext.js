// ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context for theme management
const ThemeContext = createContext();

// ThemeProvider component that will manage and provide the theme
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load saved theme from localStorage (if any)
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
  };

  useEffect(() => {
    // Apply theme to body for styling
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context in other components
export const useTheme = () => useContext(ThemeContext);
