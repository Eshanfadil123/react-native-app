import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import Screen from "@/components/screen";
import { useAuth } from "@clerk/expo";
import { useState } from "react";
import { router } from "expo-router";
import { addSubscription } from "@/lib/subscriptions";

export default function AddSubscription() {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!isLoaded || !isSignedIn) {
      Alert.alert("Authentication required", "Please sign in to add a subscription.");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter a subscription name.");
      return;
    }

    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert("Invalid price", "Please enter a valid subscription price.");
      return;
    }

    try {
      setLoading(true);

      // Force a fresh session token
      const token = await getToken({ skipCache: true });

      if (!token) {
        Alert.alert("Session Error", "Could not retrieve your session. Please sign in again.");
        return;
      }

      await addSubscription(token, {
        name: name.trim(),
        price: Number(price),
        currency: "USD",
        billing: "Monthly",
        status: "active",
      });

      Alert.alert("Success", "Subscription added successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Add subscription error:", error);
      Alert.alert("Error", "Failed to add subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      edges={["top", "bottom"]}
      className="flex-1 px-5 pt-6"
    >
      <Text className="text-3xl font-sans-bold text-primary">
        Add Subscription
      </Text>

      <Text className="mt-2 text-muted-foreground">
        Keep track of your recurring payments.
      </Text>

      <View className="mt-8 gap-4">
        {/* Subscription Name */}
        <View>
          <Text className="mb-2 font-sans-medium text-primary">
            Subscription Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Netflix"
            autoCapitalize="words"
            className="rounded-2xl border border-border bg-card px-4 py-4 text-primary"
          />
        </View>

        {/* Price */}
        <View>
          <Text className="mb-2 font-sans-medium text-primary">
            Price
          </Text>

          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="e.g. 499"
            keyboardType="decimal-pad"
            className="rounded-2xl border border-border bg-card px-4 py-4 text-primary"
          />
        </View>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          disabled={loading}
          className="mt-4 items-center rounded-2xl bg-accent py-4"
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-base font-sans-bold text-primary">
              Save Subscription
            </Text>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}