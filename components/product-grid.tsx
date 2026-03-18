import { ProductCard } from "@/components/product-card";
import { mergeProductPromotions } from "@/lib/rewards";
import type { Product, Promotion } from "@/lib/types";

export function ProductGrid({
  products,
  promotions
}: {
  products: Product[];
  promotions: Promotion[];
}) {
  const resolved = mergeProductPromotions(products, promotions);

  return (
    <div className="product-grid">
      {resolved.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
