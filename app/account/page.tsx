import { LoyaltyStatusCard } from "@/components/loyalty-status-card";
import { ReferralCard } from "@/components/referral-card";
import { getAccountOverview } from "@/lib/storefront-data";

export default async function AccountPage() {
  const overview = await getAccountOverview();

  return (
    <section className="stack-page">
      <div className="section-heading">
        <div className="eyebrow">Client dashboard</div>
        <h1>Your rewards and referral balance</h1>
      </div>
      <div className="dashboard-grid">
        <LoyaltyStatusCard overview={overview} />
        <ReferralCard overview={overview} />
      </div>
    </section>
  );
}
