import { useColors } from "@/constants/theme";
import "@/global.css";
import { IconHomeFilled } from "@tabler/icons-react-native";
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useColors(colorScheme);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.accent },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <IconHomeFilled color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
