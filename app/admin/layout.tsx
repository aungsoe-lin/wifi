'use client';

import { useState } from 'react';
import { 
  Users, 
  MapPin, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut, 
  Wifi, 
  Menu, 
  X,
  Search,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: BarChart3, label: 'Overview', href: '/admin/dashboard' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: MapPin, label: 'Villages', href: '/admin/villages' },
  { icon: CreditCard, label: 'Billing', href: '/admin/billing' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-20",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", !sidebarOpen && "hidden")}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Manager<span className="text-indigo-600">Pro</span></span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-xl">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                    : "hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 font-medium"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-indigo-600")} />
                  {sidebarOpen && <span className="font-semibold">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <Button variant="ghost" className={cn(
            "w-full flex items-center justify-start gap-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50",
            !sidebarOpen && "justify-center"
          )}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search everything..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
