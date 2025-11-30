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
        "flex bg-white px-0 pt-0 w-full min-w-0",
        className,
      )}
    >
      <div className="w-full min-w-0 overflow-x-auto border-b border-slate-200 tabs-scroll-x">
        <div className="flex flex-row-reverse flex-nowrap">
          {openedTickets.map((ticket) => {
            const isActive = ticket.id === currentTicketId;

            return (
              <button
                key={ticket.id}
                type="button"
                data-id={ticket.id}
                onClick={handleTabClick}
                className={cn(
                  "flex items-center gap-2 border border-slate-200 px-4 py-2 text-sm transition-colors whitespace-nowrap",
                  isActive
                    ? "border-b-transparent text-slate-900"
                    : "text-slate-500 hover:bg-slate-50",
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
    </div>
  );
});
