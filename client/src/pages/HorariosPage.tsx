/*
 * HorariosPage — "Noche en Sol" design
 * Horarios del hotel: recepción 24h, check-in/out, desayuno, bar & restaurante
 */
import { Clock, Luggage } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import InfoCard from "@/components/InfoCard";
import { ps } from "@/lib/pageStyles";

interface HorariosPageProps {
  onBack: () => void;
}

interface ScheduleRow {
  label: string;
  value?: string;
  rows?: { sublabel: string; value: string }[];
}

const SCHEDULE_DATA: Record<string, ScheduleRow[]> = {
  es: [
    { label: "Recepción",         value: "24 horas" },
    { label: "Check-in",          value: "15:00 h" },
    { label: "Check-out",         value: "12:00 h" },
    { label: "Desayuno",          rows: [
      { sublabel: "Lun – Vie",    value: "07:00 – 10:30 h" },
      { sublabel: "Sáb, Dom y festivos", value: "07:00 – 11:00 h" },
    ]},
    { label: "Bar & Restaurante", rows: [
      { sublabel: "Lun – Vie",    value: "11:00 – 00:00 h" },
      { sublabel: "Sáb, Dom y festivos", value: "11:30 – 00:00 h" },
    ]},
  ],
  en: [
    { label: "Reception",         value: "24 hours" },
    { label: "Check-in",          value: "3:00 PM" },
    { label: "Check-out",         value: "12:00 PM" },
    { label: "Breakfast",         rows: [
      { sublabel: "Mon – Fri",    value: "7:00 – 10:30 AM" },
      { sublabel: "Sat, Sun & holidays", value: "7:00 – 11:00 AM" },
    ]},
    { label: "Bar & Restaurant",  rows: [
      { sublabel: "Mon – Fri",    value: "11:00 AM – midnight" },
      { sublabel: "Sat, Sun & holidays", value: "11:30 AM – midnight" },
    ]},
  ],
  fr: [
    { label: "Réception",         value: "24 heures" },
    { label: "Arrivée",           value: "15h00" },
    { label: "Départ",            value: "12h00" },
    { label: "Petit-déjeuner",    rows: [
      { sublabel: "Lun – Ven",    value: "07h00 – 10h30" },
      { sublabel: "Sam, Dim et jours fériés", value: "07h00 – 11h00" },
    ]},
    { label: "Bar & Restaurant",  rows: [
      { sublabel: "Lun – Ven",    value: "11h00 – 00h00" },
      { sublabel: "Sam, Dim et jours fériés", value: "11h30 – 00h00" },
    ]},
  ],
  de: [
    { label: "Rezeption",         value: "24 Stunden" },
    { label: "Check-in",          value: "15:00 Uhr" },
    { label: "Check-out",         value: "12:00 Uhr" },
    { label: "Frühstück",         rows: [
      { sublabel: "Mo – Fr",      value: "07:00 – 10:30 Uhr" },
      { sublabel: "Sa, So und Feiertage", value: "07:00 – 11:00 Uhr" },
    ]},
    { label: "Bar & Restaurant",  rows: [
      { sublabel: "Mo – Fr",      value: "11:00 – 00:00 Uhr" },
      { sublabel: "Sa, So und Feiertage", value: "11:30 – 00:00 Uhr" },
    ]},
  ],
  it: [
    { label: "Reception",         value: "24 ore" },
    { label: "Check-in",          value: "15:00" },
    { label: "Check-out",         value: "12:00" },
    { label: "Colazione",         rows: [
      { sublabel: "Lun – Ven",    value: "07:00 – 10:30" },
      { sublabel: "Sab, Dom e festivi", value: "07:00 – 11:00" },
    ]},
    { label: "Bar & Ristorante",  rows: [
      { sublabel: "Lun – Ven",    value: "11:00 – 00:00" },
      { sublabel: "Sab, Dom e festivi", value: "11:30 – 00:00" },
    ]},
  ],
  pt: [
    { label: "Recepção",          value: "24 horas" },
    { label: "Check-in",          value: "15h00" },
    { label: "Check-out",         value: "12h00" },
    { label: "Café da manhã",     rows: [
      { sublabel: "Seg – Sex",    value: "07h00 – 10h30" },
      { sublabel: "Sáb, Dom e feriados", value: "07h00 – 11h00" },
    ]},
    { label: "Bar & Restaurante", rows: [
      { sublabel: "Seg – Sex",    value: "11h00 – 00h00" },
      { sublabel: "Sáb, Dom e feriados", value: "11h30 – 00h00" },
    ]},
  ],
  zh: [
    { label: "前台",               value: "24小时" },
    { label: "入住",               value: "15:00" },
    { label: "退房",               value: "12:00" },
    { label: "早餐",               rows: [
      { sublabel: "周一至周五",    value: "07:00 – 10:30" },
      { sublabel: "周六、日及节假日", value: "07:00 – 11:00" },
    ]},
    { label: "酒吧 & 餐厅",        rows: [
      { sublabel: "周一至周五",    value: "11:00 – 00:00" },
      { sublabel: "周六、日及节假日", value: "11:30 – 00:00" },
    ]},
  ],
  ja: [
    { label: "フロント",           value: "24時間" },
    { label: "チェックイン",       value: "15:00" },
    { label: "チェックアウト",     value: "12:00" },
    { label: "朝食",               rows: [
      { sublabel: "月〜金",        value: "07:00 – 10:30" },
      { sublabel: "土・日・祝日",  value: "07:00 – 11:00" },
    ]},
    { label: "バー & レストラン",  rows: [
      { sublabel: "月〜金",        value: "11:00 – 00:00" },
      { sublabel: "土・日・祝日",  value: "11:30 – 00:00" },
    ]},
  ],
  ar: [
    { label: "الاستقبال",         value: "٢٤ ساعة" },
    { label: "تسجيل الوصول",      value: "15:00" },
    { label: "تسجيل المغادرة",    value: "12:00" },
    { label: "الإفطار",           rows: [
      { sublabel: "الإثنين – الجمعة", value: "07:00 – 10:30" },
      { sublabel: "السبت والأحد والعطل", value: "07:00 – 11:00" },
    ]},
    { label: "البار & المطعم",    rows: [
      { sublabel: "الإثنين – الجمعة", value: "11:00 – 00:00" },
      { sublabel: "السبت والأحد والعطل", value: "11:30 – 00:00" },
    ]},
  ],
  ru: [
    { label: "Ресепшн",           value: "24 часа" },
    { label: "Заезд",             value: "15:00" },
    { label: "Выезд",             value: "12:00" },
    { label: "Завтрак",           rows: [
      { sublabel: "Пн – Пт",     value: "07:00 – 10:30" },
      { sublabel: "Сб, Вс и праздники", value: "07:00 – 11:00" },
    ]},
    { label: "Бар & Ресторан",    rows: [
      { sublabel: "Пн – Пт",     value: "11:00 – 00:00" },
      { sublabel: "Сб, Вс и праздники", value: "11:30 – 00:00" },
    ]},
  ],
};

const LUGGAGE_NOTE: Record<string, string> = {
  es: "Tras el check-out, puede dejar su equipaje en recepción de forma gratuita para seguir disfrutando Madrid.",
  en: "After check-out, you can leave your luggage at reception free of charge to keep enjoying Madrid.",
  fr: "Après le départ, vous pouvez laisser vos bagages à la réception gratuitement pour continuer à profiter de Madrid.",
  de: "Nach dem Check-out können Sie Ihr Gepäck kostenlos an der Rezeption lassen, um Madrid weiter zu genießen.",
  it: "Dopo il check-out, puoi lasciare i tuoi bagagli alla reception gratuitamente per continuare a godirti Madrid.",
  pt: "Após o check-out, pode deixar a sua bagagem na recepção gratuitamente para continuar a desfrutar de Madrid.",
  zh: "退房后，您可以免费将行李寄存在前台，继续享受马德里的美好时光。",
  ja: "チェックアウト後、荷物を無料でフロントに預けて、引き続きマドリードをお楽しみいただけます。",
  ar: "بعد تسجيل المغادرة، يمكنك ترك أمتعتك في الاستقبال مجاناً للاستمتاع بمدريد.",
  ru: "После выезда вы можете бесплатно оставить багаж на ресепшн и продолжить наслаждаться Мадридом.",
};

const TITLES: Record<string, string> = {
  es: "Horarios", en: "Schedule", fr: "Horaires", de: "Öffnungszeiten",
  it: "Orari", pt: "Horários", zh: "时间表", ja: "スケジュール",
  ar: "المواعيد", ru: "Расписание",
};

export default function HorariosPage({ onBack }: HorariosPageProps) {
  const { lang } = useLanguage();
  const rows = SCHEDULE_DATA[lang] ?? SCHEDULE_DATA["es"];
  const title = TITLES[lang] ?? TITLES["es"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{title}</PageTitle>

      <div className="flex flex-col gap-0">
        {rows.map((row, i) => (
          <div key={i} className="py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div style={{ ...ps.iconRow, marginBottom: "0.25rem", gap: "0.5rem" }}>
              <Clock size={14} strokeWidth={1.5} style={{ color: "var(--gold)", opacity: 0.7, flexShrink: 0 }} />
              <span style={{ ...ps.muted, marginBottom: 0 }}>{row.label}</span>
              {row.value && (
                <span className="ml-auto" style={{ ...ps.rowValue, fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
                  {row.value}
                </span>
              )}
            </div>
            {row.rows && (
              <div className="flex flex-col gap-1 pl-7 mt-1">
                {row.rows.map((sub, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span style={{ ...ps.muted, fontSize: "0.88rem" }}>{sub.sublabel}</span>
                    <span style={{ ...ps.rowValue, fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem" }}>{sub.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <InfoCard style={{ marginTop: "2rem" }}>
        <div className="flex items-center gap-2 mb-2">
          <Luggage size={16} strokeWidth={1.25} style={{ color: "var(--gold)", opacity: 0.85, flexShrink: 0 }} />
        </div>
        <p style={{ ...ps.muted, fontSize: "0.88rem", margin: 0 }}>
          {LUGGAGE_NOTE[lang] ?? LUGGAGE_NOTE["es"]}
        </p>
      </InfoCard>
    </PageLayout>
  );
}
