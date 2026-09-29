// app/(provider)/gallery/[index].tsx
import { View, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../lib/context/AuthContext";

export default function SinglePictureScreen() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const { user, updateUser } = useAuth();
  const photos = user?.proofOfWorkUrls ?? [];
  const photoIndex = Number(index);
  const photoUrl = photos[photoIndex];

  function handleDelete() {
    Alert.alert("Delete this photo?", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const next = photos.filter((_, i) => i !== photoIndex);
          // TODO: replace with real API call, e.g. await deleteProofOfWorkPhoto(photoUrl);
          await updateUser({ proofOfWorkUrls: next });
          router.back();
        },
      },
    ]);
  }

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView
        edges={["top"]}
        className="flex-row items-center justify-between px-6"
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
        >
          <Feather name="chevron-left" size={20} color="#374151" />
        </Pressable>
        <Pressable
          onPress={handleDelete}
          className="w-10 h-10 rounded-full bg-primaryLight items-center justify-center"
        >
          <Feather name="trash-2" size={18} color="#7A1F1F" />
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
