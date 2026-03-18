export type Product = {
  id: string;
  name: string;
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
