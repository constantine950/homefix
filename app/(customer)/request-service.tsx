// app/(customer)/request-service.tsx
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const CATEGORIES = [
  "Plumber",
  "Electrician",
  "Painter",
  "Carpenter",
  "Cleaner",
  "Tiler",
];

export default function RequestServiceScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = selectedCategory !== null && description.trim().length > 0;

  async function handleSubmit() {
    setLoading(true);
    try {
      // TODO: replace with real API call, e.g.
      // await createServiceRequest({ category: selectedCategory, description });
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.back();
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="flex-row items-center justify-between px-6 pt-2 pb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
          >
            <Feather name="x" size={20} color="#374151" />
          </Pressable>
          <Text className="text-lg font-bold text-gray-900">
            Request a service
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView className="px-6" keyboardShouldPersistTaps="handled">
          <Text className="text-gray-900 font-semibold mb-3">
            What do you need?
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text className={isSelected ? "text-white" : "text-gray-700"}>
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-gray-900 font-semibold mb-3">
            Describe the job
          </Text>
          <Input
            placeholder="e.g. Kitchen tap is leaking, needs urgent fix"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={{
              height: 100,
              textAlignVertical: "top",
              paddingTop: 14,
              borderRadius: 20,
            }}
          />
        </ScrollView>

        <View className="px-6 pb-4 pt-2">
          <Button
            label="Submit request"
            onPress={handleSubmit}
            loading={loading}
            disabled={!isValid}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
