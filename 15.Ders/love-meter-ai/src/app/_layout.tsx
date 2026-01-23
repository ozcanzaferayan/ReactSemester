import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme, View, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/theme';
import '@/i18n';
import { loadSavedLanguage } from '@/i18n';
import { initializeAds } from '@/services/ad-service';

const ONBOARDING_KEY = '@onboarding_completed';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const init = async () => {
      await loadSavedLanguage();

      // Initialize ads on native platforms
      if (Platform.OS !== 'web') {
        initializeAds();
      }

      const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(onboardingCompleted !== 'true');
      setIsReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isReady || showOnboarding === null) return;

    const inOnboarding = segments[0] === 'onboarding';

    if (showOnboarding && !inOnboarding) {
      // Tekrar kontrol et - belki onboarding tamamlandı
      AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
        if (value === 'true') {
          setShowOnboarding(false);
        } else {
          router.replace('/onboarding');
        }
      });
    }
  }, [isReady, showOnboarding, segments, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const customTheme = colorScheme === 'dark'
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.card,
          primary: colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.card,
          primary: colors.primary,
        },
      };

  return (
    <ThemeProvider value={customTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            animation: 'none',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="paywall"
          options={{
            animation: 'slide_from_bottom',
            gestureEnabled: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="index" />
        <Stack.Screen name="quiz" />
        <Stack.Screen
          name="loading"
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="result"
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
