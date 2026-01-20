import { supabase } from "@/src/lib/supabase";

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if(error) {
        throw new Error(error.message)
    }

    return data;
}