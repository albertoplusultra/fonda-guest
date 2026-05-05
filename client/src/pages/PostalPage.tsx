/*
 * PostalPage — "Noche en Sol" design
 * Invitación a rellenar la postal y entregarla en recepción para que el hotel la envíe
 */
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface PostalPageProps {
  onBack: () => void;
}

const CONTENT: Record<string, { title: string; body: string[] }> = {
  es: {
    title: "Envía una postal",
    body: [
      "La Fonda de los Príncipes es un alojamiento con historia. Estas paredes han sido testigo de viajeros de todo el mundo que, durante siglos, encontraron aquí un lugar donde descansar antes de seguir su camino.",
      "En aquellos tiempos, la forma de compartir un viaje era enviando una postal a los seres queridos. Una imagen, unas pocas palabras escritas a mano y un sello eran suficientes para hacer llegar un pedazo de Madrid a cualquier rincón del mundo.",
      "El mundo ha cambiado. La mensajería instantánea ha sustituido al correo postal, y las fotos en el móvil han reemplazado a las postales ilustradas. Pero en La Fonda nos gusta recuperar las tradiciones.",
      "Por eso hemos dejado una postal en tu cama. Escríbela, dedícala a quien quieras y entrégala en recepción. Nosotros nos encargamos de enviarla.",
    ],
  },
  en: {
    title: "Send a postcard",
    body: [
      "La Fonda de los Príncipes is a place steeped in history. These walls have witnessed travellers from all over the world who, for centuries, found here a place to rest before continuing their journey.",
      "In those days, the way to share a trip was by sending a postcard to loved ones. An image, a few handwritten words and a stamp were enough to bring a piece of Madrid to any corner of the world.",
      "The world has changed. Instant messaging has replaced postal mail, and phone photos have taken the place of illustrated postcards. But at La Fonda, we like to revive old traditions.",
      "That is why we have left a postcard on your bed. Write it, dedicate it to whoever you wish, and hand it in at reception. We will take care of sending it.",
    ],
  },
  fr: {
    title: "Envoyez une carte postale",
    body: [
      "La Fonda de los Príncipes est un hébergement chargé d'histoire. Ces murs ont été témoins de voyageurs du monde entier qui, pendant des siècles, ont trouvé ici un endroit où se reposer avant de poursuivre leur chemin.",
      "À cette époque, la façon de partager un voyage était d'envoyer une carte postale à ses proches. Une image, quelques mots écrits à la main et un timbre suffisaient pour apporter un morceau de Madrid à n'importe quel coin du monde.",
      "Le monde a changé. La messagerie instantanée a remplacé le courrier postal, et les photos de téléphone ont pris la place des cartes postales illustrées. Mais à La Fonda, nous aimons faire revivre les traditions.",
      "C'est pourquoi nous avons laissé une carte postale sur votre lit. Écrivez-la, dédiez-la à qui vous voulez et remettez-la à la réception. Nous nous chargeons de l'envoyer.",
    ],
  },
  de: {
    title: "Senden Sie eine Postkarte",
    body: [
      "La Fonda de los Príncipes ist eine Unterkunft mit Geschichte. Diese Wände haben Reisende aus aller Welt erlebt, die hier jahrhundertelang einen Ort zum Ausruhen fanden, bevor sie ihre Reise fortsetzten.",
      "Damals war es üblich, Reiseerlebnisse durch das Versenden einer Postkarte an die Liebsten zu teilen. Ein Bild, ein paar handgeschriebene Worte und eine Briefmarke reichten aus, um ein Stück Madrid in jeden Winkel der Welt zu bringen.",
      "Die Welt hat sich verändert. Instant Messaging hat die Post ersetzt, und Handyfotos haben die illustrierten Postkarten abgelöst. Aber in La Fonda mögen wir es, alte Traditionen wiederzubeleben.",
      "Deshalb haben wir eine Postkarte auf Ihr Bett gelegt. Schreiben Sie sie, widmen Sie sie wem Sie möchten und geben Sie sie an der Rezeption ab. Wir kümmern uns um den Versand.",
    ],
  },
  it: {
    title: "Invia una cartolina",
    body: [
      "La Fonda de los Príncipes è un alloggio ricco di storia. Queste mura hanno visto viaggiatori da tutto il mondo che, per secoli, hanno trovato qui un luogo dove riposarsi prima di continuare il loro cammino.",
      "In quei tempi, il modo di condividere un viaggio era inviare una cartolina ai propri cari. Un'immagine, poche parole scritte a mano e un francobollo erano sufficienti per portare un pezzo di Madrid in qualsiasi angolo del mondo.",
      "Il mondo è cambiato. La messaggistica istantanea ha sostituito la posta, e le foto sul telefono hanno preso il posto delle cartoline illustrate. Ma a La Fonda ci piace recuperare le tradizioni.",
      "Per questo abbiamo lasciato una cartolina sul tuo letto. Scrivila, dedicala a chi vuoi e consegnala alla reception. Pensiamo noi a spedirla.",
    ],
  },
  pt: {
    title: "Envie um postal",
    body: [
      "La Fonda de los Príncipes é um alojamento com história. Estas paredes foram testemunhas de viajantes de todo o mundo que, durante séculos, encontraram aqui um lugar para descansar antes de continuar a sua jornada.",
      "Naqueles tempos, a forma de partilhar uma viagem era enviar um postal aos entes queridos. Uma imagem, algumas palavras escritas à mão e um selo eram suficientes para levar um pedaço de Madrid a qualquer canto do mundo.",
      "O mundo mudou. As mensagens instantâneas substituíram o correio postal, e as fotos no telemóvel tomaram o lugar dos postais ilustrados. Mas na La Fonda gostamos de recuperar as tradições.",
      "Por isso deixámos um postal na sua cama. Escreva-o, dedique-o a quem quiser e entregue-o na receção. Nós tratamos de o enviar.",
    ],
  },
  zh: {
    title: "寄一张明信片",
    body: [
      "La Fonda de los Príncipes是一处承载历史的住所。几个世纪以来，来自世界各地的旅行者在这些墙壁之间找到了歇脚之所，然后继续他们的旅途。",
      "在那个年代，分享旅行的方式是向亲友寄送一张明信片。一幅图像、几行手写的文字和一枚邮票，就足以将马德里的一角送达世界任何地方。",
      "世界已经改变。即时通讯取代了邮政，手机照片取代了图画明信片。但在La Fonda，我们喜欢重拾传统。",
      "因此，我们在您的床上留了一张明信片。请写下您的心意，寄给您想念的人，然后交到前台。我们负责寄出。",
    ],
  },
  ja: {
    title: "ポストカードを送る",
    body: [
      "La Fonda de los Príncipesは、歴史を宿す宿泊施設です。何世紀にもわたり、世界中の旅人がここで旅の疲れを癒し、次の目的地へと向かっていきました。",
      "かつて旅を分かち合う方法は、大切な人へポストカードを送ることでした。一枚の絵、手書きの言葉、そして切手があれば、マドリードの一片を世界のどこへでも届けることができました。",
      "世界は変わりました。インスタントメッセージが郵便に取って代わり、スマートフォンの写真が絵葉書の役割を担うようになりました。しかしLa Fondaでは、伝統を取り戻すことを大切にしています。",
      "そのため、ベッドの上にポストカードをご用意しました。書き終えたら、フロントにお渡しください。発送はホテルがお引き受けします。",
    ],
  },
  ar: {
    title: "أرسل بطاقة بريدية",
    body: [
      "La Fonda de los Príncipes مكان إقامة يحمل تاريخاً عريقاً. شهدت هذه الجدران عبر القرون مسافرين من شتى أنحاء العالم وجدوا هنا مكاناً للراحة قبل مواصلة رحلتهم.",
      "في تلك الأيام، كانت طريقة مشاركة السفر هي إرسال بطاقة بريدية إلى الأحبة. صورة وبضع كلمات مكتوبة بخط اليد وطابع بريدي كانت كافية لإيصال قطعة من مدريد إلى أي ركن من أركان العالم.",
      "تغيّر العالم. حلّت الرسائل الفورية محل البريد، وحلّت صور الهاتف محل البطاقات البريدية المصوّرة. لكننا في La Fonda نحب إحياء التقاليد.",
      "لهذا السبب تركنا بطاقة بريدية على سريرك. اكتبها، أهدها لمن تشاء، وسلّمها في الاستقبال. سنتولى نحن إرسالها.",
    ],
  },
  ru: {
    title: "Отправьте открытку",
    body: [
      "La Fonda de los Príncipes — это место с историей. На протяжении веков эти стены принимали путешественников со всего мира, которые находили здесь отдых перед продолжением пути.",
      "В те времена способом поделиться путешествием была отправка открытки близким. Картинка, несколько слов, написанных от руки, и марка — этого было достаточно, чтобы донести частичку Мадрида в любой уголок мира.",
      "Мир изменился. Мессенджеры заменили почту, а фотографии на телефоне вытеснили иллюстрированные открытки. Но в La Fonda мы любим возрождать традиции.",
      "Поэтому мы оставили открытку на вашей кровати. Напишите её, посвятите кому захотите и сдайте на ресепшн. Мы позаботимся об отправке.",
    ],
  },
};

export default function PostalPage({ onBack }: PostalPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <PageLayout onBack={onBack}>
        <PageTitle>{content.title}</PageTitle>

        {/* Body paragraphs */}
        <div className="flex flex-col gap-5">
          {content.body.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.93rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Call to action card */}
        <div
          className="mt-10 px-5 py-5 rounded-sm"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              style={{
                width: 28,
                height: 1,
                background: "var(--gold)",
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.88rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                opacity: 0.7,
              }}
            >
              {lang === "es" ? "Recuerda" :
               lang === "en" ? "Remember" :
               lang === "fr" ? "N'oubliez pas" :
               lang === "de" ? "Denk daran" :
               lang === "it" ? "Ricorda" :
               lang === "pt" ? "Lembre-se" :
               lang === "zh" ? "请记住" :
               lang === "ja" ? "お忘れなく" :
               lang === "ar" ? "تذكّر" :
               lang === "ru" ? "Помните" : "Recuerda"}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {lang === "es" ? "Entrega la postal en recepción y nosotros nos encargamos del resto." :
             lang === "en" ? "Hand in your postcard at reception and we will take care of the rest." :
             lang === "fr" ? "Remettez la carte postale à la réception et nous nous occupons du reste." :
             lang === "de" ? "Geben Sie die Postkarte an der Rezeption ab und wir kümmern uns um den Rest." :
             lang === "it" ? "Consegna la cartolina alla reception e noi ci occupiamo del resto." :
             lang === "pt" ? "Entregue o postal na receção e nós tratamos do resto." :
             lang === "zh" ? "将明信片交到前台，其余的交给我们。" :
             lang === "ja" ? "ポストカードをフロントにお渡しください。あとはホテルにお任せください。" :
             lang === "ar" ? "سلّم البطاقة البريدية في الاستقبال وسنتولى نحن الباقي." :
             lang === "ru" ? "Сдайте открытку на ресепшн — остальное мы возьмём на себя." :
             "Entrega la postal en recepción y nosotros nos encargamos del resto."}
          </p>
        </div>
    </PageLayout>
  );
}
