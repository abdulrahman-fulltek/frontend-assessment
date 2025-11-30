"use client";
import { memo } from "react";
import { useAtom } from "jotai";
import { User, MessageSquare } from "lucide-react";

import { cn } from "../../../lib/utils";
import { selectedMessageIdAtom, type Message } from "../atoms/messageAtoms";

interface Props {
  messages: Message[];
  className?: string;
}

export const MessageList = memo(function MessageList({ messages, className }: Props) {
  const [selectedMessageId] = useAtom(selectedMessageIdAtom);
  
  console.log('MessageList - selectedMessageId:', selectedMessageId);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "rounded-lg border p-4 text-sm leading-relaxed transition-all",
            selectedMessageId === message.id
              ? "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-500 ring-opacity-20"
              : "border-slate-200 bg-white"
          )}
        >
          <div className="mb-3 flex flex-row-reverse items-start justify-between">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                message.type === 'user' ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
              )}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-700">{message.author}</div>
                <div className="text-xs text-slate-500">{message.authorEmail}</div>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-left">
              <div>{formatDate(message.timestamp)}</div>
              <div>{formatTime(message.timestamp)}</div>
            </div>
          </div>
          
          <div className="text-slate-700 text-right leading-relaxed">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
});
