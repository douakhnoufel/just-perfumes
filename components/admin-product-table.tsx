import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export function AdminProductTable({ products }: { products: Product[] }) {
  return (
    <section className="table-card">
      <div className="eyebrow">Catalog view</div>
      <h2>Products and retail pricing</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Collection</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.collection}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
