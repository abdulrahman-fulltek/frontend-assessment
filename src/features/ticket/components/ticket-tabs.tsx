"use client";
import type { MouseEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { X } from "lucide-react";

import { cn } from "../../../lib/utils";
import { currentTicketIdAtom, openedTicketIdsAtom, ticketListAtom } from "../atoms/ticketAtoms";

interface Props {
  className?: string;
}

export const TicketTabs = memo(function TicketTabs({ className }: Props) {
  const [tickets] = useAtom(ticketListAtom);
  const [openedIds, setOpenedIds] = useAtom(openedTicketIdsAtom);
  const [currentTicketId, setCurrentTicketId] = useAtom(currentTicketIdAtom);

  const openedTickets = useMemo(
    () => openedIds.map((id) => tickets.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => Boolean(t)),
    [openedIds, tickets],
  );

  const hasTickets = useMemo(() => openedTickets.length > 0, [openedTickets]);

  const handleTabClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id;
      if (!id) return;
      setCurrentTicketId(id);
    },
    [setCurrentTicketId],
  );

  const handleTabClose = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      event.stopPropagation();
      const id = event.currentTarget.dataset.id;
      if (!id) return;

      setOpenedIds((prev) => prev.filter((item) => item !== id));
      setCurrentTicketId((prev) => (prev === id ? null : prev));
    },
    [setCurrentTicketId, setOpenedIds],
  );

  if (!hasTickets) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex border-b border-slate-200 bg-white px-0 pt-0",
        className,
      )}
    >
      <div className="flex w-full flex-row-reverse overflow-x-auto">
        {openedTickets.map((ticket) => {
          const isActive = ticket.id === currentTicketId;

          return (
            <button
              key={ticket.id}
              type="button"
              data-id={ticket.id}
              onClick={handleTabClick}
              className={cn(
                "flex items-center gap-2 border-x border-b-2 border-slate-200 px-4 py-2 text-sm transition-colors",
                isActive
                  ? "border-b-emerald-500 bg-emerald-50 text-emerald-700"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100",
              )}
            >
              <span className="truncate text-right">
                {ticket.title}
                <span className="mx-1 text-xs text-slate-400">#{ticket.id}</span>
              </span>
              <X
                data-id={ticket.id}
                onClick={handleTabClose}
                className="h-3 w-3 cursor-pointer text-slate-400 hover:text-slate-600"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
});
