import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../lib/context/AuthContext";

export default function ProviderHomeScreen() {
  const { user, updateUser } = useAuth();
  const isAvailable = user?.isAvailable ?? false;

  function handleToggleAvailability() {
    const nextState = !isAvailable;
    Alert.alert(
      nextState ? "Go available" : "Go unavailable",
      nextState
        ? "Customers will see you as available!"
        : "Customers will see you as unavailable!",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: async () => {
            await updateUser({ isAvailable: nextState });
            // TODO: replace with real API call, e.g. await updateAvailability(nextState);
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 flex-1">
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Hi {user?.name?.split(" ")[0] ?? "there"}
            </Text>
            <Text className="text-gray-500">Ready for your next job?</Text>
          </View>
        </View>

        <View className="items-center flex-1 justify-center">
          <View
            className={`w-40 h-40 rounded-full items-center justify-center mb-6 ${
              isAvailable ? "bg-primaryLight" : "bg-gray-100"
            }`}
          >
            <Feather
              name={isAvailable ? "check-circle" : "power"}
              size={56}
              color={isAvailable ? "#7A1F1F" : "#9CA3AF"}
            />
          </View>

          <Text className="text-gray-900 text-lg font-semibold mb-1">
            {isAvailable ? "You're available" : "You're unavailable"}
          </Text>
          <Text className="text-gray-500 text-center mb-8 px-8">
            {isAvailable
              ? "Customers nearby can see and contact you"
              : "Go available so customers can find you"}
          </Text>

          <Pressable
            onPress={handleToggleAvailability}
            className={`px-8 py-4 rounded-full flex-row items-center ${
              isAvailable ? "bg-gray-100" : "bg-primary"
            }`}
          >
            <Text
              className={`font-semibold text-base ${isAvailable ? "text-gray-700" : "text-white"}`}
            >
              {isAvailable ? "Go unavailable" : "Go available"}
            </Text>
            {isAvailable && (
              <Feather
                name="x"
                size={18}
                color="#374151"
                style={{ marginLeft: 8 }}
              />
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
