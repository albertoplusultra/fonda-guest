/*
 * PageHeader — Header compartido para todas las páginas secundarias
 * Incluye: BackButton | Símbolo FP (adaptativo al tema) | LanguageSelector + ThemeToggle
 */
import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";
import { useTheme } from "@/contexts/ThemeContext";

const SIMBOLO_BLANCO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/LAFONDADELOSPRINCIPES-SIMBOLO-BLANCO_0b560236.webp";
const SIMBOLO_AZUL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/LAFONDADELOSPRINCIPES-SIMBOLO-AZUL_88e794c0.webp";

interface PageHeaderProps {
  onBack: () => void;
}

export default function PageHeader({ onBack }: PageHeaderProps) {
  const { theme } = useTheme();
  const simbolo = theme === "dark" ? SIMBOLO_BLANCO : SIMBOLO_AZUL;

  return (
    <header
      className="flex items-center justify-between px-5 pt-5 pb-4"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <BackButton onClick={onBack} />
      <img
        src={simbolo}
        alt="La Fonda de los Príncipes"
        style={{ height: 36, width: "auto", opacity: 0.9 }}
      />
      <div style={{ zIndex: 20 }}>
        <LanguageSelector />
      </div>
    </header>
  );
}
