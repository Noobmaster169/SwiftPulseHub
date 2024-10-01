"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

type ThemeContextType = {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('/background/ghibli1.png');

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const updateTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('currentTheme', theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};