/*
 * ServiceDetail — "Noche en Sol" design
 * Página de detalle para cada servicio del hotel
 */
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface ServiceDetailProps {
  serviceKey: string;
  icon?: React.ReactNode;
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
    <PageLayout onBack={onBack}>
      <PageTitle>{title}</PageTitle>

      <div style={ps.goldLine} />

      <div
        style={{
          ...ps.body,
          fontWeight: 300,
          color: "var(--muted-foreground)",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          marginBottom: "2rem",
        }}
      >
        {body}
      </div>

      {civitatis && (
        <a
          href={civitatis}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full mt-8 rounded-sm transition-all duration-200"
          style={{ ...ps.actionButton, textDecoration: "none" }}
        >
          <ExternalLink size={15} strokeWidth={2} />
          Civitatis
        </a>
      )}
    </PageLayout>
  );
}
