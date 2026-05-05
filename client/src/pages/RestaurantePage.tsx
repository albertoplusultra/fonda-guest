/*
 * RestaurantePage — "Noche en Sol" design
 * Carta de comida del restaurante La Fonda de los Príncipes
 */
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface Dish {
  name: string;
  desc?: string;
  price?: string;
}
interface MenuSection {
  title: string;
  dishes: Dish[];
}

const FOOD_MENU: MenuSection[] = [
  {
    title: "Entrantes",
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
    title: "Ensaladas",
    dishes: [
      { name: "Ensaladilla rusa con ventresca", desc: "Cremosa con base de patata, zanahoria, ventresca, huevo cocido, mahonesa", price: "14 €" },
      { name: "Ensalada de burrata", desc: "Burrata, tomates cherry confitados, pesto de albahaca y piñones sobre una cama de rúcula", price: "21 €" },
      { name: "Poke con salsa thai", desc: "Arroz sushi, salmón ahumado o atún, zanahoria rallada, aguacate, cebolla crujiente, maíz dulce, salsa thai, algas wakame, semillas de sésamo", price: "25 €" },
    ],
  },
  {
    title: "Huevos",
    dishes: [
      { name: "Tortilla de Betanzos", desc: "Un huevo completo, tres yemas de huevo, patatas pochadas, cebolla, aceite y sal", price: "13 €" },
      { name: "Huevos estrellados", desc: "Huevos fritos, patatas fritas y jamón ibérico", price: "17 €" },
      { name: "Shakshuka", desc: "Pisto de verduras con huevos, queso feta y especias, servido con pan de pita", price: "16 €" },
    ],
  },
  {
    title: "Tablas",
    dishes: [
      { name: "Tabla de jamón ibérico", desc: "Jamón ibérico de Extremadura servido con pan de cristal y tomate rallado", price: "29 €" },
      { name: "Tabla de ibéricos", desc: "Jamón, lomo, chorizo y salchichón, todos ibéricos, servidos con picos artesanos", price: "24 €" },
      { name: "Tabla de quesos", desc: "Queso ahumado de cabra, curado de oveja con miel y romero, comté, idiazábal, azul ahumado, Arzúa-Ulloa y brie con picos artesanos, nueces y uvas rojas", price: "26 €" },
    ],
  },
  {
    title: "Carne y Pescado",
    dishes: [
      { name: "Solomillo demi-glace y trufa", desc: "Solomillo al punto con salsa demi-glace y toque de trufa, acompañado de cremoso de patata", price: "29 €" },
      { name: "Salmón de Lonja con Menestra", desc: "Salmón fresco de lonja a la plancha, servido con menestra de verduras de temporada", price: "22 €" },
    ],
  },
  {
    title: "Sándwiches y hamburguesas",
    dishes: [
      { name: "Mollete de carrillera", desc: "Pan de mollete con carrillera de ternera estofada, foie de pato y reducción de Pedro Ximénez", price: "19 €" },
      { name: "Bocata de calamar", desc: "Pan de mollete con calamares fritos y mayonesa de tinta de calamar", price: "15 €" },
      { name: "Hamburguesa La Fonda", desc: "Pan de hamburguesa pretzel con mahonesa de mostaza, carne de vaca rubia gallega, queso de cabra, canónigo, cebolla caramelizada y patatas fritas", price: "19 €" },
    ],
  },
  {
    title: "Postres",
    dishes: [
      { name: "Brownie con helado de vainilla", desc: "Brownie templado de chocolate acompañado de helado de vainilla", price: "8 €" },
      { name: "Tarta de queso con frutos rojos", desc: "Cremosa tarta de queso servida con frutos rojos y su coulis", price: "8 €" },
      { name: "Surtido de helado", desc: "Selección de helados variados (consulte sabores disponibles)", price: "8 €" },
      { name: "Fruta fresca seleccionada", desc: "Fruta fresca de temporada, seleccionada al momento", price: "8 €" },
    ],
  },
];

const SECTION_TITLES: Record<string, string[]> = {
  es: ["Entrantes","Ensaladas","Huevos","Tablas","Carne y Pescado","Sándwiches y hamburguesas","Postres"],
  en: ["Starters","Salads","Eggs","Charcuterie boards","Meat & Fish","Sandwiches & burgers","Desserts"],
  fr: ["Entrées","Salades","Œufs","Planches","Viande et Poisson","Sandwichs et burgers","Desserts"],
  de: ["Vorspeisen","Salate","Eier","Bretter","Fleisch und Fisch","Sandwiches und Burger","Desserts"],
  it: ["Antipasti","Insalate","Uova","Taglieri","Carne e Pesce","Panini e hamburger","Dolci"],
  pt: ["Entradas","Saladas","Ovos","Tábuas","Carne e Peixe","Sandes e hambúrgueres","Sobremesas"],
  zh: ["前菜","沙拉","鸡蛋","拼盘","肉类和鱼类","三明治和汉堡","甜点"],
  ja: ["前菜","サラダ","卵料理","盛り合わせ","肉・魚料理","サンドイッチ・バーガー","デザート"],
  ar: ["المقبلات","السلطات","البيض","ألواح اللحوم","اللحوم والأسماك","السندويشات والبرغر","الحلويات"],
  ru: ["Закуски","Салаты","Яйца","Доски","Мясо и рыба","Сэндвичи и бургеры","Десерты"],
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

interface RestaurantePageProps {
  onBack: () => void;
}

export default function RestaurantePage({ onBack }: RestaurantePageProps) {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";
  const copy = PAGE_COPY[lang] ?? PAGE_COPY["en"];
  const sectionTitles = SECTION_TITLES[lang] ?? SECTION_TITLES["en"];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.08 0 0)", maxWidth: 480, margin: "0 auto" }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 pt-8 pb-4"
        style={{ borderBottom: "1px solid oklch(0.16 0.01 72)" }}
      >
        <BackButton onClick={onBack} />
        <img src={LOGO_BLANCO} alt="La Fonda de los Príncipes" className="h-8" style={{ opacity: 0.85 }} />
        <LanguageSelector />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pt-10 pb-16">

        <h1 className="mb-2" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
          color: "oklch(0.96 0.025 85)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}>
          {copy.title}
        </h1>

        {/* Schedule block */}
        <div
          className="mb-6 px-4 py-4 rounded-sm"
          style={{ background: "oklch(0.11 0 0)", border: "1px solid oklch(0.20 0.012 72)" }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.45 0.01 85)" }}>
            {copy.scheduleLabel}
          </span>
          <div className="flex flex-col mt-2">
            {copy.scheduleRows.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
                style={{
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                  borderTop: i > 0 ? "1px solid oklch(0.16 0.01 72)" : undefined,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "oklch(0.62 0.012 85)" }}>
                  {row.days}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.05rem", color: "var(--gold)", letterSpacing: "0.02em" }}>
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8" style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", width: "60%" }} />

        {FOOD_MENU.map((section, sIdx) => (
          <div key={sIdx} className="mb-10">
            <h2 className="mb-5" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "1.2rem",
              color: "var(--gold)",
              letterSpacing: "0.02em",
              borderBottom: "1px solid oklch(0.18 0.01 72)",
              paddingBottom: "0.5rem",
            }}>
              {sectionTitles[sIdx] ?? section.title}
            </h2>
            <div className="flex flex-col gap-4">
              {section.dishes.map((dish, dIdx) => (
                <div key={dIdx} className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.88rem",
                      color: "oklch(0.88 0.02 85)",
                      lineHeight: 1.4,
                      marginBottom: dish.desc ? "0.2rem" : 0,
                    }}>
                      {dish.name}
                    </p>
                    {dish.desc && (
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.75rem",
                        color: "oklch(0.50 0.012 85)",
                        lineHeight: 1.55,
                        fontStyle: "italic",
                      }}>
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
        ))}

      </main>
    </div>
  );
}
