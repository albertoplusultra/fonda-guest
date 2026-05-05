/*
 * Home — "Noche en Sol" — Dark Luxury Editorial
 * Design: Deep black (#0A0A0A), gold (#C9A96E), cream (#F5EDD6)
 * Typography: Cormorant Garamond (display) + DM Sans (labels)
 * Layout: Mobile-first, max-width 480px, 3-column categorised service grid
 *
 * Grid structure (3 cols):
 *   ── Tu estancia ──    WiFi · Contacto · Horarios
 *   ── Tu habitación ──  Minibar · Sostenibilidad · Servicio
 *   ── Gastronomía ──    Desayuno · Restaurante · Bar
 *   ── El hotel ──       Historia · Tu postal
 *   ── Madrid ──         Experiencias · Top 10
 */
import { useCallback, useState } from "react";
import {
  BookOpen, Clock, Phone, UtensilsCrossed,
  Sparkles, Wifi, Coffee, Wine, GlassWater,
  Bell, List, Mail, Leaf, Train, Shield,
  Moon, Sun,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSelector from "@/components/LanguageSelector";
import { useLocation } from "wouter";

/** Toggle de tema con el mismo ancho/estilo que el LanguageSelector trigger */
function ThemeToggleWide() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-sm text-xs font-medium tracking-widest uppercase transition-all duration-200"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.12em",
        color: "oklch(0.65 0.02 85)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      {isDark
        ? <Sun  size={14} strokeWidth={1.5} style={{ color: "oklch(0.65 0.02 85)", flexShrink: 0 }} />
        : <Moon size={14} strokeWidth={1.5} style={{ color: "oklch(0.65 0.02 85)", flexShrink: 0 }} />
      }

    </button>
  );
}

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";
const LOGO_AZUL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/LAFONDADELOSPRINCIPES-LOGOPRINCIPAL-AZUL_aa984dcf.webp";

// ── Service definitions ───────────────────────────────────────────────────────

const ICON_SIZE = 24;
const ICON_STROKE = 1.25;

const SERVICE_GROUPS = [
  {
    categoryKey: "habitacion" as const,
    services: [
      { key: "wifi",     icon: <Wifi  size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "contacto", icon: <Phone size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "horarios", icon: <Clock size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
    ],
  },
  {
    categoryKey: "tuhabitacion" as const,
    services: [
      { key: "minibar",   icon: <Wine   size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "servicios", icon: <Shield size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "servicio",  icon: <Bell   size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
    ],
  },
  {
    categoryKey: "gastronomia" as const,
    services: [
      { key: "desayuno",    icon: <Coffee          size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "restaurante", icon: <UtensilsCrossed size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "bar",         icon: <GlassWater      size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
    ],
  },
  {
    categoryKey: "hotel" as const,
    services: [
      { key: "historia",       icon: <BookOpen size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "postal",         icon: <Mail     size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "sostenibilidad", icon: <Leaf     size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
    ],
  },
  {
    categoryKey: "madrid" as const,
    services: [
      { key: "experiencias", icon: <Sparkles size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "top10",        icon: <List     size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "transporte",   icon: <Train    size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
    ],
  },
];

const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services);
// ── Helpers───────────────────────────────────────────────────────

const HAS_ANIMATED_KEY = "fonda_tiles_animated";

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

function getPath(key: string): string {
  const map: Record<string, string> = {
    historia:    "/historia",
    contacto:    "/contacto",
    desayuno:    "/desayuno",
    wifi:        "/wifi",
    restaurante: "/restaurante",
    minibar:     "/minibar",
    bar:         "/bar",
    horarios:    "/horarios",
    viajeros:    "/viajeros",
    campanadas:  "/campanadas",
    top10:          "/top10",
    postal:         "/postal",
    sostenibilidad: "/sostenibilidad",
    servicios:      "/servicios",
    servicio:       "/servicio",
    transporte:     "/transporte",
  };
  return map[key] ?? `/experiencias/${key}`;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const CATEGORY_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 500,
  fontSize: "0.68rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--gold)",
  opacity: 0.85,
};

const CATEGORY_LINE_STYLE: React.CSSProperties = {
  flex: 1,
  height: 1,
  background: "linear-gradient(90deg, var(--gold-dim), transparent)",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [, setLocation] = useLocation();

  const [skipAnimation] = useState<boolean>(() => {
    if (typeof sessionStorage === "undefined") return false;
    const seen = sessionStorage.getItem(HAS_ANIMATED_KEY) === "1";
    if (!seen) sessionStorage.setItem(HAS_ANIMATED_KEY, "1");
    return seen;
  });

  const navigate = useCallback((path: string) => {
    scrollTop();
    setLocation(path);
  }, [setLocation]);

  // ── Home ──────────────────────────────────────────────────────────────────

  const animIndex: Record<string, number> = {};
  ALL_SERVICES.forEach((s, i) => { animIndex[s.key] = i; });

  return (
    <div
      className="flex flex-col"
      style={{
        background: "var(--background)",
        maxWidth: 480,
        margin: "0 auto",
        minHeight: "100dvh",
        position: "relative",
      }}
    >
      {/* ── Header ── */}
      <header className="relative flex flex-col items-center pt-6 pb-0 px-5">
        {/* Idioma — derecha */}
        <div className="absolute top-5 right-5" style={{ zIndex: 20 }}>
          <LanguageSelector />
        </div>
        {/* Tema — izquierda */}
        <div className="absolute top-5 left-5" style={{ zIndex: 20 }}>
          <ThemeToggleWide />
        </div>

        <div className="logo-animate w-full flex justify-center px-10 mb-2">
          <img
            src={theme === "dark" ? LOGO_BLANCO : LOGO_AZUL}
            alt="La Fonda de los Príncipes"
            className="w-full"
            style={{ maxWidth: 141, opacity: 0.95 }}
          />
        </div>

        <div
          className="gold-line-animated"
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
            width: 0,
            maxWidth: "60%",
            alignSelf: "center",
          }}
        />

        <p
          className="logo-animate mt-2 mb-0 text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(0.78rem, 3vw, 0.9rem)",
            color: "var(--muted-foreground)",
            letterSpacing: "0.04em",
            animationDelay: "0.3s",
          }}
        >
          {t.tagline}
        </p>
      </header>

      {/* ── Service Grid with category separators ── */}
      <main className="flex-1 px-3 pt-5 pb-4" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {SERVICE_GROUPS.map((group) => {
          const categoryLabel = t.categories[group.categoryKey];
          return (
            <section key={group.categoryKey}>
              {/* Category separator */}
              <div className="flex items-center gap-2 mb-2.5 px-0.5">
                <span style={CATEGORY_LABEL_STYLE}>{categoryLabel}</span>
                <div style={CATEGORY_LINE_STYLE} />
              </div>

              {/* Tiles grid — 3 columns */}
              <div className="grid grid-cols-3 gap-2">
                {group.services.map((svc) => {
                  const label = t.services[svc.key as keyof typeof t.services];
                  const i = animIndex[svc.key] ?? 0;
                  return (
                    <button
                      key={svc.key}
                      onClick={() => navigate(getPath(svc.key))}
                      className={`service-tile ${skipAnimation ? "" : "tile-animate"} flex flex-col items-center justify-center gap-2.5 rounded-sm`}
                      style={{
                        animationDelay: skipAnimation ? undefined : `${0.5 + i * 0.07}s`,
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--gold)",
                        padding: "0.75rem 0.5rem",
                        minHeight: 72,
                      }}
                      aria-label={label}
                    >
                      <span style={{ color: "var(--gold)", opacity: 0.9 }}>
                        {svc.icon}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: "clamp(0.68rem, 2.8vw, 0.78rem)",
                          color: "var(--foreground)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          lineHeight: 1.15,
                          textAlign: "center",
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* ── Footer ── */}
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
