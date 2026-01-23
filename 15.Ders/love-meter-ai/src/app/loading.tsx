import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { analyzeRelationship } from '@/services/ai-service';
import { Answer } from '@/data/questions';

export default function LoadingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ answers: string }>();

  const heart1Scale = useSharedValue(1);
  const heart2Scale = useSharedValue(1);
  const heart3Scale = useSharedValue(1);
  const containerRotate = useSharedValue(0);

  useEffect(() => {
    // Heart animations
    heart1Scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 400, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    heart2Scale.value = withDelay(
      150,
      withRepeat(
        withSequence(
          withTiming(1.3, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    heart3Scale.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(1.3, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    containerRotate.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );

    // Process answers
    const processAnswers = async () => {
      try {
        const answers: Answer[] = params.answers ? JSON.parse(params.answers) : [];
        const result = await analyzeRelationship(answers);
        router.replace({
          pathname: '/result',
          params: { result: JSON.stringify(result) },
        });
      } catch (error) {
        console.error('Error analyzing relationship:', error);
        router.replace('/');
      }
    };

    processAnswers();
  }, [params.answers, router, heart1Scale, heart2Scale, heart3Scale, containerRotate]);

  const heart1Style = useAnimatedStyle(() => ({
    transform: [{ scale: heart1Scale.value }],
  }));

  const heart2Style = useAnimatedStyle(() => ({
    transform: [{ scale: heart2Scale.value }],
  }));

  const heart3Style = useAnimatedStyle(() => ({
    transform: [{ scale: heart3Scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${containerRotate.value}deg` }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View style={[styles.heartsContainer, containerStyle]}>
            <Animated.Text style={[styles.heart, styles.heart1, heart1Style]}>
              💖
            </Animated.Text>
            <Animated.Text style={[styles.heart, styles.heart2, heart2Style]}>
              💕
            </Animated.Text>
            <Animated.Text style={[styles.heart, styles.heart3, heart3Style]}>
              💗
            </Animated.Text>
          </Animated.View>

          <View style={styles.textContainer}>
            <ThemedText style={[styles.title, { color: theme.primary }]}>
              {t('loading.title')}
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              {t('loading.subtitle')}
            </ThemedText>
          </View>
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.six,
  },
  heartsContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    fontSize: 50,
    position: 'absolute',
  },
  heart1: {
    top: 20,
  },
  heart2: {
    bottom: 40,
    left: 30,
  },
  heart3: {
    bottom: 40,
    right: 30,
  },
  textContainer: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
