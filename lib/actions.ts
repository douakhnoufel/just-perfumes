"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeInput(value: FormDataEntryValue | null | undefined) {
  return String(value ?? "").trim();
}

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

async function ensureProfile(options: {
  userId: string;
  email: string;
  fullName?: string;
  referralCode?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const fullName =
    options.fullName?.trim() || options.email.split("@")[0] || "JUST-PERFUME Client";

  const { error } = await supabase.from("profiles").upsert(
    {
      id: options.userId,
      email: options.email,
      full_name: fullName,
      referral_code: `BADOU-${options.userId.slice(0, 6).toUpperCase()}`,
      referred_by_code: options.referralCode?.trim() || null
    },
    {
      onConflict: "id"
    }
  );

  return error;
}

export async function signInAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = normalizeInput(formData.get("email")).toLowerCase();
  const password = normalizeInput(formData.get("password"));

  // Basic validation
  if (!email || !password) {
    redirect(`/auth?mode=signin&error=${encodeURIComponent("Email and password are required.")}`);
  }

  if (!email.includes("@")) {
    redirect(`/auth?mode=signin&error=${encodeURIComponent("Please enter a valid email address.")}`);
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/auth?mode=signin&error=${encodeURIComponent(getAuthErrorMessage(error))}`);
  }

  if (data.user) {
    const profileError = await ensureProfile({
      userId: data.user.id,
      email: data.user.email ?? email,
      fullName:
        typeof data.user.user_metadata?.full_name === "string"
          ? data.user.user_metadata.full_name
          : undefined,
      referralCode:
        typeof data.user.user_metadata?.referral_code_used === "string"
          ? data.user.user_metadata.referral_code_used
          : undefined
    });

    if (profileError) {
      redirect(
        `/auth?mode=signin&error=${encodeURIComponent(
          "Signed in, but your profile could not be prepared. Please try again."
        )}`
      );
    }
  }

  redirect("/account");
}

export async function signUpAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = normalizeInput(formData.get("email")).toLowerCase();
  const password = normalizeInput(formData.get("password"));
  const fullName = normalizeInput(formData.get("fullName"));
  const referralCode = normalizeInput(formData.get("referralCode"));

  // Basic validation
  if (!email || !password) {
    redirect(`/auth?mode=signup&error=${encodeURIComponent("Email and password are required.")}`);
  }

  if (!email.includes("@")) {
    redirect(`/auth?mode=signup&error=${encodeURIComponent("Please enter a valid email address.")}`);
  }

  if (password.length < 6) {
    redirect(`/auth?mode=signup&error=${encodeURIComponent("Password must be at least 6 characters.")}`);
  }

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

  if (data.user && data.session) {
    const profileError = await ensureProfile({
      userId: data.user.id,
      email,
      fullName,
      referralCode
    });

    if (profileError) {
      redirect(
        `/auth?mode=signin&error=${encodeURIComponent(
          "Account created, but profile setup failed. Please sign in again."
        )}`
      );
    }

    redirect("/account");
  }

  redirect(
    `/auth?mode=signin&success=${encodeURIComponent(
      "Account created. Check your email to confirm your address, then sign in."
    )}`
  );
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

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const discountPercent = Number(formData.get("discountPercent"));
  const bonusReferralPoints = Number(formData.get("bonusReferralPoints"));

  // Validation
  if (!title) {
    redirect(`/admin?error=${encodeURIComponent("Promotion title is required.")}`);
  }

  if (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    redirect(`/admin?error=${encodeURIComponent("Discount percent must be between 0 and 100.")}`);
  }

  if (isNaN(bonusReferralPoints) || bonusReferralPoints < 0) {
    redirect(`/admin?error=${encodeURIComponent("Bonus referral points must be a positive number.")}`);
  }

  const { error } = await supabase.from("promotions").insert({
    title,
    description,
    discount_percent: discountPercent,
    bonus_referral_points: bonusReferralPoints,
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

  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const collection = String(formData.get("collection") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  // Validation
  if (!name) {
    redirect(`/admin?error=${encodeURIComponent("Product name is required.")}`);
  }

  if (!collection) {
    redirect(`/admin?error=${encodeURIComponent("Product collection is required.")}`);
  }

  if (isNaN(price) || price <= 0) {
    redirect(`/admin?error=${encodeURIComponent("Price must be a positive number.")}`);
  }

  if (isNaN(stock) || stock < 0) {
    redirect(`/admin?error=${encodeURIComponent("Stock must be a non-negative number.")}`);
  }

  const id = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  if (!id) {
    redirect(`/admin?error=${encodeURIComponent("Product name must contain valid characters.")}`);
  }

  const { error } = await supabase.from("products").insert({
    id,
    name,
    type: type || "original",
    collection,
    description,
    image_url: imageUrl,
    price,
    stock
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
