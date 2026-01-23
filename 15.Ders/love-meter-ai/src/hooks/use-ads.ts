import { useEffect, useState, useCallback } from 'react';
import {
  initializeAds,
  showInterstitialAd,
  isInterstitialAdReady,
  loadInterstitialAd,
} from '@/services/ad-service';

export function useAds() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInterstitialReady, setIsInterstitialReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeAds();
      setIsInitialized(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const interval = setInterval(() => {
      setIsInterstitialReady(isInterstitialAdReady());
    }, 1000);

    return () => clearInterval(interval);
  }, [isInitialized]);

  const showInterstitial = useCallback(async (): Promise<boolean> => {
    const result = await showInterstitialAd();
    if (!result) {
      // If ad wasn't ready, try to load one for next time
      loadInterstitialAd();
    }
    return result;
  }, []);

  return {
    isInitialized,
    isInterstitialReady,
    showInterstitial,
  };
}
