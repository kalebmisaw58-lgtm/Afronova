"use client";

import { ContentItem } from "@/lib/content-sections";
import { ChevronDown, ChevronRight } from "lucide-react";
import KeyEditor from "./KeyEditor";

interface SectionCardProps {
  section: { key: string; label: string; desc: string };
  items: ContentItem[];
  isExpanded: boolean;
  onToggle: () => void;
  updateValue: (id: string, value: string) => void;
  englishDefaults: Record<string, string>;
  dirtyIds: Set<string>;
}

export default function SectionCard({
  section, items, isExpanded, onToggle,
  updateValue, englishDefaults, dirtyIds,
}: SectionCardProps) {
  return (
    <div className="card-dark border border-[#D6A34A]/25 rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#FAF8F4] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? <ChevronDown className="w-4 h-4 text-[#9A6A31]" /> : <ChevronRight className="w-4 h-4 text-[#9A6A31]" />}
          <span className="font-bold text-[#101312] text-base">{section.label}</span>
          {section.desc && <span className="text-xs text-[#101312]/60 font-medium">{section.desc}</span>}
        </div>
        <span className="text-xs font-bold text-[#9A6A31] bg-[#D6A34A]/12 px-2.5 py-1 rounded-full border border-[#D6A34A]/25">{items.length} keys</span>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-[#D6A34A]/15 pt-4 bg-[#FAF8F4]/50">
          {items.map((item) => (
            <KeyEditor
              key={item.id}
              item={item}
              updateValue={updateValue}
              englishRef={englishDefaults[item.key] ?? ""}
              isDirty={dirtyIds.has(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

