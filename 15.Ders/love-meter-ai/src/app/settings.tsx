import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Pressable, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { languageOptions, saveLanguage } from '@/i18n';

const ONBOARDING_KEY = '@onboarding_completed';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [isResetting, setIsResetting] = useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    await saveLanguage(languageCode);
  };

  const handleBack = () => {
    router.back();
  };

  const handleResetOnboarding = async () => {
    if (isResetting) return;
    setIsResetting(true);
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      Alert.alert('', t('settings.resetOnboardingSuccess'));
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <ThemedText style={[styles.backButtonText, { color: theme.primary }]}>
              {t('common.back')}
            </ThemedText>
          </Pressable>
          <ThemedText style={[styles.title, { color: theme.text }]}>
            {t('settings.title')}
          </ThemedText>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(100).duration(400)}>
            <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              {t('settings.selectLanguage')}
            </ThemedText>

            <View style={styles.optionsContainer}>
              {languageOptions.map((language, index) => (
                <Animated.View
                  key={language.code}
                  entering={FadeInDown.delay(150 + index * 50).duration(400)}
                >
                  <Pressable
                    style={[
                      styles.languageOption,
                      { backgroundColor: theme.card, borderColor: theme.backgroundElement },
                      i18n.language === language.code && {
                        backgroundColor: theme.primaryLight,
                        borderColor: theme.primary,
                      },
                    ]}
                    onPress={() => handleLanguageChange(language.code)}
                  >
                    <View style={styles.languageInfo}>
                      <ThemedText
                        style={[
                          styles.languageName,
                          { color: theme.text },
                          i18n.language === language.code && { color: theme.primaryDark },
                        ]}
                      >
                        {language.nativeLabel}
                      </ThemedText>
                      <ThemedText
                        style={[
                          styles.languageLabel,
                          { color: theme.textSecondary },
                          i18n.language === language.code && { color: theme.primary },
                        ]}
                      >
                        {language.label}
                      </ThemedText>
                    </View>
                    {i18n.language === language.code && (
                      <ThemedText style={styles.checkmark}>
                        ✓
                      </ThemedText>
                    )}
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              {t('settings.other')}
            </ThemedText>

            <Pressable
              style={[
                styles.resetButton,
                { backgroundColor: theme.card, borderColor: theme.backgroundElement },
              ]}
              onPress={handleResetOnboarding}
              disabled={isResetting}
            >
              <ThemedText style={[styles.resetButtonText, { color: theme.text }]}>
                {t('settings.resetOnboarding')}
              </ThemedText>
            </Pressable>
          </Animated.View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
  },
  backButton: {
    padding: Spacing.two,
    marginLeft: -Spacing.two,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.four,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.three,
  },
  optionsContainer: {
    gap: Spacing.two,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 2,
  },
  languageInfo: {
    gap: 4,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageLabel: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 20,
    color: '#E91E63',
    fontWeight: '700',
  },
  section: {
    marginTop: Spacing.five,
  },
  resetButton: {
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 2,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
