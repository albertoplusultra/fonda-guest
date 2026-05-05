/**
 * IconRow — Fila con iconBox a la izquierda y label/texto a la derecha
 * Patrón estándar del design system "Noche en Sol"
 *
 * USO:
 *   <IconRow icon={<Wind size={18} strokeWidth={1.4} />} label="Climatización" />
 */
import { ps } from "@/lib/pageStyles";

interface IconRowProps {
  icon: React.ReactNode;
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function IconRow({ icon, label, children, className, style }: IconRowProps) {
  return (
    <div style={{ ...ps.iconRow, ...style }} className={className}>
      <div
        className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0"
        style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--gold)" }}
      >
        {icon}
      </div>
      {label && <span style={{ ...ps.sectionLabel, marginBottom: 0 }}>{label}</span>}
      {children}
    </div>
  );
}
