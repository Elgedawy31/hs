import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    body:'#F6F8FC',
    secondPrimaryColor: "#ECEDFF",
    placeholderText: "#525253",
    primary: "#264699",
    altPrimary: '#1E40AF',
    text: '#101010',
    hoverText: '#000000',
    borderColor: '#E4E5E7',
    background: '#FFFFFF'
  },
  dark: {
    body:'#111111',
    secondPrimaryColor: "#1a1a2e",
    placeholderText: "#a0a0a1",
    primary: "#4f6bcc",
    altPrimary: '#3b5bdb',
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
