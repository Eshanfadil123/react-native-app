import type { ImageSourcePropType } from "react-native";

export type AppTab = {
  name: string;
  title: string;
  icon: ImageSourcePropType;
};

export type UpcomingSubscription = {
  id: string;
  icon: ImageSourcePropType;
  name: string;
  price: number;
  currency: string;
  daysLeft: number;
};

export type Subscription = {
  id: string;
  icon: ImageSourcePropType;
  name: string;
  plan?: string;
  category?: string;
  paymentMethod?: string;
  status?: "active" | "paused" | "cancelled";
  startDate?: string;
  price: number;
  currency: string;
  billing: string;
  renewalDate?: string;
  color?: string;
};