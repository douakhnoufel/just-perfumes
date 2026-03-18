export type PerfumeType =
  | "original"
  | "extrait"
  | "eau-de-parfum"
  | "eau-de-toilette"
  | "eau-de-cologne";

export const PERFUME_TYPE_LABELS: Record<PerfumeType, string> = {
  "original": "Original",
  "extrait": "Extrait de Parfum",
  "eau-de-parfum": "Eau de Parfum",
  "eau-de-toilette": "Eau de Toilette",
  "eau-de-cologne": "Eau de Cologne"
};

export type Product = {
  id: string;
  name: string;
  type: PerfumeType;
  collection: string;
  description: string;
  imageUrl: string;
  price: number;
  finalPrice: number;
  promoLabel?: string;
  stock: number;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  bonusReferralPoints: number;
  appliesToProductIds?: string[];
};

export type LoyaltyOverview = {
  completedPurchases: number;
  remainingUntilFree: number;
  freeItemsEarned: number;
};

export type AccountOverview = {
  referralCode: string;
  referrals: number;
  points: number;
  availableDiscount: number;
  loyalty: LoyaltyOverview;
};
