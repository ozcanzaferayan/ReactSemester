/**
 * LoveMeter AI - Romantic Valentine's Day Theme
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2D1F3D',
    textWhite: '#FFFFFF',
    background: '#FFF5F7',
    backgroundElement: '#FFE4EC',
    backgroundSelected: '#FFD1DC',
    textSecondary: '#8B6B7B',
    primary: '#E91E63',
    primaryLight: '#F48FB1',
    primaryDark: '#C2185B',
    secondary: '#FF6B9D',
    accent: '#FF4081',
    heart: '#E91E63',
    gradientStart: '#FF6B9D',
    gradientEnd: '#E91E63',
    card: '#FFFFFF',
    success: '#4CAF50',
    error: '#F44336',
  },
  dark: {
    text: '#FFFFFF',
    textWhite: '#FFFFFF',
    background: '#1A0A10',
    backgroundElement: '#2D1520',
    backgroundSelected: '#3D2030',
    textSecondary: '#C9A0B0',
    primary: '#F48FB1',
    primaryLight: '#F8BBD9',
    primaryDark: '#E91E63',
    secondary: '#FF6B9D',
    accent: '#FF80AB',
    heart: '#F48FB1',
    gradientStart: '#FF6B9D',
    gradientEnd: '#E91E63',
    card: '#2D1520',
    success: '#81C784',
    error: '#EF5350',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
