/*
 * ServicioHabitacionesPage — "Noche en Sol" design
 * Room Service: contactar con recepción para cualquier necesidad
 */
import { Phone, IceCream2, BedDouble, Thermometer, Shirt, Bath, HelpCircle, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface ServicioHabitacionesPageProps { onBack: () => void; onContacto: () => void; }
interface ServiceItem { iconKey: string; label: string; }
interface ServicioContent { title: string; intro: string; callLabel: string; items: ServiceItem[]; closing: string; }

const ITEM_ICONS: Record<string, LucideIcon> = { ice: IceCream2, pillow: BedDouble, temperature: Thermometer, laundry: Shirt, towel: Bath, other: HelpCircle };

const CONTENT: Record<string, ServicioContent> = {
  es: { title: "Room Service", intro: "En La Fonda de los Príncipes estamos aquí para hacer tu estancia perfecta. Pulsa la tecla con el icono del camarero en el teléfono de tu habitación para contactar directamente con nosotros.", callLabel: "Contactar con recepción", items: [{ iconKey: "ice", label: "Hielo" }, { iconKey: "pillow", label: "Almohada extra" }, { iconKey: "temperature", label: "Manta adicional" }, { iconKey: "laundry", label: "Servicio de lavandería" }, { iconKey: "towel", label: "Toallas" }, { iconKey: "other", label: "Cualquier otra cosa" }], closing: "Estamos disponibles las 24 horas. Su comodidad es nuestra prioridad." },
  en: { title: "Room Service", intro: "At La Fonda de los Príncipes we are here to make your stay perfect. Press the waiter icon key on your room phone to reach us directly.", callLabel: "Contact reception", items: [{ iconKey: "ice", label: "Ice" }, { iconKey: "pillow", label: "Extra pillow" }, { iconKey: "temperature", label: "Extra blanket" }, { iconKey: "laundry", label: "Laundry service" }, { iconKey: "towel", label: "Towels" }, { iconKey: "other", label: "Anything else" }], closing: "We are available 24 hours a day. Your comfort is our priority." },
  fr: { title: "Room Service", intro: "À La Fonda de los Príncipes, nous sommes là pour rendre votre séjour parfait. Appuyez sur la touche avec l'icône du serveur sur le téléphone de votre chambre pour nous contacter directement.", callLabel: "Contacter la réception", items: [{ iconKey: "ice", label: "Glace" }, { iconKey: "pillow", label: "Oreiller supplémentaire" }, { iconKey: "temperature", label: "Couverture supplémentaire" }, { iconKey: "laundry", label: "Service de blanchisserie" }, { iconKey: "towel", label: "Serviettes" }, { iconKey: "other", label: "Autre chose" }], closing: "Nous sommes disponibles 24h/24. Votre confort est notre priorité." },
  de: { title: "Room Service", intro: "Im La Fonda de los Príncipes sind wir da, um Ihren Aufenthalt perfekt zu machen. Drücken Sie die Taste mit dem Kellner-Symbol auf dem Zimmertelefon, um uns direkt zu erreichen.", callLabel: "Rezeption kontaktieren", items: [{ iconKey: "ice", label: "Eis" }, { iconKey: "pillow", label: "Zusätzliches Kissen" }, { iconKey: "temperature", label: "Zusätzliche Decke" }, { iconKey: "laundry", label: "Wäscheservice" }, { iconKey: "towel", label: "Handtücher" }, { iconKey: "other", label: "Sonstiges" }], closing: "Wir sind rund um die Uhr erreichbar. Ihr Komfort hat für uns Priorität." },
  it: { title: "Room Service", intro: "Al La Fonda de los Príncipes siamo qui per rendere il vostro soggiorno perfetto. Premi il tasto con l'icona del cameriere sul telefono della tua camera per contattarci direttamente.", callLabel: "Contatta la reception", items: [{ iconKey: "ice", label: "Ghiaccio" }, { iconKey: "pillow", label: "Cuscino extra" }, { iconKey: "temperature", label: "Coperta extra" }, { iconKey: "laundry", label: "Servizio lavanderia" }, { iconKey: "towel", label: "Asciugamani" }, { iconKey: "other", label: "Qualsiasi altra cosa" }], closing: "Siamo disponibili 24 ore su 24. Il vostro comfort è la nostra priorità." },
  pt: { title: "Room Service", intro: "No La Fonda de los Príncipes estamos aqui para tornar a sua estadia perfeita. Prima a tecla com o ícone do empregado de mesa no telefone do seu quarto para nos contactar diretamente.", callLabel: "Contactar a receção", items: [{ iconKey: "ice", label: "Gelo" }, { iconKey: "pillow", label: "Almofada extra" }, { iconKey: "temperature", label: "Cobertor extra" }, { iconKey: "laundry", label: "Serviço de lavandaria" }, { iconKey: "towel", label: "Toalhas" }, { iconKey: "other", label: "Qualquer outra coisa" }], closing: "Estamos disponíveis 24 horas por dia. O seu conforto é a nossa prioridade." },
  zh: { title: "客房服务", intro: "在王子客栈，我们随时为您提供完美的住宿体验。请按下房间电话上的服务员图标键直接联系我们。", callLabel: "联系前台", items: [{ iconKey: "ice", label: "冰块" }, { iconKey: "pillow", label: "额外枕头" }, { iconKey: "temperature", label: "额外毯子" }, { iconKey: "laundry", label: "洗衣服务" }, { iconKey: "towel", label: "毛巾" }, { iconKey: "other", label: "其他需求" }], closing: "我们24小时为您服务。您的舒适是我们的首要任务。" },
  ja: { title: "ルームサービス", intro: "ラ・フォンダ・デ・ロス・プリンシペスでは、お客様の滞在を完璧なものにするためにここにいます。お部屋の電話のウェイターアイコンキーを押すと直接つながります。", callLabel: "フロントに連絡する", items: [{ iconKey: "ice", label: "氷" }, { iconKey: "pillow", label: "枕の追加" }, { iconKey: "temperature", label: "毛布の追加" }, { iconKey: "laundry", label: "ランドリーサービス" }, { iconKey: "towel", label: "タオル" }, { iconKey: "other", label: "その他のご要望" }], closing: "24時間対応しております。お客様の快適さが私たちの最優先事項です。" },
  ar: { title: "خدمة الغرف", intro: "في لا فوندا دي لوس برينسيبيس، نحن هنا لجعل إقامتك مثالية. اضغط على مفتاح أيقونة النادل على هاتف الغرفة للتواصل معنا مباشرة.", callLabel: "التواصل مع الاستقبال", items: [{ iconKey: "ice", label: "ثلج" }, { iconKey: "pillow", label: "وسادة إضافية" }, { iconKey: "temperature", label: "بطانية إضافية" }, { iconKey: "laundry", label: "خدمة الغسيل" }, { iconKey: "towel", label: "مناشف" }, { iconKey: "other", label: "أي شيء آخر" }], closing: "نحن متاحون على مدار 24 ساعة. راحتك هي أولويتنا." },
  ru: { title: "Обслуживание номеров", intro: "В Ла Фонда де лос Принсипес мы здесь, чтобы сделать ваше пребывание идеальным. Нажмите кнопку с иконкой официанта на телефоне в номере, чтобы связаться с нами напрямую.", callLabel: "Связаться с ресепшн", items: [{ iconKey: "ice", label: "Лёд" }, { iconKey: "pillow", label: "Дополнительная подушка" }, { iconKey: "temperature", label: "Дополнительное одеяло" }, { iconKey: "laundry", label: "Услуги прачечной" }, { iconKey: "towel", label: "Полотенца" }, { iconKey: "other", label: "Что-то ещё" }], closing: "Мы доступны круглосуточно. Ваш комфорт — наш приоритет." },
};

export default function ServicioHabitacionesPage({ onBack, onContacto }: ServicioHabitacionesPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{content.title}</PageTitle>

      <p style={{ ...ps.muted, lineHeight: 1.75, marginBottom: "2rem" }}>{content.intro}</p>

      {/* Items grid */}
      <div className="mb-8" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {content.items.map((item, i) => {
          const IconComp = ITEM_ICONS[item.iconKey];
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", padding: "1rem 0.75rem", border: "1px solid var(--border)", borderRadius: "2px", textAlign: "center" }}>
              <IconComp size={20} strokeWidth={1.25} style={{ color: "var(--gold)", opacity: 0.85 }} />
              <span style={{ ...ps.body, fontWeight: 300, fontSize: "0.9rem", color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Contact button */}
      <button onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); onContacto(); }}
        className="w-full mb-6 rounded-sm cursor-pointer transition-all duration-200"
        style={{ ...ps.actionButton, background: "transparent", border: "1px solid var(--gold)", color: "var(--gold)" }}>
        <Phone size={16} strokeWidth={1.5} />
        {content.callLabel}
      </button>

      <p style={{ ...ps.muted, textAlign: "center", fontSize: "0.9rem" }}>{content.closing}</p>
    </PageLayout>
  );
}
