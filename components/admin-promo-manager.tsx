import { savePromotionAction } from "@/lib/actions";
import type { Promotion } from "@/lib/types";

export function AdminPromoManager({
  promotions,
  errorMessage,
  successMessage
}: {
  promotions: Promotion[];
  errorMessage?: string;
  successMessage?: string;
}) {
  const active = promotions[0];

  return (
    <section className="panel-card">
      <div className="eyebrow">Campaign manager</div>
      <h2>Control reductions and referral boosts</h2>
      {errorMessage ? <p className="flash-message flash-error">{errorMessage}</p> : null}
      {successMessage ? <p className="flash-message flash-success">{successMessage}</p> : null}
      <form className="form-grid" action={savePromotionAction}>
        <input
          name="title"
          placeholder="Promotion title"
          defaultValue={active?.title ?? "Velvet Launch Week"}
          required
        />
        <input
          name="description"
          placeholder="Promotion description"
          defaultValue={active?.description ?? "Discount selected scents and multiply referral rewards."}
          required
        />
        <div className="input-row">
          <input
            name="discountPercent"
            type="number"
            min="0"
            max="90"
            defaultValue={active?.discountPercent ?? 20}
            required
          />
          <input
            name="bonusReferralPoints"
            type="number"
            min="0"
            defaultValue={active?.bonusReferralPoints ?? 50}
            required
          />
        </div>
        <button type="submit">Save promotion</button>
      </form>
    </section>
  );
}
