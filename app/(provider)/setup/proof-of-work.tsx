import { useState } from "react";
import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../components/ui/Button";

export default function ProofOfWorkScreen() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handlePickImages() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "We need access to your photos to upload proof of work.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.7,
      selectionLimit: 8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setPhotos((prev) => [...prev, ...uris]);
    }
  }

  async function handleFinish() {
    setLoading(true);
    try {
      // TODO: replace with real API call, e.g. await uploadProofOfWork(photos);
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace("/(provider)/home");
    } finally {
      setLoading(false);
    }
  }

  const hasPhotos = photos.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row items-center pt-2 mb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Feather name="chevron-left" size={20} color="#374151" />
        </Pressable>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-1">
        Add proof of work
      </Text>
      <Text className="text-gray-500 mb-6">
        Upload photos of completed jobs
      </Text>

      {hasPhotos ? (
        <ScrollView className="flex-1">
          <View className="flex-row flex-wrap gap-3 mb-4">
            {photos.map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                className="w-[30%] aspect-square rounded-2xl"
              />
            ))}
          </View>

          <View className="flex-row gap-3 mb-6">
            <Pressable className="bg-primaryLight px-4 py-2 rounded-full">
              <Text className="text-primary text-sm font-semibold">
                See all pictures
              </Text>
            </Pressable>
            <Pressable
              onPress={handlePickImages}
              className="bg-primaryLight px-4 py-2 rounded-full"
            >
              <Text className="text-primary text-sm font-semibold">
                Add picture
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <Pressable
          onPress={handlePickImages}
          className="bg-gray-100 rounded-2xl h-56 items-center justify-center mb-6"
        >
          <Feather name="image" size={40} color="#F4A28C" />
          <View className="mt-4 border border-primary rounded-full px-5 py-2">
            <Text className="text-primary font-medium">Upload pictures</Text>
          </View>
        </Pressable>
      )}

      <View className="flex-1" />

      <View className="pb-4">
        <Button
          label="Ready for work"
          onPress={handleFinish}
          loading={loading}
          disabled={!hasPhotos}
        />
      </View>
    </SafeAreaView>
  );
}
