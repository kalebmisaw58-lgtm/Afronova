"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { Lock, Mail, ShieldAlert } from "lucide-react";

function LoginForm() {
  const { login } = useAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInactive = searchParams.get("reason") === "inactivity";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.success) router.replace("/admin");
    else setError(result.error ?? "Login failed");
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl"
         style={{ background: "rgba(10,3,0,0.92)", border: "1px solid rgba(214,163,74,0.25)" }}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-black text-gradient mb-2">AfroNova Admin</h1>
        <p className="text-white/45 text-sm">Enter your credentials to access the CMS</p>
      </div>

      {isInactive && (
        <div className="p-4 mb-6 rounded-xl border flex items-start gap-3"
             style={{ background: "rgba(214,163,74,0.12)", borderColor: "rgba(214,163,74,0.35)" }}>
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#D6A34A]" />
          <p className="text-xs leading-relaxed" style={{ color: "#F0D49A" }}>
            You were automatically signed out after 15 minutes of inactivity for security. Please sign in again.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 rounded-xl border"
             style={{ background: "rgba(154,106,49,0.12)", borderColor: "rgba(154,106,49,0.35)" }}>
          <p className="text-sm" style={{ color: "#F0D49A" }}>{error}</p>
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D6A34A]" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@afronova.org"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="form-label flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D6A34A]" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070908] adinkra-bg">
      <Suspense fallback={<div className="text-white/40 text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

