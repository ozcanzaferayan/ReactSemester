# AdMob Integration Guide

## Ad Unit IDs

### iOS
| Type | ID |
|------|-----|
| App ID | `ca-app-pub-4789343753129707~7741917628` |
| Banner Ad Unit | `ca-app-pub-4789343753129707/5115754284` |

### Android (TODO)
| Type | ID |
|------|-----|
| App ID | `TODO` |
| Banner Ad Unit | `TODO` |

### Test IDs (Development)
| Type | iOS | Android |
|------|-----|---------|
| Banner | `ca-app-pub-3940256099942544/2934735716` | `ca-app-pub-3940256099942544/6300978111` |

---

## Installation

### 1. Install react-native-google-mobile-ads

```bash
npx expo install react-native-google-mobile-ads
```

### 2. Configure app.json

Add the following to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy",
          "iosAppId": "ca-app-pub-4789343753129707~7741917628"
        }
      ]
    ]
  }
}
```

### 3. iOS Additional Setup

Add to `app.json` under `expo.ios`:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "SKAdNetworkItems": [
          { "SKAdNetworkIdentifier": "cstr6suwn9.skadnetwork" },
          { "SKAdNetworkIdentifier": "4fzdc2evr5.skadnetwork" },
          { "SKAdNetworkIdentifier": "2fnua5tdw4.skadnetwork" },
          { "SKAdNetworkIdentifier": "ydx93a7ass.skadnetwork" },
          { "SKAdNetworkIdentifier": "5a6flpkh64.skadnetwork" },
          { "SKAdNetworkIdentifier": "p78aez3dza.skadnetwork" },
          { "SKAdNetworkIdentifier": "v72qych5uu.skadnetwork" },
          { "SKAdNetworkIdentifier": "c6k4g5qg8m.skadnetwork" },
          { "SKAdNetworkIdentifier": "s39g8k73mm.skadnetwork" },
          { "SKAdNetworkIdentifier": "3qy4746246.skadnetwork" },
          { "SKAdNetworkIdentifier": "3sh42y64q3.skadnetwork" },
          { "SKAdNetworkIdentifier": "f38h382jlk.skadnetwork" },
          { "SKAdNetworkIdentifier": "hs6bdukanm.skadnetwork" },
          { "SKAdNetworkIdentifier": "prcb7njmu6.skadnetwork" },
          { "SKAdNetworkIdentifier": "v4nxqhlyqp.skadnetwork" },
          { "SKAdNetworkIdentifier": "wzmmz9fp6w.skadnetwork" },
          { "SKAdNetworkIdentifier": "yclnxrl5pm.skadnetwork" },
          { "SKAdNetworkIdentifier": "t38b2kh725.skadnetwork" },
          { "SKAdNetworkIdentifier": "7ug5zh24hu.skadnetwork" },
          { "SKAdNetworkIdentifier": "9rd848q2bz.skadnetwork" },
          { "SKAdNetworkIdentifier": "n6fk4nfna4.skadnetwork" },
          { "SKAdNetworkIdentifier": "kbd757ywx3.skadnetwork" },
          { "SKAdNetworkIdentifier": "9t245vhmpl.skadnetwork" },
          { "SKAdNetworkIdentifier": "4468km3ulz.skadnetwork" },
          { "SKAdNetworkIdentifier": "m8dbw4sv7c.skadnetwork" },
          { "SKAdNetworkIdentifier": "ejvt5qm6ak.skadnetwork" },
          { "SKAdNetworkIdentifier": "5lm9lj6jb7.skadnetwork" },
          { "SKAdNetworkIdentifier": "44jx6755aq.skadnetwork" },
          { "SKAdNetworkIdentifier": "tl55sbb4fm.skadnetwork" },
          { "SKAdNetworkIdentifier": "2u9pt9hc89.skadnetwork" },
          { "SKAdNetworkIdentifier": "8s468mfl3y.skadnetwork" },
          { "SKAdNetworkIdentifier": "av6w8kgt66.skadnetwork" },
          { "SKAdNetworkIdentifier": "klf5c3l5u5.skadnetwork" },
          { "SKAdNetworkIdentifier": "ppxm28t8ap.skadnetwork" },
          { "SKAdNetworkIdentifier": "424m5254lk.skadnetwork" },
          { "SKAdNetworkIdentifier": "uw77j35x4d.skadnetwork" },
          { "SKAdNetworkIdentifier": "e5fvkxwrpn.skadnetwork" },
          { "SKAdNetworkIdentifier": "zq492l623r.skadnetwork" },
          { "SKAdNetworkIdentifier": "3rd42ekr43.skadnetwork" },
          { "SKAdNetworkIdentifier": "578prtvx9j.skadnetwork" },
          { "SKAdNetworkIdentifier": "f73kdq92p3.skadnetwork" },
          { "SKAdNetworkIdentifier": "8m87ez8aa3.skadnetwork" },
          { "SKAdNetworkIdentifier": "488r3q3dtq.skadnetwork" },
          { "SKAdNetworkIdentifier": "zmvfpc5aq8.skadnetwork" },
          { "SKAdNetworkIdentifier": "97r2b46745.skadnetwork" },
          { "SKAdNetworkIdentifier": "6xzpu9s2p8.skadnetwork" },
          { "SKAdNetworkIdentifier": "cg4yq2srnc.skadnetwork" },
          { "SKAdNetworkIdentifier": "ecpz2srf59.skadnetwork" },
          { "SKAdNetworkIdentifier": "gta9lk7p23.skadnetwork" }
        ],
        "GADApplicationIdentifier": "ca-app-pub-4789343753129707~7741917628",
        "NSUserTrackingUsageDescription": "This identifier will be used to deliver personalized ads to you."
      }
    }
  }
}
```

### 4. Rebuild the App

```bash
npx expo prebuild --clean
npx expo run:ios
```

---

## Usage

### Initialize Mobile Ads

In your `_layout.tsx` or app entry:

```tsx
import mobileAds from 'react-native-google-mobile-ads';

// Initialize on app start
useEffect(() => {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('AdMob initialized');
    });
}, []);
```

### Banner Ad Component

Create `src/components/banner-ad.tsx`:

```tsx
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : Platform.select({
      ios: 'ca-app-pub-4789343753129707/5115754284',
      android: 'TODO_ANDROID_BANNER_ID',
    }) ?? TestIds.BANNER;

interface Props {
  size?: BannerAdSize;
}

export function AdBanner({ size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER }: Props) {
  return (
    <BannerAd
      unitId={AD_UNIT_ID}
      size={size}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
```

### Using Banner in Screens

```tsx
import { AdBanner } from '@/components/banner-ad';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Your content */}

      {/* Banner at bottom */}
      <AdBanner />
    </View>
  );
}
```

---

## Premium Users (Hide Ads)

Create a hook to check subscription status:

```tsx
// src/hooks/use-premium.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREMIUM_KEY = '@is_premium';

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PREMIUM_KEY).then(value => {
      setIsPremium(value === 'true');
    });
  }, []);

  return isPremium;
}
```

Update Banner component:

```tsx
import { usePremium } from '@/hooks/use-premium';

export function AdBanner({ size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER }: Props) {
  const isPremium = usePremium();

  if (isPremium) return null;

  return (
    <BannerAd
      unitId={AD_UNIT_ID}
      size={size}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
```

---

## Banner Ad Sizes

| Size | Description |
|------|-------------|
| `BANNER` | 320x50 |
| `LARGE_BANNER` | 320x100 |
| `MEDIUM_RECTANGLE` | 300x250 |
| `FULL_BANNER` | 468x60 |
| `LEADERBOARD` | 728x90 |
| `ANCHORED_ADAPTIVE_BANNER` | Adaptive width, auto height (recommended) |

---

## Checklist

- [ ] Install `react-native-google-mobile-ads`
- [ ] Add iOS App ID to `app.json`
- [ ] Add Android App ID to `app.json` (when ready)
- [ ] Add SKAdNetwork identifiers for iOS
- [ ] Add `GADApplicationIdentifier` to iOS infoPlist
- [ ] Add tracking usage description
- [ ] Create banner ad component
- [ ] Initialize ads in `_layout.tsx`
- [ ] Add banner to relevant screens
- [ ] Hide ads for premium users
- [ ] Test with test ad IDs before production
- [ ] Rebuild app with `expo prebuild --clean`

---

## Resources

- [react-native-google-mobile-ads docs](https://docs.page/invertase/react-native-google-mobile-ads)
- [AdMob Policies](https://support.google.com/admob/answer/6128543)
- [SKAdNetwork IDs](https://developers.google.com/admob/ios/quick-start#update_your_infoplist)
