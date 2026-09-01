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
    <div className="card-dark border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="font-semibold text-white">{section.label}</span>
          {section.desc && <span className="text-xs text-white/40">{section.desc}</span>}
        </div>
        <span className="text-xs text-white/30">{items.length} keys</span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
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

