import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { PERFUME_TYPE_LABELS } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const typeLabel = PERFUME_TYPE_LABELS[product.type] ?? "Perfume";

  return (
    <article className="product-card">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${product.imageUrl})` }}
      >
        <span className="type-badge">{typeLabel}</span>
      </div>
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
          <button type="button">
            <ShoppingBag size={16} />
            Add to cart
          </button>
          <span className="pill">6th bottle free eligible</span>
        </div>
      </div>
    </article>
  );
}
