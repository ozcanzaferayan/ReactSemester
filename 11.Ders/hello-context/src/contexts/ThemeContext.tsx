

import 'expo-sqlite/localStorage/install';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // uffs
  // Uygulama ilk açıldığında çağrılır
  useEffect(() => {
    restoreTheme();
  }, [])

  const restoreTheme = () => {
    const storedTheme = localStorage.getItem('@app_theme');
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme)
    }
  }


  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme);
    localStorage.setItem('@app_theme', nextTheme);
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme
  }

  return <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
}
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Hata: ThemeProvider kullanılmadı.")
  }
  return context;
}