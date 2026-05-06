'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  LayoutDashboard, 
  UserRoundCheck, 
  ReceiptIndianRupee, 
  LogOut,
  Wifi
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useAuth } from './auth-provider';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: UserRoundCheck, label: 'Volunteers', href: '/admin/volunteers' },
  { icon: ReceiptIndianRupee, label: 'Billing', href: '/admin/billing' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-indigo-900">SkyNet Manager</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500 uppercase">
            {profile?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 truncate">{profile?.name || 'User'}</span>
            <span className="text-xs text-slate-400 truncate">{profile?.email || 'email@example.com'}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-slate-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => signOut(auth)}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
