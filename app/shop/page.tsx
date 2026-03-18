import { ShopExperience } from "@/components/shop-experience";
import { getAccountOverview, getAllProducts, getPromotions } from "@/lib/storefront-data";

export default async function ShopPage() {
  const [products, promotions, account] = await Promise.all([
    getAllProducts(),
    getPromotions(),
    getAccountOverview()
  ]);

  return (
    <section className="stack-page">
      <div className="section-heading">
        <div className="eyebrow">Collection</div>
        <h1>Find your signature scent</h1>
        <p>
          Products include original pricing, active promotion reductions, and your
          progress toward the sixth free reward.
        </p>
      </div>
      <ShopExperience
        products={products}
        promotions={promotions}
        purchasedItems={account.loyalty.freeItemsEarned * 5 + account.loyalty.completedPurchases}
        referralDiscount={account.availableDiscount}
      />
    </section>
  );
}
