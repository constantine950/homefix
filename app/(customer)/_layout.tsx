// app/(customer)/_layout.tsx
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import TabBar from "../../components/ui/TabBar";

export default function CustomerLayout() {
  const pathname = usePathname();
  const hideTabBar =
    pathname.includes("/request-service") ||
    pathname.includes("/category/") ||
    pathname.includes("/provider/");

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="jobs" />
        <Stack.Screen name="history" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="category/[slug]" />
        <Stack.Screen name="provider/[id]" />
        <Stack.Screen name="request-service" />
      </Stack>
      {!hideTabBar && (
        <TabBar
          tabs={[
            { key: "home", path: "/(customer)/home" },
            { key: "jobs", path: "/(customer)/jobs" },
            { key: "history", path: "/(customer)/history" },
            { key: "settings", path: "/(customer)/settings" },
          ]}
        />
      )}
    </View>
  );
}
