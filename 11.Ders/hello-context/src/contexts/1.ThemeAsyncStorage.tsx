// 1. Tema tipi oluştur
// 2. Context tipi oluştur ve Temayı burada kullan
// 3. Context oluştur ve Context tipini kullan, undefined ata
// 4. Provider oluştur
// 4.1. usss state oluştur. (tema rengi olabilir)
// 4.2. Statei değiştirmek için toggleTheme gibi bir metot yaz.
// 4.3. Dönülecek value'yu oluştur. 2. adımdaki contextType kullanılabilir
// 4.4. <ThemeContext.Provider ile children dön. Value'yu da provider'a ver
// 4.5. Opsiyonel (context küçükse): useTheme'i burada oluştur
// ====
// Kurumsal için şablon
// src/context/theme
//  L ThemeContext.ts
//  L ThemeProvider.tsx
//  L useTheme.ts
//  L types.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => Promise<void>;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // uffs
  // Uygulama ilk açıldığında çağrılır
  useEffect(() => {
    restoreTheme();
  }, [])

  const restoreTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("@app_theme");
      // type guard
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme)
      }

    } catch (error) {
      console.error("Bir hata oluştur", error);
    }
  }


  const toggleTheme = async () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme);
    await AsyncStorage.setItem("@app_theme", nextTheme);
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