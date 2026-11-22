import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput } from "react-native";
import Screen from "@/components/screen";

export default function SignIn() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    setErrorMessage("");
    const { error } = await signIn.password({ emailAddress, password });
    if (error) {
      console.log(error);
      setErrorMessage("Wrong email or password.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => {
          router.replace("/(tabs)");
        },
      });
    } else {
      console.log("Sign-in not complete:", signIn.status);
      setErrorMessage("Extra verification is needed for this account.");
    }
  };

  return (
    <Screen edges={["top", "bottom"]} className="justify-center gap-4 px-5">
      <Text className="text-3xl font-sans-bold text-primary">Welcome back</Text>

      <TextInput
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        className="rounded-2xl border border-border bg-background px-4 py-4 text-base"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="rounded-2xl border border-border bg-background px-4 py-4 text-base"
      />
      <Pressable onPress={handleSignIn} className="items-center rounded-2xl bg-accent py-4">
        <Text className="text-base font-sans-bold text-primary">Sign in</Text>
      </Pressable>

      <Link href="/auth/signUp" className="text-center text-accent">
        New here? Create an account
      </Link>

      {errorMessage ? <Text className="text-destructive">{errorMessage}</Text> : null}
    </Screen>
  );
}