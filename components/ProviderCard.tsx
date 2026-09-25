import { View, Text, Pressable, Image } from "react-native";
import { Provider } from "../lib/types";

interface Props {
  provider: Provider;
  onPress: () => void;
}

export default function ProviderCard({ provider, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between py-3 border-b border-gray-100"
    >
      <View className="flex-row items-center flex-1">
        <Image
          source={{ uri: provider.avatarUrl }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View>
          <Text className="text-gray-900 font-semibold text-base">
            {provider.name}
          </Text>
          <Text className="text-gray-500 text-sm">
            {provider.profession} · {provider.distanceLabel}
          </Text>
        </View>
      </View>

      {provider.isAvailable && (
        <View className="bg-primaryLight px-3 py-1 rounded-full">
          <Text className="text-primary text-xs font-semibold">Available</Text>
        </View>
      )}
    </Pressable>
  );
}
