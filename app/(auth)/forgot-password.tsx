// app/(auth)/forgot-password.tsx
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ForgotPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = newPassword.length >= 6 && newPassword === confirmPassword;

  async function handleReset() {
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call, e.g. await resetPassword({ newPassword });
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace("/(auth)/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="flex-row items-center pt-2 mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
          >
            <Feather name="chevron-left" size={20} color="#374151" />
          </Pressable>
        </View>

        <Text className="text-2xl font-bold text-gray-900 mb-1">
          Forgot password
        </Text>
        <Text className="text-gray-500 mb-6">Update your account password</Text>

        <Input
          placeholder="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          isPassword
          icon="lock"
        />
        <Input
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword
          icon="lock"
        />

        {error ? (
          <Text className="text-red-500 text-sm text-center mb-2">{error}</Text>
        ) : null}

        <Button
          label="Reset password"
          onPress={handleReset}
          loading={loading}
          disabled={!isValid}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
