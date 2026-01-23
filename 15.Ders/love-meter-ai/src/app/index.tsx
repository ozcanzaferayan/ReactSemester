import { useRouter } from 'expo-router';
import { StyleSheet, Pressable, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AdBanner } from '@/components/banner-ad';

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const heartScale = useSharedValue(1);

  useEffect(() => {
    heartScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [heartScale]);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleStart = () => {
    router.push('/quiz');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={handleSettings} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={theme.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Animated.Text style={[styles.heartEmoji, heartAnimatedStyle]}>
            💕
          </Animated.Text>

          <ThemedText type="title" style={[styles.title, { color: theme.primary }]}>
            {t('welcome.title')}
          </ThemedText>

          <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
            {t('welcome.description')}
          </ThemedText>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            { backgroundColor: theme.primary },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleStart}
        >
          <ThemedText style={styles.buttonText}>
            {t('welcome.startQuiz')} 💝
          </ThemedText>
        </Pressable>

        {Platform.OS !== 'web' && (
          <View style={styles.adContainer}>
            <AdBanner />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'space-between',
    paddingBottom: Spacing.five,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: Spacing.two,
  },
  settingsButton: {
    padding: Spacing.two,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  heartEmoji: {
    fontSize: 80,
    marginBottom: Spacing.three,
  },
  title: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: Spacing.three,
  },
  startButton: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  adContainer: {
    marginTop: Spacing.three,
    alignItems: 'center',
  },
});
