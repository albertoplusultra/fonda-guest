/**
 * SectionLabel — Etiqueta de sección en dorado, uppercase, tracking wide
 */
import { ps } from "@/lib/pageStyles";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionLabel({ children, className, style }: SectionLabelProps) {
  return (
    <p style={{ ...ps.sectionLabel, ...style }} className={className}>
      {children}
    </p>
  );
}
