// app/(customer)/provider/[id].tsx
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Provider } from "../../../lib/types";

// TODO: replace with a real API call, e.g. useEffect + fetchProviderById(id)
const MOCK_PROVIDER: Provider = {
  id: "1",
  name: "Goodluck Isaiah",
  profession: "Electrician",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  isAvailable: true,
  distanceLabel: "1 hr",
  coverPhotoUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
  address: "23 Adeyemi Street, Yaba, Lagos, Nigeria",
  phone: "09044382743",
  whatsapp: "08084382756",
  proofOfWorkUrls: [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300",
    "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300",
  ],
};

const PHOTO_SIZE = 100;

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const provider = MOCK_PROVIDER;

  function handleCall() {
    if (provider.phone) Linking.openURL(`tel:${provider.phone}`);
  }

  function handleWhatsApp() {
    if (provider.whatsapp)
      Linking.openURL(
        `https://wa.me/${provider.whatsapp.replace(/^0/, "234")}`,
      );
  }

  function handleMessage() {
    if (provider.phone) Linking.openURL(`sms:${provider.phone}`);
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="h-72 relative rounded-b-3xl overflow-hidden">
          <Image
            source={{ uri: provider.coverPhotoUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />

          <SafeAreaView
            edges={["top"]}
            className="absolute top-0 left-0 px-6 pt-2"
          >
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/90 items-center justify-center"
            >
              <Feather name="chevron-left" size={20} color="#374151" />
            </Pressable>
          </SafeAreaView>

          <View className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex-row items-end justify-between">
            <View>
              <Text className="text-white text-2xl font-bold">
                {provider.name}
              </Text>
              <Text className="text-white/90 text-base">
                {provider.profession}
              </Text>
            </View>
            <View className="flex-row items-center bg-black/30 px-3 py-1 rounded-full">
              <Feather name="map-pin" size={14} color="#fff" />
              <Text className="text-white text-sm ml-1">
                {provider.distanceLabel}
              </Text>
            </View>
          </View>
        </View>

        <View className="pt-4">
          <View className="flex-row items-center mb-6 px-6">
            <Feather name="map-pin" size={16} color="#6B7280" />
            <Text className="text-gray-500 ml-2 flex-1">
              {provider.address}
            </Text>
          </View>

          <Text className="text-lg font-bold text-gray-900 mb-3 px-6">
            Proof of work
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ gap: 8, paddingLeft: 24, paddingRight: 0 }}
          >
            {provider.proofOfWorkUrls?.map((url, i) => (
              <Image
                key={i}
                source={{ uri: url }}
                style={{
                  width: PHOTO_SIZE,
                  height: PHOTO_SIZE,
                  borderRadius: 16,
                }}
              />
            ))}
          </ScrollView>

          <View className="items-center px-6">
            <Pressable className="bg-primaryLight px-4 py-2 rounded-full mb-6">
              <Text className="text-primary text-sm font-semibold">
                See all pictures
              </Text>
            </Pressable>
          </View>

          <View className="px-6">
            <View className="flex-row items-center justify-center my-2">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="text-gray-500 mx-4">
                Contact {provider.name.split(" ")[0]}
              </Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <View className="flex-row justify-center gap-6 mt-4">
              <Pressable
                onPress={handleCall}
                className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center"
              >
                <Feather name="phone" size={22} color="#7A1F1F" />
              </Pressable>
              <Pressable
                onPress={handleWhatsApp}
                className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center"
              >
                <Feather name="message-circle" size={22} color="#7A1F1F" />
              </Pressable>
              <Pressable
                onPress={handleMessage}
                className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center"
              >
                <Feather name="mail" size={22} color="#7A1F1F" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
