import { useState } from "react";
import { View, Text, Pressable, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Button from "../../components/ui/Button";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Slide = {
  eyebrow: string;
  titleDark: string;
  titleRed: string;
  description: string;
  image: ReturnType<typeof require>;
};

const slides: Slide[] = [
  {
    eyebrow: "Welcome to",
    titleDark: "Home",
    titleRed: "Fix",
    description:
      "Bringing expert home services to your doorstep fast, reliable, and stress-free.",
    image: require("../../assets/images/1.jpg"),
  },
  {
    eyebrow: "Plumbing, Laundry",
    titleDark: "And ",
    titleRed: "More!",
    description:
      "Browse trusted service providers for everything your home needs, all in one app.",
    image: require("../../assets/images/2.jpg"),
  },
  {
    eyebrow: "Find. Contact. Fix.",
    titleDark: "Work ",
    titleRed: "Done!",
    description: "Call or message local service providers when you need them.",
    image: require("../../assets/images/3.jpg"),
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === slides.length - 1;
  const slide = slides[index];

  function handleNext() {
    if (isLast) {
      router.replace("/(auth)/signup");
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (!isFirst) setIndex((i) => i - 1);
  }

  function handleSkip() {
    router.replace("/(auth)/signup");
  }

  return (
    <View className="flex-1 bg-white">
      {/* Image bleeds to the very top and sides, square corners */}
      <Image
        source={slide.image}
        style={{ height: SCREEN_HEIGHT * 0.55, width: "100%" }}
        resizeMode="cover"
      />

      {/* White card overlaps the image with rounded top corners */}
      <View
        className="flex-1 bg-white rounded-t-3xl px-6 pt-6 pb-4 justify-between"
        style={{ marginTop: -28 }}
      >
        <SafeAreaView edges={["bottom"]} className="flex-1 justify-between">
          <View>
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-gray-500 text-base">{slide.eyebrow}</Text>
              {!isLast && (
                <Pressable onPress={handleSkip}>
                  <Text className="text-primary underline text-base">Skip</Text>
                </Pressable>
              )}
            </View>

            <Text className="text-3xl font-bold mb-3">
              <Text className="text-gray-900">{slide.titleDark}</Text>
              <Text className="text-primary">{slide.titleRed}</Text>
            </Text>

            <Text className="text-gray-500 text-base leading-6">
              {slide.description}
            </Text>
          </View>

          <View>
            {/* Dots */}
            <View className="flex-row justify-center gap-2 mb-6">
              {slides.map((_, i) => (
                <View
                  key={i}
                  className={`h-2 rounded-full ${
                    i === index ? "w-6 bg-primary" : "w-2 bg-primaryLight"
                  }`}
                />
              ))}
            </View>

            {/* Buttons */}
            <View className="flex-row items-center gap-3">
              {!isFirst && (
                <Pressable
                  onPress={handleBack}
                  className="w-14 h-14 rounded-full border border-primary items-center justify-center"
                >
                  <Text className="text-primary text-lg">←</Text>
                </Pressable>
              )}
              <View className="flex-1">
                <Button label={isLast ? "Get started" : "Next"} onPress={handleNext} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}