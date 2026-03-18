import { cache } from "react";
import { sampleProducts, samplePromotions } from "@/lib/mock-data";
import { buildLoyaltyOverview, mergeProductPromotions } from "@/lib/rewards";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getFeaturedProducts = cache(async () => {
  const products = await getAllProducts();
  return products.slice(0, 3);
});

export const getAllProducts = cache(async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("products").select("*").order("created_at");

    if (!data?.length) {
      return sampleProducts;
    }

    return data.map((product) => ({
      id: product.id,
      name: product.name,
      type: product.type ?? "original",
      collection: product.collection,
      description: product.description,
      imageUrl: product.image_url,
      price: Number(product.price),
      finalPrice: Number(product.price),
      stock: product.stock
    }));
  } catch {
    return sampleProducts;
  }
});

export const getPromotions = cache(async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("promotions")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!data?.length) {
      return samplePromotions;
    }

    return data.map((promotion) => ({
      id: promotion.id,
      title: promotion.title,
      description: promotion.description,
      discountPercent: promotion.discount_percent,
      bonusReferralPoints: promotion.bonus_referral_points,
      appliesToProductIds: promotion.applies_to_product_ids ?? []
    }));
  } catch {
    return samplePromotions;
  }
});

export const getAccountOverview = cache(async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not signed in");
    }

    const [{ data: profile }, { data: orders }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("orders")
        .select("items_count")
        .eq("user_id", user.id)
        .eq("status", "paid")
    ]);

    const totalPurchasedItems =
      orders?.reduce((sum, order) => sum + order.items_count, 0) ?? 0;

    return {
      referralCode: profile?.referral_code ?? "JUSTBADOU",
      referrals: profile?.successful_referrals ?? 0,
      points: profile?.points ?? 0,
      availableDiscount: Math.min(Math.floor((profile?.points ?? 0) / 100) * 5, 25),
      loyalty: buildLoyaltyOverview(totalPurchasedItems)
    };
  } catch {
    return {
      referralCode: "JUSTBADOU",
      referrals: 3,
      points: 180,
      availableDiscount: 5,
      loyalty: buildLoyaltyOverview(4)
    };
  }
});

export const getAdminDashboard = cache(async () => {
  const [products, promotions] = await Promise.all([getAllProducts(), getPromotions()]);

  return {
    products: mergeProductPromotions(products, promotions),
    promotions
  };
});
