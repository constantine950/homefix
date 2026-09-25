// components/ui/TabBar.tsx
import { View, Pressable, Image, ImageSourcePropType } from "react-native";
import { usePathname, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabKey = "home" | "jobs" | "profile" | "history" | "settings";

interface TabConfig {
  active: ImageSourcePropType;
  inactive: ImageSourcePropType;
  path: string;
}

const ICONS: Record<TabKey, TabConfig> = {
  home: {
    active: require("../../assets/icons/home-active.png"),
    inactive: require("../../assets/icons/home-inactive.png"),
    path: "/home",
  },
  jobs: {
    active: require("../../assets/icons/jobs-active.png"),
    inactive: require("../../assets/icons/jobs-inactive.png"),
    path: "/jobs",
  },
  profile: {
    active: require("../../assets/icons/jobs-active.png"),
    inactive: require("../../assets/icons/jobs-inactive.png"),
    path: "/profile",
  },
  history: {
    active: require("../../assets/icons/history-active.png"),
    inactive: require("../../assets/icons/history-inactive.png"),
    path: "/history",
  },
  settings: {
    active: require("../../assets/icons/settings-active.png"),
    inactive: require("../../assets/icons/settings-inactive.png"),
    path: "/settings",
  },
};

interface Props {
  tabs: TabKey[];
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
      {tabs.map((tabKey) => {
        const tab = ICONS[tabKey];
        const isFocused = pathname.endsWith(tab.path);
        const iconSource = isFocused ? tab.active : tab.inactive;

        return (
          <Pressable
            key={tabKey}
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
