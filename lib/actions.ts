"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getAuthErrorMessage(error: { code?: string; message?: string } | null) {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  if (error.code === "email_address_invalid") {
    return "Please enter a valid email address.";
  }

  if (error.code === "over_email_send_rate_limit") {
    return "Too many attempts. Please wait a minute and try again.";
  }

  if (error.code === "invalid_credentials") {
    return "Invalid email or password.";
  }

  return error.message ?? "Authentication failed. Please try again.";
}

export async function signInAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/auth?mode=signin&error=${encodeURIComponent(getAuthErrorMessage(error))}`);
  }

  redirect("/account");
}

export async function signUpAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fullName = String(formData.get("fullName"));
  const referralCode = String(formData.get("referralCode") || "");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        referral_code_used: referralCode
      }
    }
  });

  if (error) {
    redirect(`/auth?mode=signup&error=${encodeURIComponent(getAuthErrorMessage(error))}`);
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      email,
      full_name: fullName,
      referral_code: `BADOU-${data.user.id.slice(0, 6).toUpperCase()}`,
      referred_by_code: referralCode || null
    });

    if (profileError) {
      redirect(`/auth?mode=signin&error=${encodeURIComponent("Account created, but profile setup failed. Please sign in again.")}`);
    }
  }

  redirect("/account");
}

export async function savePromotionAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth?error=${encodeURIComponent("Please sign in first.")}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect(`/admin?error=${encodeURIComponent("Admin access required.")}`);
  }

  const { error } = await supabase.from("promotions").insert({
    title: String(formData.get("title")),
    description: String(formData.get("description")),
    discount_percent: Number(formData.get("discountPercent")),
    bonus_referral_points: Number(formData.get("bonusReferralPoints")),
    is_active: true
  });

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message || "Could not save promotion.")}`);
  }

  redirect("/admin?success=Promotion%20saved");
}

export async function saveProductAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth?error=${encodeURIComponent("Please sign in first.")}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect(`/admin?error=${encodeURIComponent("Admin access required.")}`);
  }

  const name = String(formData.get("name"));
  const id = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const { error } = await supabase.from("products").insert({
    id,
    name,
    type: String(formData.get("type")),
    collection: String(formData.get("collection")),
    description: String(formData.get("description")),
    image_url: String(formData.get("imageUrl")),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock"))
  });

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message || "Could not save product.")}`);
  }

  redirect("/admin?success=Product%20added");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth?success=Signed%20out");
}
