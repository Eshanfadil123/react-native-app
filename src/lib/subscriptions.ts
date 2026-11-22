
import { apiFetch } from "./api";

export type Subscription = {
  _id: string;
  name: string;
  iconKey?: string;
  plan?: string;
  category?: string;
  paymentMethod?: string;
  status: "active" | "paused" | "cancelled";
  startDate?: string;
  price: number;
  currency: string;
  billing: "Monthly" | "Yearly";
  renewalDate?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SubscriptionInput = {
  name: string;
  iconKey?: string;
  plan?: string;
  category?: string;
  paymentMethod?: string;
  status?: "active" | "paused" | "cancelled";
  startDate?: string;
  price: number;
  currency?: string;
  billing: "Monthly" | "Yearly";
  renewalDate?: string;
  color?: string;
};

// GET subscriptions
export function getSubscriptions(token: string | null) {
  return apiFetch<Subscription[]>(
    token,
    "/subscriptions"
  );
}

// ADD subscription
export function addSubscription(
  token: string | null,
  data: SubscriptionInput
) {
  return apiFetch<Subscription>(
    token,
    "/subscriptions",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

// EDIT subscription
export function updateSubscription(
  token: string | null,
  id: string,
  data: Partial<SubscriptionInput>
) {
  return apiFetch<Subscription>(
    token,
    `/subscriptions/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

// DELETE subscription
export function deleteSubscription(
  token: string | null,
  id: string
) {
  return apiFetch<void>(
    token,
    `/subscriptions/${id}`,
    {
      method: "DELETE",
    }
  );
}
