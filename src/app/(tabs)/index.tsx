import {
  FlatList,
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Screen from "@/components/screen";
import { router, useFocusEffect } from "expo-router";
import { icons } from "../../../constants/icons";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/utils";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscription from "@/components/UpcomingSubscription";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState , useCallback } from "react";
import { useAuth, useUser } from "@clerk/expo";


import {
  getSubscriptions,
  Subscription,
} from "@/lib/subscriptions"

const getSubscriptionIcon = (iconKey?: string) => {
  if (!iconKey) return icons.add;

  return icons[iconKey as keyof typeof icons] ?? icons.add;
};

export default function Index() {

  const [expandedSubscription , setExpandedSubscription] = useState<string | null>(null)

  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const [subscriptions, setSubscriptions] =
  useState<Subscription[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSubscriptions = useCallback(async () => {
  if (!isSignedIn) {
    setSubscriptions([]);
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    setError("");

   const token = await getToken({ skipCache: true });

    console.log("Signed in:", isSignedIn);
    console.log("Token exists:", !!token);
    console.log("Token length:", token?.length ?? 0);

    if (!token) {
      throw new Error("Clerk did not provide a session token.");
    }

    const data = await getSubscriptions(token);

    console.log("Subscriptions received:", data.length);

    setSubscriptions(data);
   } catch (error) {
      console.error("Home subscription loading error:", error);
      setError("Unable to load subscriptions.");
    } finally {
      setLoading(false);
    }
    }, [getToken, isSignedIn]);

    useFocusEffect(
      useCallback(() => {
        loadSubscriptions();
      }, [loadSubscriptions])
    );

    const upcomingSubscriptions = subscriptions
  .filter((item) => {
    if (!item.renewalDate || item.status !== "active") {
      return false;
    }

    const daysLeft = dayjs(item.renewalDate)
      .startOf("day")
      .diff(dayjs().startOf("day"), "day");

    return daysLeft >= 0 && daysLeft <= 30;
  })
  .sort((a, b) =>
    dayjs(a.renewalDate).diff(dayjs(b.renewalDate))
  );

  return (
    <Screen edges={["top", "bottom"]} className="flex-1 p-5 bg-background">

       
       <FlatList 
        ListHeaderComponent={() => (

          <>
              {/* Header content lives in ListHeaderComponent */}
              <View className="mb-2.5 flex-row items-center justify-between">
                <View className="home-user">
                  <Image
                    source={user?.imageUrl ? { uri: user.imageUrl } : icons.add}
                    className="home-avatar"
                  />

                  <Text className="ml-4 text-2xl font-sans-bold text-primary">
                    {user?.firstName || "Welcome"}
                  </Text>
                </View>

                <Pressable onPress={() => router.push("/subscription/add")}>
                  <Image source={icons.add} className="home-add-icon" />
                </Pressable>
              </View>

              <View className="home-balance-card">
                <Text className="home-balance-label">Balance</Text>
                <View className="home-balance-row">
                  <Text className="home-balance-amount">
                    {formatCurrency(
                      subscriptions
                        .filter((item) => item.status === "active")
                        .reduce((total, item) => {
                          return total + (
                            item.billing === "Yearly"
                              ? item.price / 12
                              : item.price
                          );
                        }, 0)
                    )}
                  </Text>

                  <Text className="home-balance-date">
                    Monthly
                  </Text>
                </View>
              </View>
              <View className="mb-5">
                <ListHeading title="Upcoming"/>

              <FlatList 
              data={upcomingSubscriptions}
              renderItem={({ item }) => (
                <UpcomingSubscription
                  name={item.name}
                  price={item.price}
                  currency={item.currency}
                  icon={getSubscriptionIcon(item.iconKey)}
                  daysLeft={dayjs(item.renewalDate)
                    .startOf("day")
                    .diff(dayjs().startOf("day"), "day")}
                />
              )}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<Text className="home-empty-state">No Upcoming Renewable yet</Text>}/> 
            </View>

           <ListHeading title="All Subscription" /> 
        </>

        )}
        data={subscriptions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
      <SubscriptionCard
        {...item}
        id={item._id}
        icon={getSubscriptionIcon(item.iconKey)}
        expanded={expandedSubscription === item._id}
        onPress={() =>
          setExpandedSubscription((currentId) =>
            currentId === item._id ? null : item._id
            )
          }
        />
      )}
        extraData={expandedSubscription}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text className="home-empty-state">{error}</Text>
          ) : (
            <Text className="home-empty-state">
              No subscriptions yet. Add your first subscription!
            </Text>
          )
        }
        contentContainerStyle={{paddingBottom: 70 }}
        />  

    </Screen>
  );
}