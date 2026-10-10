const DARK_THEME_COLORS = {
  background: "#000000",
  foreground: "#eeeeee",
  accent: "#111111",
  accentForeground: "#eeeeee",
  primary: "#3366cc",
  primaryForeground: "#eeeeee",
  secondary: "#2bab9e",
  secondaryForeground: "#eeeeee",
  muted: "#333333",
  mutedForeground: "#999999",
};

const LIGHT_THEME_COLORS = {
  background: "#eeeeee",
  foreground: "#111111",
  accent: "#ffffff",
  accentForeground: "#111111",
  primary: "#3366cc",
  primaryForeground: "#eeeeee",
  secondary: "#2bab9e",
  secondaryForeground: "#eeeeee",
  muted: "#cccccc",
  mutedForeground: "#999999",
};

export function useColors(colorScheme?: string) {
  if (colorScheme === "dark") return DARK_THEME_COLORS;
  else return LIGHT_THEME_COLORS;
}
