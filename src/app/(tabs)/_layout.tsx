import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 74;
const TAB_BAR_WIDTH = 350;

type TabIconProps = {
  name: ComponentProps<typeof SymbolView>["name"];
  focused: boolean;
};

function TabIcon({ name, focused }: TabIconProps) {
  return (
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? "#dc2626" : "transparent",
      }}
    >
      <SymbolView name={name} tintColor="#ffffff" size={28} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffffff",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarStyle: {
          position: "absolute",
          width: TAB_BAR_WIDTH,
          marginLeft: (width - TAB_BAR_WIDTH) / 2,
          bottom: Math.max(insets.bottom, 16),
          height: TAB_BAR_HEIGHT,
          backgroundColor: "#081126",
          borderRadius: 32,
          borderTopWidth: 0,
          paddingBottom: 0,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        },
        tabBarItemStyle: {
          height: TAB_BAR_HEIGHT,
          justifyContent: "center",
          paddingTop: 0 ,
          paddingBottom: 0,
          alignItems: "center",
        },
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="house.fill" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: "Subscriptions",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="creditcard.fill" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="gearshape.fill" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen 
        name = "insights"
        options = {{
          title: "insights",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="chart.bar.fill" focused={focused} />
          )
        }}
      />
    </Tabs>
  );
}