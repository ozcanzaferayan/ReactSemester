import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type PlanType = 'weekly' | 'yearly';

interface PricingPlan {
  id: PlanType;
  price: string;
  period: string;
  pricePerWeek?: string;
  savings?: string;
}

export default function PaywallScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
  const [isLoading, setIsLoading] = useState(false);

  const plans: PricingPlan[] = [
    {
      id: 'yearly',
      price: '$24.99',
      period: t('paywall.yearly'),
      pricePerWeek: '$0.48',
      savings: t('paywall.savePercent', { percent: '52' }),
    },
    {
      id: 'weekly',
      price: '$0.99',
      period: t('paywall.weekly'),
    },
  ];

  const features = [
    { icon: 'ban-outline' as const, text: t('paywall.feature1') },
    { icon: 'infinite-outline' as const, text: t('paywall.feature2') },
    { icon: 'heart-outline' as const, text: t('paywall.feature3') },
  ];

  const handlePurchase = async () => {
    setIsLoading(true);

    // TODO: RevenueCat integration
    // const selectedPackage = selectedPlan === 'yearly' ? yearlyPackage : weeklyPackage;
    // await Purchases.purchasePackage(selectedPackage);

    // Simulate purchase for now
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        t('paywall.purchaseTitle'),
        t('paywall.purchaseMessage'),
        [{ text: 'OK', onPress: () => router.replace('/') }]
      );
    }, 1000);
  };

  const handleRestore = async () => {
    setIsLoading(true);

    // TODO: RevenueCat integration
    // await Purchases.restorePurchases();

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(t('paywall.restoreTitle'), t('paywall.restoreMessage'));
    }, 1000);
  };

  const handleContinueWithAds = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.background, theme.backgroundElement, theme.background]}
        style={StyleSheet.absoluteFill}
      />

      {/* Close button */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <Pressable onPress={handleContinueWithAds} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={theme.text} />
        </Pressable>
      </View>

      {/* Content */}
      <View style={[styles.content, { paddingTop: insets.top + 60 }]}>
        {/* Premium badge */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <View style={[styles.premiumBadge, { backgroundColor: theme.primary }]}>
            <Ionicons name="diamond" size={20} color="#FFFFFF" />
            <ThemedText style={styles.premiumBadgeText}>PREMIUM</ThemedText>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <ThemedText style={[styles.title, { color: theme.text }]}>
            {t('paywall.title')}
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('paywall.subtitle')}
          </ThemedText>
        </Animated.View>

        {/* Features */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.featuresContainer}
        >
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: theme.primaryLight + '30' }]}>
                <Ionicons name={feature.icon} size={22} color={theme.primary} />
              </View>
              <ThemedText style={[styles.featureText, { color: theme.text }]}>
                {feature.text}
              </ThemedText>
            </View>
          ))}
        </Animated.View>

        {/* Pricing cards */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.plansContainer}
        >
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <Pressable
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                style={[
                  styles.planCard,
                  {
                    backgroundColor: isSelected ? theme.primary + '15' : theme.card,
                    borderColor: isSelected ? theme.primary : theme.backgroundElement,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
              >
                {plan.savings && (
                  <View style={[styles.savingsBadge, { backgroundColor: theme.success }]}>
                    <ThemedText style={styles.savingsText}>{plan.savings}</ThemedText>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <View style={[
                    styles.radioOuter,
                    { borderColor: isSelected ? theme.primary : theme.textSecondary }
                  ]}>
                    {isSelected && (
                      <View style={[styles.radioInner, { backgroundColor: theme.primary }]} />
                    )}
                  </View>
                  <View style={styles.planInfo}>
                    <ThemedText style={[styles.planPeriod, { color: theme.text }]}>
                      {plan.period}
                    </ThemedText>
                    {plan.pricePerWeek && (
                      <ThemedText style={[styles.planPricePerWeek, { color: theme.textSecondary }]}>
                        {plan.pricePerWeek}/{t('paywall.week')}
                      </ThemedText>
                    )}
                  </View>
                  <ThemedText style={[styles.planPrice, { color: theme.text }]}>
                    {plan.price}
                  </ThemedText>
                </View>
              </Pressable>
            );
          })}
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <Pressable
          style={[
            styles.purchaseButton,
            { backgroundColor: theme.primary },
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handlePurchase}
          disabled={isLoading}
        >
          <ThemedText style={styles.purchaseButtonText}>
            {isLoading ? t('paywall.processing') : t('paywall.subscribe')}
          </ThemedText>
        </Pressable>

        <View style={styles.footerLinks}>
          <Pressable onPress={handleRestore} disabled={isLoading}>
            <ThemedText style={[styles.footerLink, { color: theme.textSecondary }]}>
              {t('paywall.restore')}
            </ThemedText>
          </Pressable>
          <ThemedText style={[styles.footerDivider, { color: theme.textSecondary }]}>
            |
          </ThemedText>
          <Pressable onPress={handleContinueWithAds} disabled={isLoading}>
            <ThemedText style={[styles.footerLink, { color: theme.textSecondary }]}>
              {t('paywall.continueWithAds')}
            </ThemedText>
          </Pressable>
        </View>

        <ThemedText style={[styles.legalText, { color: theme.textSecondary }]}>
          {t('paywall.legalText')}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  closeButton: {
    padding: Spacing.two,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    gap: Spacing.one,
    marginBottom: Spacing.four,
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  featuresContainer: {
    width: '100%',
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  plansContainer: {
    width: '100%',
    gap: Spacing.three,
  },
  planCard: {
    borderRadius: 16,
    padding: Spacing.three,
    position: 'relative',
    overflow: 'hidden',
  },
  savingsBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderBottomLeftRadius: 12,
  },
  savingsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  planInfo: {
    flex: 1,
  },
  planPeriod: {
    fontSize: 17,
    fontWeight: '600',
  },
  planPricePerWeek: {
    fontSize: 14,
    marginTop: 2,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  purchaseButton: {
    paddingVertical: Spacing.three,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  footerDivider: {
    fontSize: 14,
  },
  legalText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
