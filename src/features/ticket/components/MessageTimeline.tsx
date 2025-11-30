"use client";
import { memo, useCallback } from "react";
import { useAtom } from "jotai";
import { Clock4, User, MessageSquare } from "lucide-react";

import { cn } from "../../../lib/utils";
import { selectedMessageIdAtom, replyToAuthorAtom, type Message } from "../atoms/messageAtoms";

interface Props {
  messages: Message[];
  className?: string;
}

export const MessageTimeline = memo(function MessageTimeline({ messages, className }: Props) {
  const [selectedMessageId, setSelectedMessageId] = useAtom(selectedMessageIdAtom);
  const [replyToAuthor, setReplyToAuthor] = useAtom(replyToAuthorAtom);

  const handleMessageSelect = useCallback((messageId: string, authorEmail: string) => {
    console.log('Message selected:', messageId, authorEmail);
    setSelectedMessageId(messageId);
    setReplyToAuthor(authorEmail);
  }, [setSelectedMessageId, setReplyToAuthor]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className={cn("flex h-full flex-col space-y-3 overflow-y-auto", className)}>
      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex flex-row-reverse items-center gap-2">
          <span className="text-sm font-semibold">السجلات الزمنية</span>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-2 text-[11px] font-medium">
            {messages.length}
          </span>
        </div>
      </div>

      <div className="mt-2 space-y-4 border-r border-slate-200 pr-4">
        {messages.map((message) => (
          <div key={message.id} className="relative pr-4">
            <div className="absolute -right-[9px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-2 ring-white">
              {message.type === 'user' ? (
                <User className="h-3 w-3" />
              ) : (
                <MessageSquare className="h-3 w-3" />
              )}
            </div>
            <button
              type="button"
              onClick={() => handleMessageSelect(message.id, message.authorEmail)}
              className={cn(
                "w-full rounded-lg p-2 text-[11px] leading-relaxed shadow-sm transition-all text-right",
                selectedMessageId === message.id
                  ? "bg-emerald-50 border border-emerald-200 ring-2 ring-emerald-500 ring-opacity-20"
                  : "bg-white hover:bg-slate-50 border border-transparent"
              )}
            >
              <div className="mb-1 font-medium text-slate-700 flex flex-row-reverse items-center justify-between">
                <span>{message.author}</span>
                <span className="text-[10px] text-slate-400">
                  {message.type === 'user' ? 'عميل' : 'وكيل'}
                </span>
              </div>
              <div className="text-slate-500 line-clamp-2">{message.content}</div>
              <div className="mt-1 flex flex-row-reverse items-center justify-between text-[10px] text-slate-400">
                <span>{formatDate(message.timestamp)}</span>
                <span>{formatTime(message.timestamp)}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
