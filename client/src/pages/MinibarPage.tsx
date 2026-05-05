/**
 * MinibarPage — La Fonda de los Príncipes
 * Dos secciones: Bebidas y Snacks
 */
import { useLanguage } from "@/contexts/LanguageContext";
import type { LangCode } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import SectionLabel from "@/components/SectionLabel";
import { ps } from "@/lib/pageStyles";

const COPY: Record<LangCode, {
  title: string;
  note: string;
  drinks: string;
  snacks: string;
}> = {
  es: { title: "Minibar", note: "Los consumos se cargarán a su habitación.", drinks: "Bebidas", snacks: "Snacks" },
  en: { title: "Minibar", note: "Charges will be added to your room bill.", drinks: "Drinks", snacks: "Snacks" },
  fr: { title: "Minibar", note: "Les consommations seront facturées à votre chambre.", drinks: "Boissons", snacks: "Snacks" },
  de: { title: "Minibar", note: "Die Kosten werden Ihrem Zimmer in Rechnung gestellt.", drinks: "Getränke", snacks: "Snacks" },
  it: { title: "Minibar", note: "I consumi saranno addebitati alla sua camera.", drinks: "Bevande", snacks: "Snack" },
  pt: { title: "Minibar", note: "Os consumos serão cobrados ao seu quarto.", drinks: "Bebidas", snacks: "Snacks" },
  zh: { title: "迷你吧", note: "消费将计入您的房间账单。", drinks: "饮品", snacks: "零食" },
  ja: { title: "ミニバー", note: "ご利用料金はお部屋のご請求に加算されます。", drinks: "ドリンク", snacks: "スナック" },
  ar: { title: "ميني بار", note: "سيتم إضافة الاستهلاك إلى فاتورة غرفتك.", drinks: "مشروبات", snacks: "وجبات خفيفة" },
  ru: { title: "Мини-бар", note: "Стоимость будет добавлена к счёту вашего номера.", drinks: "Напитки", snacks: "Снеки" },
};

const DRINKS_BY_LANG: Record<LangCode, { name: string; price: number }[]> = {
  es: [
    { name: "Refrescos",                      price: 5 },
    { name: "Agua mineral con o sin gas",     price: 3 },
    { name: "Cerveza con o sin alcohol",      price: 5 },
    { name: "Ron, vodka, ginebra o whisky",   price: 9 },
    { name: "Tío Pepe",                       price: 6 },
    { name: "Cava Benjamín",                  price: 9 },
  ],
  en: [
    { name: "Soft drinks",                    price: 5 },
    { name: "Still or sparkling water",       price: 3 },
    { name: "Beer (with or without alcohol)", price: 5 },
    { name: "Rum, vodka, gin or whisky",      price: 9 },
    { name: "Tío Pepe (sherry)",              price: 6 },
    { name: "Cava Benjamín (sparkling wine)", price: 9 },
  ],
  fr: [
    { name: "Sodas",                          price: 5 },
    { name: "Eau minérale plate ou gazeuse",  price: 3 },
    { name: "Bière (avec ou sans alcool)",    price: 5 },
    { name: "Rhum, vodka, gin ou whisky",     price: 9 },
    { name: "Tío Pepe (xerès)",              price: 6 },
    { name: "Cava Benjamín (pétillant)",      price: 9 },
  ],
  de: [
    { name: "Erfrischungsgetränke",           price: 5 },
    { name: "Mineralwasser (still oder sprudelnd)", price: 3 },
    { name: "Bier (mit oder ohne Alkohol)",   price: 5 },
    { name: "Rum, Wodka, Gin oder Whisky",    price: 9 },
    { name: "Tío Pepe (Sherry)",              price: 6 },
    { name: "Cava Benjamín (Sekt)",           price: 9 },
  ],
  it: [
    { name: "Bibite",                         price: 5 },
    { name: "Acqua minerale liscia o frizzante", price: 3 },
    { name: "Birra (con o senza alcol)",      price: 5 },
    { name: "Rum, vodka, gin o whisky",       price: 9 },
    { name: "Tío Pepe (sherry)",              price: 6 },
    { name: "Cava Benjamín (spumante)",       price: 9 },
  ],
  pt: [
    { name: "Refrigerantes",                  price: 5 },
    { name: "Agua mineral com ou sem gás",    price: 3 },
    { name: "Cerveja (com ou sem álcool)",    price: 5 },
    { name: "Rum, vodka, gin ou whisky",      price: 9 },
    { name: "Tío Pepe (jerez)",               price: 6 },
    { name: "Cava Benjamín (espumante)",      price: 9 },
  ],
  zh: [
    { name: "软饮",                          price: 5 },
    { name: "矿泉水（有气或无气）",              price: 3 },
    { name: "啤酒（含酒精或无酒精）",          price: 5 },
    { name: "朗姆、伏特加、杜松子酒或威士忌",       price: 9 },
    { name: "Tío Pepe（雪利酒）",              price: 6 },
    { name: "Cava Benjamín（起泡酒）",          price: 9 },
  ],
  ja: [
    { name: "ソフトドリンク",                   price: 5 },
    { name: "ミネラルウォーター（炭酸あり・なし）",   price: 3 },
    { name: "ビール（アルコールあり・なし）",       price: 5 },
    { name: "ラム、ウォッカ、ジンまたはウイスキー",  price: 9 },
    { name: "Tío Pepe（シェリー）",              price: 6 },
    { name: "Cava Benjamín（スパークリング）",   price: 9 },
  ],
  ar: [
    { name: "مشروبات غازية",                price: 5 },
    { name: "مياه معدنية (فوارة أو عادية)",    price: 3 },
    { name: "بيرة (كحولية أو خالية من الكحول)",  price: 5 },
    { name: "روم أو فودكا أو جين أو ويسكي",   price: 9 },
    { name: "Tío Pepe (خمر شيري)",          price: 6 },
    { name: "Cava Benjamín (نبيذ فوار)",       price: 9 },
  ],
  ru: [
    { name: "Безалкогольные напитки",          price: 5 },
    { name: "Минеральная вода (газированная или нет)", price: 3 },
    { name: "Пиво (алкогольное или безалкогольное)", price: 5 },
    { name: "Ром, водка, джин или виски",  price: 9 },
    { name: "Tío Pepe (херес)",              price: 6 },
    { name: "Cava Benjamín (игристое)",       price: 9 },
  ],
};

const SNACKS_BY_LANG: Record<LangCode, { name: string; price: number }[]> = {
  es: [
    { name: "Patatas fritas",  price: 4 },
    { name: "Frutos secos",   price: 7 },
    { name: "Chocolate",      price: 6 },
  ],
  en: [
    { name: "Crisps",         price: 4 },
    { name: "Mixed nuts",     price: 7 },
    { name: "Chocolate",      price: 6 },
  ],
  fr: [
    { name: "Chips",          price: 4 },
    { name: "Fruits secs",    price: 7 },
    { name: "Chocolat",       price: 6 },
  ],
  de: [
    { name: "Chips",          price: 4 },
    { name: "Nüsse",          price: 7 },
    { name: "Schokolade",     price: 6 },
  ],
  it: [
    { name: "Patatine",       price: 4 },
    { name: "Frutta secca",   price: 7 },
    { name: "Cioccolato",     price: 6 },
  ],
  pt: [
    { name: "Batatas fritas", price: 4 },
    { name: "Frutos secos",   price: 7 },
    { name: "Chocolate",      price: 6 },
  ],
  zh: [
    { name: "薯片",             price: 4 },
    { name: "坚果",             price: 7 },
    { name: "巧克力",           price: 6 },
  ],
  ja: [
    { name: "ポテトチップス",       price: 4 },
    { name: "ミックスナッツ",       price: 7 },
    { name: "チョコレート",         price: 6 },
  ],
  ar: [
    { name: "رقائق البطاطس",      price: 4 },
    { name: "مكسرات",          price: 7 },
    { name: "شوكولاتة",         price: 6 },
  ],
  ru: [
    { name: "Чипсы",           price: 4 },
    { name: "Орехи",           price: 7 },
    { name: "Шоколад",        price: 6 },
  ],
};

interface Props { onBack: () => void; }

function ItemList({ items }: { items: { name: string; price: number }[] }) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 6,
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.name}
          className="flex items-center justify-between px-5 py-3"
          style={{
            borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <span style={{ ...ps.body, fontWeight: 300, fontSize: "0.9rem" }}>
            {item.name}
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "1.05rem",
              color: "var(--gold)",
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
  );
}

export default function MinibarPage({ onBack }: Props) {
  const { lang } = useLanguage();
  const copy = COPY[lang] ?? COPY.es;
  const drinks = DRINKS_BY_LANG[lang] ?? DRINKS_BY_LANG.es;
  const snacks = SNACKS_BY_LANG[lang] ?? SNACKS_BY_LANG.es;

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{copy.title}</PageTitle>

      <p style={{ ...ps.muted, textAlign: "center", marginBottom: "1.5rem" }}>
        {copy.note}
      </p>

      {/* Bebidas */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SectionLabel>{copy.drinks}</SectionLabel>
        <ItemList items={drinks} />
      </div>

      {/* Snacks */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SectionLabel>{copy.snacks}</SectionLabel>
        <ItemList items={snacks} />
      </div>
    </PageLayout>
  );
}
