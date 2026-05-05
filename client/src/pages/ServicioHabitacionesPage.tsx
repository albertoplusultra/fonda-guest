/*
 * ServicioHabitacionesPage — "Noche en Sol" design
 * Room Service: contactar con recepción para cualquier necesidad
 */
import { Phone, IceCream2, BedDouble, Thermometer, Shirt, Bath, HelpCircle, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface ServicioHabitacionesPageProps {
  onBack: () => void;
  onContacto: () => void;
}

interface ServiceItem {
  iconKey: string;
  label: string;
}

interface ServicioContent {
  title: string;
  intro: string;
  callLabel: string;
  items: ServiceItem[];
  closing: string;
}

const ITEM_ICONS: Record<string, LucideIcon> = {
  ice:         IceCream2,
  pillow:      BedDouble,
  temperature: Thermometer,
  laundry:     Shirt,
  towel:       Bath,
  other:       HelpCircle,
};

const CONTENT: Record<string, ServicioContent> = {
  es: {
    title: "Room Service",
    intro: "En La Fonda de los Príncipes estamos aquí para hacer su estancia perfecta. Si necesita cualquier cosa durante su estancia, no dude en contactar con recepción.",
    callLabel: "Contactar con recepción",
    items: [
      { iconKey: "ice",         label: "Hielo" },
      { iconKey: "pillow",      label: "Almohada extra" },
      { iconKey: "temperature", label: "Manta adicional" },
      { iconKey: "laundry",     label: "Servicio de lavandería" },
      { iconKey: "towel",       label: "Toallas" },
      { iconKey: "other",       label: "Cualquier otra cosa" },
    ],
    closing: "Estamos disponibles las 24 horas. Su comodidad es nuestra prioridad.",
  },
  en: {
    title: "Room Service",
    intro: "At La Fonda de los Príncipes we are here to make your stay perfect. If you need anything during your stay, please don't hesitate to contact reception.",
    callLabel: "Contact reception",
    items: [
      { iconKey: "ice",         label: "Ice" },
      { iconKey: "pillow",      label: "Extra pillow" },
      { iconKey: "temperature", label: "Extra blanket" },
      { iconKey: "laundry",     label: "Laundry service" },
      { iconKey: "towel",       label: "Towels" },
      { iconKey: "other",       label: "Anything else" },
    ],
    closing: "We are available 24 hours a day. Your comfort is our priority.",
  },
  fr: {
    title: "Room Service",
    intro: "À La Fonda de los Príncipes, nous sommes là pour rendre votre séjour parfait. Si vous avez besoin de quoi que ce soit, n'hésitez pas à contacter la réception.",
    callLabel: "Contacter la réception",
    items: [
      { iconKey: "ice",         label: "Glace" },
      { iconKey: "pillow",      label: "Oreiller supplémentaire" },
      { iconKey: "temperature", label: "Couverture supplémentaire" },
      { iconKey: "laundry",     label: "Service de blanchisserie" },
      { iconKey: "towel",       label: "Serviettes" },
      { iconKey: "other",       label: "Autre chose" },
    ],
    closing: "Nous sommes disponibles 24h/24. Votre confort est notre priorité.",
  },
  de: {
    title: "Room Service",
    intro: "Im La Fonda de los Príncipes sind wir da, um Ihren Aufenthalt perfekt zu machen. Wenn Sie etwas benötigen, zögern Sie nicht, die Rezeption zu kontaktieren.",
    callLabel: "Rezeption kontaktieren",
    items: [
      { iconKey: "ice",         label: "Eis" },
      { iconKey: "pillow",      label: "Zusätzliches Kissen" },
      { iconKey: "temperature", label: "Zusätzliche Decke" },
      { iconKey: "laundry",     label: "Wäscheservice" },
      { iconKey: "towel",       label: "Handtücher" },
      { iconKey: "other",       label: "Sonstiges" },
    ],
    closing: "Wir sind rund um die Uhr erreichbar. Ihr Komfort hat für uns Priorität.",
  },
  it: {
    title: "Room Service",
    intro: "Al La Fonda de los Príncipes siamo qui per rendere il vostro soggiorno perfetto. Se avete bisogno di qualcosa, non esitate a contattare la reception.",
    callLabel: "Contatta la reception",
    items: [
      { iconKey: "ice",         label: "Ghiaccio" },
      { iconKey: "pillow",      label: "Cuscino extra" },
      { iconKey: "temperature", label: "Coperta extra" },
      { iconKey: "laundry",     label: "Servizio lavanderia" },
      { iconKey: "towel",       label: "Asciugamani" },
      { iconKey: "other",       label: "Qualsiasi altra cosa" },
    ],
    closing: "Siamo disponibili 24 ore su 24. Il vostro comfort è la nostra priorità.",
  },
  pt: {
    title: "Room Service",
    intro: "No La Fonda de los Príncipes estamos aqui para tornar a sua estadia perfeita. Se precisar de qualquer coisa, não hesite em contactar a receção.",
    callLabel: "Contactar a receção",
    items: [
      { iconKey: "ice",         label: "Gelo" },
      { iconKey: "pillow",      label: "Almofada extra" },
      { iconKey: "temperature", label: "Cobertor extra" },
      { iconKey: "laundry",     label: "Serviço de lavandaria" },
      { iconKey: "towel",       label: "Toalhas" },
      { iconKey: "other",       label: "Qualquer outra coisa" },
    ],
    closing: "Estamos disponíveis 24 horas por dia. O seu conforto é a nossa prioridade.",
  },
  zh: {
    title: "客房服务",
    intro: "在王子客栈，我们随时为您提供完美的住宿体验。如有任何需要，请随时联系前台。",
    callLabel: "联系前台",
    items: [
      { iconKey: "ice",         label: "冰块" },
      { iconKey: "pillow",      label: "额外枕头" },
      { iconKey: "temperature", label: "额外毯子" },
      { iconKey: "laundry",     label: "洗衣服务" },
      { iconKey: "towel",       label: "毛巾" },
      { iconKey: "other",       label: "其他需求" },
    ],
    closing: "我们24小时为您服务。您的舒适是我们的首要任务。",
  },
  ja: {
    title: "ルームサービス",
    intro: "ラ・フォンダ・デ・ロス・プリンシペスでは、お客様の滞在を完璧なものにするためにここにいます。何かご要望がございましたら、遠慮なくフロントにご連絡ください。",
    callLabel: "フロントに連絡する",
    items: [
      { iconKey: "ice",         label: "氷" },
      { iconKey: "pillow",      label: "枕の追加" },
      { iconKey: "temperature", label: "毛布の追加" },
      { iconKey: "laundry",     label: "ランドリーサービス" },
      { iconKey: "towel",       label: "タオル" },
      { iconKey: "other",       label: "その他のご要望" },
    ],
    closing: "24時間対応しております。お客様の快適さが私たちの最優先事項です。",
  },
  ar: {
    title: "خدمة الغرف",
    intro: "في لا فوندا دي لوس برينسيبيس، نحن هنا لجعل إقامتك مثالية. إذا احتجت إلى أي شيء، لا تتردد في التواصل مع الاستقبال.",
    callLabel: "التواصل مع الاستقبال",
    items: [
      { iconKey: "ice",         label: "ثلج" },
      { iconKey: "pillow",      label: "وسادة إضافية" },
      { iconKey: "temperature", label: "بطانية إضافية" },
      { iconKey: "laundry",     label: "خدمة الغسيل" },
      { iconKey: "towel",       label: "مناشف" },
      { iconKey: "other",       label: "أي شيء آخر" },
    ],
    closing: "نحن متاحون على مدار 24 ساعة. راحتك هي أولويتنا.",
  },
  ru: {
    title: "Обслуживание номеров",
    intro: "В Ла Фонда де лос Принсипес мы здесь, чтобы сделать ваше пребывание идеальным. Если вам что-то нужно, не стесняйтесь связаться с ресепшн.",
    callLabel: "Связаться с ресепшн",
    items: [
      { iconKey: "ice",         label: "Лёд" },
      { iconKey: "pillow",      label: "Дополнительная подушка" },
      { iconKey: "temperature", label: "Дополнительное одеяло" },
      { iconKey: "laundry",     label: "Услуги прачечной" },
      { iconKey: "towel",       label: "Полотенца" },
      { iconKey: "other",       label: "Что-то ещё" },
    ],
    closing: "Мы доступны круглосуточно. Ваш комфорт — наш приоритет.",
  },
};

export default function ServicioHabitacionesPage({ onBack, onContacto }: ServicioHabitacionesPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#0A0A0A",
        color: "oklch(0.90 0.025 85)",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.25rem 0",
        }}
      >
        <BackButton onClick={onBack} />
        <img src={LOGO_BLANCO} alt="La Fonda de los Príncipes" className="h-8" style={{ opacity: 0.85 }} />
        <LanguageSelector />
      </header>

      {/* Content */}
      <main style={{ padding: "1.5rem 1.25rem 3rem", flex: 1 }}>
        {/* Title */}
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "1.75rem",
            color: "oklch(0.90 0.025 85)",
            lineHeight: 1.2,
          }}
        >
          {content.title}
        </h1>

        {/* Gold divider */}
        <div
          className="mb-6"
          style={{ width: 40, height: 1, backgroundColor: "var(--gold)", opacity: 0.6 }}
        />

        {/* Intro */}
        <p
          className="mb-8"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.93rem",
            color: "oklch(0.68 0.015 85)",
            lineHeight: 1.75,
          }}
        >
          {content.intro}
        </p>

        {/* Items grid */}
        <div
          className="mb-8"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          {content.items.map((item, i) => {
            const IconComp = ITEM_ICONS[item.iconKey];
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 0.75rem",
                  border: "1px solid oklch(0.14 0.01 72)",
                  borderRadius: "2px",
                  textAlign: "center",
                }}
              >
                <IconComp size={20} strokeWidth={1.25} style={{ color: "var(--gold)", opacity: 0.85 }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "oklch(0.68 0.015 85)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Contact button */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); onContacto(); }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            width: "100%",
            padding: "0.9rem 1.5rem",
            backgroundColor: "transparent",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: "2px",
            marginBottom: "1.5rem",
          }}
        >
          <Phone size={16} strokeWidth={1.5} />
          {content.callLabel}
        </button>

        {/* Closing note */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.82rem",
            color: "oklch(0.50 0.010 85)",
            lineHeight: 1.7,
            textAlign: "center",
          }}
        >
          {content.closing}
        </p>
      </main>
    </div>
  );
}
