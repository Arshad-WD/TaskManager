"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      localStorage.setItem("token", data.token);
      if (data.user && data.user.role) {
        localStorage.setItem("userRole", data.user.role);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-10 relative overflow-hidden group">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-tertiary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-brand-tertiary/20 transition-all duration-700" />
        
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-display font-medium mb-2 tracking-tight">Network Entry</h1>
            <p className="text-on-surface-variant text-sm tracking-wide">Register your Node ID for terminal access.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[rgba(147,0,10,0.4)] border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface uppercase tracking-widest pl-1">Handle</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Operator Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface uppercase tracking-widest pl-1">Secure Email</label>
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
              <label className="text-xs font-semibold text-on-surface uppercase tracking-widest pl-1">Encryption Key (Password)</label>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full mt-6 flex justify-center items-center"
            >
              {loading ? "Initializing..." : "Establish Link"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-sm">
              Already possess access?{" "}
              <Link href="/login" className="text-brand-container hover:text-white transition-colors">
                Return to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
