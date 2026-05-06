'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Map, 
  Users, 
  MoreVertical, 
  Plus, 
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const VILLAGES = [
  { id: '1', name: 'North Village', cluster: 'Sector A', coverage: '98%', agents: 2, status: 'HEALTHY' },
  { id: '2', name: 'East Cluster', cluster: 'Sector B', coverage: '85%', agents: 1, status: 'WARNING' },
  { id: '3', name: 'South Point', cluster: 'Sector A', coverage: '95%', agents: 3, status: 'HEALTHY' },
];

export default function VillagesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Village Management</h1>
          <p className="text-slate-500 font-medium">Monitor network health and agent assignments by cluster.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 rounded-xl font-bold shadow-lg shadow-indigo-100 flex gap-2">
          <MapPin className="w-5 h-5" />
          Add New Area
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {VILLAGES.map((village, i) => (
          <motion.div
            key={village.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <Map className="w-6 h-6 text-slate-400" />
                  </div>
                  <Badge className={cn(
                    "rounded-full px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none",
                    village.status === 'HEALTHY' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {village.status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-black text-slate-900 mt-4">{village.name}</CardTitle>
                <CardDescription className="font-bold text-slate-400 uppercase text-xs tracking-widest">{village.cluster}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Coverage</p>
                    <p className="text-xl font-black text-slate-900">{village.coverage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Agents</p>
                    <p className="text-xl font-black text-slate-900">{village.agents}</p>
                  </div>
                </div>
                
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      village.status === 'HEALTHY' ? "bg-emerald-500" : "bg-amber-500"
                    )}
                    style={{ width: village.coverage }}
                  />
                </div>

                <Button variant="ghost" className="w-full bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-600">
                  Manage Cluster Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
