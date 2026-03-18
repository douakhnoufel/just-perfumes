import { Gift, Trophy } from "lucide-react";

export function LoyaltyPanel() {
  return (
    <section className="loyalty-card">
      <div className="eyebrow">Rewards engine</div>
      <h2>Loyalty designed into the storefront</h2>
      <p>
        After every purchased item, the client advances toward the next free perfume.
        When the purchase count reaches five, the sixth item is priced at zero on the
        client side checkout flow.
      </p>
      <div className="hero-metrics">
        <article>
          <Trophy size={18} />
          <span>Track five completed purchases</span>
        </article>
        <article>
          <Gift size={18} />
          <span>Apply free item automatically on the sixth</span>
        </article>
      </div>
    </section>
  );
}
