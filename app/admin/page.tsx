import { AdminPromoManager } from "@/components/admin-promo-manager";
import { AdminProductManager } from "@/components/admin-product-manager";
import { AdminProductTable } from "@/components/admin-product-table";
import { getAdminDashboard } from "@/lib/storefront-data";

type Params = Record<string, string | string[] | undefined>;

function pickMessage(value: string | string[] | undefined) {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const dashboard = await getAdminDashboard();
  const errorMessage = pickMessage(params.error);
  const successMessage = pickMessage(params.success);

  return (
    <section className="stack-page">
      <div className="section-heading">
        <div className="eyebrow">Admin studio</div>
        <h1>Promotions, reductions, and stock visibility</h1>
        <p>
          Admin-side controls for campaigns, product pricing, and the loyalty program
          configuration used on the client storefront.
        </p>
      </div>
      <div className="dashboard-grid">
        <AdminPromoManager
          promotions={dashboard.promotions}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <AdminProductManager />
        <AdminProductTable products={dashboard.products} />
      </div>
    </section>
  );
}
