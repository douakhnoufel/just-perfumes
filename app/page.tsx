import Link from "next/link";
import { ArrowRight, Gift, ShieldCheck, Sparkles, Star } from "lucide-react";
import { FeaturedProducts } from "@/components/featured-products";
import { PromoBanner } from "@/components/promo-banner";
import { LoyaltyPanel } from "@/components/loyalty-panel";
import { getFeaturedProducts, getPromotions } from "@/lib/storefront-data";

export default async function HomePage() {
  const [products, promotions] = await Promise.all([
    getFeaturedProducts(),
    getPromotions()
  ]);

  return (
    <div className="home-grid">
      <section className="hero-card">
        <div className="eyebrow">Maison Badou presents</div>
        <h1>parfume BADOU</h1>
        <p>
          Premium scents with animated luxury storefront UX, smart admin campaigns,
          and a reward engine that turns every fifth purchase into your sixth bottle.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" href="/shop">
            Explore collection
            <ArrowRight size={18} />
          </Link>
          <Link className="secondary-link" href="/auth">
            Sign in
          </Link>
        </div>
        <div className="hero-metrics">
          <article>
            <Sparkles size={18} />
            <span>Animated premium storefront</span>
          </article>
          <article>
            <Gift size={18} />
            <span>Referral bonuses + 6th free</span>
          </article>
          <article>
            <ShieldCheck size={18} />
            <span>Supabase auth and admin control</span>
          </article>
        </div>
      </section>

      <PromoBanner promotions={promotions} />
      <FeaturedProducts products={products} />

      <section className="story-card">
        <div>
          <div className="eyebrow">Owner spotlight</div>
          <h2>Badou&apos;s signature fragrance house</h2>
        </div>
        <p>
          Designed for direct sales, seasonal reductions, and a mobile-ready experience
          that can be packaged into an Android app with Capacitor.
        </p>
        <div className="story-points">
          <span>
            <Star size={16} />
            Admin publishes flash reductions
          </span>
          <span>
            <Star size={16} />
            Referral codes convert into bonus points
          </span>
          <span>
            <Star size={16} />
            Loyalty tracker shows progress to free item
          </span>
        </div>
      </section>

      <LoyaltyPanel />
    </div>
  );
}
