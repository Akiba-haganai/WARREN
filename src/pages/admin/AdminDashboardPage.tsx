import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Archive,
  Flag,
  Megaphone,
  Mic,
  PlusCircle,
  Shield,
  Upload,
  Users,
  Calendar,
  Send,
  FileText,
  KeyRound,
  Check,
  X,
  RefreshCw,
} from "lucide-react";

import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";

type RecoveryRequest = {
  id: string;
  user_id: string;
  email: string;
  status: string;
  score: number;
  ip_address: string;
  created_at: string;
};

const tiles = [
  {
    to: "/admin/announcements/new",
    icon: PlusCircle,
    label: "Create Announcement",
    desc: "Post a new bulletin to all students",
    color: "text-blue-600 dark:text-cyan-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    to: "/admin/announcements",
    icon: Megaphone,
    label: "Manage Announcements",
    desc: "Edit or remove existing bulletins",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    to: "/admin/upload-material",
    icon: Upload,
    label: "Upload Study Material",
    desc: "Add notes, slides or past papers",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    to: "/admin/material-requests",
    icon: FileText,
    label: "Material Requests",
    desc: "View and manage student requests",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    key: "material_requests",
  },
  {
    to: "/admin/events",
    icon: Calendar,
    label: "Manage Events",
    desc: "Create and manage campus events",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    to: "/admin/global-notifications",
    icon: Send,
    label: "Global Notification",
    desc: "Send a push to all students",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    to: "/moderation",
    icon: Shield,
    label: "Moderation Tools",
    desc: "Review flagged posts and comments",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    to: "/admin/reports",
    icon: Flag,
    label: "Reports",
    desc: "View community reports",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    key: "reports",
  },
  {
    to: "/admin/communities",
    icon: Users,
    label: "Communities",
    desc: "Manage student communities",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    to: "/admin/create-ama",
    icon: Mic,
    label: "Create AMA Session",
    desc: "Schedule a lecturer Q&A session",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    to: "#",
    icon: Archive,
    label: "Archive Inactive Groups",
    desc: "Archive study groups inactive for 30+ days",
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-900/20",
    action: true,
  },
];

export default function AdminDashboardPage() {
  const [archiving, setArchiving] = useState(false);
  const [recoveryRequests, setRecoveryRequests] = useState<RecoveryRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  // Fetch pending recovery requests
  const fetchRecoveryRequests = async () => {
    setLoadingRequests(true);
    try {
      const { data, error } = await (supabase
        .from("password_recovery_requests" as any)
        .select("*")
        .eq("status", "verified_pending_admin")
        .order("created_at", { ascending: false }) as any);

      if (!error && data) {
        setRecoveryRequests(data as RecoveryRequest[]);
      }
    } catch (_) {
      // Table may not be migrated yet
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRecoveryRequests();
  }, []);

  const handleApproveReset = async (request: RecoveryRequest) => {
    setActionId(request.id);
    try {
      // Call Supabase Edge Function admin-approve-password-reset
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-approve-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ requestId: request.id, action: "approve" }),
        }
      );

      if (!res.ok) {
        // Fallback: If edge function is not deployed yet, send standard reset email
        const { error: resetErr } = await supabase.auth.resetPasswordForEmail(request.email, {
          redirectTo: `${window.location.origin}/update-password`,
        });
        if (resetErr) throw resetErr;

        await (supabase
          .from("password_recovery_requests" as any)
          .update({ status: "approved" } as any)
          .eq("id", request.id) as any);
      }

      alert(`Password reset for ${request.email} approved and reset email sent!`);
      setRecoveryRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (err: any) {
      alert("Error approving reset: " + err.message);
    } finally {
      setActionId(null);
    }
  };

  const handleRejectReset = async (requestId: string) => {
    setActionId(requestId);
    try {
      await (supabase
        .from("password_recovery_requests" as any)
        .update({ status: "rejected" } as any)
        .eq("id", requestId) as any);

      setRecoveryRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (err: any) {
      alert("Error rejecting reset: " + err.message);
    } finally {
      setActionId(null);
    }
  };

  const handleArchive = async () => {
    if (
      !confirm(
        "Archive study groups that have been inactive for 30+ days? Members will be notified."
      )
    )
      return;
    setArchiving(true);
    try {
      const { error } = await supabase.rpc("archive_inactive_communities");
      if (error) throw error;
      alert("Archival complete. Inactive groups have been archived.");
    } catch (err: any) {
      alert("Failed to archive groups: " + err.message);
    } finally {
      setArchiving(false);
    }
  };

  return (
    <AppShell>
      {/* Page title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Manage Campus System & Moderation
          </p>
        </div>

        <button
          onClick={fetchRecoveryRequests}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Refresh pending items"
        >
          <RefreshCw size={16} className={loadingRequests ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Pending Password Resets Queue */}
      {recoveryRequests.length > 0 && (
        <div className="mb-6 p-5 rounded-3xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
              <KeyRound size={18} />
              <span>Pending Password Reset Queue</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-xs">
              {recoveryRequests.length} Pending
            </span>
          </div>

          <div className="space-y-2">
            {recoveryRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {req.email}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      Score: {req.score}/3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    IP: {req.ip_address} • Requested {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={actionId === req.id}
                    onClick={() => handleApproveReset(req)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all disabled:opacity-50"
                  >
                    <Check size={14} />
                    Approve
                  </button>
                  <button
                    disabled={actionId === req.id}
                    onClick={() => handleRejectReset(req.id)}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-red-950/50 text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control tiles */}
      <div className="flex flex-col gap-3">
        {tiles.map(({ to, icon: Icon, label, desc, color, bg, action }) =>
          action ? (
            <button
              key={label}
              onClick={handleArchive}
              disabled={archiving}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform duration-100 [-webkit-tap-highlight-color:transparent] text-left"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {desc}
                </p>
              </div>
              <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">
                ›
              </span>
            </button>
          ) : (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform duration-100 [-webkit-tap-highlight-color:transparent]"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {desc}
                </p>
              </div>
              <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">
                ›
              </span>
            </Link>
          )
        )}
      </div>
    </AppShell>
  );
}
