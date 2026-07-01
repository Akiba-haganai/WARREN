import type { PinCategory } from "../../../types/map";
import { BookOpen, GraduationCap, DollarSign, Users, Heart, BookOpen as BookOpen2, Utensils, Car, Building2 } from "lucide-react";
import React from "react";

export const QUICK = [
  { label: "How to Register", category: "registration" as PinCategory },
  { label: "Pay My Fees", category: "finance" as PinCategory },
  { label: "Get SU Card", category: "student_union" as PinCategory },
  { label: "Find Health Clinic", category: "health" as PinCategory },
  { label: "Library Access", category: "library" as PinCategory },
];

export interface CategoryConfig {
  key: PinCategory;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: "registration",
    label: "Registration",
    icon: <BookOpen size={14} />,
    color: "#1E40AF",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    border: "border-blue-300 dark:border-blue-700",
  },
  {
    key: "academics",
    label: "Academics",
    icon: <GraduationCap size={14} />,
    color: "#7C3AED",
    bg: "bg-purple-100 dark:bg-purple-900/40",
    border: "border-purple-300 dark:border-purple-700",
  },
  {
    key: "finance",
    label: "Finance",
    icon: <DollarSign size={14} />,
    color: "#059669",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  {
    key: "student_union",
    label: "Student Union",
    icon: <Users size={14} />,
    color: "#D97706",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    border: "border-amber-300 dark:border-amber-700",
  },
  {
    key: "health",
    label: "Health",
    icon: <Heart size={14} />,
    color: "#DC2626",
    bg: "bg-red-100 dark:bg-red-900/40",
    border: "border-red-300 dark:border-red-700",
  },
  {
    key: "library",
    label: "Library",
    icon: <BookOpen2 size={14} />,
    color: "#0891B2",
    bg: "bg-cyan-100 dark:bg-cyan-900/40",
    border: "border-cyan-300 dark:border-cyan-700",
  },
  {
    key: "dining",
    label: "Dining",
    icon: <Utensils size={14} />,
    color: "#EA580C",
    bg: "bg-orange-100 dark:bg-orange-900/40",
    border: "border-orange-300 dark:border-orange-700",
  },
  {
    key: "transport",
    label: "Transport",
    icon: <Car size={14} />,
    color: "#4B5563",
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-300 dark:border-gray-600",
  },
  {
    key: "general",
    label: "General",
    icon: <Building2 size={14} />,
    color: "#6B7280",
    bg: "bg-slate-100 dark:bg-slate-800",
    border: "border-slate-300 dark:border-slate-600",
  },
];

export function getCat(key: PinCategory): CategoryConfig {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];
}