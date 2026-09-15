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
    <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#D6A34A]/30 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-black text-gradient mb-2">AfroNova Admin</h1>
        <p className="text-[#101312]/65 text-sm font-medium">Enter your credentials to access the CMS</p>
      </div>

      {isInactive && (
        <div className="p-4 mb-6 rounded-2xl border flex items-start gap-3 bg-[#D6A34A]/12 border-[#D6A34A]/35">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#9A6A31]" />
          <p className="text-xs leading-relaxed font-semibold text-[#9A6A31]">
            You were automatically signed out after 15 minutes of inactivity for security. Please sign in again.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 rounded-2xl border bg-red-500/10 border-red-500/30">
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#9A6A31] mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#9A6A31]" /> Email
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#9A6A31] mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#9A6A31]" /> Password
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
            className="btn-primary w-full justify-center text-base py-3.5 shadow-md mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] adinkra-bg p-4">
      <Suspense fallback={<div className="text-[#9A6A31] font-semibold text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

