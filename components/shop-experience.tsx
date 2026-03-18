"use client";

import { useMemo, useState } from "react";
import { Gift, ShoppingBag, TicketPercent } from "lucide-react";
import { applySixthItemFree, mergeProductPromotions } from "@/lib/rewards";
import { formatCurrency } from "@/lib/format";
import type { Product, Promotion } from "@/lib/types";

type CartItem = {
  productId: string;
  name: string;
  price: number;
};

export function ShopExperience({
  products,
  promotions,
  purchasedItems = 5,
  referralDiscount = 5
}: {
  products: Product[];
  promotions: Promotion[];
  purchasedItems?: number;
  referralDiscount?: number;
}) {
  const resolvedProducts = useMemo(
    () => mergeProductPromotions(products, promotions),
    [products, promotions]
  );
  const [cart, setCart] = useState<CartItem[]>([]);

  const rewardAdjustedPrices = useMemo(
    () => applySixthItemFree(cart.map((item) => item.price), purchasedItems),
    [cart, purchasedItems]
  );

  const subtotal = rewardAdjustedPrices.reduce((sum, price) => sum + price, 0);
  const pointsDiscount = subtotal * (referralDiscount / 100);
  const total = Math.max(subtotal - pointsDiscount, 0);
  const freeRewardReady = purchasedItems > 0 && purchasedItems % 5 === 0;

  return (
    <div className="dashboard-grid">
      <div className="product-grid">
        {resolvedProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div
              className="product-image"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            />
            <div className="product-copy">
              <div>
                <div className="eyebrow">{product.collection}</div>
                <h3>{product.name}</h3>
                <p className="muted">{product.description}</p>
              </div>
              <div className="price-row">
                <strong>{formatCurrency(product.finalPrice)}</strong>
                {product.finalPrice < product.price ? (
                  <span className="strike">{formatCurrency(product.price)}</span>
                ) : null}
              </div>
              {product.promoLabel ? <span className="pill">{product.promoLabel}</span> : null}
              <div className="product-actions">
                <button
                  type="button"
                  onClick={() =>
                    setCart((current) => [
                      ...current,
                      { productId: product.id, name: product.name, price: product.finalPrice }
                    ])
                  }
                >
                  <ShoppingBag size={16} />
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="panel-card">
        <div className="eyebrow">Client checkout preview</div>
        <h2>Reward-aware basket</h2>
        <p>
          Promotions are applied first. Referral points reduce the total next. If your
          loyalty count is at five paid items, the cheapest bottle in this cart becomes free.
        </p>
        <div className="inline-stats">
          <div className="stats-card">
            <Gift size={16} />
            <span>{freeRewardReady ? "Free bottle unlocked" : "Keep purchasing to unlock"}</span>
          </div>
          <div className="stats-card">
            <TicketPercent size={16} />
            <span>{referralDiscount}% referral discount in wallet</span>
          </div>
        </div>
        <div className="form-grid">
          {cart.length === 0 ? <p className="muted">Cart is empty.</p> : null}
          {cart.map((item, index) => (
            <div className="stats-card" key={`${item.productId}-${index}`}>
              <span>{item.name}</span>
              <strong>{formatCurrency(rewardAdjustedPrices[index] ?? item.price)}</strong>
            </div>
          ))}
        </div>
        <div className="form-grid">
          <div className="stats-card">
            <span>Subtotal after promotion/reward</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="stats-card">
            <span>Referral points discount</span>
            <strong>-{formatCurrency(pointsDiscount)}</strong>
          </div>
          <div className="stats-card">
            <span>Total due</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
