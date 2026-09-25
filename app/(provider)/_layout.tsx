// app/(provider)/_layout.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import TabBar from "../../components/ui/TabBar";

export default function ProviderLayout() {
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
      </Stack>
      <TabBar tabs={["home", "profile", "history", "settings"]} />
    </View>
  );
}
