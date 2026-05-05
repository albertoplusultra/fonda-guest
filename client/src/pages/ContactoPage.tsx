/*
 * ContactoPage — "Noche en Sol" design
 * Tres métodos de contacto:
 *   1. Desde tu habitación (marcar el 9)
 *   2. Desde tu móvil (llamada directa)
 *   3. WhatsApp
 */
import { PhoneCall } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

const PHONE_NUMBER   = "+34919891469";
const PHONE_DISPLAY  = "+34 919 891 469";
const WA_NUMBER      = "34919891469";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--gold)" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

const CONTACT_COPY: Record<string, {
  title: string;
  room_label: string;
  room_instruction: string;
  mobile_label: string;
  mobile_instruction: string;
  call_button: string;
  wa_label: string;
  wa_instruction: string;
  wa_button: string;
}> = {
  es: {
    title: "Llámanos",
    room_label: "Desde tu habitación",
    room_instruction: "Marca el 9 en el teléfono de tu habitación para hablar directamente con recepción.",
    mobile_label: "Desde tu móvil",
    mobile_instruction: "Llámanos directamente desde tu móvil.",
    call_button: "Llamar a recepción",
    wa_label: "WhatsApp",
    wa_instruction: "Escríbenos por WhatsApp y te respondemos enseguida.",
    wa_button: "Enviar WhatsApp",
  },
  en: {
    title: "Call Us",
    room_label: "From your room",
    room_instruction: "Dial 9 on your room phone to speak directly with reception.",
    mobile_label: "From your mobile",
    mobile_instruction: "Call us directly from your mobile phone.",
    call_button: "Call reception",
    wa_label: "WhatsApp",
    wa_instruction: "Send us a WhatsApp message and we'll reply right away.",
    wa_button: "Send WhatsApp",
  },
  fr: {
    title: "Appelez-nous",
    room_label: "Depuis votre chambre",
    room_instruction: "Composez le 9 sur le téléphone de votre chambre pour parler directement à la réception.",
    mobile_label: "Depuis votre mobile",
    mobile_instruction: "Appelez-nous directement depuis votre mobile.",
    call_button: "Appeler la réception",
    wa_label: "WhatsApp",
    wa_instruction: "Envoyez-nous un message WhatsApp, nous répondons rapidement.",
    wa_button: "Envoyer WhatsApp",
  },
  de: {
    title: "Rufen Sie uns an",
    room_label: "Aus Ihrem Zimmer",
    room_instruction: "Wählen Sie die 9 auf dem Zimmertelefon, um direkt mit der Rezeption zu sprechen.",
    mobile_label: "Von Ihrem Handy",
    mobile_instruction: "Rufen Sie uns direkt von Ihrem Handy an.",
    call_button: "Rezeption anrufen",
    wa_label: "WhatsApp",
    wa_instruction: "Schreiben Sie uns per WhatsApp, wir antworten sofort.",
    wa_button: "WhatsApp senden",
  },
  it: {
    title: "Chiamaci",
    room_label: "Dalla tua camera",
    room_instruction: "Componi il 9 sul telefono della tua camera per parlare direttamente con la reception.",
    mobile_label: "Dal tuo cellulare",
    mobile_instruction: "Chiamaci direttamente dal tuo cellulare.",
    call_button: "Chiama la reception",
    wa_label: "WhatsApp",
    wa_instruction: "Scrivici su WhatsApp, ti risponderemo subito.",
    wa_button: "Invia WhatsApp",
  },
  pt: {
    title: "Ligue para nós",
    room_label: "Do seu quarto",
    room_instruction: "Marque o 9 no telefone do seu quarto para falar diretamente com a recepção.",
    mobile_label: "Do seu telemóvel",
    mobile_instruction: "Ligue-nos diretamente do seu telemóvel.",
    call_button: "Ligar para a recepção",
    wa_label: "WhatsApp",
    wa_instruction: "Envie-nos uma mensagem no WhatsApp, respondemos de imediato.",
    wa_button: "Enviar WhatsApp",
  },
  zh: {
    title: "致电我们",
    room_label: "从您的房间",
    room_instruction: "拨打房间电话的9号键，直接与前台通话。",
    mobile_label: "从您的手机",
    mobile_instruction: "直接从您的手机拨打给我们。",
    call_button: "致电前台",
    wa_label: "WhatsApp",
    wa_instruction: "通过WhatsApp给我们发消息，我们会立即回复。",
    wa_button: "发送WhatsApp",
  },
  ja: {
    title: "お電話ください",
    room_label: "お部屋から",
    room_instruction: "お部屋の電話で9番を押すと、フロントに直接つながります。",
    mobile_label: "携帯電話から",
    mobile_instruction: "携帯電話から直接お電話ください。",
    call_button: "フロントに電話する",
    wa_label: "WhatsApp",
    wa_instruction: "WhatsAppでメッセージをお送りください。すぐにご返信します。",
    wa_button: "WhatsAppを送る",
  },
  ar: {
    title: "اتصل بنا",
    room_label: "من غرفتك",
    room_instruction: "اضغط 9 على هاتف الغرفة للتحدث مباشرة مع الاستقبال.",
    mobile_label: "من هاتفك المحمول",
    mobile_instruction: "اتصل بنا مباشرة من هاتفك المحمول.",
    call_button: "الاتصال بالاستقبال",
    wa_label: "واتساب",
    wa_instruction: "أرسل لنا رسالة عبر واتساب وسنرد فوراً.",
    wa_button: "إرسال واتساب",
  },
  ru: {
    title: "Позвоните нам",
    room_label: "Из вашего номера",
    room_instruction: "Наберите 9 на телефоне в номере, чтобы напрямую связаться с ресепшн.",
    mobile_label: "С вашего мобильного",
    mobile_instruction: "Позвоните нам напрямую с вашего мобильного.",
    call_button: "Позвонить на ресепшн",
    wa_label: "WhatsApp",
    wa_instruction: "Напишите нам в WhatsApp — ответим сразу.",
    wa_button: "Написать в WhatsApp",
  },
};

const cardStyle: React.CSSProperties = {
  background: "oklch(0.11 0 0)",
  border: "1px solid oklch(0.20 0.012 72)",
};

const iconBoxStyle: React.CSSProperties = {
  background: "oklch(0.15 0.01 72)",
  border: "1px solid oklch(0.25 0.015 72)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 500,
  fontSize: "0.8rem",
  color: "var(--gold)",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  fontSize: "0.95rem",
  color: "oklch(0.72 0.015 85)",
  lineHeight: 1.7,
  marginBottom: "1.25rem",
};

interface ContactoPageProps {
  onBack: () => void;
}

export default function ContactoPage({ onBack }: ContactoPageProps) {
  const { lang, t } = useLanguage();
  const copy = CONTACT_COPY[lang] ?? CONTACT_COPY["es"];
  const isRtl = lang === "ar";

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
      <main className="flex-1 px-6 pt-10 pb-12">
        {/* Title */}
        <h1
          className="mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
            color: "oklch(0.96 0.025 85)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {copy.title}
        </h1>

        {/* Gold divider */}
        <div
          className="mb-8"
          style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", width: "60%" }}
        />

        {/* Card 1: Room phone */}
        <div className="rounded-sm mb-4 p-5" style={cardStyle}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0" style={iconBoxStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span style={labelStyle}>{copy.room_label}</span>
          </div>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>{copy.room_instruction}</p>
        </div>

        {/* Card 2: Mobile call */}
        <div className="rounded-sm mb-4 p-5" style={cardStyle}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0" style={iconBoxStyle}>
              <PhoneCall size={18} strokeWidth={1.4} style={{ color: "var(--gold)" }} />
            </div>
            <span style={labelStyle}>{copy.mobile_label}</span>
          </div>
          <p style={bodyStyle}>{copy.mobile_instruction}</p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-2.5 w-full rounded-sm transition-all duration-200"
            style={{
              background: "var(--gold)",
              color: "oklch(0.08 0 0)",
              padding: "0.85rem 1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.82 0.08 72)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)"; }}
          >
            <PhoneCall size={16} strokeWidth={1.8} />
            {copy.call_button}
          </a>
          <p className="text-center mt-3" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: "0.78rem", color: "oklch(0.40 0.01 85)", letterSpacing: "0.06em",
          }}>
            {PHONE_DISPLAY}
          </p>
        </div>

        {/* Card 3: WhatsApp */}
        <div className="rounded-sm p-5" style={cardStyle}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0" style={iconBoxStyle}>
              <WhatsAppIcon size={20} />
            </div>
            <span style={labelStyle}>{copy.wa_label}</span>
          </div>
          <p style={bodyStyle}>{copy.wa_instruction}</p>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full rounded-sm transition-all duration-200"
            style={{
              background: "#25D366",
              color: "#fff",
              padding: "0.85rem 1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1ebe5d"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#25D366"; }}
          >
            <WhatsAppIcon size={16} />
            {copy.wa_button}
          </a>
          <p className="text-center mt-3" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: "0.78rem", color: "oklch(0.40 0.01 85)", letterSpacing: "0.06em",
          }}>
            {PHONE_DISPLAY}
          </p>
        </div>
      </main>
    </div>
  );
}
