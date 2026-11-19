import { View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  edges?: Edge[];
};

export default function Screen({
  children,
  className = "",
  edges = ["top"],
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={{ flex: 1, backgroundColor: "#fff9e3" }}
    >
      <View className={`flex-1 ${className}`}>{children}</View>
    </SafeAreaView>
  );
}