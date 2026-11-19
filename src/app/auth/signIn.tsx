import { Link } from "expo-router";
import { Text } from "react-native";
import Screen from "@/components/screen";

const SignIn = () => {
  return (
    <Screen edges={["top", "bottom"]} className="items-center justify-center">
      <Text className="text-2xl font-bold text-primary">signIn</Text>
      <Link href="/auth/signUp" className="mt-4 text-accent">
        Create Account
      </Link>
    </Screen>
  );
};

export default SignIn;