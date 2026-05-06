'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@base-ui/react/switch'; // Assuming switch is available or I should check
import { cn } from '@/lib/utils';
import { Save, User, Bell, Shield, Database } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium">Manage your organization profile and global configuration.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-6 bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 rounded-2xl">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Administrator Profile</h3>
              <p className="text-sm text-slate-400 font-medium">Update your account details and email address.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</Label>
              <Input defaultValue="Admin One" className="h-12 rounded-xl border-slate-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
              <Input defaultValue="admin@wifipro.com" disabled className="h-12 rounded-xl border-slate-100 bg-slate-50" />
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-6 bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 rounded-2xl">
              <Database className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Database Connection</h3>
              <p className="text-sm text-slate-400 font-medium">Verify your Prisma connection status.</p>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-emerald-700 font-mono">POSTGRES_CONNECTED</span>
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-lg border-emerald-200 text-emerald-700 bg-white font-bold">
              Test Latency
            </Button>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-6 bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 rounded-2xl">
              <Bell className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
              <p className="text-sm text-slate-400 font-medium">Control alerts for bill payments and renewal failures.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold text-slate-900">Payment Alerts</p>
                <p className="text-xs text-slate-400 font-medium tracking-tight">Receive email notifications for agent collections.</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold text-slate-900">Weekly Reports</p>
                <p className="text-xs text-slate-400 font-medium tracking-tight">Get summary of revenue and growth rates.</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 flex gap-2">
            <Save className="w-5 h-5" />
            Save Transitions
          </Button>
        </div>
      </div>
    </div>
  );
}
