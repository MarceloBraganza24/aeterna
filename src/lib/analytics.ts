export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type AnalyticsParams = Record<
  string,
  string | number | boolean | string[] | number[] | object | undefined
>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventName: string | Date,
      params?: AnalyticsParams
    ) => void;
    fbq?: (
      command: "track" | "init",
      eventName: string,
      params?: AnalyticsParams
    ) => void;
  }
}

export function trackGAEvent(
  eventName: string,
  params?: AnalyticsParams
) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, params);
}

export function trackMetaEvent(
  eventName: string,
  params?: AnalyticsParams
) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;

  window.fbq("track", eventName, params);
}

export function trackAddToCart(params: {
  productId: string;
  productName: string;
  price: number;
}) {
  trackGAEvent("add_to_cart", {
    currency: "USD",
    value: params.price,
    items: [
      {
        item_id: params.productId,
        item_name: params.productName,
        price: params.price,
        quantity: 1,
      },
    ],
  });

  trackMetaEvent("AddToCart", {
    currency: "USD",
    value: params.price,
    content_ids: [params.productId],
    content_name: params.productName,
    content_type: "product",
  });
}

export function trackBeginCheckout(params: {
  value: number;
  productIds: string[];
}) {
  trackGAEvent("begin_checkout", {
    currency: "USD",
    value: params.value,
    items: params.productIds.map((id) => ({
      item_id: id,
      quantity: 1,
    })),
  });

  trackMetaEvent("InitiateCheckout", {
    currency: "USD",
    value: params.value,
    content_ids: params.productIds,
    content_type: "product",
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value: number;
  productIds: string[];
}) {
  trackGAEvent("purchase", {
    transaction_id: params.transactionId,
    currency: "USD",
    value: params.value,
    items: params.productIds.map((id) => ({
      item_id: id,
      quantity: 1,
    })),
  });

  trackMetaEvent("Purchase", {
    currency: "USD",
    value: params.value,
    content_ids: params.productIds,
    content_type: "product",
  });
}