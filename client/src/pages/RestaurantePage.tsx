/*
 * RestaurantePage — Carta del restaurante con acordeón de 7 categorías
 * Mismo patrón de diseño que BarPage
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import InfoCard from "@/components/InfoCard";
import { ps } from "@/lib/pageStyles";

type CatKey = "starters" | "salads" | "eggs" | "boards" | "mains" | "sandwiches" | "desserts";

interface Dish {
  name: string;
  desc?: string;
  price?: string;
}

const MENU: { key: CatKey; dishes: Dish[] }[] = [
  {
    key: "starters",
    dishes: [
      { name: "Gildas", desc: "Banderilla de aceitunas verdes, guindillas en vinagre y, a elegir, boquerón, pulpo o anchoa", price: "3,50 €" },
      { name: "Anchoas de Santoña", desc: "Las más anchas y de mayor calidad del mercado", price: "27 €" },
      { name: "Consomé", desc: "Caldo de ave cocinado a fuego lento con verduras y fideos", price: "8,50 €" },
      { name: "Croquetas", desc: "Croquetas de jamón, o de boletus y trufa (2,50 € unidad)", price: "14 €" },
      { name: "Patatas bravas", desc: "Patatas cortadas en gajo, fritas, con alioli y salsa picante", price: "9 €" },
      { name: "Ceviche de corvina mediterránea", desc: "Lomo de corvina laminada, leche de tigre, sal, lima, cebolla roja, pimienta, maíz tostado y cilantro", price: "19 €" },
    ],
  },
  {
    key: "salads",
    dishes: [
      { name: "Ensaladilla rusa con ventresca", desc: "Cremosa con base de patata, zanahoria, ventresca, huevo cocido, mahonesa", price: "14 €" },
      { name: "Ensalada de burrata", desc: "Burrata, tomates cherry confitados, pesto de albahaca y piñones sobre una cama de rúcula", price: "21 €" },
      { name: "Poke con salsa thai", desc: "Arroz sushi, salmón ahumado o atún, zanahoria rallada, aguacate, cebolla crujiente, maíz dulce, salsa thai, algas wakame, semillas de sésamo", price: "25 €" },
    ],
  },
  {
    key: "eggs",
    dishes: [
      { name: "Tortilla de Betanzos", desc: "Un huevo completo, tres yemas de huevo, patatas pochadas, cebolla, aceite y sal", price: "13 €" },
      { name: "Huevos estrellados", desc: "Huevos fritos, patatas fritas y jamón ibérico", price: "17 €" },
      { name: "Shakshuka", desc: "Pisto de verduras con huevos, queso feta y especias, servido con pan de pita", price: "16 €" },
    ],
  },
  {
    key: "boards",
    dishes: [
      { name: "Tabla de jamón ibérico", desc: "Jamón ibérico de Extremadura servido con pan de cristal y tomate rallado", price: "29 €" },
      { name: "Tabla de ibéricos", desc: "Jamón, lomo, chorizo y salchichón, todos ibéricos, servidos con picos artesanos", price: "24 €" },
      { name: "Tabla de quesos", desc: "Queso ahumado de cabra, curado de oveja con miel y romero, comté, idiazábal, azul ahumado, Arzúa-Ulloa y brie con picos artesanos, nueces y uvas rojas", price: "26 €" },
    ],
  },
  {
    key: "mains",
    dishes: [
      { name: "Solomillo demi-glace y trufa", desc: "Solomillo al punto con salsa demi-glace y toque de trufa, acompañado de cremoso de patata", price: "29 €" },
      { name: "Salmón de Lonja con Menestra", desc: "Salmón fresco de lonja a la plancha, servido con menestra de verduras de temporada", price: "22 €" },
    ],
  },
  {
    key: "sandwiches",
    dishes: [
      { name: "Mollete de carrillera", desc: "Pan de mollete con carrillera de ternera estofada, foie de pato y reducción de Pedro Ximénez", price: "19 €" },
      { name: "Bocata de calamar", desc: "Pan de mollete con calamares fritos y mayonesa de tinta de calamar", price: "15 €" },
      { name: "Hamburguesa La Fonda", desc: "Pan de hamburguesa pretzel con mahonesa de mostaza, carne de vaca rubia gallega, queso de cabra, canónigo, cebolla caramelizada y patatas fritas", price: "19 €" },
    ],
  },
  {
    key: "desserts",
    dishes: [
      { name: "Brownie con helado de vainilla", desc: "Brownie templado de chocolate acompañado de helado de vainilla", price: "8 €" },
      { name: "Tarta de queso con frutos rojos", desc: "Cremosa tarta de queso servida con frutos rojos y su coulis", price: "8 €" },
      { name: "Surtido de helado", desc: "Selección de helados variados (consulte sabores disponibles)", price: "8 €" },
      { name: "Fruta fresca seleccionada", desc: "Fruta fresca de temporada, seleccionada al momento", price: "8 €" },
    ],
  },
];

const CAT_LABELS: Record<string, Record<CatKey, string>> = {
  es: { starters: "Entrantes", salads: "Ensaladas", eggs: "Huevos", boards: "Quesos e ibéricos", mains: "Carne y Pescado", sandwiches: "Sándwiches y hamburguesas", desserts: "Postres" },
  en: { starters: "Starters", salads: "Salads", eggs: "Eggs", boards: "Cheese & charcuterie", mains: "Meat & Fish", sandwiches: "Sandwiches & burgers", desserts: "Desserts" },
  fr: { starters: "Entrées", salads: "Salades", eggs: "Œufs", boards: "Fromages & charcuterie", mains: "Viande et Poisson", sandwiches: "Sandwichs et burgers", desserts: "Desserts" },
  de: { starters: "Vorspeisen", salads: "Salate", eggs: "Eier", boards: "Käse & Wurstwaren", mains: "Fleisch und Fisch", sandwiches: "Sandwiches und Burger", desserts: "Desserts" },
  it: { starters: "Antipasti", salads: "Insalate", eggs: "Uova", boards: "Formaggi & salumi", mains: "Carne e Pesce", sandwiches: "Panini e hamburger", desserts: "Dolci" },
  pt: { starters: "Entradas", salads: "Saladas", eggs: "Ovos", boards: "Queijos e enchidos", mains: "Carne e Peixe", sandwiches: "Sandes e hambúrgueres", desserts: "Sobremesas" },
  zh: { starters: "前菜", salads: "沙拉", eggs: "鸡蛋", boards: "奶酪与熟食", mains: "肉类和鱼类", sandwiches: "三明治和汉堡", desserts: "甜点" },
  ja: { starters: "前菜", salads: "サラダ", eggs: "卵料理", boards: "チーズ＆シャルキュトリー", mains: "肉・魚料理", sandwiches: "サンドイッチ・バーガー", desserts: "デザート" },
  ar: { starters: "المقبلات", salads: "السلطات", eggs: "البيض", boards: "الجبن والشاركوتيري", mains: "اللحوم والأسماك", sandwiches: "السندويشات والبرغر", desserts: "الحلويات" },
  ru: { starters: "Закуски", salads: "Салаты", eggs: "Яйца", boards: "Сыры и мясные деликатесы", mains: "Мясо и рыба", sandwiches: "Сэндвичи и бургеры", desserts: "Десерты" },
};

interface ScheduleRow { days: string; time: string; }
const PAGE_COPY: Record<string, { title: string; scheduleLabel: string; scheduleRows: ScheduleRow[] }> = {
  es: { title: "Restaurante", scheduleLabel: "Horario", scheduleRows: [
    { days: "Lun – Vie",          time: "11:00 – 00:00" },
    { days: "Sáb, Dom y festivos", time: "11:30 – 00:00" },
  ]},
  en: { title: "Restaurant", scheduleLabel: "Hours", scheduleRows: [
    { days: "Mon – Fri",           time: "11:00 – midnight" },
    { days: "Sat, Sun & holidays", time: "11:30 – midnight" },
  ]},
  fr: { title: "Restaurant", scheduleLabel: "Horaires", scheduleRows: [
    { days: "Lun – Ven",               time: "11h00 – 00h00" },
    { days: "Sam, Dim & fériés",      time: "11h30 – 00h00" },
  ]},
  de: { title: "Restaurant", scheduleLabel: "Öffnungszeiten", scheduleRows: [
    { days: "Mo – Fr",              time: "11:00 – 00:00 Uhr" },
    { days: "Sa, So & Feiertage",  time: "11:30 – 00:00 Uhr" },
  ]},
  it: { title: "Ristorante", scheduleLabel: "Orario", scheduleRows: [
    { days: "Lun – Ven",          time: "11:00 – 00:00" },
    { days: "Sab, Dom e festivi", time: "11:30 – 00:00" },
  ]},
  pt: { title: "Restaurante", scheduleLabel: "Horário", scheduleRows: [
    { days: "Seg – Sex",             time: "11h00 – 00h00" },
    { days: "Sáb, Dom e feriados",  time: "11h30 – 00h00" },
  ]},
  zh: { title: "餐厅", scheduleLabel: "营业时间", scheduleRows: [
    { days: "周一至周五",   time: "11:00 – 00:00" },
    { days: "周六/周日/假日", time: "11:30 – 00:00" },
  ]},
  ja: { title: "レストラン", scheduleLabel: "営業時間", scheduleRows: [
    { days: "月曜〜金曜",   time: "11:00 – 00:00" },
    { days: "土/日/祝日",     time: "11:30 – 00:00" },
  ]},
  ar: { title: "المطعم", scheduleLabel: "ساعات العمل", scheduleRows: [
    { days: "الإثنين – الجمعة",  time: "11:00 – 00:00" },
    { days: "سبت/أحد/عطل",       time: "11:30 – 00:00" },
  ]},
  ru: { title: "Ресторан", scheduleLabel: "Часы работы", scheduleRows: [
    { days: "Пн – Пт",           time: "11:00 – 00:00" },
    { days: "Сб/Вс/праздники",  time: "11:30 – 00:00" },
  ]},
};

interface Props { onBack: () => void; }

export default function RestaurantePage({ onBack }: Props) {
  const { lang } = useLanguage();
  const catLabels = CAT_LABELS[lang] ?? CAT_LABELS.es;
  const copy = PAGE_COPY[lang] ?? PAGE_COPY.es;

  const [openCat, setOpenCat] = useState<CatKey | null>(null);
  const toggle = (key: CatKey) => setOpenCat(prev => prev === key ? null : key);

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{copy.title}</PageTitle>

      {/* Schedule */}
      <InfoCard className="mt-4 mb-6">
        <span style={{ ...ps.muted, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {copy.scheduleLabel}
        </span>
        <div className="flex flex-col mt-2">
          {copy.scheduleRows.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
              style={{ paddingTop: "0.55rem", paddingBottom: "0.55rem", borderTop: i > 0 ? "1px solid var(--border)" : undefined }}
            >
              <span style={{ ...ps.muted, fontWeight: 300, fontSize: "0.82rem" }}>{row.days}</span>
              <span style={ps.menuPrice}>
                {row.time}
              </span>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Accordion */}
      <div className="flex flex-col gap-2 mb-8">
        {MENU.map((cat) => {
          const isOpen = openCat === cat.key;
          return (
            <div
              key={cat.key}
              style={{
                borderRadius: isOpen ? "0 6px 6px 0" : 6,
                border: "1px solid var(--border)",
                borderLeft: isOpen ? "3px solid var(--gold)" : "1px solid var(--border)",
                transition: "border-color 0.2s, border-left-width 0.2s",
                overflow: "hidden",
              }}
            >
              {/* Category header button */}
              <button
                onClick={() => toggle(cat.key)}
                className="w-full flex items-center justify-between px-5 py-4"
                style={{
                  background: isOpen ? "var(--card)" : "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: isOpen ? 600 : 400,
                  fontSize: "1.15rem",
                  color: isOpen ? "var(--gold)" : "var(--foreground)",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s, font-weight 0.2s",
                }}>
                  {catLabels[cat.key]}
                </span>
                <span style={{
                  fontSize: "1.1rem",
                  color: "var(--gold)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                  display: "inline-block",
                  lineHeight: 1,
                }}>
                  ›
                </span>
              </button>

              {/* Category content */}
              {isOpen && (
                <div
                  style={{
                    padding: "0.75rem 1.25rem 1.5rem",
                    background: "var(--card)",
                    animation: "fadeSlideIn 0.2s ease",
                  }}
                >
                  <div className="flex flex-col gap-4">
                    {cat.dishes.map((dish, dIdx) => (
                      <div key={dIdx} className="flex justify-between items-start gap-3"
                        style={{ borderTop: dIdx > 0 ? "1px solid var(--border)" : undefined, paddingTop: dIdx > 0 ? "0.75rem" : undefined }}
                      >
                        <div className="flex-1">
                          <p style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            color: "var(--card-foreground)",
                            marginBottom: dish.desc ? "0.2rem" : 0,
                          }}>
                            {dish.name}
                          </p>
                          {dish.desc && (
                            <p style={{ ...ps.muted, fontWeight: 300, fontStyle: "italic", fontSize: "0.8rem" }}>
                              {dish.desc}
                            </p>
                          )}
                        </div>
                        {dish.price && (
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "0.82rem",
                            color: "var(--gold)",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            paddingTop: "0.05rem",
                          }}>
                            {dish.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
