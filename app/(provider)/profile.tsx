import { useState } from "react";
import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../lib/context/AuthContext";

interface InfoRow {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}

export default function ProviderProfileScreen() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? false);

  function handleToggleAvailability(next: boolean) {
    Alert.alert(
      next ? "Go available" : "Go unavailable",
      next
        ? "Customers will see you as available!"
        : "Customers will see you as unavailable!",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => {
            setIsAvailable(next);
            // TODO: replace with real API call, e.g. await updateAvailability(next);
          },
        },
      ],
    );
  }

  const rows: InfoRow[] = [
    {
      icon: "briefcase",
      label: user?.profession ?? "Add profession",
      onPress: () => {},
    },
    {
      icon: "calendar",
      label: user?.availableDays?.length
        ? user.availableDays.join(", ")
        : "Add schedule",
      onPress: () => {},
    },
    {
      icon: "map-pin",
      label: user?.location ?? "Add location",
      onPress: () => {},
    },
    { icon: "phone", label: user?.phone ?? "Add phone", onPress: () => {} },
    {
      icon: "message-circle",
      label: user?.whatsapp ?? "Add WhatsApp",
      onPress: () => {},
    },
  ];

  const proofOfWorkUrls = user?.proofOfWorkUrls ?? [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        className="px-6 pt-2"
      >
        <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>

        <View className="bg-gray-100 rounded-3xl p-4 mb-6">
          <View className="flex-row items-center mb-4">
            <View className="relative mr-4">
              <Image
                source={{
                  uri: user?.avatarUrl ?? "https://i.pravatar.cc/150?img=12",
                }}
                className="w-20 h-20 rounded-full"
              />
              <Pressable className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white items-center justify-center border border-gray-200">
                <Feather name="camera" size={14} color="#374151" />
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">
                {user?.name ?? "Provider"}
              </Text>
              <Text className="text-gray-500 mb-1">
                {user?.profession ?? "Service Provider"}
              </Text>
              <View
                className={`self-start px-3 py-1 rounded-full ${
                  isAvailable ? "bg-primaryLight" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${isAvailable ? "text-primary" : "text-gray-500"}`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
            <Text className="text-gray-900 font-medium">Show availability</Text>
            <Pressable
              onPress={() => handleToggleAvailability(!isAvailable)}
              className={`w-12 h-7 rounded-full justify-center px-1 ${
                isAvailable ? "bg-primary items-end" : "bg-gray-300 items-start"
              }`}
            >
              <View className="w-5 h-5 rounded-full bg-white" />
            </Pressable>
          </View>
        </View>

        <View className="bg-gray-100 rounded-3xl overflow-hidden mb-6">
          {rows.map((row, i) => (
            <Pressable
              key={row.label + i}
              onPress={row.onPress}
              className={`flex-row items-center justify-between px-4 py-4 ${
                i < rows.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <View className="flex-row items-center flex-1">
                <Feather name={row.icon} size={18} color="#374151" />
                <Text
                  className="text-gray-900 text-base ml-3"
                  numberOfLines={1}
                >
                  {row.label}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-3">
          Proof of work
        </Text>
        {proofOfWorkUrls.length > 0 ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {proofOfWorkUrls.map((url, i) => (
                <Image
                  key={i}
                  source={{ uri: url }}
                  style={{ width: 100, height: 100, borderRadius: 16 }}
                />
              ))}
            </ScrollView>
            <Pressable className="self-start bg-primaryLight px-4 py-2 rounded-full mt-4">
              <Text className="text-primary text-sm font-semibold">
                Add picture
              </Text>
            </Pressable>
          </>
        ) : (
          <Text className="text-gray-400">No photos uploaded yet</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
