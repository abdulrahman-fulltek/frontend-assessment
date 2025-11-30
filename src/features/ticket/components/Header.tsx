"use client";
import type { MouseEvent } from "react";
import { memo, useCallback } from "react";
import { Bell, Clock3, FileText, PlusCircle, Search } from "lucide-react";

import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
}

export const Header = memo(function Header({ className }: Props) {
  // handlers (useCallback)
  const handleIconClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const action = event.currentTarget.dataset.action;
    if (!action) return;
    // TODO: wire to real behaviors (notifications, new request, etc.)
  }, []);

  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3",
        "text-slate-800",
        className,
      )}
    >
      {/* Left side: action icons */}
      <div className="flex items-center gap-3 text-slate-500">
        <button
          type="button"
          data-action="notifications"
          onClick={handleIconClick}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-emerald-500"
          aria-label="الإشعارات"
        >
          <Bell className="h-4 w-4" />
        </button>

        <button
          type="button"
          data-action="add"
          onClick={handleIconClick}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-emerald-500"
          aria-label="إضافة"
        >
          <PlusCircle className="h-4 w-4" />
        </button>

        <button
          type="button"
          data-action="time"
          onClick={handleIconClick}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-emerald-500"
          aria-label="الوقت"
        >
          <Clock3 className="h-4 w-4" />
        </button>

        <button
          type="button"
          data-action="notes"
          onClick={handleIconClick}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-emerald-500"
          aria-label="الملاحظات"
        >
          <FileText className="h-4 w-4" />
        </button>

        <button
          type="button"
          data-action="search"
          onClick={handleIconClick}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-emerald-500"
          aria-label="بحث"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
      
      {/* Right side: title */}
      <div className="flex flex-row-reverse items-center gap-2">
        <h1 className="text-lg font-semibold">الطلبات</h1>
      </div>

    </header>
  );
});
