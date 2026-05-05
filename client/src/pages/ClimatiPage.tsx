/*
 * ClimatiPage — "Noche en Sol" design
 * Guía de uso del mando Daikin Madoka BRC1H52W
 */
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface ClimatiPageProps { onBack: () => void; onContacto: () => void; }

const MADOKA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/madoka-main_98b1bceb.png";

interface Step { label: string; desc: string; }
interface ClimatiContent {
  title: string;
  intro: string;
  steps: Step[];
  tip: string;
  tipLink: string; // texto exacto dentro del tip que se convierte en link a contacto
}

const CONTENT: Record<string, ClimatiContent> = {
  es: {
    title: "Climatización",
    intro: "El mando del aire acondicionado y calefacción está en la pared, al lado de la puerta. Es un Daikin Madoka BRC1H52W, con pantalla táctil circular.",
    steps: [
      { label: "Encender / Apagar", desc: "Pulse el botón que hay en la parte superior del mando para encender o apagar el sistema." },
      { label: "Ajustar temperatura", desc: "Deslice el dedo por el borde circular hacia arriba para subir la temperatura, hacia abajo para bajarla. También puede pulsar los botones – y + en la parte inferior." },
    ],
    tip: "Si tiene cualquier problema con la climatización, contacte con recepción y le ayudamos de inmediato.",
    tipLink: "contacte con recepción",
  },
  en: {
    title: "Air conditioning",
    intro: "The air conditioning and heating controller is on the wall, next to the door. It is a Daikin Madoka BRC1H52W with a circular touch screen.",
    steps: [
      { label: "On / Off", desc: "Press the button at the top of the controller to turn the system on or off." },
      { label: "Adjust temperature", desc: "Slide your finger along the circular edge upwards to increase the temperature, downwards to decrease it. You can also press the – and + buttons at the bottom." },
    ],
    tip: "If you have any problem with the air conditioning, please contact reception and we will help you immediately.",
    tipLink: "contact reception",
  },
  fr: {
    title: "Climatisation",
    intro: "La télécommande de la climatisation et du chauffage se trouve sur le mur, à côté de la porte. Il s'agit d'un Daikin Madoka BRC1H52W avec écran tactile circulaire.",
    steps: [
      { label: "Allumer / Éteindre", desc: "Appuyez sur le bouton situé en haut de la télécommande pour allumer ou éteindre le système." },
      { label: "Régler la température", desc: "Faites glisser votre doigt sur le bord circulaire vers le haut pour augmenter la température, vers le bas pour la diminuer. Vous pouvez aussi appuyer sur les boutons – et +." },
    ],
    tip: "Si vous avez un problème avec la climatisation, contactez la réception et nous vous aiderons immédiatement.",
    tipLink: "contactez la réception",
  },
  de: {
    title: "Klimaanlage",
    intro: "Die Steuerung für Klimaanlage und Heizung befindet sich an der Wand neben der Tür. Es handelt sich um einen Daikin Madoka BRC1H52W mit kreisförmigem Touchscreen.",
    steps: [
      { label: "Ein / Aus", desc: "Drücken Sie die Taste oben an der Steuerung, um das System ein- oder auszuschalten." },
      { label: "Temperatur einstellen", desc: "Wischen Sie mit dem Finger am kreisförmigen Rand nach oben, um die Temperatur zu erhöhen, nach unten, um sie zu senken. Sie können auch die Tasten – und + unten drücken." },
    ],
    tip: "Wenn Sie Probleme mit der Klimaanlage haben, kontaktieren Sie bitte die Rezeption.",
    tipLink: "kontaktieren Sie bitte die Rezeption",
  },
  it: {
    title: "Climatizzazione",
    intro: "Il telecomando del condizionatore e del riscaldamento si trova sul muro, vicino alla porta. È un Daikin Madoka BRC1H52W con schermo tattile circolare.",
    steps: [
      { label: "Accendere / Spegnere", desc: "Premere il pulsante nella parte superiore del telecomando per accendere o spegnere il sistema." },
      { label: "Regolare la temperatura", desc: "Scorrere il dito sul bordo circolare verso l'alto per aumentare la temperatura, verso il basso per diminuirla. È possibile anche premere i pulsanti – e +." },
    ],
    tip: "Se ha problemi con il climatizzatore, contatti la reception e la aiuteremo immediatamente.",
    tipLink: "contatti la reception",
  },
  pt: {
    title: "Climatização",
    intro: "O comando do ar condicionado e aquecimento está na parede, ao lado da porta. É um Daikin Madoka BRC1H52W com ecrã táctil circular.",
    steps: [
      { label: "Ligar / Desligar", desc: "Prima o botão na parte superior do comando para ligar ou desligar o sistema." },
      { label: "Ajustar a temperatura", desc: "Deslize o dedo pelo bordo circular para cima para aumentar a temperatura, para baixo para diminuir. Também pode premir os botões – e +." },
    ],
    tip: "Se tiver algum problema com a climatização, contacte a receção e ajudamo-lo de imediato.",
    tipLink: "contacte a receção",
  },
  zh: {
    title: "空调与暖气",
    intro: "空调和暖气的控制面板安装在门旁边的墙上，型号为Daikin Madoka BRC1H52W，配有圆形触摸屏。",
    steps: [
      { label: "开机 / 关机", desc: "按下控制器顶部的按钮开机或关机。" },
      { label: "调节温度", desc: "沿圆形边缘向上滑动手指可升温，向下滑动可降温。也可以按下底部的 – 和 + 按钮。" },
    ],
    tip: "如果空调出现任何问题，请联系前台，我们将立即为您提供帮助。",
    tipLink: "联系前台",
  },
  ja: {
    title: "エアコン・暖房",
    intro: "エアコンと暖房のコントローラーはドアの横の壁にあります。Daikin Madoka BRC1H52Wという円形タッチスクリーン付きのモデルです。",
    steps: [
      { label: "電源オン / オフ", desc: "コントローラー上部のボタンを押してシステムのオン・オフを切り替えます。" },
      { label: "温度調節", desc: "円形の縁に沿って指を上にスライドすると温度が上がり、下にスライドすると下がります。下部の – と + ボタンでも調節できます。" },
    ],
    tip: "エアコンに問題がある場合は、フロントにお問い合わせください。すぐに対応いたします。",
    tipLink: "フロントにお問い合わせください",
  },
  ar: {
    title: "التكييف والتدفئة",
    intro: "يوجد جهاز التحكم في التكييف والتدفئة على الجدار بجانب الباب. إنه Daikin Madoka BRC1H52W مع شاشة لمسية دائرية.",
    steps: [
      { label: "تشغيل / إيقاف", desc: "اضغط على الزر الموجود في الجزء العلوي من جهاز التحكم لتشغيل النظام أو إيقافه." },
      { label: "ضبط درجة الحرارة", desc: "مرّر إصبعك على الحافة الدائرية لأعلى لرفع درجة الحرارة، ولأسفل لخفضها. يمكنك أيضاً الضغط على زرَّي – و+." },
    ],
    tip: "إذا واجهت أي مشكلة مع التكييف، تواصل مع الاستقبال وسنساعدك فوراً.",
    tipLink: "تواصل مع الاستقبال",
  },
  ru: {
    title: "Кондиционер и отопление",
    intro: "Пульт управления кондиционером и отоплением находится на стене рядом с дверью. Это Daikin Madoka BRC1H52W с круглым сенсорным экраном.",
    steps: [
      { label: "Включить / Выключить", desc: "Нажмите кнопку в верхней части пульта, чтобы включить или выключить систему." },
      { label: "Регулировка температуры", desc: "Проведите пальцем по круглому краю вверх, чтобы повысить температуру, вниз — чтобы понизить. Также можно нажать кнопки – и +." },
    ],
    tip: "Если у вас возникли проблемы с кондиционером, свяжитесь с ресепшн — мы поможем немедленно.",
    tipLink: "свяжитесь с ресепшн",
  },
};

export default function ClimatiPage({ onBack, onContacto }: ClimatiPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{content.title}</PageTitle>

      {/* Imagen principal del mando */}
      <div className="mb-6">
        <img
          src={MADOKA_IMG}
          alt="Daikin Madoka BRC1H52W"
          style={{ width: "100%", maxHeight: "320px", objectFit: "contain", objectPosition: "center", display: "block" }}
        />
      </div>

      {/* Intro */}
      <p style={{ ...ps.muted, lineHeight: 1.75, marginBottom: "0.5rem" }}>{content.intro}</p>

      {/* Pasos */}
      <div className="flex flex-col gap-0">
        {content.steps.map((step, i) => (
          <div key={i} className="py-5" style={{ borderTop: "1px solid var(--border)" }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "1.05rem",
              color: "var(--gold)",
              margin: 0,
              marginBottom: "0.4rem",
              letterSpacing: "0.01em",
            }}>
              {step.label}
            </h3>
            <p style={{ ...ps.muted, fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-6 p-4" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.35rem" }}>
        <p style={{ ...ps.note, margin: 0 }}>
          {(() => {
            const [before, after] = content.tip.split(content.tipLink);
            return (
              <>
                {before}
                <button
                  onClick={onContacto}
                  style={{
                    background: "none", border: "none", padding: 0,
                    color: "var(--gold)", fontFamily: "inherit", fontSize: "inherit",
                    textDecoration: "underline", textUnderlineOffset: "2px",
                    cursor: "pointer", display: "inline",
                  }}
                >
                  {content.tipLink}
                </button>
                {after}
              </>
            );
          })()}
        </p>
      </div>
    </PageLayout>
  );
}
