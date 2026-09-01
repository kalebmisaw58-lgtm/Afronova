import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  centered = false,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "space-y-3",
      centered && "text-center items-center flex flex-col",
      className
    )}>
      {eyebrow && <p className="section-subheading">{eyebrow}</p>}

      <h2 className={cn("section-heading", light ? "text-[#101312]" : "text-white")}>
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient">{titleHighlight}</span>
        )}
      </h2>

      {/* Orange divider when centred */}
      {centered && <div className="brand-divider" />}

      {description && (
        <p className={cn(
          "text-base md:text-lg leading-relaxed max-w-2xl",
          light ? "text-[#101312]/65" : "text-white/55",
          centered && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

