import type { Promotion } from "@/lib/types";

export function PromoBanner({ promotions }: { promotions: Promotion[] }) {
  const topPromo = promotions[0];

  return (
    <section className="promo-card">
      <div className="eyebrow">Active promotion</div>
      <h2>{topPromo?.title ?? "Launch campaign ready"}</h2>
      <p>
        {topPromo?.description ??
          "Set promotions from the admin dashboard and they will reflect automatically across the shop."}
      </p>
      <div className="inline-stats">
        <div className="stats-card">
          <strong>{topPromo?.discountPercent ?? 15}%</strong>
          <span>reduction</span>
        </div>
        <div className="stats-card">
          <strong>{topPromo?.bonusReferralPoints ?? 25}</strong>
          <span>bonus referral points</span>
        </div>
      </div>
    </section>
  );
}
