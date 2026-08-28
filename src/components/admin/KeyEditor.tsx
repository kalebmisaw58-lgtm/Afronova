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
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <code className="text-xs text-white/40 font-mono bg-white/5 px-2 py-1 rounded">
          {item.key}
        </code>
        {isDirty && (
          <span className="w-2 h-2 rounded-full bg-[#F0B84F] animate-pulse" title="Unsaved changes" />
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
        <p className="text-xs text-white/30 mt-1 italic line-clamp-2">
          EN: {englishRef}
        </p>
      )}
    </div>
  );
}
