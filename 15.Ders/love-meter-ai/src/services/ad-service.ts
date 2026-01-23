import { Platform } from 'react-native';
import mobileAds, {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

// Test IDs - Replace with real IDs in production
const AD_UNIT_IDS = {
  interstitial: {
    ios: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    android: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  },
  banner: {
    ios: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    android: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  },
};

export const getAdUnitId = (type: 'interstitial' | 'banner'): string => {
  const ids = AD_UNIT_IDS[type];
  return Platform.OS === 'ios' ? ids.ios : ids.android;
};

let interstitialAd: InterstitialAd | null = null;
let isAdLoaded = false;

export const initializeAds = async (): Promise<void> => {
  try {
    await mobileAds().initialize();
    console.log('AdMob initialized successfully');
    loadInterstitialAd();
  } catch (error) {
    console.error('Failed to initialize AdMob:', error);
  }
};

export const loadInterstitialAd = (): void => {
  const adUnitId = getAdUnitId('interstitial');
  interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: false,
  });

  interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
    isAdLoaded = true;
    console.log('Interstitial ad loaded');
  });

  interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
    isAdLoaded = false;
    // Preload next ad
    loadInterstitialAd();
  });

  interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
    isAdLoaded = false;
    console.error('Interstitial ad failed to load:', error);
  });

  interstitialAd.load();
};

export const showInterstitialAd = async (): Promise<boolean> => {
  if (interstitialAd && isAdLoaded) {
    try {
      await interstitialAd.show();
      return true;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      return false;
    }
  }
  return false;
};

export const isInterstitialAdReady = (): boolean => {
  return isAdLoaded;
};
