"use client";

import { ContentItem } from "@/lib/content-sections";
import { Save } from "lucide-react";

interface KeyEditorProps {
  item: ContentItem;
  updateValue: (id: string, value: string) => void;
  englishRef: string;
  isDirty: boolean;
}

export default function KeyEditor({ item, updateValue, englishRef, isDirty }: KeyEditorProps) {
  // Use textarea for longer strings, input for short ones
  const isLongText =
    item.value.length > 100 ||
    item.key.includes("body") ||
    item.key.includes("desc") ||
    item.key.includes("message") ||
    item.key.includes("theme");

  return (
    <div className="space-y-1.5 p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs">
      <div className="flex items-center gap-2">
        <code className="text-xs text-[#9A6A31] font-mono font-bold bg-[#D6A34A]/12 border border-[#D6A34A]/25 px-2.5 py-0.5 rounded-md">
          {item.key}
        </code>
        {isDirty && (
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6A34A] animate-pulse" title="Unsaved changes" />
        )}
      </div>

      {isLongText ? (
        <textarea
          value={item.value}
          onChange={(e) => updateValue(item.id, e.target.value)}
          rows={3}
          className="form-input text-sm resize-y"
        />
      ) : (
        <input
          type="text"
          value={item.value}
          onChange={(e) => updateValue(item.id, e.target.value)}
          className="form-input text-sm"
        />
      )}

      {englishRef && item.value !== englishRef && (
        <p className="text-xs text-[#101312]/60 mt-1 italic font-medium line-clamp-2">
          EN Default: {englishRef}
        </p>
      )}
    </div>
  );
}

