import AppShell from "../components/layout/AppShell";
import { Rocket } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function ComingSoonPage({
  title,
  description,
}: Props) {
  return (
    <AppShell>
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-6">
            <Rocket size={36} />
          </div>

          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>

          <div className="mt-6 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950/40 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            Coming Soon 🚀
          </div>
        </div>
      </div>
    </AppShell>
  );
}