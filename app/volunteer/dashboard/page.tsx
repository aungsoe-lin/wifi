'use client';

import { useState } from 'react';
import { 
  Wifi, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Search, 
  LogOut,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Mobile Top Bar */}
      <header className="bg-white border-b border-slate-100 p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">AGENT<span className="text-indigo-600">APP</span></span>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setActiveTab('pending')}
            className={cn(
              "flex-1 rounded-xl font-bold h-11 transition-all",
              activeTab === 'pending' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white text-slate-400 border border-slate-100"
            )}
          >
            Pending
          </Button>
          <Button 
            onClick={() => setActiveTab('completed')}
            className={cn(
              "flex-1 rounded-xl font-bold h-11 transition-all",
              activeTab === 'completed' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white text-slate-400 border border-slate-100"
            )}
          >
            Collected
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search customer name..." 
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-100 font-medium"
          />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-1">Customer #{100 + i}</p>
                        <h3 className="text-xl font-extrabold text-slate-900">U Aung Kyaw</h3>
                      </div>
                      <div className="bg-indigo-50 p-2 rounded-xl">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-500 font-bold text-sm mb-6">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <MapPin className="w-3.5 h-3.5" />
                        North Village
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Wifi className="w-3.5 h-3.5" />
                        10Mbps Plan
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Amount Due</p>
                        <p className="text-2xl font-black text-slate-900">$15.00</p>
                      </div>
                      <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 px-6 group-hover:scale-105 transition-transform">
                        Collect
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Action for Filters */}
      <Button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-200 border-4 border-white flex items-center justify-center p-0">
        <Filter className="w-6 h-6" />
      </Button>
    </div>
  );
}
