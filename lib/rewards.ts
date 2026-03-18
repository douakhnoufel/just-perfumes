import type { LoyaltyOverview, Product, Promotion } from "@/lib/types";

export function mergeProductPromotions(products: Product[], promotions: Promotion[]) {
  const active = promotions[0];

  if (!active) {
    return products;
  }

  return products.map((product) => {
    const applies =
      !active.appliesToProductIds ||
      active.appliesToProductIds.includes(product.id);

    if (!applies) {
      return product;
    }

    const discounted = Number(
      (product.price * (1 - active.discountPercent / 100)).toFixed(2)
    );

    return {
      ...product,
      finalPrice: discounted,
      promoLabel: `${active.discountPercent}% off`
    };
  });
}

export function buildLoyaltyOverview(totalPurchasedItems: number): LoyaltyOverview {
  const completedPurchases = totalPurchasedItems % 5;
  const freeItemsEarned = Math.floor(totalPurchasedItems / 5);
  const remainingUntilFree = completedPurchases === 0 ? 0 : 5 - completedPurchases;

  return {
    completedPurchases,
    remainingUntilFree,
    freeItemsEarned
  };
}

export function applySixthItemFree(
  prices: number[],
  totalPurchasedItemsBeforeCheckout: number
) {
  if (totalPurchasedItemsBeforeCheckout === 0 || totalPurchasedItemsBeforeCheckout % 5 !== 0 || prices.length === 0) {
    return prices;
  }

  const cheapestIndex = prices.reduce((bestIndex, price, index, arr) =>
    price < arr[bestIndex] ? index : bestIndex, 0);

  return prices.map((price, index) => (index === cheapestIndex ? 0 : price));
}
