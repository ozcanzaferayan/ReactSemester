import { createContext, ReactNode, useContext, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Undefined vermemizin nedeni bilerek hata verdirmek
//   Eğer AuthProvider ile sarmalanmadıysa
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  }

  const logout = () => {
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Hata: AuthProvider kullanılmadı");
  }

  return context;
}

export default useAuth