import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../lib/context/AuthContext";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const isValid = phone.trim().length >= 10 && password.length > 0;

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      // TODO: replace with real API call, e.g. const response = await loginApi({ phone, password });
      await new Promise((resolve) => setTimeout(resolve, 800));

      // TODO: use response.user instead of this fake object once API is wired up
      await login({
        id: "temp-id",
        name: "Test User",
        phone,
        role: "customer", // TODO: comes from API response
      });

      router.replace("/(customer)/home");
    } catch (err) {
      setError("Invalid phone number or password");
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          <View className="flex-1 justify-center">
            <Text className="text-3xl font-bold text-gray-900 text-center">
              Welcome Back to
            </Text>
            <Text className="text-3xl font-bold text-center mb-2">
              <Text className="text-gray-900">Home</Text>
              <Text className="text-primary">Fix</Text>
            </Text>
            <Text className="text-gray-500 text-base text-center mb-8">
              Login to Homefix account
            </Text>

            <Input
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="phone"
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isPassword
              icon="lock"
            />

            {error ? (
              <Text className="text-red-500 text-sm text-center mb-2">
                {error}
              </Text>
            ) : null}

            <View className="mt-2">
              <Button
                label="Login"
                onPress={handleLogin}
                loading={loading}
                disabled={!isValid}
              />
            </View>

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-500">Don't have an account? </Text>
              <Link href="/(auth)/signup" asChild>
                <Pressable>
                  <Text className="text-primary font-semibold">Sign Up</Text>
                </Pressable>
              </Link>
            </View>

            <Link href="/(auth)/forgot-password" asChild>
              <Pressable className="mt-3">
                <Text className="text-primary font-semibold text-center underline">
                  Forgot your password?
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
