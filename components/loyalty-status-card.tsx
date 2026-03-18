import type { AccountOverview } from "@/lib/types";

export function LoyaltyStatusCard({ overview }: { overview: AccountOverview }) {
  return (
    <section className="panel-card">
      <div className="eyebrow">Loyalty progress</div>
      <h2>{overview.loyalty.completedPurchases}/5 purchases</h2>
      <p>
        {overview.loyalty.remainingUntilFree === 0
          ? "Your next perfume is free at checkout."
          : `${overview.loyalty.remainingUntilFree} more purchases until your free item.`}
      </p>
      <div className="inline-stats">
        <div className="stats-card">
          <strong>{overview.loyalty.freeItemsEarned}</strong>
          <span>free perfumes earned</span>
        </div>
        <div className="stats-card">
          <strong>{overview.points}</strong>
          <span>referral points</span>
        </div>
      </div>
    </section>
  );
}
