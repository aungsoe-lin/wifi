'use client';

import { motion } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Revenue', value: '$12,450', change: '+12.5%', icon: DollarSign, trend: 'up' },
  { label: 'Active Customers', value: '1,240', change: '+18.2%', icon: Users, trend: 'up' },
  { label: 'Growth Rate', value: '24.5%', change: '-2.4%', icon: TrendingUp, trend: 'down' },
  { label: 'Overdue Bills', value: '18', change: '+5', icon: AlertCircle, trend: 'down' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight text-brand">Executive Dashboard</h1>
        <p className="text-slate-500 font-medium">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <stat.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                    stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {stat.change}
                    {stat.trend === 'up' ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-sm rounded-3xl p-8 bg-white">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Revenue Overview</h3>
          <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-medium border-2 border-dashed border-slate-100">
            Chart integration goes here
          </div>
        </Card>
        
        <Card className="border-none shadow-sm rounded-3xl p-8 bg-white">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">Payment received</p>
                  <p className="text-xs text-slate-400 font-medium truncate">Customer #234 paid for April package</p>
                  <p className="text-[10px] text-indigo-600 font-black uppercase mt-1">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

