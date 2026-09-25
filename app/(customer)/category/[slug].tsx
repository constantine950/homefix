// app/(customer)/category/[slug].tsx
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ProviderCard from "../../../components/ProviderCard";
import { Provider } from "../../../lib/types";

// TODO: replace with a real API call, e.g. useEffect + fetchProvidersByCategory(slug)
const MOCK_PROVIDERS: Provider[] = [
  {
    id: "1",
    name: "Goodluck Isaiah",
    profession: "Electrician",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    isAvailable: true,
    distanceLabel: "10 min away",
  },
  {
    id: "2",
    name: "Floyd Miles",
    profession: "Electrician",
    avatarUrl: "https://i.pravatar.cc/150?img=13",
    isAvailable: true,
    distanceLabel: "12 min away",
  },
  {
    id: "3",
    name: "Jerome Bell",
    profession: "Electrician",
    avatarUrl: "https://i.pravatar.cc/150?img=14",
    isAvailable: true,
    distanceLabel: "20 min away",
  },
];

function formatCategoryName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CategoryListScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const categoryName = formatCategoryName(slug ?? "");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 pt-2 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Feather name="chevron-left" size={20} color="#374151" />
        </Pressable>
        <View className="w-10" />
      </View>

      <FlatList
        data={MOCK_PROVIDERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 }}
        ListHeaderComponent={
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-2xl font-bold text-gray-900">
                {categoryName}
              </Text>
              <Pressable className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Feather name="sliders" size={18} color="#374151" />
              </Pressable>
            </View>
            <Text className="text-gray-500">
              A list of {categoryName.toLowerCase()} close to you
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => router.push(`/(customer)/provider/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
