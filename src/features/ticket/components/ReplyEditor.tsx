"use client";

import { memo, useCallback } from "react";
import { Plate, PlateContent, usePlateEditor } from "platejs/react";
import { AlignCenter, AlignRight, AlignLeft } from "lucide-react";

import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
  isFullscreen?: boolean;
  onFastReply?: (templateText: string) => void;
}

export const ReplyEditor = memo(function ReplyEditor({ className, isFullscreen, onFastReply }: Props) {
  const editor = usePlateEditor();

  // Use native commands for visual formatting only (bold/italic/underline/align).
  // Fast replies and text insertion use the Plate editor API.
  const handleFormat = useCallback((command: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    document.execCommand(command, false);

    const editorElement = document.querySelector("[data-slate-editor]") as HTMLDivElement;
    editorElement?.focus();
  }, []);

  const handleFastReply = useCallback((templateText: string) => {
    if (!editor) return;

    try {
      // Focus editor first
      const editorElement = document.querySelector("[data-slate-editor]") as HTMLDivElement;
      if (editorElement) {
        editorElement.focus();
      }

      // Use Plate editor's insertText method
      // This properly syncs with Slate editor state
      (editor as any).insertText(templateText);
    } catch (error) {
      console.error('Failed to insert fast reply text:', error);
    }
  }, [editor]);

  return (
    <div className={cn("rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm", className, isFullscreen ? "h-4/5": "")}>
      {/* Quick formatting bar */}
      <div className="mb-2 flex flex-row-reverse gap-1 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={handleFormat("bold")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md h-8 w-8 p-0"
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={handleFormat("italic")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-sm italic text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md h-8 w-8 p-0"
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <button
          type="button"
          onClick={handleFormat("underline")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-sm underline text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md h-8 w-8 p-0"
          title="Underline (Ctrl+U)"
        >
          U
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={handleFormat("justifyRight")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md h-8 w-8 p-0"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleFormat("justifyCenter")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md h-8 w-8 p-0"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleFormat("justifyLeft")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md h-8 w-8 p-0"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={handleFormat("removeFormat")}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-xs text-slate-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-md h-8 w-8 p-0"
          title="Clear Formatting"
        >
          ✕
        </button>
      </div>

      {/* Fast replies section */}
      <div className="mb-3 flex flex-col gap-2 text-xs text-slate-600">
        <div className="flex flex-row-reverse items-center justify-between">
          <span className="font-medium">ردود سريعة</span>
          <button
            type="button"
            onClick={() => handleFastReply("[سيتم تحميل القالب هنا...]")}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs hover:border-emerald-200 hover:bg-emerald-50"
          >
            📄 استدعاء من قالب
          </button>
        </div>
        <div className="flex flex-row-reverse gap-2">
          <button
            type="button"
            onClick={() => handleFastReply("مرحباً بك، سيتم استلام طلبكم ومتابعته")}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-emerald-200 hover:bg-emerald-50"
          >
            مرحباً بك، سيتم استلام طلبكم ومتابعته
          </button>
          <button
            type="button"
            onClick={() => handleFastReply("تم استلام شكواكم وجاري معالجتها")}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-emerald-200 hover:bg-emerald-50"
          >
            تم استلام شكواكم وجاري معالجتها
          </button>
        </div>
      </div>

      <Plate editor={editor}>
        <PlateContent 
          className={cn(
            "w-full text-right leading-relaxed text-slate-700 outline-none p-3 overflow-auto",
            isFullscreen ? "h-3/5" : "h-[60px]"
          )}
          placeholder="اكتب ردك هنا..."
        />
      </Plate>
    </div>
  );
});
