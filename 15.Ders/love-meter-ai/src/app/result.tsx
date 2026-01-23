import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Pressable, View, ScrollView, Share, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AIResult } from '@/data/questions';
import { showInterstitialAd } from '@/services/ad-service';

export default function ResultScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ result: string }>();
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const result: AIResult = params.result
    ? JSON.parse(params.result)
    : {
        compatibilityPercentage: 0,
        analysis: '',
        advice: '',
        motivation: '',
      };

  const percentageValue = useSharedValue(0);
  const cardScale = useSharedValue(0.8);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate percentage counter
    percentageValue.value = withTiming(
      result.compatibilityPercentage,
      {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        runOnJS(setDisplayPercentage)(result.compatibilityPercentage);
      }
    );

    // Update display percentage during animation
    const interval = setInterval(() => {
      setDisplayPercentage((prev) => {
        if (prev >= result.compatibilityPercentage) {
          clearInterval(interval);
          return result.compatibilityPercentage;
        }
        return Math.min(prev + 1, result.compatibilityPercentage);
      });
    }, 20);

    // Animate cards
    cardScale.value = withSpring(1, { damping: 12 });
    cardOpacity.value = withTiming(1, { duration: 600 });

    return () => clearInterval(interval);
  }, [result.compatibilityPercentage, percentageValue, cardScale, cardOpacity]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const handleShare = async () => {
    const shareText = `💕 ${t('result.shareTitle')} 💕\n\n${t('result.compatibilityScore')}: ${result.compatibilityPercentage}%\n\n${result.analysis}\n\n💡 ${t('result.advice')}: ${result.advice}\n\n✨ ${result.motivation}`;

    try {
      await Share.share({
        message: shareText,
        title: t('result.shareTitle'),
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRestart = async () => {
    // Show interstitial ad before restarting (non-blocking)
    if (Platform.OS !== 'web') {
      showInterstitialAd();
    }
    router.replace('/');
  };

  const getHeartEmoji = () => {
    if (result.compatibilityPercentage >= 90) return '💖';
    if (result.compatibilityPercentage >= 70) return '💕';
    if (result.compatibilityPercentage >= 50) return '💗';
    return '💝';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <ThemedText style={styles.heartEmoji}>{getHeartEmoji()}</ThemedText>
            <ThemedText style={[styles.percentageText, { color: theme.primary }]}>
              {displayPercentage}%
            </ThemedText>
            <ThemedText style={[styles.compatibilityLabel, { color: theme.textSecondary }]}>
              {t('result.compatibilityScore')}
            </ThemedText>
          </View>

          <Animated.View style={[styles.cardsContainer, cardAnimatedStyle]}>
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <ThemedText style={[styles.cardTitle, { color: theme.primary }]}>
                💬 {t('result.analysis')}
              </ThemedText>
              <ThemedText style={[styles.cardText, { color: theme.text }]}>
                {result.analysis}
              </ThemedText>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <ThemedText style={[styles.cardTitle, { color: theme.primary }]}>
                💡 {t('result.advice')}
              </ThemedText>
              <ThemedText style={[styles.cardText, { color: theme.text }]}>
                {result.advice}
              </ThemedText>
            </View>

            <View style={[styles.card, styles.motivationCard, { backgroundColor: theme.primaryLight }]}>
              <ThemedText style={[styles.motivationText, { color: theme.primaryDark }]}>
                {result.motivation}
              </ThemedText>
            </View>
          </Animated.View>
        </ScrollView>

        <View style={styles.buttons}>
          <Pressable
            style={[styles.shareButton, { borderColor: theme.primary }]}
            onPress={handleShare}
          >
            <ThemedText style={[styles.shareButtonText, { color: theme.primary }]}>
              {t('result.shareResult')} 📤
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.restartButton, { backgroundColor: theme.primary }]}
            onPress={handleRestart}
          >
            <ThemedText style={styles.restartButtonText}>
              {t('result.tryAgain')} 🔄
            </ThemedText>
          </Pressable>
        </View>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  heartEmoji: {
    fontSize: 60,
    marginBottom: Spacing.two,
  },
  percentageText: {
    fontSize: 72,
    fontWeight: '800',
  },
  compatibilityLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: Spacing.one,
  },
  cardsContainer: {
    gap: Spacing.three,
  },
  card: {
    borderRadius: 20,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  cardText: {
    fontSize: 16,
  },
  motivationCard: {
    alignItems: 'center',
  },
  motivationText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingVertical: Spacing.four,
  },
  shareButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  restartButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: 30,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
