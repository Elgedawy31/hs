import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    body:'#F6F8FC',
    secondPrimaryColor: "#F8EEE6",
    placeholderText: "#525253",
    primary: "#E76507",
    altPrimary: '#D35400',
    text: '#101010',
    hoverText: '#000000',
    borderColor: '#E4E5E7',
    background: '#FFFFFF'
  },
  dark: {
    body:'#111111',
    secondPrimaryColor: "#272728",
    placeholderText: "#a0a0a1",
    primary: "#E76507",
    altPrimary: '#F97316',
    text: '#e6e6e6',
    hoverText: '#FFFFFF',
    borderColor: '#2d2d2d',
    background:'#151515'
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
