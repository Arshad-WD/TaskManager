"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Activity, Users, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is authenticated at all on mount
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Check role for admin rights
    const role = localStorage.getItem("userRole");
    if (role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const navItems = [
    { name: "Task Control", path: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", path: "/dashboard/analytics", icon: Activity },
  ];

  if (isAdmin) {
    navItems.push({ name: "Admin Panel", path: "/dashboard/admin", icon: Users });
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface">
      {/* Premium FinTech Sidebar */}
      <aside className="w-full md:w-64 bg-surface-low border-r border-white/5 p-6 hidden md:flex flex-col justify-between relative z-20 shadow-2xl">
        <div className="space-y-12">
          {/* Brand Identity */}
          <div className="font-display text-xl tracking-tight font-bold text-white flex items-center gap-2">
            <div className="w-4 h-4 bg-brand-primary rounded-sm shadow-[0_0_10px_#dfb7ff]"></div>
            Primetrade
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.name} href={item.path}>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 font-medium ${
                      isActive 
                        ? "bg-surface-high/50 border border-brand-primary/20 text-brand-primary shadow-[inset_0_0_20px_rgba(157,0,255,0.05)]" 
                        : "text-on-surface-variant hover:text-white hover:bg-surface-high/20 border border-transparent"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-brand-tertiary drop-shadow-[0_0_8px_#00dce5]" : "text-on-surface-variant"} />
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t border-white/5 mt-auto">
          <button 
            onClick={handleLogout} 
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/5 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut size={16} />
            DISCONNECT SESSION
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
