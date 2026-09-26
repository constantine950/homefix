// app/(provider)/setup/go-premium.tsx
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Button from "../../../components/ui/Button";

const PLANS = [
  { id: "monthly", label: "Monthly", price: "₦2,500/mo" },
  { id: "yearly", label: "Yearly", price: "₦20,000/yr" },
];

export default function GoPremiumScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row justify-end pt-2 mb-4">
        <Pressable
          onPress={() => router.push("/(provider)/setup/availability")}
        >
          <Text className="text-primary underline text-base">Skip</Text>
        </Pressable>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-1">Go premium</Text>
      <Text className="text-gray-500 mb-6">
        Get more jobs and higher visibility
      </Text>

      <View className="flex-row gap-4 mb-8">
        {PLANS.map((plan) => (
          <View
            key={plan.id}
            className="flex-1 bg-primaryLight rounded-2xl p-4 h-40 justify-between"
          >
            <Feather name="star" size={22} color="#7A1F1F" />
            <View>
              <Text className="text-gray-900 font-bold text-base">
                {plan.label}
              </Text>
              <Text className="text-gray-600 text-sm">{plan.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-1" />

      <View className="pb-4">
        <Button
          label="Next"
          onPress={() => router.push("/(provider)/setup/availability")}
        />
      </View>
    </SafeAreaView>
  );
}
