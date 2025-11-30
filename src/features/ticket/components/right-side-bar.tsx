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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { cn } from "../../../lib/utils";
import { useAtom } from "jotai";
import { ticketListAtom, openedTicketIdsAtom, currentTicketIdAtom } from "../atoms/ticketAtoms";
import { isRequestsListOpenAtom } from "../atoms/rightSideBarAtoms";

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
  const [tickets] = useAtom(ticketListAtom);
  const [openedTicketIds, setOpenedTicketIds] = useAtom(openedTicketIdsAtom);
  const [currentTicketId, setCurrentTicketId] = useAtom(currentTicketIdAtom);
  const [isRequestsPanelOpen, setIsRequestsPanelOpen] = useAtom(isRequestsListOpenAtom);

  const isActive = useCallback((key: SidebarItemKey) => key === "requests", []);

  const handleRequestsPanelToggle = useCallback(() => {
    setIsRequestsPanelOpen((prev) => !prev);
  }, [setIsRequestsPanelOpen]);

  const handleTicketClick = useCallback((ticketId: string) => {
    if (!openedTicketIds.includes(ticketId)) {
      setOpenedTicketIds([...openedTicketIds, ticketId]);
    }
    setCurrentTicketId(ticketId);
  }, [openedTicketIds, setOpenedTicketIds, setCurrentTicketId]);

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

      {/* طلبات list - simple layout without internal resizer */}
      {isRequestsPanelOpen && (
        <div className="flex w-64 min-w-[200px] max-w-xs flex-col border-r border-slate-200 bg-slate-50/80 px-3 py-4 text-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-slate-800">الطلبات</span>
          </div>
          <ul className="space-y-1 text-slate-600">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <button
                  type="button"
                  onClick={() => handleTicketClick(ticket.id)}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-right transition-colors",
                    currentTicketId === ticket.id
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50"
                  )}
                >
                  <div className="flex flex-row-reverse items-center justify-between gap-2">
                    <span className="truncate text-xs font-medium">{ticket.title}</span>
                    <span className="text-[11px] text-slate-500">#{ticket.id}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">{ticket.customer}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={handleRequestsPanelToggle}
        className="flex w-6 items-center justify-center border-l border-slate-200 bg-white text-slate-400 hover:text-emerald-500"
        aria-label={isRequestsPanelOpen ? "إخفاء قائمة الطلبات" : "إظهار قائمة الطلبات"}
      >
        {isRequestsPanelOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
})
