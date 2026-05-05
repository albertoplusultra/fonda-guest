/**
 * PageLayout — Layout base compartido para todas las páginas secundarias
 * Incluye: fondo adaptativo al tema, dirección RTL, PageHeader, área de contenido y footer
 *
 * USO:
 *   <PageLayout onBack={onBack}>
 *     <PageTitle>Título</PageTitle>
 *     ...contenido...
 *   </PageLayout>
 */
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { ps } from "@/lib/pageStyles";

interface PageLayoutProps {
  onBack: () => void;
  children: React.ReactNode;
  /** Padding personalizado para el main (por defecto ps.main.padding) */
  mainPadding?: string;
}

export default function PageLayout({ onBack, children, mainPadding }: PageLayoutProps) {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  return (
    <div style={{ ...ps.page, direction: isRtl ? "rtl" : "ltr", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <PageHeader onBack={onBack} />
      <main style={{ ...ps.main, padding: mainPadding ?? ps.main.padding, flex: 1 }}>
        {children}
      </main>
      <footer
        className="px-5 pb-4 text-center"
        style={{ borderTop: "1px solid var(--border)", paddingTop: "0.6rem" }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.65rem",
            color: "var(--muted-foreground)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          © 2026 La Fonda de los Príncipes · Madrid
        </p>
      </footer>
    </div>
  );
}
