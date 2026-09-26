// app/(auth)/signup.tsx — add role state + a toggle UI above the form
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
import { UserRole } from "../../lib/types";

export default function SignupScreen() {
  const [role, setRole] = useState<UserRole>("customer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    name.trim().length > 0 &&
    phone.trim().length >= 10 &&
    password.length >= 6 &&
    password === confirmPassword;

  async function handleSignup() {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call, e.g. await signup({ name, phone, password, role });
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push({ pathname: "/(auth)/verify-otp", params: { phone, role } });
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
              Welcome to
            </Text>
            <Text className="text-3xl font-bold text-center mb-2">
              <Text className="text-gray-900">Home</Text>
              <Text className="text-primary">Fix</Text>
            </Text>
            <Text className="text-gray-500 text-base text-center mb-6">
              Create an Homefix account
            </Text>

            <View className="flex-row bg-gray-100 rounded-full p-1 mb-6">
              <Pressable
                onPress={() => setRole("customer")}
                className={`flex-1 py-3 rounded-full items-center ${
                  role === "customer" ? "bg-primary" : ""
                }`}
              >
                <Text
                  className={
                    role === "customer"
                      ? "text-white font-semibold"
                      : "text-gray-500"
                  }
                >
                  I need a service
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setRole("provider")}
                className={`flex-1 py-3 rounded-full items-center ${
                  role === "provider" ? "bg-primary" : ""
                }`}
              >
                <Text
                  className={
                    role === "provider"
                      ? "text-white font-semibold"
                      : "text-gray-500"
                  }
                >
                  I provide a service
                </Text>
              </Pressable>
            </View>

            <Input
              placeholder="Name"
              value={name}
              onChangeText={setName}
              icon="user"
            />
            <Input
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="phone"
            />
            <Input
              placeholder="Create password"
              value={password}
              onChangeText={setPassword}
              isPassword
              icon="lock"
            />
            <Input
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
                label="Sign up"
                onPress={handleSignup}
                loading={loading}
                disabled={!isValid}
              />
            </View>

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-500">Already registered? </Text>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  <Text className="text-primary font-semibold">Sign in</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
