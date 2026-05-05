/**
 * PageTitle — Título de página con línea dorada decorativa
 * Usa el estilo Cormorant Garamond light del design system
 */
import { ps } from "@/lib/pageStyles";

interface PageTitleProps {
  children: React.ReactNode;
  /** Mostrar línea dorada debajo (por defecto true) */
  withLine?: boolean;
  className?: string;
}

export default function PageTitle({ children, withLine = true, className }: PageTitleProps) {
  return (
    <>
      <h1 style={ps.title} className={className}>
        {children}
      </h1>
      {withLine && <div style={ps.goldLine} />}
    </>
  );
}
