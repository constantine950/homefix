import { View, Text, FlatList, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { HistoryEntry } from "../../lib/types";

// TODO: replace with a real API call, e.g. useEffect + fetchContactHistory()
const MOCK_HISTORY: HistoryEntry[] = [
  {
    id: "1",
    providerName: "Goodluck Isaiah",
    providerAvatarUrl: "https://i.pravatar.cc/150?img=12",
    profession: "Electrician",
    isAvailable: true,
    contactedLabel: "32 secs ago",
  },
  {
    id: "2",
    providerName: "Jane Cooper",
    providerAvatarUrl: "https://i.pravatar.cc/150?img=5",
    profession: "Electrician",
    isAvailable: false,
    contactedLabel: "1 week ago",
  },
  {
    id: "3",
    providerName: "Devon Lane",
    providerAvatarUrl: "https://i.pravatar.cc/150?img=8",
    profession: "Electrician",
    isAvailable: true,
    contactedLabel: "1 week ago",
  },
  {
    id: "4",
    providerName: "Goodluck Isaiah",
    providerAvatarUrl: "https://i.pravatar.cc/150?img=12",
    profession: "Electrician",
    isAvailable: true,
    contactedLabel: "32 secs ago",
  },
  {
    id: "5",
    providerName: "Jane Cooper",
    providerAvatarUrl: "https://i.pravatar.cc/150?img=5",
    profession: "Electrician",
    isAvailable: false,
    contactedLabel: "1 week ago",
  },
  {
    id: "6",
    providerName: "Devon Lane",
    providerAvatarUrl: "https://i.pravatar.cc/150?img=8",
    profession: "Electrician",
    isAvailable: true,
    contactedLabel: "1 week ago",
  },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 140,
        }}
        ListHeaderComponent={
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-2xl font-bold text-gray-900">History</Text>
              <Pressable className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Feather name="sliders" size={18} color="#374151" />
              </Pressable>
            </View>
            <Text className="text-gray-500">
              A list of services you've contacted recently
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center flex-1">
              <Image
                source={{ uri: item.providerAvatarUrl }}
                className="w-12 h-12 rounded-full mr-3"
              />
              <View>
                <Text className="text-gray-900 font-semibold text-base">
                  {item.providerName}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.profession} · {item.contactedLabel}
                </Text>
              </View>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${item.isAvailable ? "bg-primaryLight" : "bg-gray-100"}`}
            >
              <Text
                className={`text-xs font-semibold ${item.isAvailable ? "text-primary" : "text-gray-400"}`}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
