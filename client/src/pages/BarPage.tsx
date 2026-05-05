/*
 * BarPage — "Noche en Sol" design
 * Carta de bebidas del Bar de La Fonda de los Príncipes
 */
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface Drink {
  name: string;
  desc?: string;
  price?: string;
  priceNote?: string;
}
interface DrinkSection {
  title: string;
  drinks: Drink[];
}

const DRINKS_MENU: DrinkSection[] = [
  {
    title: "Vinos blancos",
    drinks: [
      { name: "José Pariente — D.O. Rueda (Verdejo)", price: "6 € / 30 €", priceNote: "copa / botella" },
      { name: "Mar de Frades — D.O. Baixas (Albariño)", price: "7 € / 35 €", priceNote: "copa / botella" },
      { name: "O Luar Do Sil — D.O. Valdeorras (Godello)", price: "7 € / 35 €", priceNote: "copa / botella" },
      { name: "La Maldición — D.O. Madrid (Malvar y Torrontes)", price: "6,50 € / 33 €", priceNote: "copa / botella" },
    ],
  },
  {
    title: "Vinos rosados",
    drinks: [
      { name: "Enate — D.O. Somontano (Cabernet Sauvignon)", price: "6 € / 30 €", priceNote: "copa / botella" },
    ],
  },
  {
    title: "Vinos tintos",
    drinks: [
      { name: "Luis Cañas Crianza — D.O. Rioja", price: "6 € / 30 €", priceNote: "copa / botella" },
      { name: "Muga Crianza — D.O. Rioja", price: "35 €", priceNote: "botella" },
      { name: "Finca Resalso Roble — D.O. Ribera (Tempranillo)", price: "6 € / 31 €", priceNote: "copa / botella" },
      { name: "Pago de Carraovejas Crianza — D.O. Ribera", price: "67 €", priceNote: "botella" },
      { name: "Tangonius Crianza — D.O. Madrid", price: "6 € / 31 €", priceNote: "copa / botella" },
    ],
  },
  {
    title: "Espumosos",
    drinks: [
      { name: "Palacio de Bornos — D.O. Rueda (Verdejo)", price: "8 € / 40 €", priceNote: "copa / botella" },
      { name: "Moët & Chandon Brut Imperial", price: "20 € / 80 €", priceNote: "copa / botella" },
      { name: "Moët & Chandon Rosé", price: "22 € / 85 €", priceNote: "copa / botella" },
      { name: "Dom Pérignon Vintage", price: "300 €", priceNote: "botella" },
    ],
  },
  {
    title: "Coctelería clásica",
    drinks: [
      { name: "Negroni", desc: "Vermut, Campari y Ginebra", price: "16 €" },
      { name: "Americano", desc: "Vermut, Campari y Soda", price: "16 €" },
      { name: "Old Fashioned", desc: "Whisky, Angostura y Azúcar", price: "16 €" },
      { name: "Manhattan", desc: "Whisky, Vermut y Angostura", price: "16 €" },
      { name: "Dry Martini", desc: "Ginebra y Vermut Dry", price: "16 €" },
      { name: "Espresso Martini", desc: "Vodka, Licor de café y Café Espresso", price: "16 €" },
    ],
  },
  {
    title: "Coctelería internacional",
    drinks: [
      { name: "Margarita", desc: "Tequila, Zumo de Lima y Triple Seco", price: "16 €" },
      { name: "Mojito", desc: "Ron, Lima, Hierbabuena, Azúcar y Soda", price: "16 €" },
      { name: "Piña Colada", desc: "Ron, Piña, Licor de Coco y Azúcar", price: "16 €" },
      { name: "Daiquiri", desc: "Ron, Limón y Azúcar", price: "16 €" },
      { name: "Whisky Sour", desc: "Whisky, Azúcar, Limón y Clara de Huevo", price: "16 €" },
      { name: "Moscú Mule", desc: "Vodka, Lima, Azúcar y Ginger Beer", price: "16 €" },
    ],
  },
  {
    title: "Spritz",
    drinks: [
      { name: "Aperol Spritz", desc: "Aperol, Espumoso y Soda", price: "16 €" },
      { name: "St-Germain Spritz", desc: "St-Germain, Espumoso y Soda", price: "16 €" },
      { name: "Limoncello Spritz", desc: "Limoncello, Espumoso y Soda", price: "16 €" },
    ],
  },
  {
    title: "Whisky",
    drinks: [
      { name: "Ballantines", price: "16 €" },
      { name: "Johnnie Walker Red", price: "16 €" },
      { name: "Jack Daniel's", price: "17 €" },
      { name: "Johnnie Walker Black", price: "19 €" },
      { name: "Cardhu 12 años", price: "20 €" },
      { name: "Macallan 12 años", price: "22 €" },
    ],
  },
  {
    title: "Ron",
    drinks: [
      { name: "Bacardi Carta Blanca", price: "16 €" },
      { name: "Barceló Añejo", price: "16 €" },
      { name: "Brugal Añejo", price: "16 €" },
      { name: "Havana Club 7 años", price: "18 €" },
      { name: "Matusalem 15 años", price: "20 €" },
      { name: "Matusalem 23 años", price: "23 €" },
    ],
  },
  {
    title: "Ginebra",
    drinks: [
      { name: "Beefeater", price: "16 €" },
      { name: "Seagram's", price: "16 €" },
      { name: "Puerto de Indias", price: "16 €" },
      { name: "Citadelle", price: "18 €" },
      { name: "Hendrick's", price: "19 €" },
      { name: "London Blue Nº1", price: "19 €" },
      { name: "Martin Miller's", price: "19 €" },
      { name: "Suplemento Tónica Premium Tribute / Fever Tree", price: "2 €" },
    ],
  },
  {
    title: "Tequila",
    drinks: [
      { name: "José Cuervo Clásico", price: "15 €" },
      { name: "Don Julio Reposado", price: "24 €" },
    ],
  },
  {
    title: "Vodka",
    drinks: [
      { name: "Absolut", price: "16 €" },
      { name: "Beluga", price: "22 €" },
      { name: "Grey Goose", price: "24 €" },
    ],
  },
  {
    title: "Brandy y Cognac",
    drinks: [
      { name: "Carlos I", price: "18 €" },
      { name: "Larios 1866", price: "23 €" },
      { name: "Remy Martin VSOP", price: "23 €" },
    ],
  },
  {
    title: "Vermut y aperitivos",
    drinks: [
      { name: "Martini Blanco", price: "8 €" },
      { name: "Martini Rojo", price: "8 €" },
      { name: "Aperol", price: "10 €" },
      { name: "Campari", price: "10 €" },
      { name: "St. Germain", price: "16 €" },
    ],
  },
  {
    title: "Generosos",
    drinks: [
      { name: "Tío Pepe", price: "6 €" },
      { name: "La Gitana", price: "6 €" },
      { name: "Oporto Bandeira", price: "6 €" },
      { name: "Pedro Ximénez Los Amigos", price: "6 €" },
    ],
  },
  {
    title: "Licores",
    drinks: [
      { name: "Pacharán / Crema de Orujo / Bailey's", price: "9 €" },
      { name: "Licor de hierbas / Orujo / Limoncello", price: "9 €" },
      { name: "Manzana / Melocotón / Mora", price: "9 €" },
      { name: "Amaretto / Frangelico / Jägermeister", price: "9 €" },
    ],
  },
  {
    title: "Cervezas",
    drinks: [
      { name: "Alhambra RSV 1925", price: "7 €" },
      { name: "Mahou 5 Estrellas", price: "7 €" },
      { name: "Mahou Sin Gluten", price: "7 €" },
      { name: "Mahou 0,0 Tostada (sin alcohol)", price: "7 €" },
    ],
  },
  {
    title: "Mocktails",
    drinks: [
      { name: "Virgin Mojito", desc: "Lima, Hierbabuena, Azúcar y Soda", price: "16 €" },
      { name: "Virgin Mary", desc: "Zumo de tomate, Sal, Pimienta, Salsa inglesa, Zumo de limón, Tabasco", price: "16 €" },
      { name: "San Francisco", desc: "Zumo de naranja, piña y manzana con un toque de granadina", price: "16 €" },
    ],
  },
  {
    title: "Aguas y refrescos",
    drinks: [
      { name: "Agua ½ litro", price: "4 €" },
      { name: "Agua 1 litro", price: "5 €" },
      { name: "Agua con gas", price: "5 €" },
      { name: "Coca Cola / Zero / Zero-Zero", price: "6 €" },
      { name: "Schweppes Limón, Naranja o Tónica", price: "6 €" },
      { name: "Sprite", price: "6 €" },
      { name: "Aquarius Limón / Naranja", price: "7 €" },
      { name: "Fuze Tea", price: "7 €" },
      { name: "Zumos variados", price: "6 €" },
      { name: "Zumo de naranja natural", price: "8 €" },
      { name: "Red Bull", price: "7 €" },
    ],
  },
  {
    title: "Cafés e infusiones",
    drinks: [
      { name: "Café solo, con leche, cortado, americano", price: "5 €" },
      { name: "Capuchino", price: "7 €" },
      { name: "Carajillo", price: "10 €" },
      { name: "Café Irlandés", price: "16 €" },
      { name: "Té negro, verde, rooibos", price: "5 €" },
      { name: "Poleo menta / Manzanilla", price: "5 €" },
    ],
  },
];

const SECTION_TITLES: Record<string, string[]> = {
  es: ["Vinos blancos","Vinos rosados","Vinos tintos","Espumosos","Coctelería clásica","Coctelería internacional","Spritz","Whisky","Ron","Ginebra","Tequila","Vodka","Brandy y Cognac","Vermut y aperitivos","Generosos","Licores","Cervezas","Mocktails","Aguas y refrescos","Cafés e infusiones"],
  en: ["White wines","Rosé wines","Red wines","Sparkling","Classic cocktails","International cocktails","Spritz","Whisky","Rum","Gin","Tequila","Vodka","Brandy & Cognac","Vermouth & aperitifs","Fortified wines","Liqueurs","Beers","Mocktails","Water & soft drinks","Coffees & teas"],
  fr: ["Vins blancs","Vins rosés","Vins rouges","Pétillants","Cocktails classiques","Cocktails internationaux","Spritz","Whisky","Rhum","Gin","Tequila","Vodka","Brandy et Cognac","Vermouth et apéritifs","Vins fortifiés","Liqueurs","Bières","Mocktails","Eaux et sodas","Cafés et infusions"],
  de: ["Weißweine","Roséweine","Rotweine","Schaumweine","Klassische Cocktails","Internationale Cocktails","Spritz","Whisky","Rum","Gin","Tequila","Wodka","Brandy und Cognac","Wermut und Aperitifs","Likörweine","Liköre","Biere","Mocktails","Wasser und Softdrinks","Kaffee und Tee"],
  it: ["Vini bianchi","Vini rosati","Vini rossi","Spumanti","Cocktail classici","Cocktail internazionali","Spritz","Whisky","Rum","Gin","Tequila","Vodka","Brandy e Cognac","Vermouth e aperitivi","Vini liquorosi","Liquori","Birre","Mocktail","Acqua e bibite","Caffè e infusi"],
  pt: ["Vinhos brancos","Vinhos rosados","Vinhos tintos","Espumantes","Cocktails clássicos","Cocktails internacionais","Spritz","Whisky","Rum","Gin","Tequila","Vodka","Brandy e Cognac","Vermute e aperitivos","Vinhos generosos","Licores","Cervejas","Mocktails","Águas e refrigerantes","Cafés e infusões"],
  zh: ["白葡萄酒","桃红葡萄酒","红葡萄酒","起泡酒","经典鸡尾酒","国际鸡尾酒","Spritz","威士忌","朗姆酒","金酒","龙舌兰","伏特加","白兰地和干邑","苦艾酒和开胃酒","加强葡萄酒","利口酒","啤酒","无酒精鸡尾酒","水和软饮料","咖啡和茶"],
  ja: ["白ワイン","ロゼワイン","赤ワイン","スパークリング","クラシックカクテル","インターナショナルカクテル","スプリッツ","ウイスキー","ラム","ジン","テキーラ","ウォッカ","ブランデー・コニャック","ベルモット・アペリティフ","酒精強化ワイン","リキュール","ビール","モクテル","水・ソフトドリンク","コーヒー・お茶"],
  ar: ["النبيذ الأبيض","النبيذ الوردي","النبيذ الأحمر","الفقاعي","كوكتيلات كلاسيكية","كوكتيلات دولية","سبريتز","ويسكي","روم","جن","تكيلا","فودكا","براندي وكونياك","فيرمو ومشروبات مفتوحة","نبيذ معزز","ليكور","البيرة","موكتيل","المياه والمشروبات الغازية","القهوة والشاي"],
  ru: ["Белые вина","Розовые вина","Красные вина","Игристые","Классические коктейли","Международные коктейли","Спритц","Виски","Ром","Джин","Текила","Водка","Бренди и Коньяк","Вермут и аперитивы","Крепленые вина","Ликеры","Пиво","Мокктейли","Вода и напитки","Кофе и чай"],
};

interface ScheduleRow { days: string; time: string; }
const PAGE_COPY: Record<string, { title: string; scheduleLabel: string; scheduleRows: ScheduleRow[] }> = {
  es: { title: "Bar", scheduleLabel: "Horario", scheduleRows: [
    { days: "Lun – Vie",          time: "11:00 – 00:00" },
    { days: "Sáb, Dom y festivos", time: "11:30 – 00:00" },
  ]},
  en: { title: "Bar", scheduleLabel: "Hours", scheduleRows: [
    { days: "Mon – Fri",           time: "11:00 – midnight" },
    { days: "Sat, Sun & holidays", time: "11:30 – midnight" },
  ]},
  fr: { title: "Bar", scheduleLabel: "Horaires", scheduleRows: [
    { days: "Lun – Ven",               time: "11h00 – 00h00" },
    { days: "Sam, Dim & fériés",      time: "11h30 – 00h00" },
  ]},
  de: { title: "Bar", scheduleLabel: "Öffnungszeiten", scheduleRows: [
    { days: "Mo – Fr",              time: "11:00 – 00:00 Uhr" },
    { days: "Sa, So & Feiertage",  time: "11:30 – 00:00 Uhr" },
  ]},
  it: { title: "Bar", scheduleLabel: "Orario", scheduleRows: [
    { days: "Lun – Ven",          time: "11:00 – 00:00" },
    { days: "Sab, Dom e festivi", time: "11:30 – 00:00" },
  ]},
  pt: { title: "Bar", scheduleLabel: "Horário", scheduleRows: [
    { days: "Seg – Sex",             time: "11h00 – 00h00" },
    { days: "Sáb, Dom e feriados",  time: "11h30 – 00h00" },
  ]},
  zh: { title: "酒吧", scheduleLabel: "营业时间", scheduleRows: [
    { days: "周一至周五",   time: "11:00 – 00:00" },
    { days: "周六/周日/假日", time: "11:30 – 00:00" },
  ]},
  ja: { title: "バー", scheduleLabel: "営業時間", scheduleRows: [
    { days: "月曜〜金曜",   time: "11:00 – 00:00" },
    { days: "土/日/祝日",     time: "11:30 – 00:00" },
  ]},
  ar: { title: "البار", scheduleLabel: "ساعات العمل", scheduleRows: [
    { days: "الإثنين – الجمعة",  time: "11:00 – 00:00" },
    { days: "سبت/أحد/عطل",       time: "11:30 – 00:00" },
  ]},
  ru: { title: "Бар", scheduleLabel: "Часы работы", scheduleRows: [
    { days: "Пн – Пт",           time: "11:00 – 00:00" },
    { days: "Сб/Вс/праздники",  time: "11:30 – 00:00" },
  ]},
};

interface BarPageProps {
  onBack: () => void;
}

export default function BarPage({ onBack }: BarPageProps) {
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

        {/* Title */}
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

        {/* Gold divider */}
        <div className="mb-8" style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", width: "60%" }} />

        {/* Drink sections */}
        {DRINKS_MENU.map((section, sIdx) => (
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
              {section.drinks.map((drink, dIdx) => (
                <div key={dIdx} className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.88rem",
                      color: "oklch(0.88 0.02 85)",
                      lineHeight: 1.4,
                      marginBottom: drink.desc ? "0.2rem" : 0,
                    }}>
                      {drink.name}
                    </p>
                    {drink.desc && (
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.75rem",
                        color: "oklch(0.50 0.012 85)",
                        lineHeight: 1.55,
                        fontStyle: "italic",
                      }}>
                        {drink.desc}
                      </p>
                    )}
                    {drink.priceNote && (
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.68rem",
                        color: "oklch(0.42 0.01 85)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginTop: "0.15rem",
                      }}>
                        {drink.priceNote}
                      </p>
                    )}
                  </div>
                  {drink.price && (
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.82rem",
                      color: "var(--gold)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      paddingTop: "0.05rem",
                    }}>
                      {drink.price}
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
