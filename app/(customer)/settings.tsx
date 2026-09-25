import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../lib/context/AuthContext";

interface SettingsRow {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}

export default function CustomerSettingsScreen() {
  const { logout } = useAuth();

  const rows: SettingsRow[] = [
    {
      icon: "lock",
      label: "Change password",
      onPress: () => router.push("/(auth)/reset-password"),
    },
    { icon: "globe", label: "Language", onPress: () => {} },
    { icon: "file-text", label: "Privacy policy", onPress: () => {} },
    { icon: "shield", label: "Terms of services", onPress: () => {} },
    { icon: "info", label: "About HomeFix", onPress: () => {} },
    { icon: "award", label: "Rate us", onPress: () => {} },
    { icon: "share-2", label: "Share with friends", onPress: () => {} },
    { icon: "help-circle", label: "Help", onPress: () => {} },
  ];

  function handleSignOut() {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(onboarding)");
        },
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        className="px-6 pt-2"
      >
        <Text className="text-2xl font-bold text-gray-900 mb-6">Settings</Text>

        <View className="bg-gray-100 rounded-3xl overflow-hidden mb-6">
          {rows.map((row, i) => (
            <Pressable
              key={row.label}
              onPress={row.onPress}
              className={`flex-row items-center justify-between px-4 py-4 ${
                i < rows.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <View className="flex-row items-center">
                <Feather name={row.icon} size={20} color="#374151" />
                <Text className="text-gray-900 text-base ml-3">
                  {row.label}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={handleSignOut}
          className="bg-gray-100 rounded-3xl px-4 py-4 flex-row items-center"
        >
          <Feather name="log-out" size={20} color="#EF4444" />
          <Text className="text-red-500 text-base ml-3 font-medium">
            Sign out
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
