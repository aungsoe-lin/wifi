'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Wifi, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auth logic will go here
    setTimeout(() => {
      toast.info("Database connection required to verify credentials.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfb] p-4 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-50 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 leading-none">
              MANAGER<span className="text-indigo-600">PRO</span>
            </span>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Infrastructure Access Portal</p>
        </div>

        <Card className="border border-white shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center pt-10 pb-6">
            <CardTitle className="text-4xl font-heading font-black tracking-tight text-slate-900 leading-none">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium pt-2">
              Secure authentication required
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 px-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-4 rounded-xl border-slate-200 focus:border-indigo-600 transition-colors bg-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400">Password</Label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 px-4 rounded-xl border-slate-200 focus:border-indigo-600 transition-colors bg-white"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 p-8 pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-lg font-bold group shadow-xl shadow-slate-200"
              >
                {loading ? "Verifying..." : "Sign In"}
                {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
              <div className="text-center">
                <p className="text-sm text-slate-500 font-medium">
                  Field agent? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Activate account</Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
