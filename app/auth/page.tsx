import { AuthCard } from "@/components/auth-card";

type Params = Record<string, string | string[] | undefined>;

function pickMessage(value: string | string[] | undefined) {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const errorMessage = pickMessage(params.error);
  const successMessage = pickMessage(params.success);
  const mode = pickMessage(params.mode) === "signup" ? "signup" : "signin";
  const title = mode === "signup" ? "Create Your Account" : "Welcome Back";
  const subtitle =
    mode === "signup"
      ? "Register to track purchases, unlock loyalty rewards, and manage referrals."
      : "Sign in to access your rewards and referrals.";

  return (
    <section className="auth-page">
      <div className="auth-intro">
        <div className="eyebrow">Account</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <AuthCard
        errorMessage={errorMessage}
        successMessage={successMessage}
        initialMode={mode}
      />
    </section>
  );
}
