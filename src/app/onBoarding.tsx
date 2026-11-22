import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import Screen from "@/components/screen";

export default function OnBoarding() {
  return (
    <Screen edges={["top", "bottom"]} className="justify-center gap-4 px-5">
      <Text className="text-4xl font-sans-extrabold text-primary">
        Track every subscription
      </Text>
      <Text className="mb-4 text-base font-sans-medium text-muted-foreground">
        Sign in or create an account to get started.
      </Text>

      <Link href="/auth/signIn" asChild>
        <Pressable className="items-center rounded-2xl bg-accent py-4">
          <Text className="text-base font-sans-bold text-primary">Sign in</Text>
        </Pressable>
      </Link>

      <Link href="/auth/signUp" asChild>
        <Pressable className="items-center rounded-2xl border border-border py-4">
          <Text className="text-base font-sans-bold text-primary">Create account</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}