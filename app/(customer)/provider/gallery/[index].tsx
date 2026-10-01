import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

// TODO: same mock data as gallery/index.tsx — replace both with a real fetch
const PROOF_OF_WORK_URLS = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300",
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300",
];

export default function CustomerSinglePictureScreen() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const photoUrl = PROOF_OF_WORK_URLS[Number(index)];

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView edges={["top"]} className="px-6">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
        >
          <Feather name="chevron-left" size={20} color="#374151" />
        </Pressable>
      </SafeAreaView>

      <View className="flex-1 items-center justify-center">
        {photoUrl && (
          <Image
            source={{ uri: photoUrl }}
            className="w-full h-2/3"
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
}
