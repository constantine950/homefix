// components/ui/TabBar.tsx
import { View, Pressable, Image, ImageSourcePropType } from "react-native";
import { usePathname, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabKey = "home" | "jobs" | "profile" | "history" | "settings";

interface TabConfig {
  active: ImageSourcePropType;
  inactive: ImageSourcePropType;
}

const ICONS: Record<TabKey, TabConfig> = {
  home: {
    active: require("../../assets/icons/home-active.png"),
    inactive: require("../../assets/icons/home-inactive.png"),
  },
  jobs: {
    active: require("../../assets/icons/jobs-active.png"),
    inactive: require("../../assets/icons/jobs-inactive.png"),
  },
  profile: {
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

interface TabItem {
  key: TabKey;
  path: string; // full, group-qualified path, e.g. "/(customer)/home"
}

interface Props {
  tabs: TabItem[];
}

export default function TabBar({ tabs }: Props) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        left: 24,
        right: 24,
        bottom: Math.max(insets.bottom, 12),
        backgroundColor: "#F3F4F6",
        borderRadius: 999,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {tabs.map((tab) => {
        const icons = ICONS[tab.key];
        // pathname from usePathname() never includes the group segment,
        // so compare against just the last path segment instead.
        const segment = tab.path.split("/").pop();
        const isFocused = pathname.endsWith(`/${segment}`);
        const iconSource = isFocused ? icons.active : icons.inactive;

        return (
          <Pressable
            key={tab.key}
            onPress={() => {
              if (!isFocused) {
                router.replace(tab.path as never);
              }
            }}
            style={{ alignItems: "center" }}
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
  );
}
