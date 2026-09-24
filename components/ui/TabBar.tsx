// components/ui/TabBar.tsx
import { View, Pressable, Image } from "react-native";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ComponentProps } from "react";

type TabBarRenderProps = NonNullable<ComponentProps<typeof Tabs>["tabBar"]>;
type TabBarProps = Parameters<TabBarRenderProps>[0];

const ICONS: Record<
  string,
  { active: ReturnType<typeof require>; inactive: ReturnType<typeof require> }
> = {
  home: {
    active: require("../../assets/icons/home-active.png"),
    inactive: require("../../assets/icons/home-inactive.png"),
  },
  profile: {
    active: require("../../assets/icons/jobs-active.png"),
    inactive: require("../../assets/icons/jobs-inactive.png"),
  },
  jobs: {
    active: require("../../assets/icons/jobs-active.png"),
    inactive: require("../../assets/icons/jobs-inactive.png"),
  },
  history: {
    active: require("../../assets/icons/history-active.png"),
    inactive: require("../../assets/icons/history-inactive.png"),
  },
  settings: {
    active: require("../../assets/icons/settings-active.png"),
    inactive: require("../../assets/icons/settings-inactive.png"),
  },
};

export default function TabBar({ state, navigation }: TabBarProps) {
  // Only show routes we actually have a tab icon for — this is what
  // filters out category/[slug], provider/[id], setup/*, etc.
  const visibleRoutes = state.routes.filter((route) => ICONS[route.name]);

  return (
    <SafeAreaView edges={["bottom"]} className="bg-white">
      <View className="flex-row items-center justify-around bg-gray-100 rounded-full mx-6 mb-2 py-4">
        {visibleRoutes.map((route) => {
          const routeIndex = state.routes.findIndex((r) => r.key === route.key);
          const isFocused = state.index === routeIndex;
          const icons = ICONS[route.name];
          const iconSource = isFocused ? icons.active : icons.inactive;

          function handlePress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              className="items-center justify-end"
            >
              <Image
                source={iconSource}
                style={{ width: 24, height: 30 }}
                resizeMode="contain"
              />
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
