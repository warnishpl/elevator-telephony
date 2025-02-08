"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

declare module "@mui/material/styles" {
  interface Palette {
    menuBackground?: {
      main: string;
    };
    primaryHover?: {
      main: string;
    };
    textReverse?: {
      primary: string;
    };
  }

  interface PaletteOptions {
    menuBackground?: {
      main: string;
    };
    primaryHover?: {
      main: string;
    };
    textReverse?: {
      primary: string;
    };
  }
}

const defaultThemeContext = {
  isDarkMode: false,
  toggleTheme: () => {},
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    defaultThemeContext.isDarkMode
  );
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode(storedTheme === "dark" || (!storedTheme && prefersDarkMode));
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (!isThemeLoaded) {
    return null;
  }

  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*::-webkit-scrollbar": {
            width: "10px",
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor: isDarkMode ? "#2c3441" : "#bdbdbe",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: isDarkMode ? "#84cc16" : "#1976d2",
            borderRadius: "10px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: isDarkMode ? "#66b512" : "#1565C0",
          },
        },
      },
    },
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#84cc16" : "#1976d2",
      },
      primaryHover: {
        main: isDarkMode ? "#66b512" : "#1565C0",
      },
      menuBackground: {
        main: isDarkMode ? "#2c3441" : "#bdbdbe",
      },
      background: {
        default: isDarkMode ? "#374151" : "#e5e7eb",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
      },
      textReverse: {
        primary: isDarkMode ? "#000000" : "#ffffff",
      },
    },
    typography: {
      fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
