import type { AccountOverview } from "@/lib/types";

export function ReferralCard({ overview }: { overview: AccountOverview }) {
  return (
    <section className="panel-card">
      <div className="eyebrow">Referral wallet</div>
      <h2>{overview.referralCode}</h2>
      <p>
        Share your referral code. Each successful signup and paid order adds bonus points,
        and promotions can multiply those points from the admin dashboard.
      </p>
      <div className="inline-stats">
        <div className="stats-card">
          <strong>{overview.referrals}</strong>
          <span>successful referrals</span>
        </div>
        <div className="stats-card">
          <strong>{overview.availableDiscount}%</strong>
          <span>discount from points</span>
        </div>
      </div>
    </section>
  );
}
