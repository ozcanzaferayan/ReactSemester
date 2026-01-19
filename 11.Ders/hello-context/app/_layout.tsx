import { AuthProvider } from '@/src/contexts/AuthContext';
import '../global.css';

import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack />
      </AuthProvider>
    </ThemeProvider>

  )
}
