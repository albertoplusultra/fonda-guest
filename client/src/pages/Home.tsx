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
import { useState, useEffect, useCallback } from "react";
import {
  BookOpen, Clock, Phone, UtensilsCrossed,
  Sparkles, Wifi, Coffee, Wine, GlassWater,
  Users, Bell, List, Mail, Leaf, Train,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import ServiceDetail from "@/pages/ServiceDetail";
import HistoriaPage from "@/pages/HistoriaPage";
import ViajerosPage from "@/pages/ViajerosPage";
import CampanadasPage from "@/pages/CampanadasPage";
import ContactoPage from "@/pages/ContactoPage";
import DesayunoPage from "@/pages/DesayunoPage";
import WifiPage from "@/pages/WifiPage";
import RestaurantePage from "@/pages/RestaurantePage";
import MinibarPage from "@/pages/MinibarPage";
import BarPage from "@/pages/BarPage";
import HorariosPage from "@/pages/HorariosPage";
import Top10Page from "@/pages/Top10Page";
import PostalPage from "@/pages/PostalPage";
import SostenibilidadPage from "@/pages/SostenibilidadPage";
import ServicioHabitacionesPage from "@/pages/ServicioHabitacionesPage";
import TransportePage from "@/pages/TransportePage";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

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
      { key: "minibar",       icon: <Wine  size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "sostenibilidad", icon: <Leaf  size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "servicio",       icon: <Bell  size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
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
      { key: "historia", icon: <BookOpen size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
      { key: "postal",   icon: <Mail     size={ICON_SIZE} strokeWidth={ICON_STROKE} /> },
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

// ── Navigation state types ────────────────────────────────────────────────────

type Page = "home" | "service" | "historia" | "viajeros" | "campanadas" | "contacto" | "desayuno" | "wifi" | "restaurante" | "minibar" | "bar" | "horarios" | "top10" | "postal" | "sostenibilidad" | "servicio" | "transporte";

interface NavState {
  page: Page;
  serviceKey?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const HAS_ANIMATED_KEY = "fonda_tiles_animated";

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

function getTarget(key: string): NavState {
  const map: Record<string, Page> = {
    historia:    "historia",
    contacto:    "contacto",
    desayuno:    "desayuno",
    wifi:        "wifi",
    restaurante: "restaurante",
    minibar:     "minibar",
    bar:         "bar",
    horarios:    "horarios",
    viajeros:    "viajeros",
    campanadas:  "campanadas",
    top10:          "top10",
    postal:         "postal",
    sostenibilidad: "sostenibilidad",
    servicio:       "servicio",
    transporte:     "transporte",
  };
  return map[key] ? { page: map[key] } : { page: "service", serviceKey: key };
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
  background: "linear-gradient(90deg, oklch(0.40 0.025 72 / 0.5), transparent)",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useLanguage();

  const [nav, setNav] = useState<NavState>({ page: "home" });

  const skipAnimation =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem(HAS_ANIMATED_KEY) === "1";
  if (typeof sessionStorage !== "undefined" && !skipAnimation) {
    sessionStorage.setItem(HAS_ANIMATED_KEY, "1");
  }

  const navigate = useCallback((next: NavState) => {
    window.history.pushState(next, "");
    scrollTop();
    setNav(next);
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    window.history.replaceState({ page: "home" } as NavState, "");
    const onPopState = (e: PopStateEvent) => {
      const state: NavState = e.state ?? { page: "home" };
      scrollTop();
      setNav(state);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // ── Render correct page ────────────────────────────────────────────────────

  if (nav.page === "minibar")     return <MinibarPage onBack={goBack} />;
  if (nav.page === "bar")         return <BarPage onBack={goBack} />;
  if (nav.page === "restaurante") return <RestaurantePage onBack={goBack} />;
  if (nav.page === "desayuno")    return <DesayunoPage onBack={goBack} />;
  if (nav.page === "wifi")        return <WifiPage onBack={goBack} />;
  if (nav.page === "contacto")    return <ContactoPage onBack={goBack} />;
  if (nav.page === "viajeros")    return <ViajerosPage onBack={goBack} />;
  if (nav.page === "campanadas")  return <CampanadasPage onBack={goBack} />;
  if (nav.page === "horarios")        return <HorariosPage onBack={goBack} />;
  if (nav.page === "top10")           return <Top10Page onBack={goBack} />;
  if (nav.page === "postal")          return <PostalPage onBack={goBack} />;
  if (nav.page === "sostenibilidad")  return <SostenibilidadPage onBack={goBack} />;
  if (nav.page === "servicio")         return <ServicioHabitacionesPage onBack={goBack} onContacto={() => setNav({ page: "contacto" })} />;
  if (nav.page === "transporte")       return <TransportePage onBack={goBack} />;
  if (nav.page === "historia") {
    return (
      <HistoriaPage
        onBack={goBack}
        onViajeros={() => navigate({ page: "viajeros" })}
        onCampanadas={() => navigate({ page: "campanadas" })}
      />
    );
  }
  if (nav.page === "service" && nav.serviceKey) {
    const svc = ALL_SERVICES.find((s) => s.key === nav.serviceKey);
    return <ServiceDetail serviceKey={nav.serviceKey} icon={svc?.icon} onBack={goBack} />;
  }

  // ── Home ──────────────────────────────────────────────────────────────────

  const animIndex: Record<string, number> = {};
  ALL_SERVICES.forEach((s, i) => { animIndex[s.key] = i; });

  return (
    <div
      className="flex flex-col"
      style={{
        background: "oklch(0.08 0 0)",
        maxWidth: 480,
        margin: "0 auto",
        minHeight: "100dvh",
        position: "relative",
      }}
    >
      {/* ── Header ── */}
      <header className="relative flex flex-col items-center pt-6 pb-0 px-5">
        <div className="absolute top-5 right-5">
          <LanguageSelector />
        </div>

        <div className="logo-animate w-full flex justify-center px-10 mb-2">
          <img
            src={LOGO_BLANCO}
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
            color: "oklch(0.72 0.015 85)",
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
                      onClick={() => navigate(getTarget(svc.key))}
                      className={`service-tile ${skipAnimation ? "" : "tile-animate"} flex flex-col items-center justify-center gap-2.5 rounded-sm`}
                      style={{
                        animationDelay: skipAnimation ? undefined : `${0.5 + i * 0.07}s`,
                        background: "oklch(0.11 0 0)",
                        border: "1px solid oklch(0.20 0.012 72)",
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
                          color: "oklch(0.90 0.02 85)",
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
        style={{ borderTop: "1px solid oklch(0.14 0.01 72)", paddingTop: "0.6rem" }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.65rem",
            color: "oklch(0.35 0.01 85)",
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
