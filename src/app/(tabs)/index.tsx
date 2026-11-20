import { FlatList, Image, Text, View } from "react-native";
import Screen from "@/components/screen";
import { images } from "../../../constants/image";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "../../../constants/data";
import { icons } from "../../../constants/icons";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/utils";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscription from "@/components/UpcomingSubscription";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";


export default function Index() {

  const [expandedSubscription , setExpandedSubscription] = useState<string | null>(null)

  return (
    <Screen edges={["top", "bottom"]} className="flex-1 p-5 bg-background">

       
       <FlatList 
        ListHeaderComponent={() => (

          // Header content lives in ListHeaderComponent so the whole screen scrolls as one list

          <>
              <View className="mb-2.5 flex-row items-center justify-between">
                <View className="home-user">
                  <Image 
                    source={images.avatar} className="home-avatar"
                  />
                  <Text className="ml-4 text-2xl font-sans-bold text-primary">{HOME_USER.name}</Text>
                </View>
                <Image source={icons.add} className="home-add-icon" />
              </View>

              <View className="home-balance-card">
                <Text className="home-balance-label">Balance</Text>
                <View className="home-balance-row">
                  <Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount)}</Text>
                  <Text className="home-balance-date">{dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}</Text>
                </View>
              </View>
              <View className="mb-5">
                <ListHeading title="Upcoming"/>

              <FlatList 
              data={UPCOMING_SUBSCRIPTIONS}
              renderItem={({ item }) => (
                <UpcomingSubscription {...item}/>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<Text className="home-empty-state">No Upcoming Renewable yet</Text>}/> 
            </View>

 w           <ListHeading title="All Subscription" /> 
        </>

        )}
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard 
            {...item}
            expanded={expandedSubscription === item.id}
             onPress={() => setExpandedSubscription((currentId) => (
        currentId === item.id ? null : item.id
       ))}/>
        )}
        extraData={expandedSubscription}
        ItemSeparatorComponent={<View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text className="home-empty-state">No Subscriptionsyet</Text>}
        contentContainerStyle={{paddingBottom: 70 }}
        />  

    </Screen>
  );
}