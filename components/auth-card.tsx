import { signInAction, signUpAction } from "@/lib/actions";

export function AuthCard({
  errorMessage,
  successMessage
}: {
  errorMessage?: string;
  successMessage?: string;
}) {
  return (
    <div className="auth-card">
      <div className="section-heading">
        <div className="eyebrow">Authentication</div>
        <h1>Secure access with Supabase</h1>
        <p>Email/password auth plus profile creation for referrals and loyalty tracking.</p>
      </div>
      {errorMessage ? <p className="flash-message flash-error">{errorMessage}</p> : null}
      {successMessage ? <p className="flash-message flash-success">{successMessage}</p> : null}
      <div className="dashboard-grid">
        <form className="form-grid" action={signInAction}>
          <input name="email" type="email" placeholder="Email address" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Sign in</button>
        </form>
        <form className="form-grid" action={signUpAction}>
          <input name="fullName" placeholder="Full name" required />
          <input name="email" type="email" placeholder="Email address" required />
          <input name="password" type="password" placeholder="Password" required />
          <input name="referralCode" placeholder="Referral code (optional)" />
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
