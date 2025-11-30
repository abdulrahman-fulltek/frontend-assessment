"use client";
import type { ComponentType } from "react";
import { memo, useCallback } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Users2,
  FolderKanban,
  Wallet2,
  CalendarCheck,
  ClipboardList,
  Settings2,
} from "lucide-react";

import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
}

type SidebarItemKey =
  | "dashboard"
  | "clients"
  | "contracts"
  | "hr"
  | "projects"
  | "finance"
  | "calendar"
  | "requests"
  | "settings";

interface SidebarItem {
  key: SidebarItemKey;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const ITEMS: SidebarItem[] = [
  { key: "dashboard", label: "اللوحة", icon: LayoutDashboard },
  { key: "clients", label: "العملاء", icon: Users },
  { key: "contracts", label: "العقود", icon: FileText },
  { key: "hr", label: "الموارد البشرية", icon: Users2 },
  { key: "projects", label: "المشاريع", icon: FolderKanban },
  { key: "finance", label: "المالية", icon: Wallet2 },
  { key: "calendar", label: "التقويم", icon: CalendarCheck },
  { key: "requests", label: "الطلبات", icon: ClipboardList },
  { key: "settings", label: "الإعدادات", icon: Settings2 },
];

export const RightSideBar = memo(function RightSideBar({ className }: Props) {
  const isActive = useCallback((key: SidebarItemKey) => key === "requests", []);

  return (
    <aside className={cn("flex h-full flex-row-reverse bg-white", className)}>
      {/* Right column: icon-only vertical nav */}
      <nav className="flex w-16 flex-col items-center gap-4 border-l border-slate-200 py-6">
        {ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-emerald-500",
              isActive(key) && "text-emerald-500",
            )}
            aria-label={label}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </nav>

      {/* Request list is handled inside TicketDetails for tighter coupling with tabs */}
    </aside>
  );
});
