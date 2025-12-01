"use client";
import type { ComponentType } from "react";
import { memo, useCallback, useMemo } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ChevronDown, ChevronLeft, ChevronRight, CheckSquare, FileText, Flag, Mail, Maximize, Minimize, MoreVertical, Users, PanelLeft, PanelRight } from "lucide-react";
import { cn } from "../../../lib/utils";
import { MessageList } from "./MessageList";
import { MessageTimeline } from "./MessageTimeline";
import { ReplyEditor } from "./ReplyEditor";
import { RightSideBar } from "./RightSideBar";
import { useAtom } from "jotai";
import { currentTicketIdAtom, ticketListAtom, openedTicketIdsAtom } from "../atoms/ticketAtoms";
import { replyToAuthorAtom, type Message } from "../atoms/messageAtoms";
import { activeTicketSidebarSectionAtom, isLeftSidebarContentVisibleAtom, isReplyEditorFullscreenAtom, isTicketDetailsFullscreenAtom, type TicketSidebarSectionKey } from "../atoms/ticketUiAtoms";
import { isRequestsListOpenAtom } from "../atoms/rightSideBarAtoms";

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
  const [isRequestsPanelOpen, setIsRequestsPanelOpen] = useAtom(isRequestsListOpenAtom);
  const [replyToAuthor, setReplyToAuthor] = useAtom(replyToAuthorAtom);
  
  console.log('TicketDetails - replyToAuthor:', replyToAuthor);

  // Calculate dynamic panel sizes based on toggle states
  const leftSize = isLeftContentVisible ? 20 : 8;
  const rightSize = isRequestsPanelOpen ? 20 : 8;
  const mainDefaultSize = 100 - leftSize - rightSize;

  // Force panel recalculation when toggle states change
  const panelKey = `${leftSize}-${rightSize}`;

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

  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const action = event.currentTarget.dataset.action;
    if (!action) return;
  }, []);

  const handleConvertClick = useCallback(() => {
  }, []);

  
  const handleToggleEditorFullscreen = useCallback(() => {
    setIsEditorFullscreen((prev) => !prev);
  }, [setIsEditorFullscreen]);

  const handleSidebarClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleRightSidebarToggle = useCallback(() => {
    setIsRequestsPanelOpen((prev) => !prev);
  }, [setIsRequestsPanelOpen]);

  
  return (
    <>
      {/* Backdrop overlay for editor fullscreen mode */}
      {isEditorFullscreen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      )}
      
      {/* Backdrop overlay for ticket details fullscreen mode */}
      {isFullscreen && !isEditorFullscreen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      )}
      
      <section
        className={cn(
          "flex flex-1 rounded-xl rounded-t-none border-l border-x border-b border-slate-200 bg-white relative",
          isFullscreen && "fixed inset-0 z-50",
          className,
        )}
      >
      <PanelGroup key={panelKey} direction="horizontal" className="flex flex-1">
        {/* Left sidebar: fixed width, simple layout */}
        <Panel 
          defaultSize={leftSize} 
          minSize={leftSize} 
          maxSize={30}
          className={cn(
            isFullscreen && "hidden"
          )}
        >
          <aside className="flex h-full flex-row border-l border-slate-200 bg-slate-50/70">
            <nav className="flex w-16 shrink-0 flex-col items-center gap-4 border-l border-r border-slate-200 py-6">
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
              <div className="flex flex-1 flex-col border-l border-slate-200 bg-white px-4 py-4 text-xs text-slate-600 min-w-[200px]">
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

            {/* Removed toggle strip - now floating */}
          </aside>
        </Panel>

        {/* Left resize handle - always visible but styled based on sidebar state */}
        <PanelResizeHandle 
          className={cn(
            "flex w-1 cursor-col-resize items-stretch transition-opacity",
            isLeftContentVisible ? "bg-slate-200 opacity-100" : "bg-transparent opacity-0"
          )}
        />

        {/* Main ticket content - resizable from both sides */}
        <Panel 
          defaultSize={mainDefaultSize} 
          minSize={10} 
          maxSize={95}
        >
          <div className="flex h-full min-w-0 flex-1 flex-row-reverse border-x-gray-200 border-l">
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
                    isEditorFullscreen && "fixed inset-x-10 bottom-10 top-24 z-50 bg-white shadow-2xl",
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
        </Panel>

        {/* Right resize handle - always visible but styled based on sidebar state */}
        <PanelResizeHandle 
          className={cn(
            "flex w-1 cursor-col-resize items-stretch transition-opacity",
            isRequestsPanelOpen ? "bg-slate-200 opacity-100" : "bg-transparent opacity-0"
          )}
        />

        {/* Right sidebar: fixed width, simple layout */}
        <Panel 
          defaultSize={rightSize} 
          minSize={rightSize} 
          maxSize={30}
          className={cn(
            isFullscreen && "hidden"
          )}
        >
          <div className="h-full border-l border-slate-200 bg-white">
            <RightSideBar className="h-full" />
          </div>
        </Panel>
      </PanelGroup>

      {/* Floating toggle buttons */}
      {/* Floating toggle buttons - hidden in fullscreen mode */}
      {/* Left sidebar toggle - positioned inside TicketDetails */}
      <button
        type="button"
        onClick={handleLeftContentToggle}
        className={cn(
          "absolute left-11 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600",
          isFullscreen && "hidden"
        )}
        aria-label={isLeftContentVisible ? "إخفاء لوحة التفاصيل" : "إظهار لوحة التفاصيل"}
      >
        {isLeftContentVisible ? (
          <ChevronLeft className="h-2 w-2" />
        ) : (
          <ChevronRight className="h-2 w-2" />
        )}
      </button>

      {/* Right sidebar toggle - positioned inside TicketDetails */}
      <button
        type="button"
        onClick={handleRightSidebarToggle}
        className={cn(
          "absolute right-11 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600",
          isFullscreen && "hidden"
        )}
        aria-label={isRequestsPanelOpen ? "إخفاء قائمة الطلبات" : "إظهار قائمة الطلبات"}
      >
        {isRequestsPanelOpen ? (
          <ChevronRight className="h-2 w-2" />
        ) : (
          <ChevronLeft className="h-2 w-2" />
        )}
      </button>
    </section>
    </>
  );
});
