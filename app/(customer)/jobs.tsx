// app/(customer)/jobs.tsx
import { View, Text, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CategoryCard from "../../components/CategoryCard";
import { Category } from "../../lib/types";

// TODO: replace with a real API call, e.g. useEffect + fetchAllCategories()
const ALL_CATEGORIES: Category[] = [
  {
    slug: "cleaners",
    name: "Cleaners",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200",
  },
  {
    slug: "painters",
    name: "Painters",
    imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200",
  },
  {
    slug: "electricians",
    name: "Electricians",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200",
  },
  {
    slug: "carpenters",
    name: "Carpenters",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200",
  },
  {
    slug: "plumbers",
    name: "Plumbers",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200",
  },
  {
    slug: "pest-control",
    name: "Pest control",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200",
  },
  {
    slug: "gardeners",
    name: "Gardeners",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200",
  },
  {
    slug: "interior-decor",
    name: "Interior decor",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200",
  },
  {
    slug: "tillers",
    name: "Tillers",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=200",
  },
  {
    slug: "ac-installers",
    name: "Ac installers",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200",
  },
  {
    slug: "solar-installers",
    name: "Solar installers",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200",
  },
  {
    slug: "welders",
    name: "Welders",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200",
  },
];

export default function JobsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={ALL_CATEGORIES}
        keyExtractor={(item) => item.slug}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 140,
        }}
        ListHeaderComponent={
          <View className="mb-4">
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 h-12 mb-6">
              <Feather name="search" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Search service"
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-3 text-gray-900 text-base"
              />
            </View>
            <Text className="text-2xl font-bold text-gray-900">Categories</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => router.push(`/(customer)/category/${item.slug}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
