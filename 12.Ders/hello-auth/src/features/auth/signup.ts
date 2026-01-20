import { supabase } from "@/src/lib/supabase";

// Not: Supabase'de email onayı açıksa
//   Gmail'den mail var mı kontrol et ve onayla
export async function signUpWithEmail(
    email: string,
    password: string
) {
    const {data, error} = await supabase.auth.signUp({
       email, password 
    })

    if(error) {
        throw new Error(error.message)
    }
    return data
}