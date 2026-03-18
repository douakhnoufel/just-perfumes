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
        <div className="eyebrow">Extrait de Parfum</div>
        <h1>JUST-PERFUM</h1>
        <p>
          Discover authentic designer fragrances — Dior, Chanel, Tom Ford, and more.
          100% original extrait de parfum with exclusive rewards for loyal clients.
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
            <ShieldCheck size={18} />
            <span>100% Original fragrances</span>
          </article>
          <article>
            <Gift size={18} />
            <span>6th bottle free</span>
          </article>
          <article>
            <Sparkles size={18} />
            <span>Exclusive collections</span>
          </article>
        </div>
      </section>

      <PromoBanner promotions={promotions} />
      <FeaturedProducts products={products} />
      <section className="store-gallery">
        <article
          className="store-photo"
          style={{ backgroundImage: "url('/images/jstprfpic1.jpg')" }}
        />
        <article
          className="store-photo"
          style={{ backgroundImage: "url('/images/jstprf2.jpg')" }}
        />
        <article
          className="store-photo"
          style={{ backgroundImage: "url('/images/jstperfpic.jpg')" }}
        />
      </section>

      <section className="story-card">
        <div>
          <div className="eyebrow">Why choose us</div>
          <h2>Authentic luxury fragrances</h2>
        </div>
        <p>
          We source only 100% original extrait de parfum from authorized distributors.
          Experience the finest concentrations of Dior, Chanel, Tom Ford, and more.
        </p>
        <div className="story-points">
          <span>
            <Star size={16} />
            Verified authentic products
          </span>
          <span>
            <Star size={16} />
            Earn rewards with every purchase
          </span>
          <span>
            <Star size={16} />
            Free shipping on orders over 100
          </span>
        </div>
      </section>

      <LoyaltyPanel />
    </div>
  );
}
