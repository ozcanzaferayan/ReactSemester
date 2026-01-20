import { createClient, processLock } from '@supabase/supabase-js';
import * as SecureStore from "expo-secure-store";
import { AppState, Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://zxcqrfmeazpymjtfgwdh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Y3FyZm1lYXpweW1qdGZnd2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTk5MjQsImV4cCI6MjA4NDQ5NTkyNH0.mWnn7ji5zYRh8XhEggqjJ81c5_sjLOV0Jholu4AJky0"

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => SecureStore.getItem(key),
    setItem: (key: string, value: string) => SecureStore.setItem(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}