import Link from "next/link";
import { ArrowRight, Gift, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
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
        <div className="eyebrow">Badou&apos;s fragrance boutique</div>
        <h1>JUST-PERFUM</h1>
        <p>
          Discover an immersive extrait de parfum destination built around authentic
          designer fragrances, boutique atmosphere, and a premium reward journey.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" href="/shop">
            Explore collection
            <ArrowRight size={18} />
          </Link>
          <Link className="secondary-link" href="/contact">
            Visit the boutique
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
        <div className="hero-note">
          <span className="pill">Dior, Creed, YSL, Jean Paul Gaultier</span>
          <span className="muted">Curated in-store and online for a luxury-first experience.</span>
        </div>
      </section>

      <PromoBanner promotions={promotions} />
      <FeaturedProducts products={products} />

      <section className="gallery-section">
        <div className="section-heading">
          <div className="eyebrow">Store atmosphere</div>
          <h1>Step inside the JUST-PERFUM experience</h1>
          <p>
            The space itself is part of the brand: moody shelving, lit fragrance walls,
            and a boutique presentation that feels premium before the bottle is opened.
          </p>
        </div>
        <div className="store-gallery">
          <article
            className="store-photo store-photo-wide"
            style={{ backgroundImage: "url('/images/jstprfpic1.jpg')" }}
          >
            <div className="store-photo-copy">
              <div className="eyebrow">Front room</div>
              <h3>Signature entrance mirror and premium wall display</h3>
            </div>
          </article>
          <article
            className="store-photo"
            style={{ backgroundImage: "url('/images/jstprf2.jpg')" }}
          >
            <div className="store-photo-copy">
              <div className="eyebrow">Designer shelf</div>
              <h3>Lit collections from iconic fragrance houses</h3>
            </div>
          </article>
          <article
            className="store-photo"
            style={{ backgroundImage: "url('/images/jstperfpic.jpg')" }}
          >
            <div className="store-photo-copy">
              <div className="eyebrow">Highlight wall</div>
              <h3>Editorial presentation built around hero scents</h3>
            </div>
          </article>
        </div>
      </section>

      <section className="story-card">
        <div>
          <div className="eyebrow">Why clients return</div>
          <h2>Authentic luxury, strong rewards, boutique-level trust</h2>
        </div>
        <p>
          We source only 100% original extrait de parfum from authorized distributors,
          then wrap that into a commerce flow with promotions, referral value, and
          loyalty incentives that feel built for repeat buyers.
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
            Admin-controlled flash reductions
          </span>
        </div>
        <div className="story-cta">
          <Link className="primary-link" href="/contact">
            <MapPin size={16} />
            Find the store
          </Link>
          <Link className="secondary-link" href="/auth">
            Create your account
          </Link>
        </div>
      </section>

      <LoyaltyPanel />
    </div>
  );
}
