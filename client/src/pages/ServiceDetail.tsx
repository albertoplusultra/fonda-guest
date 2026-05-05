/*
 * ServiceDetail — "Noche en Sol" design
 * Página de detalle para cada servicio del hotel
 */
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface ServiceDetailProps {
  serviceKey: string;
  icon: React.ReactNode;
  onBack: () => void;
}

export default function ServiceDetail({ serviceKey, icon, onBack }: ServiceDetailProps) {
  const { t } = useLanguage();

  const titleKey     = `${serviceKey}_title`     as keyof typeof t.detail;
  const bodyKey      = `${serviceKey}_body`      as keyof typeof t.detail;
  const civitatiKey  = `${serviceKey}_civitatis` as keyof typeof t.detail;

  const title      = t.detail[titleKey]     ?? "";
  const body       = t.detail[bodyKey]      ?? "";
  const civitatis  = t.detail[civitatiKey]  ?? "";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.08 0 0)", maxWidth: 480, margin: "0 auto" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 pt-8 pb-4"
        style={{ borderBottom: "1px solid oklch(0.16 0.01 72)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs tracking-widest uppercase transition-all duration-200"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "oklch(0.72 0.025 85)",
            letterSpacing: "0.1em",
            border: "1px solid oklch(0.30 0.015 72)",
            borderRadius: "0.35rem",
            padding: "0.35rem 0.75rem",
            background: "oklch(0.11 0 0)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.72 0.025 85)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.30 0.015 72)";
          }}
        >
          <ArrowLeft size={13} />
          {t.detail.back}
        </button>

        <img
          src={LOGO_BLANCO}
          alt="La Fonda de los Príncipes"
          className="h-8 opacity-80"
          style={{ opacity: 0.85 }}
        />

        <LanguageSelector />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pt-10 pb-12">
        {/* Title */}
        <h1
          className="mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
            color: "oklch(0.96 0.025 85)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>

        {/* Gold divider */}
        <div
          className="mb-8"
          style={{
            height: 1,
            background: "linear-gradient(90deg, var(--gold), transparent)",
            width: "60%",
          }}
        />

        {/* Body */}
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            color: "oklch(0.70 0.015 85)",
            lineHeight: 1.8,
            whiteSpace: "pre-line",
          }}
        >
          {body}
        </div>

        {/* Civitatis button — only for experiencias */}
        {civitatis && (
          <a
            href={civitatis}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-8 rounded-sm transition-all duration-200"
            style={{
              background: "var(--gold)",
              color: "oklch(0.08 0 0)",
              padding: "1rem 1.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "flex",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.82 0.08 72)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)"; }}
          >
            <ExternalLink size={15} strokeWidth={2} />
            Civitatis
          </a>
        )}
      </main>
    </div>
  );
}
