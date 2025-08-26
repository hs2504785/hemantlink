export type ThemeMode = 'light' | 'dark' | 'purple';

export interface ThemeConfig {
  mode: ThemeMode;
  systemPreference: boolean;
}

export const THEME_STORAGE_KEY = 'hemantlink-theme';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  mode: 'light',
  systemPreference: false,
};

export const AVAILABLE_THEMES: Array<{
  value: ThemeMode;
  label: string;
  icon: string;
}> = [
  { value: 'light', label: 'Light', icon: 'ti-sun' },
  { value: 'dark', label: 'Dark', icon: 'ti-moon' },
  { value: 'purple', label: 'Purple', icon: 'ti-palette' },
];
