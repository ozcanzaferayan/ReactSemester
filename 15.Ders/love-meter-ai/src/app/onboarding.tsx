import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ONBOARDING_KEY = '@onboarding_completed';

interface SlideItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  emoji?: string;
}

const slides: SlideItem[] = [
  { id: '0', titleKey: 'onboarding.slide1Title', descriptionKey: 'onboarding.slide1Description', emoji: '💕' },
  { id: '1', titleKey: 'onboarding.slide2Title', descriptionKey: 'onboarding.slide2Description', emoji: '💭' },
  { id: '2', titleKey: 'onboarding.slide3Title', descriptionKey: 'onboarding.slide3Description', emoji: '✨' },
];

const videoSource = require('../../assets/videos/onboarding.mp4');

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    router.replace('/paywall');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderSlide = ({ item }: { item: SlideItem }) => {
    return (
      <View style={styles.slide}>
        <View style={[styles.slideContentOverlay, { paddingBottom: insets.bottom + 140 }]}>
          {item.emoji && (
            <ThemedText style={styles.slideEmoji}>{item.emoji}</ThemedText>
          )}
          <ThemedText style={styles.slideTitle}>
            {t(item.titleKey)}
          </ThemedText>
          <ThemedText style={styles.slideDescription}>
            {t(item.descriptionKey)}
          </ThemedText>
        </View>
      </View>
    );
  };

  const Dot = ({ index }: { index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const isActive = index === currentIndex;
      return {
        width: withTiming(isActive ? 24 : 8, { duration: 200 }),
        backgroundColor: withTiming(
          isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
          { duration: 200 }
        ),
      };
    });

    return <Animated.View style={[styles.dot, animatedStyle]} />;
  };

  return (
    <View style={styles.container}>
      {/* Video arkaplan - sabit */}
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)', '#000000']}
        locations={[0, 0.4, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Yazılar - slide oluyor */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
        style={StyleSheet.absoluteFill}
      />

      {/* Skip button */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        {currentIndex < slides.length - 1 ? (
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <ThemedText style={[styles.skipText, { color: '#FFFFFF' }]}>
              {t('onboarding.skip')}
            </ThemedText>
          </Pressable>
        ) : (
          <View style={styles.skipButton} />
        )}
      </View>

      {/* Footer */}
      <View style={[
        styles.footer,
        { paddingBottom: insets.bottom + Spacing.four }
      ]}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Dot key={index} index={index} />
          ))}
        </View>

        <Pressable
          style={[styles.nextButton, { backgroundColor: theme.primary }]}
          onPress={handleNext}
        >
          <ThemedText style={styles.nextButtonText}>
            {currentIndex === slides.length - 1
              ? t('onboarding.getStarted')
              : t('common.next')}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

export const checkOnboardingStatus = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch {
    return false;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.four,
    zIndex: 10,
  },
  skipButton: {
    padding: Spacing.two,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-end',
  },
  slideContentOverlay: {
    paddingHorizontal: Spacing.five,
    gap: Spacing.three,
    alignItems: 'center',
  },
  slideEmoji: {
    fontSize: 60,
    marginBottom: Spacing.two,
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  slideDescription: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    paddingVertical: Spacing.three,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
