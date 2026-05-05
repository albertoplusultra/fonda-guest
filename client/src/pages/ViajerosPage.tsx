/*
 * ViajerosPage — "Noche en Sol" design
 * Viajeros memorables de La Fonda de los Príncipes
 */
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface ViajerosPageProps {
  onBack: () => void;
}

interface Traveller {
  name: string;
  years: string;
  body: string[];
}

interface ViajerosContent {
  title: string;
  subtitle: string;
  travellers: Traveller[];
  youLabel: string;
  youBody: string;
  backLabel: string;
}

const CONTENT: Record<string, ViajerosContent> = {
  es: {
    title: "Viajeros memorables",
    subtitle: "Hasta tu llegada, hemos tenido muchos otros viajeros memorables.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "El primer viajero memorable que visitó La Fonda de los Príncipes fue Hans Christian Andersen, escritor danés que se alojó en 1862, solo un año después de la apertura del edificio.",
          "En su libro «Viaje por España», reconoce que se quedó tan impresionado por lo lujosa y moderna que era La Fonda, como por el infernal ruido de la Puerta del Sol, que describió como un hormiguero bajo sus pies. Aguadores, diligencias, vendedores, tertulias eran parte del día a día.",
          "Christian Andersen buscaba el alma de Madrid, le entusiasmaba ver la vida de la plaza desde los balcones, y le fascinaba el contraste entre el bullicio de la calle y la paz del interior.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Cuatro años después, en 1866, Henry Blackburn, crítico de arte de la London Society, se alojó aquí para escribir su libro «Viajando por España en la actualidad». Desde estos mismos balcones observó amaneceres y atardeceres de la Puerta del Sol, algo que retrataría en su libro.",
          "Nos resulta curioso cómo su guía de viaje sigue muy vigente. Podéis descubrirlo vosotros mismos pidiendo una copia del libro en la recepción.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "El huésped más conocido a nivel internacional es el escritor y poeta argentino Jorge Luis Borges cuando, entre 1919 y 1921, alojado en la entonces llamada Pensión Americana, escribió sus primeros poemas ultraístas.",
          "Podéis ver una placa conmemorativa en el exterior del edificio.",
          "Por cierto, la habitación de Borges es la número 416, en la cuarta planta, haciendo esquina y con 3 balcones a las calles Tetuán y Carmen.",
        ],
      },
    ],
    youLabel: "Tú",
    youBody: "Y ahora, tú.",
    backLabel: "Volver",
  },
  en: {
    title: "Memorable travellers",
    subtitle: "Before your arrival, we have had many other memorable travellers.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "The first memorable traveller to visit La Fonda de los Príncipes was Hans Christian Andersen, the Danish writer who stayed in 1862, just one year after the building opened.",
          "In his book «A Visit to Spain», he acknowledges being as impressed by how luxurious and modern La Fonda was as by the infernal noise of Puerta del Sol, which he described as an anthill beneath his feet. Water carriers, stagecoaches, vendors, and gatherings were part of daily life.",
          "Andersen sought the soul of Madrid, was thrilled to watch the life of the square from the balconies, and was fascinated by the contrast between the bustle of the street and the peace of the interior.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Four years later, in 1866, Henry Blackburn, art critic for the London Society, stayed here to write his book «Travelling in Spain in the Present Day». From these very balconies he observed sunrises and sunsets over Puerta del Sol, which he would portray in his book.",
          "We find it curious how his travel guide remains very relevant today. You can discover this for yourselves by asking for a copy of the book at reception.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "The most internationally known guest is the Argentine writer and poet Jorge Luis Borges, who between 1919 and 1921, staying at what was then called the Pensión Americana, wrote his first ultraist poems.",
          "You can see a commemorative plaque on the exterior of the building.",
          "Borges's room is number 416, on the fourth floor, on the corner with 3 balconies overlooking Tetuán and Carmen streets.",
        ],
      },
    ],
    youLabel: "You",
    youBody: "And now, you.",
    backLabel: "Back",
  },
  fr: {
    title: "Voyageurs mémorables",
    subtitle: "Avant votre arrivée, nous avons eu de nombreux autres voyageurs mémorables.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "Le premier voyageur mémorable à visiter La Fonda de los Príncipes fut Hans Christian Andersen, l'écrivain danois qui séjourna ici en 1862, un an seulement après l'ouverture du bâtiment.",
          "Dans son livre «Voyage en Espagne», il reconnaît avoir été aussi impressionné par le luxe et la modernité de La Fonda que par le bruit infernal de la Puerta del Sol, qu'il décrivit comme une fourmilière sous ses pieds.",
          "Andersen cherchait l'âme de Madrid, il adorait observer la vie de la place depuis les balcons.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Quatre ans plus tard, en 1866, Henry Blackburn, critique d'art de la London Society, séjourna ici pour écrire son livre «Voyager en Espagne aujourd'hui». Depuis ces mêmes balcons, il observa les levers et couchers de soleil sur la Puerta del Sol.",
          "Sa guide de voyage reste très pertinente aujourd'hui. Vous pouvez en demander un exemplaire à la réception.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "L'hôte le plus connu internationalement est l'écrivain et poète argentin Jorge Luis Borges qui, entre 1919 et 1921, logé à la Pensión Americana, écrivit ses premiers poèmes ultraïstes.",
          "Vous pouvez voir une plaque commémorative à l'extérieur du bâtiment.",
          "La chambre de Borges est le numéro 416, au quatrième étage, en angle avec 3 balcons donnant sur les rues Tetuán et Carmen.",
        ],
      },
    ],
    youLabel: "Vous",
    youBody: "Et maintenant, vous.",
    backLabel: "Retour",
  },
  de: {
    title: "Unvergessliche Reisende",
    subtitle: "Vor Ihrer Ankunft hatten wir viele andere unvergessliche Reisende.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "Der erste unvergessliche Reisende, der La Fonda de los Príncipes besuchte, war Hans Christian Andersen, der dänische Schriftsteller, der 1862 hier übernachtete, nur ein Jahr nach der Eröffnung des Gebäudes.",
          "In seinem Buch «Reise durch Spanien» gibt er zu, genauso beeindruckt von der Luxuriösität und Modernität der Fonda gewesen zu sein wie vom höllischen Lärm der Puerta del Sol.",
          "Andersen suchte die Seele Madrids und war fasziniert vom Kontrast zwischen dem Trubel der Straße und der Ruhe des Inneren.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Vier Jahre später, 1866, übernachtete Henry Blackburn, Kunstkritiker der London Society, hier, um sein Buch «Reisen durch das heutige Spanien» zu schreiben. Von diesen Balkonen aus beobachtete er Sonnenaufgänge und -untergänge über der Puerta del Sol.",
          "Sie können ein Exemplar des Buches an der Rezeption anfragen.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "Der international bekannteste Gast ist der argentinische Schriftsteller und Dichter Jorge Luis Borges, der zwischen 1919 und 1921 in der damaligen Pensión Americana seine ersten ultraistischen Gedichte schrieb.",
          "Eine Gedenktafel ist an der Außenseite des Gebäudes zu sehen.",
          "Borges' Zimmer ist die Nummer 416 im vierten Stock, an der Ecke mit 3 Balkonen zu den Straßen Tetuán und Carmen.",
        ],
      },
    ],
    youLabel: "Sie",
    youBody: "Und jetzt Sie.",
    backLabel: "Zurück",
  },
  it: {
    title: "Viaggiatori memorabili",
    subtitle: "Prima del tuo arrivo, abbiamo avuto molti altri viaggiatori memorabili.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "Il primo viaggiatore memorabile a visitare La Fonda de los Príncipes fu Hans Christian Andersen, lo scrittore danese che soggiornò qui nel 1862, solo un anno dopo l'apertura dell'edificio.",
          "Nel suo libro «Viaggio in Spagna», riconosce di essere rimasto tanto colpito dal lusso e dalla modernità della Fonda quanto dal rumore infernale della Puerta del Sol.",
          "Andersen cercava l'anima di Madrid ed era affascinato dal contrasto tra il trambusto della strada e la pace dell'interno.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Quattro anni dopo, nel 1866, Henry Blackburn, critico d'arte della London Society, soggiornò qui per scrivere il suo libro «Viaggiando in Spagna oggi». Da questi stessi balconi osservò albe e tramonti sulla Puerta del Sol.",
          "Puoi chiedere una copia del libro alla reception.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "L'ospite più conosciuto a livello internazionale è lo scrittore e poeta argentino Jorge Luis Borges che, tra il 1919 e il 1921, alloggiato nella allora chiamata Pensión Americana, scrisse le sue prime poesie ultraiste.",
          "Puoi vedere una targa commemorativa all'esterno dell'edificio.",
          "La camera di Borges è la numero 416, al quarto piano, all'angolo con 3 balconi sulle vie Tetuán e Carmen.",
        ],
      },
    ],
    youLabel: "Tu",
    youBody: "E ora, tu.",
    backLabel: "Indietro",
  },
  pt: {
    title: "Viajantes memoráveis",
    subtitle: "Antes da tua chegada, tivemos muitos outros viajantes memoráveis.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "O primeiro viajante memorável a visitar La Fonda de los Príncipes foi Hans Christian Andersen, o escritor dinamarquês que ficou aqui em 1862, apenas um ano após a abertura do edifício.",
          "No seu livro «Viagem por Espanha», reconhece ter ficado tão impressionado com o luxo e modernidade da Fonda como com o barulho infernal da Puerta del Sol.",
          "Andersen procurava a alma de Madrid e ficava fascinado com o contraste entre o bulício da rua e a paz do interior.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Quatro anos depois, em 1866, Henry Blackburn, crítico de arte da London Society, ficou aqui para escrever o seu livro «Viajando pela Espanha na actualidade». Destes mesmos balcões observou amanheceres e entardeceres da Puerta del Sol.",
          "Podes pedir um exemplar do livro na recepção.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "O hóspede mais conhecido internacionalmente é o escritor e poeta argentino Jorge Luis Borges que, entre 1919 e 1921, alojado na então chamada Pensión Americana, escreveu os seus primeiros poemas ultraístas.",
          "Podes ver uma placa comemorativa no exterior do edifício.",
          "O quarto de Borges é o número 416, no quarto andar, em esquina com 3 varandas para as ruas Tetuán e Carmen.",
        ],
      },
    ],
    youLabel: "Tu",
    youBody: "E agora, tu.",
    backLabel: "Voltar",
  },
  zh: {
    title: "难忘的旅客",
    subtitle: "在您到来之前，我们接待过许多其他难忘的旅客。",
    travellers: [
      {
        name: "汉斯·克里斯蒂安·安徒生",
        years: "1862",
        body: [
          "第一位难忘的旅客是丹麦作家汉斯·克里斯蒂安·安徒生，他于1862年在此住宿，距大楼开业仅一年。",
          "在他的《西班牙之旅》一书中，他承认对拉丰达的豪华和现代感印象深刻，同时也被太阳门广场的嘈杂所震撼，他将其描述为脚下的蚁穴。",
          "安徒生寻找马德里的灵魂，着迷于从阳台观看广场的生活，以及街道喧嚣与室内宁静之间的对比。",
        ],
      },
      {
        name: "亨利·布莱克本",
        years: "1866",
        body: [
          "四年后的1866年，伦敦社会的艺术评论家亨利·布莱克本在此住宿，为其著作《当代西班牙游记》收集素材。他从这些阳台上观察太阳门广场的日出和日落。",
          "您可以在前台索取该书的副本。",
        ],
      },
      {
        name: "豪尔赫·路易斯·博尔赫斯",
        years: "1919 – 1921",
        body: [
          "国际上最知名的住客是阿根廷作家和诗人豪尔赫·路易斯·博尔赫斯，他在1919年至1921年间住在当时称为美国旅馆的地方，写下了他的第一批超现实主义诗歌。",
          "您可以在建筑外部看到一块纪念牌匾。",
          "博尔赫斯的房间是416号，位于四楼，转角处有3个阳台俯瞰特图安街和卡门街。",
        ],
      },
    ],
    youLabel: "您",
    youBody: "现在，轮到您了。",
    backLabel: "返回",
  },
  ja: {
    title: "忘れられない旅人たち",
    subtitle: "あなたのご到着前に、多くの忘れられない旅人たちをお迎えしました。",
    travellers: [
      {
        name: "ハンス・クリスチャン・アンデルセン",
        years: "1862",
        body: [
          "ラ・フォンダ・デ・ロス・プリンシペスを訪れた最初の忘れられない旅人は、デンマークの作家ハンス・クリスチャン・アンデルセンで、建物が開業してわずか1年後の1862年に宿泊しました。",
          "著書「スペイン旅行」の中で、ラ・フォンダの豪華さと近代性に感銘を受けたと同時に、プエルタ・デル・ソルの騒音にも圧倒されたと述べています。",
          "アンデルセンはマドリードの魂を求め、バルコニーから広場の生活を眺めることに魅了されました。",
        ],
      },
      {
        name: "ヘンリー・ブラックバーン",
        years: "1866",
        body: [
          "4年後の1866年、ロンドン・ソサエティの美術評論家ヘンリー・ブラックバーンが著書「現代スペイン旅行」執筆のためここに宿泊しました。まさにこれらのバルコニーからプエルタ・デル・ソルの日の出と日没を観察しました。",
          "フロントで本のコピーをお求めいただけます。",
        ],
      },
      {
        name: "ホルヘ・ルイス・ボルヘス",
        years: "1919 – 1921",
        body: [
          "国際的に最も知られているゲストは、アルゼンチンの作家・詩人ホルヘ・ルイス・ボルヘスで、1919年から1921年にかけて当時ペンシオン・アメリカーナと呼ばれていたこの場所に滞在し、最初のウルトライスタ詩を書きました。",
          "建物の外に記念プレートをご覧いただけます。",
          "ボルヘスの部屋は416号室、4階の角部屋で、テトゥアン通りとカルメン通りに面した3つのバルコニーがあります。",
        ],
      },
    ],
    youLabel: "あなた",
    youBody: "そして今、あなたの番です。",
    backLabel: "戻る",
  },
  ar: {
    title: "مسافرون لا يُنسون",
    subtitle: "قبل وصولك، استقبلنا العديد من المسافرين الذين لا يُنسون.",
    travellers: [
      {
        name: "هانس كريستيان أندرسن",
        years: "1862",
        body: [
          "أول مسافر لا يُنسى زار لا فوندا دي لوس برينسيبيس هو الكاتب الدنماركي هانس كريستيان أندرسن، الذي أقام هنا عام 1862، بعد عام واحد فقط من افتتاح المبنى.",
          "في كتابه «رحلة إلى إسبانيا»، يعترف بأنه أُعجب بفخامة وحداثة لا فوندا بقدر ما أُذهل بضجيج بويرتا ديل سول الجهنمي.",
          "كان أندرسن يبحث عن روح مدريد، وكان مفتوناً بالتناقض بين صخب الشارع وهدوء الداخل.",
        ],
      },
      {
        name: "هنري بلاكبيرن",
        years: "1866",
        body: [
          "بعد أربع سنوات، في عام 1866، أقام هنري بلاكبيرن، ناقد فني في لندن سوسايتي، هنا لكتابة كتابه «السفر في إسبانيا اليوم». من هذه الشرفات بالذات راقب شروق الشمس وغروبها على بويرتا ديل سول.",
          "يمكنك طلب نسخة من الكتاب في مكتب الاستقبال.",
        ],
      },
      {
        name: "خورخي لويس بورخيس",
        years: "1919 – 1921",
        body: [
          "أشهر نزيل على المستوى الدولي هو الكاتب والشاعر الأرجنتيني خورخي لويس بورخيس الذي، بين عامَي 1919 و1921، مقيماً في ما كان يُعرف آنذاك ببنسيون أمريكانا، كتب قصائده الأولى.",
          "يمكنك رؤية لوحة تذكارية على واجهة المبنى.",
          "غرفة بورخيس هي رقم 416، في الطابق الرابع، في الزاوية مع 3 شرفات تطل على شارعَي تيتوان وكارمن.",
        ],
      },
    ],
    youLabel: "أنت",
    youBody: "والآن، أنت.",
    backLabel: "رجوع",
  },
  ru: {
    title: "Незабываемые путешественники",
    subtitle: "До вашего приезда у нас было много других незабываемых путешественников.",
    travellers: [
      {
        name: "Ханс Кристиан Андерсен",
        years: "1862",
        body: [
          "Первым незабываемым путешественником, посетившим La Fonda de los Príncipes, был датский писатель Ханс Кристиан Андерсен, остановившийся здесь в 1862 году, всего через год после открытия здания.",
          "В своей книге «Путешествие по Испании» он признаёт, что был так же поражён роскошью и современностью La Fonda, как и адским шумом Пуэрта-дель-Соль.",
          "Андерсен искал душу Мадрида и был очарован контрастом между суетой улицы и покоем внутри.",
        ],
      },
      {
        name: "Генри Блэкберн",
        years: "1866",
        body: [
          "Четыре года спустя, в 1866 году, Генри Блэкберн, художественный критик London Society, остановился здесь, чтобы написать книгу «Путешествие по современной Испании». С этих самых балконов он наблюдал рассветы и закаты над Пуэрта-дель-Соль.",
          "Вы можете попросить копию книги на стойке регистрации.",
        ],
      },
      {
        name: "Хорхе Луис Борхес",
        years: "1919 – 1921",
        body: [
          "Наиболее известным на международном уровне гостем является аргентинский писатель и поэт Хорхе Луис Борхес, который в 1919–1921 годах, проживая в тогдашней Pensión Americana, написал свои первые ультраистские стихи.",
          "На внешней стороне здания можно увидеть мемориальную доску.",
          "Комната Борхеса — номер 416, на четвёртом этаже, угловая, с 3 балконами, выходящими на улицы Тетуан и Кармен.",
        ],
      },
    ],
    youLabel: "Вы",
    youBody: "А теперь — вы.",
    backLabel: "Назад",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ViajerosPage({ onBack }: ViajerosPageProps) {
  const { lang } = useLanguage();
  const c = CONTENT[lang] ?? CONTENT.es;

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  };

  return (
    <div
      className="flex flex-col"
      style={{ background: "oklch(0.08 0 0)", maxWidth: 480, margin: "0 auto", minHeight: "100dvh" }}
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
          style={{ height: 32, opacity: 0.85 }}
        />

        <LanguageSelector />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pt-10 pb-14">
        {/* Title */}
        <h1
          className="mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
            color: "oklch(0.96 0.025 85)",
            lineHeight: 1.15,
          }}
        >
          {c.title}
        </h1>

        {/* Gold divider */}
        <div
          className="mb-7"
          style={{
            height: 1,
            background: "linear-gradient(90deg, var(--gold), transparent)",
            width: "60%",
          }}
        />

        {/* Subtitle */}
        <p
          className="mb-10"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1rem, 3.5vw, 1.1rem)",
            color: "oklch(0.72 0.02 85)",
            lineHeight: 1.7,
          }}
        >
          {c.subtitle}
        </p>

        {/* Travellers */}
        <div className="flex flex-col gap-10">
          {c.travellers.map((traveller, idx) => (
            <div key={idx}>
              {/* Name & years */}
              <div className="flex items-baseline gap-3 mb-4">
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
                    color: "oklch(0.92 0.03 85)",
                    lineHeight: 1.2,
                  }}
                >
                  {traveller.name}
                </h2>
                <span
                  style={{
                    ...labelStyle,
                    color: "var(--gold)",
                    opacity: 0.8,
                    fontSize: "0.65rem",
                  }}
                >
                  {traveller.years}
                </span>
              </div>

              {/* Gold accent line */}
              <div
                className="mb-4"
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, var(--gold), transparent)",
                  width: "40%",
                  opacity: 0.5,
                }}
              />

              {/* Body paragraphs */}
              <div className="flex flex-col gap-4">
                {traveller.body.map((p, pi) => (
                  <p
                    key={pi}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.93rem",
                      color: "oklch(0.68 0.015 85)",
                      lineHeight: 1.85,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* You section */}
        <div
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid oklch(0.16 0.01 72)" }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.3rem, 4.5vw, 1.6rem)",
              color: "var(--gold)",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {c.youBody}
          </p>
        </div>
      </main>
    </div>
  );
}
