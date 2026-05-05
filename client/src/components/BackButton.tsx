/**
 * BackButton — Botón "Volver" con recuadro elegante, estilo consistente con el selector de idioma.
 * Design: border gold-on-hover, dark background, DM Sans uppercase
 */
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs tracking-widest uppercase transition-all duration-200"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "var(--muted-foreground)",
        letterSpacing: "0.1em",
        border: "1px solid var(--border)",
        borderRadius: "0.35rem",
        padding: "0.35rem 0.75rem",
        background: "var(--card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
      }}
    >
      <ArrowLeft size={13} />
      {t.detail.back}
    </button>
  );
}
