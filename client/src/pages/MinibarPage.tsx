/**
 * MinibarPage — La Fonda de los Príncipes
 * Design: "Noche en Sol" — black background, gold accents, Cormorant Garamond serif
 * Shows minibar products grouped by category with prices in €
 */

import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LangCode } from "@/contexts/LanguageContext";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

// ── Local translations ────────────────────────────────────────────────────────
const COPY: Record<LangCode, {
  title: string;
  note: string;
  softDrinks: string;
  alcoholic: string;
  snacks: string;
}> = {
  es: { title: "Minibar", note: "Los consumos se cargarán a su habitación.", softDrinks: "Bebidas sin alcohol", alcoholic: "Bebidas con alcohol", snacks: "Snacks" },
  en: { title: "Minibar", note: "Charges will be added to your room bill.", softDrinks: "Non-alcoholic drinks", alcoholic: "Alcoholic drinks", snacks: "Snacks" },
  fr: { title: "Minibar", note: "Les consommations seront facturées à votre chambre.", softDrinks: "Boissons sans alcool", alcoholic: "Boissons alcoolisées", snacks: "Snacks" },
  de: { title: "Minibar", note: "Die Kosten werden Ihrem Zimmer in Rechnung gestellt.", softDrinks: "Alkoholfreie Getränke", alcoholic: "Alkoholische Getränke", snacks: "Snacks" },
  it: { title: "Minibar", note: "I consumi saranno addebitati alla sua camera.", softDrinks: "Bevande analcoliche", alcoholic: "Bevande alcoliche", snacks: "Snack" },
  pt: { title: "Minibar", note: "Os consumos serão cobrados ao seu quarto.", softDrinks: "Bebidas sem álcool", alcoholic: "Bebidas alcoólicas", snacks: "Snacks" },
  zh: { title: "迷你吧", note: "消费将计入您的房间账单。", softDrinks: "无酒精饮料", alcoholic: "含酒精饮料", snacks: "零食" },
  ja: { title: "ミニバー", note: "ご利用料金はお部屋のご請求に加算されます。", softDrinks: "ノンアルコール飲料", alcoholic: "アルコール飲料", snacks: "スナック" },
  ar: { title: "ميني بار", note: "سيتم إضافة الاستهلاك إلى فاتورة غرفتك.", softDrinks: "مشروبات غير كحولية", alcoholic: "مشروبات كحولية", snacks: "وجبات خفيفة" },
  ru: { title: "Мини-бар", note: "Стоимость будет добавлена к счёту вашего номера.", softDrinks: "Безалкогольные напитки", alcoholic: "Алкогольные напитки", snacks: "Снеки" },
};

// ── Product data ──────────────────────────────────────────────────────────────
const SOFT_DRINKS = [
  { name: "Coca Cola",              price: 5 },
  { name: "Coca Cola Zero",         price: 5 },
  { name: "Schweppes Naranja",      price: 5 },
  { name: "Schweppes Limón",        price: 5 },
  { name: "Schweppes Tónica",       price: 5 },
  { name: "Cerveza Mahou Tostada 0,0", price: 5 },
  { name: "Agua",                   price: 3 },
  { name: "Agua con gas",           price: 3 },
];

const ALCOHOLIC = [
  { name: "Cerveza Mahou",          price: 5 },
  { name: "Whisky",                 price: 9 },
  { name: "Ron",                    price: 9 },
  { name: "Vodka",                  price: 9 },
  { name: "Ginebra",                price: 9 },
  { name: "Tío Pepe",               price: 6 },
  { name: "Cava Benjamín",          price: 9 },
];

const SNACKS = [
  { name: "Patatas fritas",         price: 4 },
  { name: "Frutos secos",           price: 7 },
  { name: "Chocolate",              price: 6 },
];

// ── Styles ────────────────────────────────────────────────────────────────────
const gold = "var(--gold, #C9A96E)";
const bg = "#0A0A0A";
const cardBg = "oklch(0.10 0.005 72)";
const textCream = "oklch(0.88 0.015 85)";
const textMuted = "oklch(0.55 0.015 85)";

interface Props {
  onBack: () => void;
}

export default function MinibarPage({ onBack }: Props) {
  const { lang, t } = useLanguage();
  const copy = COPY[lang] ?? COPY.es;
  const isRtl = lang === "ar";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: bg, color: textCream, direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* ── Header ── */}
      <header
        className="relative flex flex-col items-center pt-5 pb-3 px-4"
        style={{ borderBottom: `1px solid oklch(0.20 0.01 72)` }}
      >
        <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"}`}>
          <LanguageSelector />
        </div>
        <div className={`absolute top-4 ${isRtl ? "right-4" : "left-4"}`}>
          <BackButton onClick={onBack} />
        </div>
        <img
          src={LOGO_BLANCO}
          alt="La Fonda de los Príncipes"
          style={{ height: 32, opacity: 0.85 }}
        />
      </header>

      {/* ── Content ── */}
      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full">
        {/* Title */}
        <h1
          className="text-center mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.6rem, 6vw, 2rem)",
            color: textCream,
            letterSpacing: "0.04em",
          }}
        >
          {copy.title}
        </h1>

        {/* Gold divider */}
        <div
          className="mx-auto mb-4"
          style={{
            height: 1,
            width: "40%",
            background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
          }}
        />

        {/* Note */}
        <p
          className="text-center mb-5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: textMuted,
            letterSpacing: "0.03em",
          }}
        >
          {copy.note}
        </p>

        {/* Categories */}
        {[
          { label: copy.softDrinks, items: SOFT_DRINKS },
          { label: copy.alcoholic,  items: ALCOHOLIC },
          { label: copy.snacks,     items: SNACKS },
        ].map((cat) => (
          <div key={cat.label} className="mb-6">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-3">
              <div style={{ flex: 1, height: 1, background: `oklch(0.22 0.01 72)` }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: gold,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </span>
              <div style={{ flex: 1, height: 1, background: `oklch(0.22 0.01 72)` }} />
            </div>

            {/* Items */}
            <div
              style={{
                background: cardBg,
                borderRadius: 6,
                border: `1px solid oklch(0.18 0.01 72)`,
                overflow: "hidden",
              }}
            >
              {cat.items.map((item, idx) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    borderBottom: idx < cat.items.length - 1
                      ? `1px solid oklch(0.16 0.008 72)`
                      : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      color: textCream,
                      fontWeight: 300,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: gold,
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    {item.price} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
