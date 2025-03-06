import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    body:'#F7F3E9',
    placeholderText: "#99958F",
    primary: "#D29244",
    altPrimary: '#A8A2A240',
    text: '#101010',
    hoverText: '#000000',
    background: '#FFFFFF' ,
    footer:'#000000'
  },
  dark: {
    body: '#101010',
    placeholderText: "#99958F",
    primary: "#D29244",
    altPrimary: '#A8A2A21A',
    text: '#F7F3E9',
    hoverText: '#FFFFFF',
    background: '#1E1E1E',
    footer:'#FFFFFF'  
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
