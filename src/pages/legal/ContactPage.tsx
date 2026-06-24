import AppShell from "../../components/layout/AppShell";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            Have a question, suggestion, or need help? Reach out to us via email or
            through the app's messaging system.
          </p>
          <a
            href="mailto:support@warren.app"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">support@warren.app</span>
          </a>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border">
            <MessageCircle size={20} />
            <span className="text-sm font-medium">Use the in‑app Messages tab</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}