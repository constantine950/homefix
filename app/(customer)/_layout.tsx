// app/(customer)/_layout.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import TabBar from "../../components/ui/TabBar";

export default function CustomerLayout() {
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
      <TabBar tabs={["home", "jobs", "history", "settings"]} />
    </View>
  );
}
