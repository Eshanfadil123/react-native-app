import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput } from "react-native";
import Screen from "@/components/screen";

export default function SignUp() {
  const { isLoaded } = useAuth();
  const { signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    setErrorMessage("");
    const { error } = await signUp.password({ emailAddress, password });
    if (error) {
      console.log(error);
      setErrorMessage("Could not sign up. Check your email and password.");
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      console.log(sendError);
      setErrorMessage("Could not send the verification code.");
      return;
    }
    setIsVerifying(true);
  };

  const handleVerify = async () => {
    setErrorMessage("");
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      console.log(error);
      setErrorMessage("That code didn't work. Try again.");
      return;
    }
    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      console.log(finalizeError);
      setErrorMessage("Something went wrong finishing sign-up.");
      return;
    }
    router.replace("/(tabs)");
  };

  if (!isLoaded) return null;

  return (
    <Screen edges={["top", "bottom"]} className="justify-center gap-4 px-5">
      <Text className="text-3xl font-sans-bold text-primary">
        {isVerifying ? "Verify your email" : "Create account"}
      </Text>

      {isVerifying ? (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Verification code"
            keyboardType="numeric"
            className="rounded-2xl border border-border bg-background px-4 py-4 text-base"
          />
          <Pressable onPress={handleVerify} className="items-center rounded-2xl bg-accent py-4">
            <Text className="text-base font-sans-bold text-primary">Verify</Text>
          </Pressable>
        </>
      ) : (
        <>
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
          <Pressable onPress={handleSignUp} className="items-center rounded-2xl bg-accent py-4">
            <Text className="text-base font-sans-bold text-primary">Sign up</Text>
          </Pressable>
          <Link href="/auth/signIn" className="text-center text-accent">
            Already have an account? Sign in
          </Link>
        </>
      )}

      {errorMessage ? <Text className="text-destructive">{errorMessage}</Text> : null}
    </Screen>
  );
}