'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Wifi, Shield, Users, BarChart3, ArrowRight, Play, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 leading-none">
              WIFI MANAGER<span className="text-indigo-600">PRO</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#coverage" className="hover:text-indigo-600 transition-colors">Coverage</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <Link href="/login">
            <Button className="font-bold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-6 rounded-xl shadow-sm">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-violet-100 rounded-full blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-8">
                  <Zap className="w-3 h-3 fill-current" />
                  Next-Gen ISP Management
                </div>
                
                <h1 className="text-6xl md:text-8xl font-heading font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
                  UNLIMITED <br />
                  <span className="text-indigo-600">CONNECTIVITY.</span>
                </h1>
                
                <p className="text-xl text-slate-500 max-w-xl mb-12 leading-relaxed font-medium">
                  The infrastructure engine powering rural and urban communities. 
                  Deploy, monitor, and scale your Wi-Fi network with industrial military-grade precision.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                  <Link href="/login">
                    <Button className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-lg font-black shadow-2xl shadow-indigo-200 group flex items-center gap-3">
                      Access Infrastructure
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-16 px-10 border-slate-200 text-slate-900 bg-white hover:bg-slate-50 rounded-2xl text-lg font-black flex items-center gap-3">
                    <Play className="w-5 h-5 fill-slate-900" />
                    Watch Demo
                  </Button>
                </div>

                <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-6 h-6" />
                    <span className="font-bold text-lg">NetworkX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    <span className="font-bold text-lg">PowerGrid</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                className="relative z-10 p-8 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-heading font-black text-xl">Revenue Flow</h3>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black uppercase">+12.4%</div>
                </div>
                <div className="space-y-6">
                  {[45, 78, 62, 90, 85].map((w, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 bg-slate-100 rounded-full w-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${w}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                            className="h-full bg-indigo-500 rounded-full" 
                          />
                        </div>
                        <div className="w-1/3 h-1.5 bg-slate-50 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full -z-0 opacity-10 animate-bounce" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Table Section */}
      <section id="features" className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <h2 className="text-4xl font-heading font-black mb-6 leading-tight">
                BUILT FOR THE <br />
                <span className="text-indigo-400">NEXT BILLION.</span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-8">
                We've optimized every byte for low-latency environments and high-volume transactions.
              </p>
              <div className="h-px w-20 bg-indigo-500" />
            </div>
            
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-12">
              {[
                { icon: Shield, title: "Vault-Tier Security", desc: "Every transaction is signed with asymmetrical RSA encryption. Your revenue is protected by military-grade logic." },
                { icon: Users, title: "Agent Velocity", desc: "Coordinates field teams with real-time GPS clustering. Minimize downtime while maximizing coverage." },
                { icon: BarChart3, title: "Deep Analytics", desc: "Go beyond basic charts. Identify churn patterns before they happen with our predictive growth engine." },
                { icon: Wifi, title: "Signal Health", desc: "Live monitoring of node clusters. Instant alerts when signal density drops below defined thresholds." }
              ].map((feature, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
