/*
 * SostenibilidadPage — "Noche en Sol" design
 * Compromisos de sostenibilidad: toallas, ropa de cama y agua filtrada
 */
import { Bath, BedDouble, Droplets, Leaf, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface SostenibilidadPageProps { onBack: () => void; }

interface SustainItem { iconKey: "bath" | "bed" | "water" | "leaf"; heading: string; text: string; }
const ITEM_ICONS: Record<string, LucideIcon> = { bath: Bath, bed: BedDouble, water: Droplets, leaf: Leaf };

interface SustainContent { title: string; intro: string; items: SustainItem[]; }

const CONTENT: Record<string, SustainContent> = {
  es: { title: "Sostenibilidad", intro: "En La Fonda de los Príncipes creemos que cuidar el planeta y ofrecer una estancia excepcional no están reñidos. Pequeños gestos cotidianos marcan una gran diferencia.", items: [
    { iconKey: "bath", heading: "Toallas", text: "Si desea reutilizar su toalla, déjela colgada en el baño. Si prefiere que la cambiemos, deposítela en el suelo. Así de sencillo." },
    { iconKey: "bed", heading: "Ropa de cama", text: "Cambiamos la ropa de cama cada tres días. Si desea un cambio antes o prefiere que esperemos más, indíquenoslo en recepción o déjenos una nota." },
    { iconKey: "water", heading: "Agua filtrada de Madrid", text: "El agua del grifo de Madrid es de excelente calidad. Por eso ponemos en su habitación agua filtrada de Madrid en lugar de botellas de plástico. Un pequeño gesto para reducir residuos." },
    { iconKey: "leaf", heading: "Green Stay — Limpieza sin productos químicos", text: "Si prefieres que no se utilicen productos de limpieza químicos durante tu estancia — ya sea por alergias, sensibilidades o simplemente por elección — indícanoslo en recepción. Usaremos únicamente productos naturales y no tóxicos. También puedes solicitar que no se realice el servicio de limpieza diario (skip cleaning): es una opción sostenible que cada vez más huéspedes eligen." },
  ]},
  en: { title: "Sustainability", intro: "At La Fonda de los Príncipes we believe that caring for the planet and offering an exceptional stay are not mutually exclusive. Small daily gestures make a big difference.", items: [
    { iconKey: "bath", heading: "Towels", text: "If you wish to reuse your towel, leave it hanging in the bathroom. If you would like us to replace it, place it on the floor. Simple as that." },
    { iconKey: "bed", heading: "Bed linen", text: "We change bed linen every three days. If you would like a change sooner, or prefer to wait longer, please let us know at reception or leave us a note." },
    { iconKey: "water", heading: "Madrid filtered water", text: "Madrid tap water is of excellent quality. That is why we place filtered Madrid water in your room instead of plastic bottles — a small gesture to reduce waste." },
    { iconKey: "leaf", heading: "Green Stay — Chemical-free cleaning", text: "If you prefer that no chemical cleaning products are used during your stay — whether due to allergies, sensitivities, or personal choice — please let us know at reception. We will use only natural, non-toxic products. You can also request to skip daily housekeeping: a sustainable option chosen by more and more guests." },
  ]},
  fr: { title: "Durabilité", intro: "À La Fonda de los Príncipes, nous croyons que prendre soin de la planète et offrir un séjour exceptionnel ne sont pas incompatibles. De petits gestes quotidiens font une grande différence.", items: [
    { iconKey: "bath", heading: "Serviettes", text: "Si vous souhaitez réutiliser votre serviette, laissez-la accrochée dans la salle de bain. Si vous préférez qu'on la change, posez-la par terre. Aussi simple que cela." },
    { iconKey: "bed", heading: "Linge de lit", text: "Nous changeons le linge de lit tous les trois jours. Si vous souhaitez un changement plus tôt ou préférez attendre plus longtemps, signalez-le à la réception ou laissez-nous un mot." },
    { iconKey: "water", heading: "Eau filtrée de Madrid", text: "L'eau du robinet de Madrid est d'excellente qualité. C'est pourquoi nous mettons dans votre chambre de l'eau filtrée de Madrid plutôt que des bouteilles en plastique — un petit geste pour réduire les déchets." },
    { iconKey: "leaf", heading: "Green Stay — Nettoyage sans produits chimiques", text: "Si vous préférez qu'aucun produit chimique ne soit utilisé pendant votre séjour — pour des raisons d'allergies, de sensibilités ou par choix personnel — signalez-le à la réception. Nous utiliserons uniquement des produits naturels et non toxiques. Vous pouvez également demander à ne pas avoir le service de ménage quotidien (skip cleaning) : une option durable choisie par de plus en plus de clients." },
  ]},
  de: { title: "Nachhaltigkeit", intro: "Bei La Fonda de los Príncipes glauben wir, dass Umweltschutz und ein außergewöhnlicher Aufenthalt sich nicht ausschließen. Kleine tägliche Gesten machen einen großen Unterschied.", items: [
    { iconKey: "bath", heading: "Handtücher", text: "Wenn Sie Ihr Handtuch wiederverwenden möchten, hängen Sie es im Bad auf. Wenn Sie es gewechselt haben möchten, legen Sie es auf den Boden." },
    { iconKey: "bed", heading: "Bettwäsche", text: "Wir wechseln die Bettwäsche alle drei Tage. Wenn Sie einen früheren Wechsel wünschen oder lieber länger warten möchten, teilen Sie es uns an der Rezeption mit." },
    { iconKey: "water", heading: "Gefiltertes Wasser aus Madrid", text: "Das Leitungswasser in Madrid ist von ausgezeichneter Qualität. Deshalb stellen wir Ihnen gefiltertes Madrider Wasser statt Plastikflaschen ins Zimmer." },
    { iconKey: "leaf", heading: "Green Stay — Reinigung ohne Chemikalien", text: "Wenn Sie es vorziehen, dass während Ihres Aufenthalts keine chemischen Reinigungsmittel verwendet werden — sei es wegen Allergien, Empfindlichkeiten oder persönlicher Wahl — teilen Sie uns dies bitte an der Rezeption mit. Wir verwenden dann ausschließlich natürliche, ungiftige Produkte. Sie können auch den täglichen Reinigungsservice ablehnen (Skip Cleaning): eine nachhaltige Option, die immer mehr Gäste wählen." },
  ]},
  it: { title: "Sostenibilità", intro: "A La Fonda de los Príncipes crediamo che prendersi cura del pianeta e offrire un soggiorno eccezionale non siano in contraddizione. Piccoli gesti quotidiani fanno una grande differenza.", items: [
    { iconKey: "bath", heading: "Asciugamani", text: "Se desideri riutilizzare il tuo asciugamano, lascialo appeso in bagno. Se preferisci che lo cambiamo, mettilo sul pavimento." },
    { iconKey: "bed", heading: "Biancheria da letto", text: "Cambiamo la biancheria da letto ogni tre giorni. Se desideri un cambio prima o preferisci aspettare di più, comunicacelo alla reception." },
    { iconKey: "water", heading: "Acqua filtrata di Madrid", text: "L'acqua del rubinetto di Madrid è di ottima qualità. Per questo mettiamo in camera acqua filtrata di Madrid invece di bottiglie di plastica." },
    { iconKey: "leaf", heading: "Green Stay — Pulizia senza prodotti chimici", text: "Se preferisci che non vengano utilizzati prodotti chimici durante il tuo soggiorno — per allergie, sensibilità o scelta personale — comunicacelo alla reception. Useremo solo prodotti naturali e non tossici. Puoi anche richiedere di saltare il servizio di pulizia giornaliero (skip cleaning): un'opzione sostenibile scelta da sempre più ospiti." },
  ]},
  pt: { title: "Sustentabilidade", intro: "Na La Fonda de los Príncipes acreditamos que cuidar do planeta e oferecer uma estadia excecional não são incompatíveis. Pequenos gestos diários fazem uma grande diferença.", items: [
    { iconKey: "bath", heading: "Toalhas", text: "Se desejar reutilizar a sua toalha, deixe-a pendurada na casa de banho. Se preferir que a troquemos, coloque-a no chão. Simples assim." },
    { iconKey: "bed", heading: "Roupa de cama", text: "Trocamos a roupa de cama de três em três dias. Se desejar uma troca mais cedo ou preferir esperar mais tempo, informe-nos na receção ou deixe-nos um recado." },
    { iconKey: "water", heading: "Água filtrada de Madrid", text: "A água da torneira de Madrid é de excelente qualidade. Por isso colocamos no seu quarto água filtrada de Madrid em vez de garrafas de plástico — um pequeno gesto para reduzir resíduos." },
    { iconKey: "leaf", heading: "Green Stay — Limpeza sem produtos químicos", text: "Se preferir que não sejam utilizados produtos de limpeza químicos durante a sua estadia — por alergias, sensibilidades ou escolha pessoal — informe-nos na receção. Usaremos apenas produtos naturais e não tóxicos. Também pode solicitar que não se realize o serviço de limpeza diário (skip cleaning): uma opção sustentável escolhida por cada vez mais hóspedes." },
  ]},
  zh: { title: "可持续发展", intro: "在La Fonda de los Príncipes，我们相信爱护地球与提供卓越住宿体验并不矛盾。日常中的小小举动能带来巨大的改变。", items: [
    { iconKey: "bath", heading: "毛巾", text: "如果您希望继续使用毛巾，请将其挂在浴室。如果希望更换，请将其放在地上。就这么简单。" },
    { iconKey: "bed", heading: "床上用品", text: "我们每三天更换一次床上用品。如果您希望提前更换或希望延后，请在前台告知我们或留下纸条。" },
    { iconKey: "water", heading: "马德里过滤水", text: "马德里的自来水质量优良。因此，我们在房间内提供马德里过滤水，而非塑料瓶装水，以减少废弃物。" },
    { iconKey: "leaf", heading: "绿色住宿 — 无化学品清洁", text: "如果您希望在住宿期间不使用化学清洁产品——无论是因为过敏、敏感体质还是个人选择——请在前台告知我们。我们将仅使用天然、无毒产品。您也可以选择不进行每日客房清洁服务（skip cleaning）：这是越来越多宾客选择的可持续选项。" },
  ]},
  ja: { title: "サステナビリティ", intro: "La Fonda de los Príncipesでは、地球を大切にすることと素晴らしい滞在を提供することは両立できると考えています。日々の小さな行動が大きな違いを生み出します。", items: [
    { iconKey: "bath", heading: "タオル", text: "タオルを再利用される場合は、浴室に掛けたままにしてください。交換をご希望の場合は、床に置いてください。" },
    { iconKey: "bed", heading: "ベッドリネン", text: "ベッドリネンは3日ごとに交換いたします。早めの交換をご希望の場合は、フロントにお申し付けください。" },
    { iconKey: "water", heading: "マドリードのフィルター水", text: "マドリードの水道水は非常に高品質です。そのため、プラスチックボトルの代わりに、マドリードのフィルター水をお部屋にご用意しています。" },
    { iconKey: "leaf", heading: "グリーンステイ — 化学薬品不使用の清掃", text: "アレルギー、過敏症、または個人的な理由から、滞在中に化学洗剤を使用しないことをご希望の場合は、フロントまでお申し付けください。天然・無毒の製品のみを使用いたします。また、毎日の客室清掃を省略する「スキップクリーニング」もご利用いただけます。多くのお客様が選ばれているサステナブルな選択肢です。" },
  ]},
  ar: { title: "الاستدامة", intro: "في La Fonda de los Príncipes نؤمن بأن الاهتمام بالكوكب وتقديم إقامة استثنائية ليسا متناقضَين. الإيماءات اليومية الصغيرة تُحدث فرقاً كبيراً.", items: [
    { iconKey: "bath", heading: "المناشف", text: "إذا كنت ترغب في إعادة استخدام منشفتك، اتركها معلّقة في الحمام. إذا أردت تغييرها، ضعها على الأرض." },
    { iconKey: "bed", heading: "بياضة السرير", text: "نغيّر بياضات السرير كل ثلاثة أيام. إذا رغبت في تغيير مبكّر أو تفضّل الانتظار أكثر، أخبرنا في الاستقبال." },
    { iconKey: "water", heading: "مياه مفلترة من مدريد", text: "مياه الصنبور في مدريد ذات جودة ممتازة. لذلك نضع في غرفتك مياهاً مفلترة من مدريد بدلاً من زجاجات البلاستيك." },
    { iconKey: "leaf", heading: "الإقامة الخضراء — تنظيف بدون مواد كيميائية", text: "إذا كنت تفضّل عدم استخدام منتجات التنظيف الكيميائية خلال إقامتك — سواء بسبب الحساسية أو الاختيار الشخصي — أخبرنا في الاستقبال. سنستخدم فقط منتجات طبيعية وغير سامة. يمكنك أيضاً طلب تخطّي خدمة التنظيف اليومي (skip cleaning): خيار مستدام يختاره عدد متزايد من الضيوف." },
  ]},
  ru: { title: "Устойчивое развитие", intro: "В La Fonda de los Príncipes мы убеждены, что забота о планете и исключительный отдых совместимы. Небольшие ежедневные жесты имеют большое значение.", items: [
    { iconKey: "bath", heading: "Полотенца", text: "Если вы хотите использовать полотенце повторно, оставьте его висеть в ванной. Если хотите, чтобы мы его заменили, положите на пол." },
    { iconKey: "bed", heading: "Постельное бельё", text: "Мы меняем постельное бельё каждые три дня. Если вы хотите смену раньше или предпочитаете подождать дольше, сообщите нам на ресепшн." },
    { iconKey: "water", heading: "Фильтрованная вода Мадрида", text: "Водопроводная вода в Мадриде отличного качества. Поэтому мы ставим в номер фильтрованную воду из Мадрида вместо пластиковых бутылок." },
    { iconKey: "leaf", heading: "Green Stay — Уборка без химии", text: "Если вы предпочитаете, чтобы во время вашего пребывания не использовались химические чистящие средства — из-за аллергии, чувствительности или личного выбора — сообщите нам на ресепшн. Мы будем использовать только натуральные, нетоксичные средства. Вы также можете отказаться от ежедневной уборки (skip cleaning): устойчивый вариант, который выбирает всё больше гостей." },
  ]},
};

export default function SostenibilidadPage({ onBack }: SostenibilidadPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{content.title}</PageTitle>

      <p style={{ ...ps.muted, lineHeight: 1.75, marginBottom: "2rem" }}>{content.intro}</p>

      <div className="flex flex-col gap-0">
        {content.items.map((item, i) => {
          const IconComp = ITEM_ICONS[item.iconKey];
          return (
            <div key={i} style={{ ...ps.iconRowTop, paddingTop: "1.5rem", paddingBottom: "1.5rem", borderTop: "1px solid var(--border)" }}>
              <div style={ps.iconRowTopIcon}>
                <IconComp size={20} strokeWidth={1.25} />
              </div>
              <div>
                <h3 style={ps.itemTitle}>
                  {item.heading}
                </h3>
                <p style={{ ...ps.muted, fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
