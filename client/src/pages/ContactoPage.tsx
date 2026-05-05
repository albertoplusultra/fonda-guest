/*
 * ContactoPage — "Noche en Sol" design
 * Dos métodos de contacto: habitación (tecla recepción) y móvil (llamar + WhatsApp)
 */
import { PhoneCall } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import InfoCard from "@/components/InfoCard";
import { ps } from "@/lib/pageStyles";

const PHONE_NUMBER  = "+34919891469";
const PHONE_DISPLAY = "+34 919 891 469";
const WA_NUMBER     = "34919891469";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--gold)" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

/** Icono de tecla de recepción — estilo Noche en Sol */
function ReceptionKeyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mesa / mostrador */}
      <line x1="2" y1="18" x2="22" y2="18" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="4" y="15" width="16" height="3" rx="0.6" stroke="var(--gold)" strokeWidth="1.3" fill="none"/>
      {/* Recepcionista — cabeza */}
      <circle cx="12" cy="8" r="2.2" stroke="var(--gold)" strokeWidth="1.3" fill="none"/>
      {/* Recepcionista — cuerpo */}
      <path d="M8 15 Q8 12 12 12 Q16 12 16 15" stroke="var(--gold)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* Huésped — cabeza */}
      <circle cx="5.5" cy="11.5" r="1.6" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
      {/* Huésped — cuerpo */}
      <path d="M3 18 Q3 15 5.5 15 Q8 15 8 18" stroke="var(--gold)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

const CONTACT_COPY: Record<string, {
  title: string;
  room_label: string; room_instruction: string;
  mobile_label: string; mobile_instruction: string;
  call_button: string; wa_button: string;
}> = {
  es: {
    title: "Contacta con nosotros",
    room_label: "Desde tu habitación",
    room_instruction: "Pulsa la tecla con el icono de recepción en el teléfono de tu habitación para hablar directamente con nosotros.",
    mobile_label: "Desde tu móvil",
    mobile_instruction: `Llámanos o envíanos un WhatsApp al ${PHONE_DISPLAY}`,
    call_button: "Llamar",
    wa_button: "WhatsApp",
  },
  en: {
    title: "Contact Us",
    room_label: "From your room",
    room_instruction: "Press the reception icon key on your room phone to speak directly with us.",
    mobile_label: "From your mobile",
    mobile_instruction: `Call us or send us a WhatsApp to ${PHONE_DISPLAY}`,
    call_button: "Call",
    wa_button: "WhatsApp",
  },
  fr: {
    title: "Contactez-nous",
    room_label: "Depuis votre chambre",
    room_instruction: "Appuyez sur la touche avec l'icône réception sur le téléphone de votre chambre pour nous parler directement.",
    mobile_label: "Depuis votre mobile",
    mobile_instruction: `Appelez-nous ou envoyez-nous un WhatsApp au ${PHONE_DISPLAY}`,
    call_button: "Appeler",
    wa_button: "WhatsApp",
  },
  de: {
    title: "Kontaktieren Sie uns",
    room_label: "Aus Ihrem Zimmer",
    room_instruction: "Drücken Sie die Taste mit dem Rezeptionssymbol auf dem Zimmertelefon, um direkt mit uns zu sprechen.",
    mobile_label: "Von Ihrem Handy",
    mobile_instruction: `Rufen Sie uns an oder schreiben Sie uns per WhatsApp: ${PHONE_DISPLAY}`,
    call_button: "Anrufen",
    wa_button: "WhatsApp",
  },
  it: {
    title: "Contattaci",
    room_label: "Dalla tua camera",
    room_instruction: "Premi il tasto con l'icona della reception sul telefono della tua camera per parlarci direttamente.",
    mobile_label: "Dal tuo cellulare",
    mobile_instruction: `Chiamaci o inviaci un WhatsApp al ${PHONE_DISPLAY}`,
    call_button: "Chiama",
    wa_button: "WhatsApp",
  },
  pt: {
    title: "Contacte-nos",
    room_label: "Do seu quarto",
    room_instruction: "Prima a tecla com o ícone da receção no telefone do seu quarto para falar diretamente connosco.",
    mobile_label: "Do seu telemóvel",
    mobile_instruction: `Ligue-nos ou envie-nos um WhatsApp para ${PHONE_DISPLAY}`,
    call_button: "Ligar",
    wa_button: "WhatsApp",
  },
  zh: {
    title: "联系我们",
    room_label: "从您的房间",
    room_instruction: "按下房间电话上的前台图标键，直接与我们通话。",
    mobile_label: "从您的手机",
    mobile_instruction: `致电或发送WhatsApp至 ${PHONE_DISPLAY}`,
    call_button: "致电",
    wa_button: "WhatsApp",
  },
  ja: {
    title: "お問い合わせ",
    room_label: "お部屋から",
    room_instruction: "お部屋の電話のフロントアイコンキーを押すと、直接つながります。",
    mobile_label: "携帯電話から",
    mobile_instruction: `${PHONE_DISPLAY} にお電話またはWhatsAppをお送りください`,
    call_button: "電話する",
    wa_button: "WhatsApp",
  },
  ar: {
    title: "تواصل معنا",
    room_label: "من غرفتك",
    room_instruction: "اضغط على مفتاح أيقونة الاستقبال على هاتف الغرفة للتحدث معنا مباشرة.",
    mobile_label: "من هاتفك المحمول",
    mobile_instruction: `اتصل بنا أو أرسل رسالة واتساب على ${PHONE_DISPLAY}`,
    call_button: "اتصال",
    wa_button: "واتساب",
  },
  ru: {
    title: "Свяжитесь с нами",
    room_label: "Из вашего номера",
    room_instruction: "Нажмите кнопку с иконкой ресепшн на телефоне в номере, чтобы напрямую связаться с нами.",
    mobile_label: "С вашего мобильного",
    mobile_instruction: `Позвоните нам или напишите в WhatsApp: ${PHONE_DISPLAY}`,
    call_button: "Позвонить",
    wa_button: "WhatsApp",
  },
};

const iconBoxStyle: React.CSSProperties = {
  background: "var(--muted)", border: "1px solid var(--border)",
};

const goldBtnStyle: React.CSSProperties = {
  ...ps.actionButton,
  textDecoration: "none",
  flex: 1,
};

interface ContactoPageProps { onBack: () => void; }

export default function ContactoPage({ onBack }: ContactoPageProps) {
  const { lang } = useLanguage();
  const copy = CONTACT_COPY[lang] ?? CONTACT_COPY["es"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{copy.title}</PageTitle>

      {/* Card 1: Room phone */}
      <InfoCard style={{ marginBottom: "1rem", padding: "1.25rem" }}>
        <div style={ps.iconRow}>
          <div className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0" style={iconBoxStyle}>
            <ReceptionKeyIcon size={20} />
          </div>
          <span style={{ ...ps.sectionLabel, marginBottom: 0 }}>{copy.room_label}</span>
        </div>
        <p style={{ ...ps.muted, margin: 0 }}>{copy.room_instruction}</p>
      </InfoCard>

      {/* Card 2: Mobile — llamar + WhatsApp en la misma fila */}
      <InfoCard style={{ padding: "1.25rem" }}>
        <div style={ps.iconRow}>
          <div className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0" style={iconBoxStyle}>
            <PhoneCall size={18} strokeWidth={1.4} style={{ color: "var(--gold)" }} />
          </div>
          <span style={{ ...ps.sectionLabel, marginBottom: 0 }}>{copy.mobile_label}</span>
        </div>
        <p style={{ ...ps.muted, marginBottom: "1.25rem" }}>{copy.mobile_instruction}</p>
        <div className="flex gap-3">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-2 rounded-sm transition-all duration-200"
            style={goldBtnStyle}
          >
            <PhoneCall size={15} strokeWidth={1.8} />
            {copy.call_button}
          </a>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm transition-all duration-200"
            style={goldBtnStyle}
          >
            <WhatsAppIcon size={15} />
            {copy.wa_button}
          </a>
        </div>
      </InfoCard>
    </PageLayout>
  );
}
