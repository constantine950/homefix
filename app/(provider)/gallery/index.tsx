// app/(provider)/gallery/index.tsx
import { View, Text, Pressable, FlatList, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../lib/context/AuthContext";

export default function ProofOfWorkGalleryScreen() {
  const { user, updateUser } = useAuth();
  const photos = user?.proofOfWorkUrls ?? [];

  function handleDeleteAll() {
    Alert.alert("Delete all photos?", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          // TODO: replace with real API call, e.g. await deleteAllProofOfWork();
          await updateUser({ proofOfWorkUrls: [] });
        },
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row items-center justify-between pt-2 mb-6">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Feather name="chevron-left" size={20} color="#374151" />
        </Pressable>
        <Pressable
          onPress={handleDeleteAll}
          className="w-10 h-10 rounded-full bg-primaryLight items-center justify-center"
        >
          <Feather name="trash-2" size={18} color="#7A1F1F" />
        </Pressable>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Proof of work
      </Text>

      <FlatList
        data={photos}
        keyExtractor={(_, i) => String(i)}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/(provider)/gallery/${index}`)}
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
