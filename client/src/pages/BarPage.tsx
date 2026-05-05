/**
 * BarPage — La Fonda de los Príncipes
 * Carta de bebidas con acordeón de 4 categorías:
 * Sin alcohol · Cervezas · Vinos · Cócteles & Licores
 *
 * Design: acordeón vertical con borde izquierdo dorado en categoría activa,
 * animación de slide-down en el contenido, subsecciones con título en dorado.
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LangCode } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import InfoCard from "@/components/InfoCard";
import { ps } from "@/lib/pageStyles";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Drink {
  name: string;
  desc?: string;
  price?: string;
  priceNote?: string;
}
interface SubSection {
  key: string; // used for translation lookup
  drinks: Drink[];
}
interface Category {
  key: "noalcohol" | "coffee" | "beer" | "wine" | "cocktails" | "spirits";
  subsections: SubSection[];
}

// ─── Menu data ────────────────────────────────────────────────────────────────
const MENU: Category[] = [
  {
    key: "noalcohol",
    subsections: [
      {
        key: "water_soft",
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
    ],
  },
  {
    key: "coffee",
    subsections: [
      {
        key: "coffee_tea",
        drinks: [
          { name: "Café solo, con leche, cortado, americano", price: "5 €" },
          { name: "Capuchino", price: "7 €" },
          { name: "Carajillo", price: "10 €" },
          { name: "Café Irlandés", price: "16 €" },
          { name: "Té negro, verde, rooibos", price: "5 €" },
          { name: "Poleo menta / Manzanilla", price: "5 €" },
        ],
      },
    ],
  },
  {
    key: "beer",
    subsections: [
      {
        key: "beers",
        drinks: [
          { name: "Alhambra RSV 1925", price: "7 €" },
          { name: "Mahou 5 Estrellas", price: "7 €" },
          { name: "Mahou Sin Gluten", price: "7 €" },
          { name: "Mahou 0,0 Tostada (sin alcohol)", price: "7 €" },
        ],
      },
    ],
  },
  {
    key: "wine",
    subsections: [
      {
        key: "white_wine",
        drinks: [
          { name: "José Pariente — D.O. Rueda (Verdejo)", price: "6 € / 30 €", priceNote: "copa / botella" },
          { name: "Mar de Frades — D.O. Baixas (Albariño)", price: "7 € / 35 €", priceNote: "copa / botella" },
          { name: "O Luar Do Sil — D.O. Valdeorras (Godello)", price: "7 € / 35 €", priceNote: "copa / botella" },
          { name: "La Maldición — D.O. Madrid (Malvar y Torrontes)", price: "6,50 € / 33 €", priceNote: "copa / botella" },
        ],
      },
      {
        key: "rose_wine",
        drinks: [
          { name: "Enate — D.O. Somontano (Cabernet Sauvignon)", price: "6 € / 30 €", priceNote: "copa / botella" },
        ],
      },
      {
        key: "red_wine",
        drinks: [
          { name: "Luis Cañas Crianza — D.O. Rioja", price: "6 € / 30 €", priceNote: "copa / botella" },
          { name: "Muga Crianza — D.O. Rioja", price: "35 €", priceNote: "botella" },
          { name: "Finca Resalso Roble — D.O. Ribera (Tempranillo)", price: "6 € / 31 €", priceNote: "copa / botella" },
          { name: "Pago de Carraovejas Crianza — D.O. Ribera", price: "67 €", priceNote: "botella" },
          { name: "Tangonius Crianza — D.O. Madrid", price: "6 € / 31 €", priceNote: "copa / botella" },
        ],
      },
      {
        key: "sparkling",
        drinks: [
          { name: "Palacio de Bornos — D.O. Rueda (Verdejo)", price: "8 € / 40 €", priceNote: "copa / botella" },
          { name: "Moët & Chandon Brut Imperial", price: "20 € / 80 €", priceNote: "copa / botella" },
          { name: "Moët & Chandon Rosé", price: "22 € / 85 €", priceNote: "copa / botella" },
          { name: "Dom Pérignon Vintage", price: "300 €", priceNote: "botella" },
        ],
      },
      {
        key: "fortified",
        drinks: [
          { name: "Tío Pepe", price: "6 €" },
          { name: "La Gitana", price: "6 €" },
          { name: "Oporto Bandeira", price: "6 €" },
          { name: "Pedro Ximénez Los Amigos", price: "6 €" },
        ],
      },
    ],
  },
  {
    key: "cocktails",
    subsections: [
      {
        key: "mocktails",
        drinks: [
          { name: "Virgin Mojito", desc: "Lima, Hierbabuena, Azúcar y Soda", price: "16 €" },
          { name: "Virgin Mary", desc: "Zumo de tomate, Sal, Pimienta, Salsa inglesa, Zumo de limón, Tabasco", price: "16 €" },
          { name: "San Francisco", desc: "Zumo de naranja, piña y manzana con un toque de granadina", price: "16 €" },
        ],
      },
      {
        key: "classic_cocktails",
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
        key: "intl_cocktails",
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
        key: "spritz",
        drinks: [
          { name: "Aperol Spritz", desc: "Aperol, Espumoso y Soda", price: "16 €" },
          { name: "St-Germain Spritz", desc: "St-Germain, Espumoso y Soda", price: "16 €" },
          { name: "Limoncello Spritz", desc: "Limoncello, Espumoso y Soda", price: "16 €" },
        ],
      },
    ],
  },
  {
    key: "spirits",
    subsections: [
      {
        key: "whisky",
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
        key: "rum",
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
        key: "gin",
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
        key: "tequila",
        drinks: [
          { name: "José Cuervo Clásico", price: "15 €" },
          { name: "Don Julio Reposado", price: "24 €" },
        ],
      },
      {
        key: "vodka",
        drinks: [
          { name: "Absolut", price: "16 €" },
          { name: "Beluga", price: "22 €" },
          { name: "Grey Goose", price: "24 €" },
        ],
      },
      {
        key: "brandy",
        drinks: [
          { name: "Carlos I", price: "18 €" },
          { name: "Larios 1866", price: "23 €" },
          { name: "Remy Martin VSOP", price: "23 €" },
        ],
      },
      {
        key: "vermouth",
        drinks: [
          { name: "Martini Blanco", price: "8 €" },
          { name: "Martini Rojo", price: "8 €" },
          { name: "Aperol", price: "10 €" },
          { name: "Campari", price: "10 €" },
          { name: "St. Germain", price: "16 €" },
        ],
      },
      {
        key: "liqueurs",
        drinks: [
          { name: "Pacharán / Crema de Orujo / Bailey's", price: "9 €" },
          { name: "Licor de hierbas / Orujo / Limoncello", price: "9 €" },
          { name: "Manzana / Melocotón / Mora", price: "9 €" },
          { name: "Amaretto / Frangelico / Jägermeister", price: "9 €" },
        ],
      },
    ],
  },
];

// ─── Translations ─────────────────────────────────────────────────────────────
type CatKey = "noalcohol" | "coffee" | "beer" | "wine" | "cocktails" | "spirits";
type SubKey = "water_soft" | "coffee_tea" | "mocktails" | "beers" | "white_wine" | "rose_wine" | "red_wine" | "sparkling" | "fortified" | "classic_cocktails" | "intl_cocktails" | "spritz" | "whisky" | "rum" | "gin" | "tequila" | "vodka" | "brandy" | "vermouth" | "liqueurs";

const CAT_LABELS: Record<LangCode, Record<CatKey, string>> = {
  es: { noalcohol: "Aguas y refrescos", coffee: "Cafés e infusiones", beer: "Cervezas", wine: "Vinos", cocktails: "Cócteles", spirits: "Licores & Destilados" },
  en: { noalcohol: "Water & soft drinks", coffee: "Coffee & teas", beer: "Beers", wine: "Wines", cocktails: "Cocktails", spirits: "Spirits & Liqueurs" },
  fr: { noalcohol: "Eaux et sodas", coffee: "Cafés et infusions", beer: "Bières", wine: "Vins", cocktails: "Cocktails", spirits: "Spiritueux & Liqueurs" },
  de: { noalcohol: "Wasser und Softdrinks", coffee: "Kaffee und Tee", beer: "Biere", wine: "Weine", cocktails: "Cocktails", spirits: "Spirituosen & Liköre" },
  it: { noalcohol: "Acqua e bibite", coffee: "Caffè e infusi", beer: "Birre", wine: "Vini", cocktails: "Cocktail", spirits: "Distillati & Liquori" },
  pt: { noalcohol: "Águas e refrigerantes", coffee: "Cafés e infusões", beer: "Cervejas", wine: "Vinhos", cocktails: "Cocktails", spirits: "Destilados & Licores" },
  zh: { noalcohol: "水和软饮料", coffee: "咖啡和茶", beer: "啤酒", wine: "葡萄酒", cocktails: "鸡尾酒", spirits: "烈酒 & 利口酒" },
  ja: { noalcohol: "水・ソフトドリンク", coffee: "コーヒー・お茶", beer: "ビール", wine: "ワイン", cocktails: "カクテル", spirits: "スピリッツ & リキュール" },
  ar: { noalcohol: "مياه ومشروبات", coffee: "قهوة وشاي", beer: "بيرة", wine: "نبيذ", cocktails: "كوكتيل", spirits: "مشروبات روحية" },
  ru: { noalcohol: "Вода и напитки", coffee: "Кофе и чай", beer: "Пиво", wine: "Вина", cocktails: "Коктейли", spirits: "Крепкие напитки" },
};

const SUB_LABELS: Record<LangCode, Record<SubKey, string>> = {
  es: { water_soft: "Aguas y refrescos", coffee_tea: "Cafés e infusiones", mocktails: "Mocktails", beers: "Cervezas", white_wine: "Vinos blancos", rose_wine: "Vinos rosados", red_wine: "Vinos tintos", sparkling: "Espumosos", fortified: "Generosos", classic_cocktails: "Coctelería clásica", intl_cocktails: "Coctelería internacional", spritz: "Spritz", whisky: "Whisky", rum: "Ron", gin: "Ginebra", tequila: "Tequila", vodka: "Vodka", brandy: "Brandy y Cognac", vermouth: "Vermut y aperitivos", liqueurs: "Licores" },
  en: { water_soft: "Water & soft drinks", coffee_tea: "Coffees & teas", mocktails: "Mocktails", beers: "Beers", white_wine: "White wines", rose_wine: "Rosé wines", red_wine: "Red wines", sparkling: "Sparkling", fortified: "Fortified wines", classic_cocktails: "Classic cocktails", intl_cocktails: "International cocktails", spritz: "Spritz", whisky: "Whisky", rum: "Rum", gin: "Gin", tequila: "Tequila", vodka: "Vodka", brandy: "Brandy & Cognac", vermouth: "Vermouth & aperitifs", liqueurs: "Liqueurs" },
  fr: { water_soft: "Eaux et sodas", coffee_tea: "Cafés et infusions", mocktails: "Mocktails", beers: "Bières", white_wine: "Vins blancs", rose_wine: "Vins rosés", red_wine: "Vins rouges", sparkling: "Pétillants", fortified: "Vins fortifiés", classic_cocktails: "Cocktails classiques", intl_cocktails: "Cocktails internationaux", spritz: "Spritz", whisky: "Whisky", rum: "Rhum", gin: "Gin", tequila: "Tequila", vodka: "Vodka", brandy: "Brandy et Cognac", vermouth: "Vermouth et apéritifs", liqueurs: "Liqueurs" },
  de: { water_soft: "Wasser und Softdrinks", coffee_tea: "Kaffee und Tee", mocktails: "Mocktails", beers: "Biere", white_wine: "Weißweine", rose_wine: "Roséweine", red_wine: "Rotweine", sparkling: "Schaumweine", fortified: "Likörweine", classic_cocktails: "Klassische Cocktails", intl_cocktails: "Internationale Cocktails", spritz: "Spritz", whisky: "Whisky", rum: "Rum", gin: "Gin", tequila: "Tequila", vodka: "Wodka", brandy: "Brandy und Cognac", vermouth: "Wermut und Aperitifs", liqueurs: "Liköre" },
  it: { water_soft: "Acqua e bibite", coffee_tea: "Caffè e infusi", mocktails: "Mocktail", beers: "Birre", white_wine: "Vini bianchi", rose_wine: "Vini rosati", red_wine: "Vini rossi", sparkling: "Spumanti", fortified: "Vini liquorosi", classic_cocktails: "Cocktail classici", intl_cocktails: "Cocktail internazionali", spritz: "Spritz", whisky: "Whisky", rum: "Rum", gin: "Gin", tequila: "Tequila", vodka: "Vodka", brandy: "Brandy e Cognac", vermouth: "Vermouth e aperitivi", liqueurs: "Liquori" },
  pt: { water_soft: "Águas e refrigerantes", coffee_tea: "Cafés e infusões", mocktails: "Mocktails", beers: "Cervejas", white_wine: "Vinhos brancos", rose_wine: "Vinhos rosados", red_wine: "Vinhos tintos", sparkling: "Espumantes", fortified: "Vinhos generosos", classic_cocktails: "Cocktails clássicos", intl_cocktails: "Cocktails internacionais", spritz: "Spritz", whisky: "Whisky", rum: "Rum", gin: "Gin", tequila: "Tequila", vodka: "Vodka", brandy: "Brandy e Cognac", vermouth: "Vermute e aperitivos", liqueurs: "Licores" },
  zh: { water_soft: "水和软饮料", coffee_tea: "咖啡和茶", mocktails: "无酒精鸡尾酒", beers: "啤酒", white_wine: "白葡萄酒", rose_wine: "桃红葡萄酒", red_wine: "红葡萄酒", sparkling: "起泡酒", fortified: "加强葡萄酒", classic_cocktails: "经典鸡尾酒", intl_cocktails: "国际鸡尾酒", spritz: "Spritz", whisky: "威士忌", rum: "朗姆酒", gin: "金酒", tequila: "龙舌兰", vodka: "伏特加", brandy: "白兰地和干邑", vermouth: "苦艾酒和开胃酒", liqueurs: "利口酒" },
  ja: { water_soft: "水・ソフトドリンク", coffee_tea: "コーヒー・お茶", mocktails: "モクテル", beers: "ビール", white_wine: "白ワイン", rose_wine: "ロゼワイン", red_wine: "赤ワイン", sparkling: "スパークリング", fortified: "酒精強化ワイン", classic_cocktails: "クラシックカクテル", intl_cocktails: "インターナショナルカクテル", spritz: "スプリッツ", whisky: "ウイスキー", rum: "ラム", gin: "ジン", tequila: "テキーラ", vodka: "ウォッカ", brandy: "ブランデー・コニャック", vermouth: "ベルモット・アペリティフ", liqueurs: "リキュール" },
  ar: { water_soft: "المياه والمشروبات الغازية", coffee_tea: "القهوة والشاي", mocktails: "موكتيل", beers: "البيرة", white_wine: "النبيذ الأبيض", rose_wine: "النبيذ الوردي", red_wine: "النبيذ الأحمر", sparkling: "الفقاعي", fortified: "نبيذ معزز", classic_cocktails: "كوكتيلات كلاسيكية", intl_cocktails: "كوكتيلات دولية", spritz: "سبريتز", whisky: "ويسكي", rum: "روم", gin: "جن", tequila: "تكيلا", vodka: "فودكا", brandy: "براندي وكونياك", vermouth: "فيرمو ومشروبات مفتوحة", liqueurs: "ليكور" },
  ru: { water_soft: "Вода и напитки", coffee_tea: "Кофе и чай", mocktails: "Мокктейли", beers: "Пиво", white_wine: "Белые вина", rose_wine: "Розовые вина", red_wine: "Красные вина", sparkling: "Игристые", fortified: "Крепленые вина", classic_cocktails: "Классические коктейли", intl_cocktails: "Международные коктейли", spritz: "Спритц", whisky: "Виски", rum: "Ром", gin: "Джин", tequila: "Текила", vodka: "Водка", brandy: "Бренди и Коньяк", vermouth: "Вермут и аперитивы", liqueurs: "Ликеры" },
};

const SCHEDULE_COPY: Record<LangCode, { title: string; scheduleLabel: string; rows: { days: string; time: string }[] }> = {
  es: { title: "Bar", scheduleLabel: "Horario", rows: [{ days: "Lun – Vie", time: "11:00 – 00:00" }, { days: "Sáb, Dom y festivos", time: "11:30 – 00:00" }] },
  en: { title: "Bar", scheduleLabel: "Hours", rows: [{ days: "Mon – Fri", time: "11:00 – midnight" }, { days: "Sat, Sun & holidays", time: "11:30 – midnight" }] },
  fr: { title: "Bar", scheduleLabel: "Horaires", rows: [{ days: "Lun – Ven", time: "11h00 – 00h00" }, { days: "Sam, Dim & fériés", time: "11h30 – 00h00" }] },
  de: { title: "Bar", scheduleLabel: "Öffnungszeiten", rows: [{ days: "Mo – Fr", time: "11:00 – 00:00 Uhr" }, { days: "Sa, So & Feiertage", time: "11:30 – 00:00 Uhr" }] },
  it: { title: "Bar", scheduleLabel: "Orario", rows: [{ days: "Lun – Ven", time: "11:00 – 00:00" }, { days: "Sab, Dom e festivi", time: "11:30 – 00:00" }] },
  pt: { title: "Bar", scheduleLabel: "Horário", rows: [{ days: "Seg – Sex", time: "11h00 – 00h00" }, { days: "Sáb, Dom e feriados", time: "11h30 – 00h00" }] },
  zh: { title: "酒吧", scheduleLabel: "营业时间", rows: [{ days: "周一至周五", time: "11:00 – 00:00" }, { days: "周六/周日/假日", time: "11:30 – 00:00" }] },
  ja: { title: "バー", scheduleLabel: "営業時間", rows: [{ days: "月曜〜金曜", time: "11:00 – 00:00" }, { days: "土/日/祝日", time: "11:30 – 00:00" }] },
  ar: { title: "البار", scheduleLabel: "ساعات العمل", rows: [{ days: "الإثنين – الجمعة", time: "11:00 – 00:00" }, { days: "سبت/أحد/عطل", time: "11:30 – 00:00" }] },
  ru: { title: "Бар", scheduleLabel: "Часы работы", rows: [{ days: "Пн – Пт", time: "11:00 – 00:00" }, { days: "Сб/Вс/праздники", time: "11:30 – 00:00" }] },
};

// ─── Sub-component: drink list ────────────────────────────────────────────────
function DrinkList({ drinks }: { drinks: Drink[] }) {
  return (
    <div className="flex flex-col gap-3">
      {drinks.map((drink, i) => (
        <div key={i} className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <p style={{ ...ps.body, fontWeight: 500, fontSize: "0.88rem", color: "var(--card-foreground)", marginBottom: drink.desc ? "0.2rem" : 0 }}>
              {drink.name}
            </p>
            {drink.desc && (
              <p style={{ ...ps.muted, fontStyle: "italic", lineHeight: 1.55, fontSize: "0.78rem" }}>
                {drink.desc}
              </p>
            )}
          </div>
          {drink.price && (
            <div className="text-right flex-shrink-0">
              <span style={ps.menuPrice}>
                {drink.price}
              </span>
              {drink.priceNote && (
                <p style={{ ...ps.muted, fontSize: "0.68rem", marginTop: "0.1rem" }}>
                  {drink.priceNote}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props { onBack: () => void; }

export default function BarPage({ onBack }: Props) {
  const { lang } = useLanguage();
  const catLabels = CAT_LABELS[lang] ?? CAT_LABELS.es;
  const subLabels = SUB_LABELS[lang] ?? SUB_LABELS.es;
  const sched = SCHEDULE_COPY[lang] ?? SCHEDULE_COPY.es;

  const [openCat, setOpenCat] = useState<CatKey | null>(null);

  const toggle = (key: CatKey) => setOpenCat(prev => prev === key ? null : key);

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{sched.title}</PageTitle>

      {/* Schedule */}
      <InfoCard className="mt-4 mb-6">
        <span style={{ ...ps.muted, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {sched.scheduleLabel}
        </span>
        <div className="flex flex-col mt-2">
          {sched.rows.map((row, i) => (
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
                transition: "border-color 0.2s, border-left-width 0.2s, border-radius 0.2s",
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
                  {cat.subsections.map((sub, si) => (
                    <div key={sub.key} style={{ marginTop: si === 0 ? "0" : "1.5rem" }}>
                      {/* Only show subsection title if there are multiple subsections */}
                      {cat.subsections.length > 1 && (
                        <h3 style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: "0.7rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          marginBottom: "0.75rem",
                          paddingBottom: "0.4rem",
                          borderBottom: "1px solid var(--border)",
                        }}>
                          {subLabels[sub.key as SubKey] ?? sub.key}
                        </h3>
                      )}
                      <DrinkList drinks={sub.drinks} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </PageLayout>
  );
}
