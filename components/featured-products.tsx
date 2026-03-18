import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="product-section">
      <div className="section-heading">
        <div className="eyebrow">Featured scents</div>
        <h1>Best sellers curated for first-time shoppers</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
