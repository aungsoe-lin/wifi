'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, UserRoundCheck, Trash2, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    email: '',
    assignedVillage: '',
    role: 'VOLUNTEER'
  });

  const fetchVolunteers = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((u: any) => u.role === 'VOLUNTEER' || u.isAuthorized);
      setVolunteers(data);
    } catch (error: any) {
      toast.error('Failed to load agents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  const handleAddVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        ...newVolunteer,
        createdAt: serverTimestamp(),
        isAuthorized: true
      });
      toast.success('Agent pre-authorized for SkyNet.');
      setIsAddDialogOpen(false);
      setNewVolunteer({
        name: '',
        email: '',
        assignedVillage: '',
        role: 'VOLUNTEER'
      });
      fetchVolunteers();
    } catch (error: any) {
      toast.error('Authorization sequence failed');
    }
  };

  const handleDeleteVolunteer = async (id: string) => {
    if (confirm('De-authorize this agent?')) {
      try {
        await deleteDoc(doc(db, 'users', id));
        toast.success('Agent removed from network');
        fetchVolunteers();
      } catch (error) {
        toast.error('Removal failed');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Agent Network</h1>
          <p className="text-slate-500 text-sm">Monitor and manage field collection volunteers.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger
            render={
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all active:scale-95">
                <Plus className="w-4 h-4 mr-2" />
                Authorize Agent
              </Button>
            }
          />
          <DialogContent className="sm:max-w-sm border-slate-200 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-slate-900 font-black">Pre-Authorization</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddVolunteer} className="space-y-5 py-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Agent Name</label>
                  <Input required value={newVolunteer.name} onChange={e => setNewVolunteer({...newVolunteer, name: e.target.value})} className="bg-slate-50 border-slate-200 h-10 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Restricted Email</label>
                  <Input type="email" required value={newVolunteer.email} onChange={e => setNewVolunteer({...newVolunteer, email: e.target.value})} className="bg-slate-50 border-slate-200 h-10 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Zone</label>
                  <Input required value={newVolunteer.assignedVillage} onChange={e => setNewVolunteer({...newVolunteer, assignedVillage: e.target.value})} className="bg-slate-50 border-slate-200 h-10 rounded-xl" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold h-11 rounded-xl">Grant Access</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {loading ? (
            [1,2,3].map(i => <div key={i} className="h-44 bg-slate-100 animate-pulse rounded-3xl border border-slate-50" />)
          ) : volunteers.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white border-2 border-dashed border-slate-100 rounded-3xl">
              <UserRoundCheck className="w-12 h-12 text-slate-100 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No Agents Authorized</p>
            </div>
          ) : volunteers.map((volunteer) => (
            <motion.div
              key={volunteer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-50 p-3 rounded-2xl">
                  <UserRoundCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-none font-black text-[9px] uppercase tracking-widest">
                    VERIFIED
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => handleDeleteVolunteer(volunteer.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-lg leading-tight truncate">{volunteer.name}</h3>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-[0.1em]">
                  <Mail className="w-3 h-3" /> {volunteer.email}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {volunteer.assignedVillage}
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Zone AGENT</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
