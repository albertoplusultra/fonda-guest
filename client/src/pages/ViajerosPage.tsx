/*
 * ViajerosPage — "Noche en Sol" design
 * Viajeros memorables de La Fonda de los Príncipes
 */
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

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
          "No seu livro «Viagem a Espanha», ele reconhece ter ficado tão impressionado com o quão luxuosa e moderna era a Fonda, como com o barulho infernal da Puerta del Sol, que descreveu como um formigueiro debaixo dos seus pés. Aguadeiros, diligências, vendedores, tertúlias faziam parte do dia a dia.",
          "Andersen procurava a alma de Madrid, entusiasmava-se ao ver a vida da praça das varandas, e fascinava-se com o contraste entre a agitação da rua e a paz do interior.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Quatro anos depois, em 1866, Henry Blackburn, crítico de arte da London Society, ficou aqui para escrever o seu livro «Viajando em Espanha no Presente». Destas mesmas varandas, ele observou o nascer e o pôr do sol sobre a Puerta del Sol, algo que retrataria no seu livro.",
          "Achamos curioso como o seu guia de viagem continua muito relevante. Pode descobri-lo por si mesmo, pedindo uma cópia do livro na receção.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "O hóspede mais conhecido internacionalmente é o escritor e poeta argentino Jorge Luis Borges que, entre 1919 e 1921, hospedado na então chamada Pensión Americana, escreveu os seus primeiros poemas ultraístas.",
          "Pode ver uma placa comemorativa no exterior do edifício.",
          "O quarto de Borges é o número 416, no quarto andar, na esquina com 3 varandas para as ruas Tetuán e Carmen.",
        ],
      },
    ],
    youLabel: "Tu",
    youBody: "E agora, tu.",
    backLabel: "Voltar",
  },
  zh: {
    title: "难忘的旅行者",
    subtitle: "在您到来之前，我们还有许多其他难忘的旅行者。",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "第一位光临拉丰达德洛斯普林西佩斯的难忘旅行者是丹麦作家汉斯·克里斯蒂安·安德森，他于1862年在此居住，当时大楼开业仅一年。",
          "在他的书《西班牙之行》中，他承认自己对拉丰达的奢华与现代化印象深刻，同样令他难忘的是太阳门广场的喜闹声，他将其描述为脚下的蚁山。卖水人、驿车、商贩和聚会是日常生活的一部分。",
          "安德森寻找着马德里的灵魂，他喜欢从阳台上观察广场的生活，街道的喜闹与室内的宁静形成的强烈对比令他着迷。",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "四年后的1866年，《伦敦社会》艺术评论家亨利·布莱克伯恩在此居住，撰写他的书《当代西班牙游记》。他从这些阳台上观察了太阳门广场的日出与日落，并将其载入书中。",
          "他的旅行指南至今仍很具参考价値，这令我们感到好奇。您可以在前台要求一本书，亲自去发现。",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "国际上最知名的房客是阿根廷作家和诗人豪尔赫·路易斯·博尔赫斯，他在1919至1921年间居住于当时称为美洲废的山庄，在此写下了他第一批超现实主义诗歌。",
          "建筑外墙上有一块纪念牌，欢迎前往参观。",
          "博尔赫斯的房间是416号，位于四楼转角处，有三个阳台面向特尔山街和卡门街。",
        ],
      },
    ],
    youLabel: "您",
    youBody: "现在，轮到您了。",
    backLabel: "返回",
  },
  ja: {
    title: "記憶に残る旅人たち",
    subtitle: "あなたの到着前にも、多くの記憶に残る旅人たちがここに宿泊されました。",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "La Fonda de los Príncipesを訪れた最初の記憶に残る旅人は、デンマークの作家ハンス・クリスチャン・アンデルセンです。彼は建物の開業からわずか1年後の1862年にここに滞在しました。",
          "彼の著書『スペイン紀行』の中で、彼はフォンダの豪華さと現代性に深く感動したことを認めており、同時にプエルタ・デル・ソルの地獄のような騒々しさにも言及しています。彼はそこを足の下の處のような場所と表現しました。",
          "アンデルセンはマドリードの魂を求め、バルコニーから広場の生活を見るのを心から楽しみ、街の喧騒と内部の静けさの対比に魅了されていました。",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "4年後の1866年、『ロンドン・ソサエティ』の美術評論家ヘンリー・ブラックバーンがここに宿泊し、著書『現代スペイン旅行』を執筆しました。まさにこのバルコニーから、彼はプエルタ・デル・ソルの日の出没を观察し、それを作品に記しました。",
          "彼の旅行ガイドが今も役立つことに私たちは興味を感じます。フロントで本のコピーをお申し付けいただけます。",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "国際的に最も有名な宿泊客は、アルゼンチンの作家・詞人ホルヘ・ルイス・ボルヘスです。彼は1919年から1921年の間、当時「ペンシオン・アメリカーナ」と呼ばれていたこの場所に宿泊し、最初の超現実主義詩を書きました。",
          "建物の外壁に記念プレートがございます。",
          "ボルヘスの部屋は416号、四階の角部屋で、テトゥアン街とカルメン街に面した3つのバルコニーがあります。",
        ],
      },
    ],
    youLabel: "あなた",
    youBody: "そして今、あなたの番です。",
    backLabel: "戻る",
  },
  ar: {
    title: "مسافرون لا يُنسون",
    subtitle: "قبل وصولك، استضاف فندقنا كثيرين من المسافرين الذين لا يُنسون.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "كان أول مسافر لا يُنسى زار لا فوندا دي لوس برينسيبيس هو الكاتب الدنماركي هانز كريستيان أندرسن، الذي أقام هنا عام 1862، بعد عام واحد فقط من افتتاح المبنى.",
          "في كتابه «رحلة في إسبانيا»، يعترف بأنه أُعجب بروعة الفوندا وحداثتها، كما أذهله الضجيج الهائل لبويرتا ديل سول، وصفها بأنها خلية نمل تحت قدميه.",
          "كان أندرسن يبحث عن روح مدريد، وكان يستمتع بمشاهدة حياة الميدان من الشرفات، وأحره التناقض بين صخب الشارع وسكينة الداخل.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "بعد أربعة أعوام، في عام 1866، أقام هنا هنري بلاكبيرن، ناقد فني في مجلة لندن سوسايتي، ليكتب كتابه «السفر في إسبانيا اليوم». من هذه الشرفات بالذات، رصد شروق وغروب بويرتا ديل سول.",
          "يثيرنا الفضول كيف لا يزال دليله السياحي ذا قيمة. يمكنك طلب نسخة من الكتاب في مكتب الاستقبال.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "أشهر ضيف على الصعيد الدولي هو الكاتب والشاعر الأرجنتيني خورخي لويس بورخيس، الذي أقام هنا بين عامي 1919 و 1921 في ما كان يُعرف آنذاك باسم بينسيون أميريكانا، وكتب فيه قصائده الأولى.",
          "يمكنك رؤية لوحة تذكارية على واجهة المبنى.",
          "غرفة بورخيس هي رقم 416، في الطابق الرابع، في الزاوية، مع 3 شرفات تطل على شارعي تيتوان وكارمن.",
        ],
      },
    ],
    youLabel: "أنت",
    youBody: "والآن، دورك.",
    backLabel: "رجوع",
  },
  ru: {
    title: "Незабываемые путешественники",
    subtitle: "До вашего приезда здесь останавливались многие другие незабываемые путешественники.",
    travellers: [
      {
        name: "Hans Christian Andersen",
        years: "1862",
        body: [
          "Первым незабываемым путешественником, посетившим La Fonda de los Príncipes, был датский писатель Ганс Христиан Андерсен, остановившийся здесь в 1862 году, всего через год после открытия здания.",
          "В своей книге «Путешествие по Испании» он признаёт, что его поразила как роскошь и современность Фонды, так и адский шум Пуэрта-дель-Соль, который он описал как муравейник под ногами.",
          "Андерсен искал душу Мадрида, любил наблюдать за жизнью площади с балконов и был очарован контрастом между уличным шумом и покоем внутри.",
        ],
      },
      {
        name: "Henry Blackburn",
        years: "1866",
        body: [
          "Четыре года спустя, в 1866 году, здесь остановился Хенри Блэкберн, искусствовед журнала London Society, чтобы написать книгу «Путешествие по современной Испании». Именно с этих балконов он наблюдал рассветы и закаты над Пуэрта-дель-Соль, что и отразил в своей книге.",
          "Нас удивляет, насколько его путеводитель актуален и сегодня. Вы можете попросить экземпляр книги на ресепшн.",
        ],
      },
      {
        name: "Jorge Luis Borges",
        years: "1919 – 1921",
        body: [
          "Наиболее известный в мире гость — аргентинский писатель и поэт Хорхе Луис Борхес, который в 1919–1921 годах, проживая в тогдашней Пенсион Американа, написал здесь свои первые ультраистские стихи.",
          "На внешней стене здания есть мемориальная табличка.",
          "Номер комнаты Борхеса — 416, на четвёртом этаже, угловой номер с 3 балконами, выходящими на улицы Тетуан и Кармен.",
        ],
      },
    ],
    youLabel: "Вы",
    youBody: "И теперь — вы.",
    backLabel: "Назад",
  },
};

const ViajerosPage: React.FC<ViajerosPageProps> = ({ onBack }) => {
  const { lang } = useLanguage();
  const content = CONTENT[lang] || CONTENT.es;

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{content.title}</PageTitle>
      <p style={{ ...ps.body, marginBottom: "3rem" }}>
        {content.subtitle}
      </p>

      {content.travellers.map((traveller, index) => (
        <div key={index} style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2 style={{ ...ps.title, fontSize: "1.5rem", marginBottom: "0.5rem" }}>{traveller.name}</h2>
            <p style={{ ...ps.muted, flexShrink: 0, paddingLeft: "1rem" }}>{traveller.years}</p>
          </div>
          <div style={ps.goldLine} />
          {traveller.body.map((paragraph, pIndex) => (
            <p key={pIndex} style={{ ...ps.body, marginBottom: "1rem" }}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p style={{ ...ps.body, fontSize: "1.5rem", marginBottom: "0.25rem" }}>{content.youBody}</p>
        <p style={ps.muted}>{content.youLabel}</p>
      </div>
    </PageLayout>
  );
};

export default ViajerosPage;
