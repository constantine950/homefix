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
  const variantStyle =
    variant === "primary"
      ? "bg-primary"
      : "bg-transparent border border-primary";
  const opacity = isDisabled ? "opacity-50" : "";

  const textStyle =
    variant === "primary" ? "text-white font-semibold text-base" : "text-primary font-semibold text-base";

  return (
    <Pressable
      className={`${base} ${width} ${variantStyle} ${opacity}`}
      disabled={isDisabled}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#7A1F1F"} />
      ) : (
        <Text className={textStyle}>{label}</Text>
      )}
    </Pressable>
  );
}