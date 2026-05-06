'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, getDocs, query, collection, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VolunteerSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      const q = query(collection(db, 'users'), where('email', '==', formData.email), where('isAuthorized', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('This email is not authorized. Please contact your administrator.');
      }

      const authData = querySnapshot.docs[0].data();

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name || authData.name,
        email: formData.email,
        role: 'VOLUNTEER',
        assignedVillage: authData.assignedVillage,
        createdAt: serverTimestamp()
      });

      toast.success('Account created! Welcome, ' + (formData.name || authData.name));
      router.push('/volunteer/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <UserRound className="w-10 h-10 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Agent Registration</CardTitle>
          <CardDescription>Claim your account using authorized email.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Authorized Email</Label>
              <Input 
                id="email"
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
              <Input 
                id="password"
                type="password" 
                required 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                required 
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl font-bold" disabled={loading}>
              {loading ? 'Registering...' : 'Activate Agent Account'}
            </Button>
            <Button variant="link" onClick={() => router.push('/login')} className="text-sm font-bold text-slate-500">Back to Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
