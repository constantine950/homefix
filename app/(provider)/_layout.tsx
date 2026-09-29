// app/(provider)/_layout.tsx
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import TabBar from "../../components/ui/TabBar";

export default function ProviderLayout() {
  const pathname = usePathname();
  const isSetupFlow = pathname.includes("/setup/");
  const isGallery = pathname.includes("/gallery");

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="history" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="setup/go-premium" />
        <Stack.Screen name="setup/availability" />
        <Stack.Screen name="setup/proof-of-work" />
        <Stack.Screen name="gallery/index" />
        <Stack.Screen name="gallery/[index]" />
      </Stack>
      {!isSetupFlow && !isGallery && (
        <TabBar
          tabs={[
            { key: "home", path: "/(provider)/home" },
            { key: "profile", path: "/(provider)/profile" },
            { key: "history", path: "/(provider)/history" },
            { key: "settings", path: "/(provider)/settings" },
          ]}
        />
      )}
    </View>
  );
}
