"use client";

import { useEffect } from "react";
import { trackPurchase } from "@/lib/analytics";

type Props = {
  productIds: string[];
  value: number;
  transactionId: string;
};

export default function PurchaseTracker({
  productIds,
  value,
  transactionId,
}: Props) {
  useEffect(() => {
    if (!transactionId || productIds.length === 0) return;

    const key = `aeterna_purchase_tracked_${transactionId}`;
    const alreadyTracked = sessionStorage.getItem(key);

    if (alreadyTracked) return;

    trackPurchase({
      transactionId,
      value,
      productIds,
    });

    sessionStorage.setItem(key, "true");
  }, [productIds, value, transactionId]);

  return null;
}