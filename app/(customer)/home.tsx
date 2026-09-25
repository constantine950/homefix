// app/(customer)/home.tsx
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CategoryCard from "../../components/CategoryCard";
import ProviderCard from "../../components/ProviderCard";
import { useAuth } from "../../lib/context/AuthContext";
import { Category, Provider } from "../../lib/types";

// TODO: replace with a real API call, e.g. useEffect + fetchCategories()
const CATEGORIES: Category[] = [
  {
    slug: "cleaners",
    name: "Cleaners",
    imageUrl: "https://picsum.photos/seed/cleaners/200",
  },
  {
    slug: "painters",
    name: "Painters",
    imageUrl: "https://picsum.photos/seed/painters/200",
  },
  {
    slug: "electricians",
    name: "Electricians",
    imageUrl: "https://picsum.photos/seed/electricians/200",
  },
  {
    slug: "carpenters",
    name: "Carpenters",
    imageUrl: "https://picsum.photos/seed/carpenters/200",
  },
  {
    slug: "plumbers",
    name: "Plumbers",
    imageUrl: "https://picsum.photos/seed/plumbers/200",
  },
  {
    slug: "pest-control",
    name: "Pest control",
    imageUrl: "https://picsum.photos/seed/pest/200",
  },
];

// TODO: replace with a real API call, e.g. useEffect + fetchNearbyProviders()
const NEARBY_PROVIDERS: Provider[] = [
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
    name: "Goodluck Isaiah",
    profession: "Electrician",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    isAvailable: true,
    distanceLabel: "12 min away",
  },
  {
    id: "3",
    name: "Goodluck Isaiah",
    profession: "Electrician",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    isAvailable: true,
    distanceLabel: "20 min away",
  },
];

export default function CustomerHomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={["#3D0A0A", "#8C1F1F"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ borderBottomRightRadius: 40 }}
      >
        <SafeAreaView edges={["top"]}>
          <View className="px-6 pt-2 pb-8">
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-white text-xl font-bold">
                  Hi {user?.name?.split(" ")[0] ?? "there"}
                </Text>
                <Text className="text-white/80 text-sm">
                  Get your home fixed today!
                </Text>
              </View>
              <Image
                source={{
                  uri: user?.avatarUrl ?? "https://i.pravatar.cc/150?img=1",
                }}
                className="w-14 h-14 rounded-full border-2 border-white"
              />
            </View>

            <View className="flex-row items-center bg-white rounded-full px-4 h-12">
              <Feather name="search" size={18} color="#7A1F1F" />
              <TextInput
                placeholder="Search service"
                placeholderTextColor="#7A1F1F"
                className="flex-1 ml-3 text-primary text-base"
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <FlatList
        data={NEARBY_PROVIDERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-gray-900 text-lg font-bold mb-3">
              Top Categories
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  onPress={() =>
                    router.push(`/(customer)/category/${category.slug}`)
                  }
                />
              ))}
            </View>

            <Text className="text-gray-900 text-lg font-bold mt-4 mb-1">
              Available Near You
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

      {/* Floating action button */}
      <Pressable
        onPress={() => router.push("/(customer)/request-service")}
        style={{
          position: "absolute",
          right: 24,
          bottom: 110,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#7A1F1F",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          elevation: 10,
        }}
      >
        <Feather name="plus" size={26} color="#fff" />
      </Pressable>
    </View>
  );
}
