'use client';

import { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Plus,
  Loader2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { getBills } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function BillingPage() {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchBills = async () => {
    setLoading(true);
    try {
      const data = await getBills();
      setBills(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load financial records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filteredBills = bills.filter(b => 
    b.customerName.toLowerCase().includes(search.toLowerCase()) || 
    b.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-heading font-black text-slate-900 tracking-tight">Financial Records</h1>
          <p className="text-slate-500 font-medium tracking-tight">Monitor revenue flow and payment lifecycles across sectors.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-14 px-8 border-slate-200 text-slate-900 bg-white rounded-2xl font-black shadow-sm flex gap-3 hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Export Audit
          </Button>
          <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-2xl shadow-indigo-100 flex gap-3">
            <Plus className="w-4 h-4" />
            Generate Cycle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Unpaid Receivables', value: '$2,450', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Collected This Month', value: '$8,120', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Renewals', value: '42', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-slate-200/40 rounded-[2rem] p-6 bg-white overflow-hidden relative">
            <div className={cn("absolute right-[-10%] top-[-10%] w-32 h-32 rounded-full opacity-10", stat.bg)} />
            <div className="flex items-center gap-4 relative z-10">
              <div className={cn("p-4 rounded-2xl shadow-inner", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-heading font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <Input 
              placeholder="Search by name or sector..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-medium focus-visible:ring-indigo-100 shadow-inner"
            />
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-100 font-extrabold flex gap-3 text-slate-600 bg-white shadow-sm">
            <Filter className="w-4 h-4" />
            Filter Status
          </Button>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 px-8 py-5">Sub / Bill ID</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Sector</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Billing Period</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Amount</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Security Status</TableHead>
                <TableHead className="text-right px-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Decrypting Financial Data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <p className="text-slate-400 font-medium font-heading">No billing records matched your criteria.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBills.map((bill) => (
                  <TableRow key={bill.id} className="group hover:bg-slate-50/70 border-none">
                    <TableCell className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-heading font-black text-slate-900 text-lg">{bill.customerName}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-0.5">INV#{bill.id.slice(0, 6)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-bold text-slate-600">
                        <Badge variant="outline" className="bg-slate-100 border-none rounded-lg text-[10px] font-black uppercase">{bill.village}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <Calendar className="w-4 h-4 text-slate-300" />
                        <span className="text-sm">{new Date(bill.year, bill.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-heading font-black text-slate-900 text-lg">${bill.amount}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-widest border-none shadow-sm",
                        bill.status === 'PAID' 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-rose-50 text-rose-500"
                      )}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                       <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-indigo-600 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-[1.5rem] border-slate-100 shadow-2xl p-2 min-w-[180px] bg-white text-slate-900">
                          <DropdownMenuItem className="flex gap-3 px-4 py-3 rounded-xl font-bold cursor-pointer transition-all">
                            Mark as Paid
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-3 px-4 py-3 rounded-xl font-bold cursor-pointer transition-all">
                            View Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-3 px-4 py-3 rounded-xl font-bold text-rose-500 cursor-pointer transition-all">
                            Revoke Bill
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
