/*
 * SostenibilidadPage — "Noche en Sol" design
 * Compromisos de sostenibilidad: toallas, ropa de cama y agua filtrada
 */
import { Leaf, Bath, BedDouble, Droplets, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface SostenibilidadPageProps {
  onBack: () => void;
}

interface SustainItem {
  iconKey: "bath" | "bed" | "water";
  heading: string;
  text: string;
}

const ITEM_ICONS: Record<string, LucideIcon> = {
  bath:  Bath,
  bed:   BedDouble,
  water: Droplets,
};

interface SustainContent {
  title: string;
  intro: string;
  items: SustainItem[];
}

const CONTENT: Record<string, SustainContent> = {
  es: {
    title: "Sostenibilidad",
    intro: "En La Fonda de los Príncipes creemos que cuidar el planeta y ofrecer una estancia excepcional no están reñidos. Pequeños gestos cotidianos marcan una gran diferencia.",
    items: [
      {
        iconKey: "bath",
        heading: "Toallas",
        text: "Si desea reutilizar su toalla, déjela colgada en el baño. Si prefiere que la cambiemos, deposítela en el suelo. Así de sencillo.",
      },
      {
        iconKey: "bed",
        heading: "Ropa de cama",
        text: "Cambiamos la ropa de cama cada tres días. Si desea un cambio antes o prefiere que esperemos más, indíquenoslo en recepción o déjenos una nota.",
      },
      {
        iconKey: "water",
        heading: "Agua filtrada de Madrid",
        text: "El agua del grifo de Madrid es de excelente calidad. Por eso ponemos en su habitación agua filtrada de Madrid en lugar de botellas de plástico. Un pequeño gesto para reducir residuos.",
      },
    ],
  },
  en: {
    title: "Sustainability",
    intro: "At La Fonda de los Príncipes we believe that caring for the planet and offering an exceptional stay are not mutually exclusive. Small daily gestures make a big difference.",
    items: [
      {
        iconKey: "bath",
        heading: "Towels",
        text: "If you wish to reuse your towel, leave it hanging in the bathroom. If you would like us to replace it, place it on the floor. Simple as that.",
      },
      {
        iconKey: "bed",
        heading: "Bed linen",
        text: "We change bed linen every three days. If you would like a change sooner, or prefer to wait longer, please let us know at reception or leave us a note.",
      },
      {
        iconKey: "water",
        heading: "Madrid filtered water",
        text: "Madrid tap water is of excellent quality. That is why we place filtered Madrid water in your room instead of plastic bottles — a small gesture to reduce waste.",
      },
    ],
  },
  fr: {
    title: "Durabilité",
    intro: "À La Fonda de los Príncipes, nous croyons que prendre soin de la planète et offrir un séjour exceptionnel ne sont pas incompatibles. De petits gestes quotidiens font une grande différence.",
    items: [
      {
        iconKey: "bath",
        heading: "Serviettes",
        text: "Si vous souhaitez réutiliser votre serviette, laissez-la accrochée dans la salle de bain. Si vous préférez qu'on la change, posez-la par terre. C'est aussi simple que ça.",
      },
      {
        iconKey: "bed",
        heading: "Linge de lit",
        text: "Nous changeons le linge de lit tous les trois jours. Si vous souhaitez un changement plus tôt ou préférez attendre plus longtemps, signalez-le à la réception ou laissez-nous un mot.",
      },
      {
        iconKey: "water",
        heading: "Eau filtrée de Madrid",
        text: "L'eau du robinet de Madrid est d'excellente qualité. C'est pourquoi nous mettons dans votre chambre de l'eau filtrée de Madrid plutôt que des bouteilles en plastique.",
      },
    ],
  },
  de: {
    title: "Nachhaltigkeit",
    intro: "Bei La Fonda de los Príncipes glauben wir, dass Umweltschutz und ein außergewöhnlicher Aufenthalt sich nicht ausschließen. Kleine tägliche Gesten machen einen großen Unterschied.",
    items: [
      {
        iconKey: "bath",
        heading: "Handtücher",
        text: "Wenn Sie Ihr Handtuch wiederverwenden möchten, hängen Sie es im Bad auf. Wenn Sie es gewechselt haben möchten, legen Sie es auf den Boden. So einfach ist das.",
      },
      {
        iconKey: "bed",
        heading: "Bettwäsche",
        text: "Wir wechseln die Bettwäsche alle drei Tage. Wenn Sie einen früheren Wechsel wünschen oder lieber länger warten möchten, teilen Sie es uns an der Rezeption mit oder hinterlassen Sie eine Notiz.",
      },
      {        iconKey: "water",
        heading: "Gefiltertes Wasser aus Madrid",        text: "Das Leitungswasser in Madrid ist von ausgezeichneter Qualität. Deshalb stellen wir Ihnen gefiltertes Madrider Wasser statt Plastikflaschen ins Zimmer — eine kleine Geste zur Abfallreduzierung.",
      },
    ],
  },
  it: {
    title: "Sostenibilità",
    intro: "A La Fonda de los Príncipes crediamo che prendersi cura del pianeta e offrire un soggiorno eccezionale non siano in contraddizione. Piccoli gesti quotidiani fanno una grande differenza.",
    items: [
      {
        iconKey: "bath",
        heading: "Asciugamani",
        text: "Se desideri riutilizzare il tuo asciugamano, lascialo appeso in bagno. Se preferisci che lo cambiamo, mettilo sul pavimento. Semplice così.",
      },
      {
        iconKey: "bed",
        heading: "Biancheria da letto",
        text: "Cambiamo la biancheria da letto ogni tre giorni. Se desideri un cambio prima o preferisci aspettare di più, comunicacelo alla reception o lasciaci un biglietto.",
      },
      {
        iconKey: "water",
        heading: "Acqua filtrata di Madrid",
        text: "L'acqua del rubinetto di Madrid è di ottima qualità. Per questo mettiamo in camera acqua filtrata di Madrid invece di bottiglie di plastica — un piccolo gesto per ridurre i rifiuti.",
      },
    ],
  },
  pt: {
    title: "Sustentabilidade",
    intro: "Na La Fonda de los Príncipes acreditamos que cuidar do planeta e oferecer uma estadia excecional não são incompatíveis. Pequenos gestos diários fazem uma grande diferença.",
    items: [
      {
        iconKey: "bath",
        heading: "Toalhas",
        text: "Se desejar reutilizar a sua toalha, deixe-a pendurada na casa de banho. Se preferir que a troquemos, coloque-a no chão. Simples assim.",
      },
      {
        iconKey: "bed",
        heading: "Roupa de cama",
        text: "Trocamos a roupa de cama de três em três dias. Se desejar uma troca mais cedo ou preferir esperar mais tempo, informe-nos na receção ou deixe-nos uma nota.",
      },
      {
        iconKey: "water",
        heading: "Agua filtrada de Madrid",
        text: "A água da torneira de Madrid é de excelente qualidade. Por isso colocamos no seu quarto água filtrada de Madrid em vez de garrafas de plástico.",
      },
    ],
  },
  zh: {
    title: "可持续发展",
    intro: "在La Fonda de los Príncipes，我们相信爱护地球与提供卓越住宿体验并不矛盾。日常中的小小举动能带来巨大的改变。",
    items: [
      {
        iconKey: "bath",
        heading: "毛巾",
        text: "如果您希望继续使用毛巾，请将其挂在浴室。如果希望更换，请将其放在地上。就这么简单。",
      },
      {
        iconKey: "bed",
        heading: "床上用品",
        text: "我们每三天更换一次床上用品。如果您希望提前更换或希望延后，请在前台告知我们或留下纸条。",
      },
      {
        iconKey: "water",
        heading: "马德里过滤水",
        text: "马德里的自来水质量优良。因此，我们在房间内提供马德里过滤水，而非塑料瓶装水，以减少废弃物。",
      },
    ],
  },
  ja: {
    title: "サステナビリティ",
    intro: "La Fonda de los Príncipesでは、地球を大切にすることと素晴らしい滞在を提供することは両立できると考えています。日々の小さな行動が大きな違いを生み出します。",
    items: [
      {
        iconKey: "bath",
        heading: "タオル",
        text: "タオルを再利用される場合は、浴室に掛けたままにしてください。交換をご希望の場合は、床に置いてください。それだけです。",
      },
      {
        iconKey: "bed",
        heading: "ベッドリネン",
        text: "ベッドリネンは3日ごとに交換いたします。早めの交換をご希望の場合、またはもう少し待ってほしい場合は、フロントにお申し付けいただくか、メモをお残しください。",
      },
      {
        iconKey: "water",
        heading: "マドリードのフィルター水",
        text: "マドリードの水道水は非常に高品質です。そのため、プラスチックボトルの代わりに、マドリードのフィルター水をお部屋にご用意しています。",
      },
    ],
  },
  ar: {
    title: "الاستدامة",
    intro: "في La Fonda de los Príncipes نؤمن بأن الاهتمام بالكوكب وتقديم إقامة استثنائية ليسا متناقضَين. الإيماءات اليومية الصغيرة تُحدث فرقاً كبيراً.",
    items: [
      {
        iconKey: "bath",
        heading: "المناشف",
        text: "إذا كنت ترغب في إعادة استخدام منشفتك، اتركها معلّقة في الحمام. إذا أردت تغييرها، ضعها على الأرض. بهذه البساطة.",
      },
      {
         iconKey: "bed",
        heading: "بياضة السرير",
        text: "نغيّر بياضات السرير كل ثلاثة أيام. إذا رغبت في تغيير مبكّر أو تفضّل الانتظار أكثر، أخبرنا في الاستقبال أو اترك لنا ملاحظة.",
      },
      {
        iconKey: "water",
        heading: "مياه مفلترة من مدريد",
        text: "مياه الصنبور في مدريد ذات جودة ممتازة. لذلك نضع في غرفتك مياهاً مفلترة من مدريد بدلاً من زجاجات البلاستيك، للمساهمة في تقليل النفايات.",
      },
    ],
  },
  ru: {
    title: "Устойчивое развитие",
    intro: "В La Fonda de los Príncipes мы убеждены, что забота о планете и исключительный отдых совместимы. Небольшие ежедневные жесты имеют большое значение.",
    items: [
      {
        iconKey: "bath",
        heading: "Полотенца",
        text: "Если вы хотите использовать полотенце повторно, оставьте его висеть в ванной. Если хотите, чтобы мы его заменили, положите на пол. Всё просто.",
      },
      {
        iconKey: "bed",
        heading: "Постельное бельё",
        text: "Мы меняем постельное бельё каждые три дня. Если вы хотите смену раньше или предпочитаете подождать дольше, сообщите нам на ресепшн или оставьте записку.",
      },
      {
        iconKey: "water",
        heading: "Фильтрованная вода Мадрида",
        text: "Водопроводная вода в Мадриде отличного качества. Поэтому мы ставим в номер фильтрованную воду из Мадрида вместо пластиковых бутылок — небольшой вклад в сокращение отходов.",
      },
    ],
  },
};

export default function SostenibilidadPage({ onBack }: SostenibilidadPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.08 0 0)", maxWidth: 480, margin: "0 auto" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 pt-8 pb-4"
        style={{ borderBottom: "1px solid oklch(0.16 0.01 72)" }}
      >
        <BackButton onClick={onBack} />
        <img
          src={LOGO_BLANCO}
          alt="La Fonda de los Príncipes"
          className="h-8"
          style={{ opacity: 0.85 }}
        />
        <LanguageSelector />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pt-10 pb-12">
        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-6">
          <div
            style={{
              background: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.22 0.015 72)",
              borderRadius: "0.35rem",
              padding: "0.6rem",
              flexShrink: 0,
              marginTop: "0.2rem",
            }}
          >
            <Leaf size={20} strokeWidth={1.25} style={{ color: "var(--gold)" }} />
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
              color: "oklch(0.96 0.025 85)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {content.title}
          </h1>
        </div>

        {/* Gold divider */}
        <div
          className="mb-6"
          style={{
            height: 1,
            background: "linear-gradient(90deg, var(--gold), transparent)",
            width: "60%",
          }}
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

        {/* Items */}
        <div className="flex flex-col gap-0">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 py-6"
              style={{
                borderTop: "1px solid oklch(0.14 0.01 72)",
              }}
            >
              {/* SVG icon */}
              <div
                style={{
                  flexShrink: 0,
                  paddingTop: "0.1rem",
                  width: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {(() => {
                  const IconComp = ITEM_ICONS[item.iconKey];
                  return <IconComp size={20} strokeWidth={1.25} style={{ color: "var(--gold)", opacity: 0.85 }} />;
                })()}
              </div>

              {/* Text */}
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    color: "oklch(0.90 0.025 85)",
                    margin: 0,
                    marginBottom: "0.4rem",
                  }}
                >
                  {item.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    color: "oklch(0.65 0.012 85)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
