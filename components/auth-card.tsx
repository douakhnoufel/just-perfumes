"use client";

import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { signInAction, signUpAction } from "@/lib/actions";

export function AuthCard({
  errorMessage,
  successMessage,
  initialMode = "signin"
}: {
  errorMessage?: string;
  successMessage?: string;
  initialMode?: "signin" | "signup";
}) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  return (
    <div className="auth-card">
      {errorMessage ? <p className="flash-message flash-error">{errorMessage}</p> : null}
      {successMessage ? <p className="flash-message flash-success">{successMessage}</p> : null}

      <div className="auth-switch" data-mode={mode}>
        <div className="auth-switch-indicator" />
        <button
          type="button"
          className={`auth-toggle ${mode === "signin" ? "auth-toggle-active" : ""}`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`auth-toggle ${mode === "signup" ? "auth-toggle-active" : ""}`}
          onClick={() => setMode("signup")}
        >
          Register
        </button>
      </div>

      {mode === "signin" ? (
        <form className="auth-form" action={signInAction}>
          <div className="auth-field">
            <Mail size={18} />
            <input name="email" type="email" placeholder="jane@example.com" required />
          </div>
          <div className="auth-field">
            <LockKeyhole size={18} />
            <input name="password" type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="auth-submit">
            Sign In
            <ArrowRight size={16} />
          </button>
        </form>
      ) : (
        <form className="auth-form" action={signUpAction}>
          <div className="auth-field">
            <UserRound size={18} />
            <input name="fullName" placeholder="Jane Doe" required />
          </div>
          <div className="auth-field">
            <Mail size={18} />
            <input name="email" type="email" placeholder="jane@example.com" required />
          </div>
          <div className="auth-field">
            <LockKeyhole size={18} />
            <input name="password" type="password" placeholder="••••••••" required />
          </div>
          <input name="referralCode" placeholder="Referral code (optional)" />
          <button type="submit" className="auth-submit">
            Create Account
            <ArrowRight size={16} />
          </button>
        </form>
      )}

      <p className="auth-meta">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
