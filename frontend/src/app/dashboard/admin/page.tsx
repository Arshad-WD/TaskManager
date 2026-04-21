"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

type User = {
  id: string;
  email: string;
  role: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Basic verification explicitly on the admin page
    const role = localStorage.getItem("userRole");
    if (role !== "ADMIN") {
      router.push("/dashboard");
    } else {
      loadUsers();
    }
  }, [router]);

  const loadUsers = async () => {
    try {
      const data = await fetchApi("/admin/users");
      setUsers(data);
    } catch (err: any) {
      if (err.message.includes("Admin access required")) {
         router.push("/dashboard");
      }
      setError("Failed to fetch operators list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-12 relative h-full">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <header className="mb-12 relative z-10">
        <h2 className="text-3xl font-display font-medium text-white flex items-center gap-3">
           System Operators
           <span className="text-xs bg-brand-container/20 text-brand-primary px-3 py-1 rounded-full border border-brand-container/30">
              RESTRICTED CLEARANCE
           </span>
        </h2>
        <p className="text-on-surface-variant mt-1 text-sm">Managing all registered Nodes and Identities on the Primetrade network</p>
      </header>

      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4">
        {loading ? (
           <div className="h-64 flex items-center justify-center border border-dashed border-white/5 rounded-xl">
             <p className="text-brand-tertiary animate-pulse font-mono tracking-widest text-sm">Fetching identities...</p>
           </div>
        ) : error ? (
           <div className="p-6 border border-[#ffb4ab]/20 bg-[#93000a]/20 text-[#ffb4ab] rounded-xl">
             {error}
           </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-surface-high/30">
                  <th className="px-6 py-4 text-xs tracking-widest uppercase font-semibold text-on-surface-variant">Identity (ID)</th>
                  <th className="px-6 py-4 text-xs tracking-widest uppercase font-semibold text-on-surface-variant">Email</th>
                  <th className="px-6 py-4 text-xs tracking-widest uppercase font-semibold text-on-surface-variant">Clearance Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-high/20 transition-colors">
                    <td className="px-6 py-4">
                       <span className="text-sm font-mono text-on-surface opacity-80">{user.id}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-sm font-medium text-white">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border ${
                          user.role === 'ADMIN' 
                            ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 shadow-[0_0_8px_rgba(157,0,255,0.2)]'
                            : 'bg-surface-high text-on-surface-variant border-white/10'
                       }`}>
                         {user.role}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
