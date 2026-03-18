import { saveProductAction } from "@/lib/actions";
import { PERFUME_TYPE_LABELS, type PerfumeType } from "@/lib/types";

const perfumeTypes = Object.entries(PERFUME_TYPE_LABELS) as [PerfumeType, string][];

export function AdminProductManager() {
  return (
    <section className="panel-card">
      <div className="eyebrow">Product manager</div>
      <h2>Add new perfume</h2>
      <form className="form-grid" action={saveProductAction}>
        <input
          name="name"
          placeholder="Product name (e.g. Sauvage Dior)"
          required
        />
        <select name="type" required className="select-input">
          {perfumeTypes.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          name="collection"
          placeholder="Brand / Collection (e.g. Dior, Chanel)"
          required
        />
        <input
          name="description"
          placeholder="Description"
          required
        />
        <input
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          required
        />
        <div className="input-row">
          <input
            name="price"
            type="number"
            min="1"
            step="0.01"
            placeholder="Price"
            required
          />
          <input
            name="stock"
            type="number"
            min="0"
            placeholder="Stock"
            required
          />
        </div>
        <button type="submit">Add product</button>
      </form>
    </section>
  );
}
