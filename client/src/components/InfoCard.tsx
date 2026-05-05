/**
 * InfoCard — Tarjeta de información con fondo var(--card) y borde var(--border)
 * Componente genérico reutilizable en todas las páginas
 */
import { ps } from "@/lib/pageStyles";

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function InfoCard({ children, className, style }: InfoCardProps) {
  return (
    <div style={{ ...ps.card, ...style }} className={className}>
      {children}
    </div>
  );
}
