"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.token);
      if (data.user && data.user.role) {
        localStorage.setItem("userRole", data.user.role);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-10 relative overflow-hidden group">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/20 transition-all duration-700" />
        
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-display font-medium mb-2 tracking-tight">Login Gateway</h1>
            <p className="text-on-surface-variant text-sm tracking-wide">Enter your credentials to access the terminal.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[rgba(147,0,10,0.4)] border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface uppercase tracking-widest pl-1">Email</label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="operator@primetrade.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center pr-1">
                <label className="text-xs font-semibold text-on-surface uppercase tracking-widest pl-1">Password</label>
                <Link href="#" className="text-xs text-brand-tertiary opacity-70 hover:opacity-100 transition-opacity">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full mt-4 flex justify-center items-center gap-2"
            >
              {loading ? "Authenticating..." : "Secure Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-sm">
              Non-authorized operator?{" "}
              <Link href="/register" className="text-brand-tertiary hover:text-white transition-colors">
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
