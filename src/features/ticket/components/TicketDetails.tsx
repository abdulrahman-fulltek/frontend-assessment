"use client";
import type { MouseEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { MoreVertical, CheckSquare, ChevronDown, Maximize, Minimize, Flag, Mail, FileText, Users, Clock4, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../../lib/utils";
import { currentTicketIdAtom, openedTicketIdsAtom, ticketListAtom } from "../atoms/ticketAtoms";
import { ReplyEditor } from "./ReplyEditor";
import { MessageTimeline } from "./MessageTimeline";
import { MessageList } from "./MessageList";
import { replyToAuthorAtom, type Message } from "../atoms/messageAtoms";
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
  const [replyToAuthor, setReplyToAuthor] = useAtom(replyToAuthorAtom);
  
  console.log('TicketDetails - replyToAuthor:', replyToAuthor);

  // Sample message data
  const sampleMessages: Message[] = useMemo(() => [
    {
      id: "1",
      author: "أحمد محمد",
      authorEmail: "ahmed@example.com",
      content: "مرحباً، لدي مشكلة في تسجيل الدخول إلى النظام. لا أستطيع الوصول إلى حسابي منذ الصباح.",
      timestamp: new Date(2024, 8, 22, 10, 30),
      type: "user"
    },
    {
      id: "2",
      author: "الدعم الفني",
      authorEmail: "support@company.com",
      content: "مرحباً أحمد، نأسف للإزعاج. هل يمكنك التحقق من كلمة المرور التي تستخدمها؟ هل قمت بتغييرها مؤخراً؟",
      timestamp: new Date(2024, 8, 22, 10, 45),
      type: "agent"
    },
    {
      id: "3",
      author: "أحمد محمد",
      authorEmail: "ahmed@example.com",
      content: "نعم، حاولت استخدام كلمة المرور الاعتيادية ولكن لم تنجح. هل يمكنكم إعادة تعيينها لي؟",
      timestamp: new Date(2024, 8, 22, 11, 0),
      type: "user"
    },
    {
      id: "4",
      author: "الدعم الفني",
      authorEmail: "support@company.com",
      content: "بالتأكيد. قمنا بإرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. الرابط صالح لمدة 24 ساعة فقط.",
      timestamp: new Date(2024, 8, 22, 11, 15),
      type: "agent"
    },
    {
      id: "5",
      author: "أحمد محمد",
      authorEmail: "ahmed@example.com",
      content: "شكراً جزيلاً! استلمت الرابط وتمكنت من إعادة تعيين كلمة المرور بنجاح. الآن يمكنني الدخول إلى النظام.",
      timestamp: new Date(2024, 8, 22, 11, 30),
      type: "user"
    }
  ], []);

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
              <MessageTimeline messages={sampleMessages} />
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
              aria-label={isFullscreen ? "تصغير" : "تكبير"}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
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
              className="flex items-center gap-2 rounded px-4 py-2 text-sm font-medium border transition hover:text-white hover:bg-emerald-600"
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

        {/* Message list */}
        <div className="flex-1 overflow-y-auto bg-slate-50/60 px-6 py-4">
          <MessageList messages={sampleMessages} />
        </div>

        {/* Reply composer */}
        <div className="border-t border-slate-200 bg-white px-6 py-4">

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
                  <button
                    type="button"
                    onClick={() => setReplyToAuthor("ahmed@example.com")}
                    className={cn(
                      "rounded-full border px-2 py-1 transition-colors",
                      replyToAuthor === "ahmed@example.com"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50"
                    )}
                  >
                    ahmed@example.com
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyToAuthor("crashedf@example.com")}
                    className={cn(
                      "rounded-full border px-2 py-1 transition-colors",
                      replyToAuthor === "crashedf@example.com"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50"
                    )}
                  >
                    crashedf@example.com
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleEditorFullscreen}
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 hover:border-emerald-200 hover:bg-emerald-50"
                aria-label={isEditorFullscreen ? "تصغير المحرر" : "تكبير المحرر"}
              >
                {isEditorFullscreen ? (
                  <Minimize className="h-3 w-3" />
                ) : (
                  <Maximize className="h-3 w-3" />
                )}
              </button>
            </div>

            <ReplyEditor className="mb-3" isFullscreen={isEditorFullscreen} />

            <div className="mt-2 flex flex-row-reverse items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                <ChevronDown className="h-4 w-4 rotate-180" />
                <span>إضافة رد</span>
              </button>

              <div className="mt-2 flex flex-row-reverse items-center justify-between">
                <span>رد إلى:</span>
                <div className="flex flex-row-reverse flex-wrap gap-1">
                  {replyToAuthor ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">
                      {replyToAuthor}
                    </span>
                  ) : (
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-500">
                      جميع المستلمين
                    </span>
                  )}
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
