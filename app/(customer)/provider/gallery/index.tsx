import { View, Text, Pressable, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

// TODO: this should come from the actual provider fetched by id, not hardcoded
const PROOF_OF_WORK_URLS = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300",
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300",
];

export default function CustomerProviderGalleryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row items-center pt-2 mb-6">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Feather name="chevron-left" size={20} color="#374151" />
        </Pressable>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Proof of work
      </Text>

      <FlatList
        data={PROOF_OF_WORK_URLS}
        keyExtractor={(_, i) => String(i)}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/(customer)/provider/gallery/${index}`)}
            className="flex-1"
          >
            <Image
              source={{ uri: item }}
              className="w-full aspect-square rounded-2xl"
            />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
