import { Pressable, Text, ActivityIndicator, PressableProps } from "react-native";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  label,
  variant = "primary",
  loading = false,
  fullWidth = true,
  disabled,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base = "py-4 px-6 rounded-full items-center justify-center";
  const width = fullWidth ? "w-full" : "";

  let bgStyle = "";
  let textStyle = "";

  if (variant === "primary") {
    bgStyle = isDisabled ? "bg-primaryLight" : "bg-primary";
    textStyle = isDisabled ? "text-primary/50" : "text-white";
  } else {
    bgStyle = "bg-transparent border border-primary";
    textStyle = "text-primary";
  }

  return (
    <Pressable
      className={`${base} ${width} ${bgStyle}`}
      disabled={isDisabled}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#7A1F1F"} />
      ) : (
        <Text className={`font-semibold text-base ${textStyle}`}>{label}</Text>
      )}
    </Pressable>
  );
}