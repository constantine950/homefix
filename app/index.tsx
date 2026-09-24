import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../lib/context/AuthContext";

export default function Index() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      router.replace(
        user.role === "provider" ? "/(provider)/home" : "/(customer)/home",
      );
    } else {
      router.replace("/(onboarding)");
    }
  }, [user, isLoading]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator color="#7A1F1F" />
    </View>
  );
}

// app/index.tsx
// import { Redirect } from "expo-router";

// export default function Index() {
//   return <Redirect href="/(onboarding)" />;
// }
