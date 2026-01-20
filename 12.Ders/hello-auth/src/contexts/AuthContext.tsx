// 1. Type oluştur Auth için
// 2. Context type oluştur
// 3. createContext ile context oluştur
// 4. provider oluştur {children}
// 4.1. state'i tanımla
// 4.2. metotları tanımla
// 4.3. value tanımla geri dönüş değeri
// 4.4. Context.Provider ile return et

import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Auth = {
    session: Session | null;
    isLoading: boolean;
}

export type AuthContextType = {
    auth: Auth;
}

export const AuthContext = createContext<AuthContextType>({
    auth: {
        session: null,
        isLoading: true,
    }
})

export function AuthProvider({ children }: { children: ReactNode }) {
    // usss
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    // uffs
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((e, session) => {
            console.log(e)
            setSession(session);
            setIsLoading(false);
            if (e === "SIGNED_OUT") {
                router.replace("/login")
            } else if (e === "SIGNED_IN") {
                router.replace("/hello")
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const value: AuthContextType = {
        auth: {
            session,
            isLoading
        }
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Hata: AuthProvider kullanılmadı");
    }

    return context;
}