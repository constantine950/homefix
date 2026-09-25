import { View, Text, Pressable, Image } from "react-native";
import { Category } from "../lib/types";

interface Props {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="items-center w-1/3 mb-4 px-1">
      <View className="w-full aspect-square rounded-2xl overflow-hidden mb-2">
        <Image
          source={{ uri: category.imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text className="text-gray-900 text-sm font-medium text-center">
        {category.name}
      </Text>
    </Pressable>
  );
}
