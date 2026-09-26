// app/(auth)/verify-otp.tsx — update the imports and handleVerify function
import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../../components/ui/Button";
import { useAuth } from "../../lib/context/AuthContext";
import { UserRole } from "../../lib/types";

const CODE_LENGTH = 4;

export default function VerifyOtpScreen() {
  const { phone, role } = useLocalSearchParams<{
    phone?: string;
    role?: UserRole;
  }>();
  const { login } = useAuth();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH;

  function handleChange(text: string, index: number) {
    const next = [...digits];
    next[index] = text.slice(-1);
    setDigits(next);

    if (text && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    } else if (text && index === CODE_LENGTH - 1) {
      Keyboard.dismiss();
    }
  }

  function handleKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    setLoading(true);
    try {
      // TODO: replace with real API call, e.g. await verifyOtp({ phone, code });
      await new Promise((resolve) => setTimeout(resolve, 800));

      const userRole: UserRole = role === "provider" ? "provider" : "customer";

      // TODO: use the real user object returned by your signup/verify API
      await login({
        id: "temp-id",
        name: "Test User",
        phone: phone ?? "",
        role: userRole,
      });

      if (userRole === "provider") {
        router.replace("/(provider)/setup/go-premium");
      } else {
        router.replace("/(customer)/home");
      }
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-6">
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
              Verification Code
            </Text>
            <Text className="text-gray-500 text-base text-center mb-1">
              Enter verification code sent to your
            </Text>
            <Text className="text-primary text-base text-center mb-8">
              {phone ?? "number"}
            </Text>

            <View className="flex-row justify-center gap-3 mb-4">
              {digits.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    inputs.current[i] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleChange(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-16 h-16 rounded-2xl border border-primary text-center text-2xl font-bold text-primary"
                />
              ))}
            </View>

            <Text className="text-primary underline text-center mb-8">
              Resend
            </Text>

            <Button
              label="Verify"
              onPress={handleVerify}
              loading={loading}
              disabled={!isComplete}
            />

            <Pressable onPress={() => router.back()} className="mt-4">
              <Text className="text-primary underline text-center">
                Change number
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
