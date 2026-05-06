'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2,
  MapPin,
  Phone,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { getCustomers, createCustomer } from '@/lib/actions';
import { cn } from '@/lib/utils';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State for new customer
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    planName: 'Home Plus',
    monthlyFee: 15
  });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Database connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createCustomer(formData);
    if (res.success) {
      toast.success("Customer added successfully!");
      setIsAdding(false);
      fetchCustomers();
      setFormData({ name: '', phone: '', village: '', planName: 'Home Plus', monthlyFee: 15 });
    } else {
      toast.error(res.error || "Failed to add customer.");
    }
  };

  const filteredCustomers = (customers || []).filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) || 
    c.village?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-heading font-black text-slate-900 tracking-tight">Customer Directory</h1>
          <p className="text-slate-500 font-medium">Manage your subscription base and service assignments.</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8 rounded-2xl font-black shadow-2xl shadow-indigo-100 flex gap-3 transition-all active:scale-95"
        >
          {isAdding ? <Plus className="w-5 h-5 rotate-45 transition-transform" /> : <Plus className="w-5 h-5 transition-transform" />}
          {isAdding ? "Cancel" : "Add New Customer"}
        </Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 bg-white/50 backdrop-blur-sm mb-8">
              <form onSubmit={handleAddCustomer} className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">FullName</label>
                  <Input 
                    required
                    placeholder="U Aung Kyaw"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 rounded-xl bg-white border-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                  <Input 
                    required
                    placeholder="09..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12 rounded-xl bg-white border-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Village</label>
                  <Input 
                    required
                    placeholder="Sector A"
                    value={formData.village}
                    onChange={(e) => setFormData({...formData, village: e.target.value})}
                    className="h-12 rounded-xl bg-white border-slate-100"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Confirm Addition
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <Input 
              placeholder="Search subscribers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-medium focus-visible:ring-indigo-100 shadow-inner"
            />
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-100 font-extrabold flex gap-3 text-slate-600 bg-white shadow-sm hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
        </div>

        <div className="p-4">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 px-8 py-5">Customer Identity</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Contact/Location</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Service Plan</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="text-right px-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Accessing Secure Records...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <p className="text-slate-400 font-medium font-heading">No customers found in database.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="group hover:bg-slate-50/70 transition-all border-none">
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-heading font-black text-indigo-600">
                          {customer.name?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-heading font-black text-slate-900 text-lg leading-tight">{customer.name}</span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-0.5">UID-{customer.id?.slice(0, 8)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1.5 font-medium">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Phone className="w-3.5 h-3.5 text-slate-300" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          {customer.village}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col bg-slate-50 p-3 rounded-2xl border border-slate-100 max-w-[160px] shadow-sm">
                        <span className="font-black text-slate-900 text-xs">{customer.planName}</span>
                        <span className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter mt-1">${customer.monthlyFee}/month</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-widest border-none shadow-sm",
                        customer.status === 'ACTIVE' 
                          ? "bg-emerald-50 text-emerald-600 shadow-emerald-100/50" 
                          : "bg-slate-100 text-slate-400 shadow-slate-100"
                      )}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-[1.5rem] border-slate-100 shadow-2xl p-2 min-w-[180px] bg-white animate-in fade-in zoom-in-95">
                          <DropdownMenuItem className="flex gap-3 px-4 py-3 rounded-xl font-bold text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors">
                            <Edit2 className="w-4 h-4 text-indigo-600" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-3 px-4 py-3 rounded-xl font-bold text-rose-500 focus:text-rose-600 focus:bg-rose-50 cursor-pointer transition-colors">
                            <Trash2 className="w-4 h-4" /> Terminate
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
