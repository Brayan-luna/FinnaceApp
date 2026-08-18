export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  textSecondary: string;
  success: string;
  danger: string;
  warning: string;
  border: string;
  accent: string;
  accentSubtle: string;
  subtleIcon: string;
}

export const darkThemeColors: ThemeColors = {
  primary: '#000000',
  secondary: '#A0A0A0',
  background: '#0F1014',
  surface: '#17181F',
  surfaceBorder: 'rgba(255, 255, 255, 0.08)',
  text: '#FFFFFF',
  textSecondary: '#8A8A8F',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FFCC00',
  border: 'rgba(255, 255, 255, 0.12)',
  accent: '#7B42BC',
  accentSubtle: 'rgba(123, 66, 188, 0.15)',
  subtleIcon: '#6C6E79',
};

export const lightThemeColors: ThemeColors = {
  primary: '#FFFFFF',
  secondary: '#666666',
  background: '#F4F5F9',
  surface: '#FFFFFF',
  surfaceBorder: 'rgba(0, 0, 0, 0.06)',
  text: '#12131A',
  textSecondary: '#6E717C',
  success: '#24B24B',
  danger: '#E53935',
  warning: '#F5A623',
  border: 'rgba(0, 0, 0, 0.1)',
  accent: '#7B42BC',
  accentSubtle: 'rgba(123, 66, 188, 0.1)',
  subtleIcon: '#9A9CA5',
};

export const theme = {
  colors: darkThemeColors,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  typography: {
    sizes: {
      small: 12,
      body: 14,
      title: 18,
      header: 24,
    },
    weights: {
      regular: '400',
      bold: '700',
    },
  },
};
