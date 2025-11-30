"use client";
import type { MouseEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { Maximize2, MoreVertical, CheckSquare, ChevronDown, Maximize, Flag, Mail, FileText, Users, Clock4, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../../lib/utils";
import { currentTicketIdAtom, openedTicketIdsAtom, ticketListAtom } from "../atoms/ticketAtoms";
import { activeTicketSidebarSectionAtom, isLeftSidebarContentVisibleAtom, isReplyEditorFullscreenAtom, isTicketDetailsFullscreenAtom, isRequestsPanelOpenAtom, type TicketSidebarSectionKey } from "../atoms/ticketUiAtoms";

interface Props {
  className?: string;
}

export const TicketDetails = memo(function TicketDetails({ className }: Props) {
  const [tickets] = useAtom(ticketListAtom);
  const [openedTicketIds, setOpenedTicketIds] = useAtom(openedTicketIdsAtom);
  const [currentTicketId, setCurrentTicketId] = useAtom(currentTicketIdAtom);
  const [isFullscreen, setIsFullscreen] = useAtom(isTicketDetailsFullscreenAtom);
  const [isEditorFullscreen, setIsEditorFullscreen] = useAtom(isReplyEditorFullscreenAtom);
  const [activeSidebarSection, setActiveSidebarSection] = useAtom(activeTicketSidebarSectionAtom);
  const [isLeftContentVisible, setIsLeftContentVisible] = useAtom(isLeftSidebarContentVisibleAtom);
  const [isRequestsPanelOpen, setIsRequestsPanelOpen] = useAtom(isRequestsPanelOpenAtom);

  const currentTicket = useMemo(
    () => tickets.find((t) => t.id === currentTicketId) ?? null,
    [tickets, currentTicketId],
  );

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, [setIsFullscreen]);

  const handleMenuClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const action = event.currentTarget.dataset.action;
    if (!action) return;
  }, []);

  const handleConvertClick = useCallback(() => {
  }, []);

  const handleFastReplyClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const templateId = event.currentTarget.dataset.templateId;
    if (!templateId) return;
  }, []);

  const handleToggleEditorFullscreen = useCallback(() => {
    setIsEditorFullscreen((prev) => !prev);
  }, [setIsEditorFullscreen]);

  const handleSidebarClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const key = event.currentTarget.dataset.section as TicketSidebarSectionKey | undefined;
      if (!key) return;
      setActiveSidebarSection(key);
    },
    [setActiveSidebarSection],
  );

  const isActiveSidebarSection = useCallback(
    (key: TicketSidebarSectionKey) => activeSidebarSection === key,
    [activeSidebarSection],
  );

  const handleLeftContentToggle = useCallback(() => {
    setIsLeftContentVisible((prev) => !prev);
  }, [setIsLeftContentVisible]);

  const handleOpenFromRequests = useCallback(
    (id: string) => {
      setOpenedTicketIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setCurrentTicketId(id);
    },
    [setCurrentTicketId, setOpenedTicketIds],
  );

  const handleRequestsPanelToggle = useCallback(() => {
    setIsRequestsPanelOpen((prev) => !prev);
  }, [setIsRequestsPanelOpen]);

  return (
    <section
      className={cn(
        "flex flex-1 rounded-xl border border-slate-200 bg-white",
        isFullscreen && "fixed inset-4 z-40",
        className,
      )}
    >
      {/* Left sidebar: icons column + content column + toggle strip */}
      <aside className="flex flex-row border-l border-slate-200 bg-slate-50/70">
        <nav className="flex w-16 flex-col items-center gap-4 border-l border-slate-200 py-6">
          <button
            type="button"
            data-section="actions"
            onClick={handleSidebarClick}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-emerald-500",
              isActiveSidebarSection("actions") && "text-emerald-500",
            )}
            aria-label="الإجراءات"
          >
            <Users className="h-5 w-5" />
          </button>

          <button
            type="button"
            data-section="contact"
            onClick={handleSidebarClick}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-emerald-500",
              isActiveSidebarSection("contact") && "text-emerald-500",
            )}
            aria-label="بيانات الاتصال"
          >
            <Mail className="h-5 w-5" />
          </button>

          <button
            type="button"
            data-section="relatedTickets"
            onClick={handleSidebarClick}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-emerald-500",
              isActiveSidebarSection("relatedTickets") && "text-emerald-500",
            )}
            aria-label="تذاكر مرتبطة"
          >
            <FileText className="h-5 w-5" />
          </button>

          <button
            type="button"
            data-section="details"
            onClick={handleSidebarClick}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-emerald-500",
              isActiveSidebarSection("details") && "text-emerald-500",
            )}
            aria-label="التفاصيل"
          >
            <FileText className="h-5 w-5" />
          </button>

          <button
            type="button"
            data-section="timeline"
            onClick={handleSidebarClick}
            className={cn(
              "mt-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-emerald-500",
              isActiveSidebarSection("timeline") && "text-emerald-500",
            )}
            aria-label="السجلات الزمنية"
          >
            <Flag className="h-5 w-5" />
          </button>
        </nav>

        {/* Content column */}
        {isLeftContentVisible && (
          <div className="flex w-64 min-w-0 flex-col border-l border-slate-200 bg-white px-4 py-4 text-xs text-slate-600">
            {activeSidebarSection === "timeline" && (
              <div className="flex h-full flex-col space-y-3 overflow-y-auto">
                <div className="flex flex-row-reverse items-center justify-between">
                  <div className="flex flex-row-reverse items-center gap-2">
                    <span className="text-sm font-semibold">السجلات الزمنية</span>
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-2 text-[11px] font-medium">
                      5
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-4 border-r border-slate-200 pr-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="relative pr-4">
                      <div className="absolute -right-[9px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-2 ring-white">
                        <Clock4 className="h-3 w-3" />
                      </div>
                      <div className="rounded-lg bg-white p-2 text-[11px] leading-relaxed shadow-sm">
                        <div className="mb-1 font-medium text-slate-700">أحدث الطلبات</div>
                        <div className="text-slate-500">قام الوكيل بتحديث حالة التذكرة ومراجعة التفاصيل.</div>
                        <div className="mt-1 flex flex-row-reverse items-center justify-between text-[10px] text-slate-400">
                          <span>22-09-2024</span>
                          <span>02:32 م</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSidebarSection !== "timeline" && (
              <div className="text-[11px] text-slate-500">
                سيتم عرض تفاصيل قسم "{activeSidebarSection}" هنا.
              </div>
            )}
          </div>
        )}

        {/* Toggle strip: always visible, mirrors right panel behaviour */}
        <button
          type="button"
          onClick={handleLeftContentToggle}
          className="flex w-6 items-center justify-center border-l border-slate-200 bg-white text-slate-400 hover:text-emerald-500"
          aria-label={isLeftContentVisible ? "إخفاء لوحة التفاصيل" : "إظهار لوحة التفاصيل"}
        >
          {isLeftContentVisible ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* Main ticket content + right طلبات list */}
      <div className="flex min-w-0 flex-1 flex-row-reverse">
        {/* Right: طلبات list with toggle */}
        <aside className="flex flex-row-reverse border-r border-slate-200 bg-slate-50/80">
          {isRequestsPanelOpen && (
            <div className="flex w-64 min-w-0 flex-col px-3 py-4 text-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-slate-800">الطلبات</span>
              </div>
              <ul className="space-y-1 text-slate-600">
                {tickets.map((ticket) => (
                  <li key={ticket.id}>
                    <button
                      type="button"
                      onClick={() => handleOpenFromRequests(ticket.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-right text-xs",
                        openedTicketIds.includes(ticket.id)
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "hover:bg-white/80",
                      )}
                    >
                      <span className="truncate">{ticket.title}</span>
                      <span className="ml-1 text-[10px] text-slate-400">#{ticket.id}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

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

        {/* Center: existing ticket content */}
        <div className="flex min-w-0 flex-1 flex-col">
        {/* Top header area */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3">

          <div className="flex items-center gap-3 text-slate-500">
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
              aria-label="تكبير"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              data-action="menu"
              onClick={handleMenuClick}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
              aria-label="المزيد"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleConvertClick}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
            >
              <CheckSquare className="h-4 w-4" />
              <span>تحويل لمهمة</span>
            </button>
          </div>
          <div className="flex flex-row-reverse items-center gap-3 text-slate-700">
            <h2 className="max-w-xl truncate text-lg font-semibold">
              {currentTicket?.title ?? ""}
            </h2>
          </div>
        </div>

        {/* Replies list placeholder */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/60 px-6 py-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
            محتوى التذكرة والردود سيظهر هنا (محاكاة للجزء الأوسط في التصميم).
          </div>
        </div>

        {/* Reply composer */}
        <div className="border-t border-slate-200 bg-white px-6 py-4">
          <div className="mb-3 flex flex-row-reverse items-center gap-2 text-xs text-slate-600">
            <span className="font-medium">ردود سريعة</span>
            <div className="flex flex-row-reverse gap-2">
              <button
                type="button"
                data-template-id="1"
                onClick={handleFastReplyClick}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                مرحباً بك، سيتم استلام طلبكم ومتابعته
              </button>
              <button
                type="button"
                data-template-id="2"
                onClick={handleFastReplyClick}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                تم استلام شكواكم وجاري معالجتها
              </button>
            </div>

            <button
              type="button"
              data-template-id="from-template"
              onClick={handleFastReplyClick}
              className="ml-auto rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs hover:border-emerald-200 hover:bg-emerald-50"
            >
              استدعاء من قالب
            </button>
          </div>

          <div
            className={cn(
              "mt-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3",
              isEditorFullscreen && "fixed inset-x-10 bottom-10 top-24 z-50 bg-white",
            )}
          >
            <div className="mb-2 flex flex-row-reverse items-center justify-between text-xs text-slate-500">
              <div className="flex flex-row-reverse items-center gap-2">
                <span className="rounded-md bg-emerald-500 px-2 py-1 text-[11px] font-semibold text-white">
                  CC
                </span>
                <div className="flex flex-row-reverse flex-wrap gap-1">
                  <span className="rounded-full bg-white px-2 py-1">ahmed@example.com</span>
                  <span className="rounded-full bg-white px-2 py-1">crashedf@example.com</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleEditorFullscreen}
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Maximize className="h-3 w-3" />
                <span>تكبير المحرر</span>
              </button>
            </div>

            <div className="mb-3 rounded-lg border border-dashed border-slate-300 bg-white/80 p-3 text-sm text-slate-500">
              مربع تحرير النص الغني (PlateJS) سيُدمج هنا.
            </div>

            <div className="mt-2 flex flex-row-reverse items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                <ChevronDown className="h-4 w-4 rotate-180" />
                <span>إضافة رد</span>
              </button>

              <div className="flex flex-row-reverse items-center gap-2 text-xs text-slate-500">
                <span>رد إلى:</span>
                <div className="flex flex-row-reverse flex-wrap gap-1">
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-1">
                    ahmed@example.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
});
