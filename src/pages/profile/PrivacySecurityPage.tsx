import AppShell from "../../components/layout/AppShell";
import { ShieldCheck } from "lucide-react";

export default function PrivacySecurityPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Privacy & Security</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center">
          <ShieldCheck size={40} className="mx-auto text-green-500 mb-3" />
          <p className="font-semibold">Your account is secure</p>
          <p className="text-sm opacity-70 mt-1">
            We use Supabase Auth with Row Level Security. Only you and authorised admins can see your data.
            You can delete your account by contacting support.
          </p>
        </div>
      </div>
    </AppShell>
  );
}