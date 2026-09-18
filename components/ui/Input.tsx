// components/ui/Input.tsx
import { useState } from "react";
import { View, TextInput, TextInputProps, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  icon?: keyof typeof Feather.glyphMap;
  isPassword?: boolean;
}

export default function Input({ icon, isPassword, ...textInputProps }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className={`flex-row items-center rounded-full px-4 h-14 mb-4 ${
        isFocused ? "border border-primary bg-white" : "bg-gray-100"
      }`}
    >
      {icon && (
        <Feather
          name={icon}
          size={20}
          color={isFocused ? "#7A1F1F" : "#9CA3AF"}
          style={{ marginRight: 12 }}
        />
      )}
      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholderTextColor="#9CA3AF"
        secureTextEntry={isPassword && !showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
      />
      {isPassword && (
        <Pressable onPress={() => setShowPassword((v) => !v)}>
          <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}