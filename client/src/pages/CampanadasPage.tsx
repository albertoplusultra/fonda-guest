/*
 * CampanadasPage — "Noche en Sol" design
 * Los balcones y las campanadas de La Fonda de los Príncipes
 */
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface CampanadasPageProps {
  onBack: () => void;
}

interface Curiosity {
  text: string;
}

interface CampanadasContent {
  title: string;
  intro: string;
  paragraphs: string[];
  curiositiesTitle: string;
  curiosities: Curiosity[];
  backLabel: string;
}

const CONTENT: Record<string, CampanadasContent> = {
  es: {
    title: "Los balcones y las campanadas",
    intro: "Si algo hace única a la Fonda de los Príncipes, son sus balcones.",
    paragraphs: [
      "Nuestros balcones son el lugar donde cada año, el 31 de diciembre, las diferentes cadenas de televisión retransmiten las campanadas para despedir el año. Sí, durante toda nuestra vida, en Nochevieja, hemos disfrutado de la retransmisión de las campanadas desde este lugar.",
      "Un lugar que trae recuerdos maravillosos de uno de los momentos más emotivos del año. Desde que tenemos memoria, todos hemos vivido este momento en familia, alrededor de la televisión, recordando a los que se fueron, y brindando por el futuro.",
      "Estar aquí es algo mágico.",
      "Además, debes saber que La Fonda de los Príncipes ha visto todas las campanadas que se han celebrado en la Puerta del Sol, ya que es más antigua que las propias campanadas.",
      "Las campanadas comenzaron a celebrarse con la instalación del reloj de la Real Casa de Correos, en 1866, cinco años después de que se inaugurara la fonda original. Desde su instalación, el reloj de la Puerta del Sol ha sido el símbolo más emblemático para despedir el año en España.",
      "El reloj es el símbolo, y La Fonda, el mejor lugar para disfrutarlo. Cada año vienen a La Fonda las diferentes cadenas de televisión para retransmitir con toda España este momento tan especial.",
    ],
    curiositiesTitle: "Curiosidades históricas de las campanadas",
    curiosities: [
      { text: "La retransmisión por televisión comenzó en 1962 de la mano de Televisión Española. Hasta ese momento, se retransmitían por radio." },
      { text: "Todos los años se ha retransmitido desde la Puerta del Sol, a excepción de 1973 y 1983, que se emitió desde Barcelona y Tenerife respectivamente." },
      { text: "En España se celebra comiendo 12 uvas, una con cada campanada. La tradición está documentada desde finales del siglo XIX." },
      { text: "Las campanadas suenan cada 3 segundos, para dar tiempo suficiente para poder comer las uvas." },
      { text: "En 1989/1990, Marisa Naranjo confundió los cuartos con las campanadas finales, y muchos espectadores empezaron a comer las uvas antes de tiempo." },
      { text: "En 1992/1993, José María Carrascal felicitó el año 1963, en vez de 1993." },
      { text: "En 1996/1997, por un error técnico sonaron el doble de rápido de lo normal." },
      { text: "El récord de audiencia lo consiguió Televisión Española en 2000/2001, con 10,55 millones de espectadores." },
      { text: "Ramón García es el presentador que más veces ha presentado las campanadas, 20 veces a lo largo de cuatro décadas." },
    ],
    backLabel: "Volver",
  },
  en: {
    title: "The balconies & the bells",
    intro: "If anything makes La Fonda de los Príncipes unique, it is its balconies.",
    paragraphs: [
      "Our balconies are the place where every year, on December 31st, different television channels broadcast the New Year's bells to bid farewell to the year. Yes, throughout our entire lives, on New Year's Eve, we have enjoyed watching the broadcast of the bells from this very place.",
      "A place that brings wonderful memories of one of the most emotional moments of the year. For as long as we can remember, we have all experienced this moment as a family, gathered around the television, remembering those who have gone, and toasting to the future.",
      "Being here is something magical.",
      "You should also know that La Fonda de los Príncipes has witnessed every single New Year's bell celebration held at Puerta del Sol, as it is older than the bells themselves.",
      "The New Year's bells tradition began with the installation of the clock at the Real Casa de Correos in 1866, five years after the original fonda opened. Since its installation, the Puerta del Sol clock has been the most emblematic symbol for welcoming the New Year in Spain.",
      "The clock is the symbol, and La Fonda is the best place to enjoy it. Every year, different television channels come to La Fonda to broadcast this special moment with all of Spain.",
    ],
    curiositiesTitle: "Historical curiosities about the bells",
    curiosities: [
      { text: "Television broadcasting began in 1962 by Televisión Española. Until then, it was broadcast on radio." },
      { text: "Every year it has been broadcast from Puerta del Sol, except in 1973 and 1983, when it was broadcast from Barcelona and Tenerife respectively." },
      { text: "In Spain, it is celebrated by eating 12 grapes, one with each bell. The tradition has been documented since the late 19th century." },
      { text: "The bells ring every 3 seconds, to give enough time to eat the grapes." },
      { text: "In 1989/1990, presenter Marisa Naranjo confused the quarter chimes with the final bells, and many viewers started eating their grapes too early." },
      { text: "In 1992/1993, journalist José María Carrascal wished everyone a Happy 1963, instead of 1993." },
      { text: "In 1996/1997, due to a technical error, the bells rang twice as fast as normal." },
      { text: "The audience record was achieved by Televisión Española in 2000/2001, with 10.55 million viewers." },
      { text: "Ramón García is the presenter who has hosted the bells the most times — 20 times over four decades." },
    ],
    backLabel: "Back",
  },
  fr: {
    title: "Les balcons et les cloches",
    intro: "Si quelque chose rend La Fonda de los Príncipes unique, ce sont ses balcons.",
    paragraphs: [
      "Nos balcons sont l'endroit où chaque année, le 31 décembre, différentes chaînes de télévision retransmettent les cloches du Nouvel An. Oui, tout au long de notre vie, à la Saint-Sylvestre, nous avons profité de la retransmission des cloches depuis cet endroit.",
      "Un endroit qui évoque de merveilleux souvenirs de l'un des moments les plus émouvants de l'année. De mémoire d'homme, nous avons tous vécu ce moment en famille, autour de la télévision.",
      "Être ici est quelque chose de magique.",
      "Vous devez également savoir que La Fonda de los Príncipes a assisté à toutes les célébrations des cloches du Nouvel An à la Puerta del Sol, car elle est plus ancienne que les cloches elles-mêmes.",
      "La tradition des cloches a commencé avec l'installation de l'horloge de la Real Casa de Correos en 1866, cinq ans après l'ouverture de la fonda originale.",
      "L'horloge est le symbole, et La Fonda est le meilleur endroit pour en profiter.",
    ],
    curiositiesTitle: "Curiosités historiques sur les cloches",
    curiosities: [
      { text: "La retransmission télévisée a commencé en 1962 par Televisión Española. Jusqu'alors, elle était diffusée à la radio." },
      { text: "Chaque année, elle a été retransmise depuis la Puerta del Sol, sauf en 1973 et 1983, depuis Barcelone et Tenerife respectivement." },
      { text: "En Espagne, on célèbre en mangeant 12 raisins, un à chaque coup. La tradition est documentée depuis la fin du XIXe siècle." },
      { text: "Les cloches sonnent toutes les 3 secondes, pour laisser le temps de manger les raisins." },
      { text: "En 1996/1997, une erreur technique a fait sonner les cloches deux fois plus vite que la normale." },
      { text: "Le record d'audience a été atteint par Televisión Española en 2000/2001, avec 10,55 millions de téléspectateurs." },
      { text: "Ramón García est le présentateur qui a animé les cloches le plus souvent — 20 fois sur quatre décennies." },
    ],
    backLabel: "Retour",
  },
  de: {
    title: "Die Balkone und die Glocken",
    intro: "Wenn irgendetwas La Fonda de los Príncipes einzigartig macht, dann sind es ihre Balkone.",
    paragraphs: [
      "Unsere Balkone sind der Ort, wo jedes Jahr am 31. Dezember verschiedene Fernsehsender die Silvesterglocken übertragen. Ja, unser ganzes Leben lang haben wir an Silvester die Übertragung der Glocken von diesem Ort aus genossen.",
      "Ein Ort, der wunderbare Erinnerungen an einen der emotionalsten Momente des Jahres weckt. Seit Menschengedenken haben wir alle diesen Moment als Familie erlebt, um den Fernseher versammelt.",
      "Hier zu sein ist etwas Magisches.",
      "Sie sollten auch wissen, dass La Fonda de los Príncipes alle Silvesterfeiern an der Puerta del Sol miterlebt hat, da sie älter als die Glocken selbst ist.",
      "Die Tradition begann mit der Installation der Uhr der Real Casa de Correos im Jahr 1866, fünf Jahre nach der Eröffnung der ursprünglichen Fonda.",
      "Die Uhr ist das Symbol, und La Fonda ist der beste Ort, um sie zu genießen.",
    ],
    curiositiesTitle: "Historische Kuriositäten über die Glocken",
    curiosities: [
      { text: "Die Fernsehübertragung begann 1962 durch Televisión Española. Bis dahin wurde sie im Radio übertragen." },
      { text: "Jedes Jahr wurde von der Puerta del Sol übertragen, außer 1973 und 1983, als es aus Barcelona bzw. Teneriffa gesendet wurde." },
      { text: "In Spanien feiert man, indem man 12 Weintrauben isst, eine mit jedem Glockenschlag. Die Tradition ist seit dem späten 19. Jahrhundert dokumentiert." },
      { text: "Die Glocken läuten alle 3 Sekunden, um genug Zeit zum Essen der Trauben zu geben." },
      { text: "1996/1997 läuteten die Glocken aufgrund eines technischen Fehlers doppelt so schnell wie normal." },
      { text: "Den Zuschauerrekord erzielte Televisión Española 2000/2001 mit 10,55 Millionen Zuschauern." },
      { text: "Ramón García ist der Moderator, der die Glocken am häufigsten präsentiert hat — 20 Mal über vier Jahrzehnte." },
    ],
    backLabel: "Zurück",
  },
  it: {
    title: "I balconi e le campane",
    intro: "Se qualcosa rende unica La Fonda de los Príncipes, sono i suoi balconi.",
    paragraphs: [
      "I nostri balconi sono il luogo dove ogni anno, il 31 dicembre, diversi canali televisivi trasmettono le campane di Capodanno. Sì, per tutta la nostra vita, a Capodanno, abbiamo goduto della trasmissione delle campane da questo posto.",
      "Un luogo che evoca meravigliosi ricordi di uno dei momenti più emozionanti dell'anno. Da sempre, abbiamo vissuto questo momento in famiglia, intorno alla televisione.",
      "Essere qui è qualcosa di magico.",
      "Devi anche sapere che La Fonda de los Príncipes ha assistito a tutte le celebrazioni delle campane di Capodanno alla Puerta del Sol, poiché è più antica delle campane stesse.",
      "La tradizione iniziò con l'installazione dell'orologio della Real Casa de Correos nel 1866, cinque anni dopo l'apertura della fonda originale.",
      "L'orologio è il simbolo, e La Fonda è il posto migliore per goderselo.",
    ],
    curiositiesTitle: "Curiosità storiche sulle campane",
    curiosities: [
      { text: "La trasmissione televisiva iniziò nel 1962 da parte di Televisión Española. Fino ad allora, veniva trasmessa alla radio." },
      { text: "Ogni anno è stata trasmessa dalla Puerta del Sol, tranne nel 1973 e 1983, quando fu trasmessa rispettivamente da Barcellona e Tenerife." },
      { text: "In Spagna si festeggia mangiando 12 uva, una ad ogni rintocco. La tradizione è documentata dalla fine del XIX secolo." },
      { text: "Le campane suonano ogni 3 secondi, per dare abbastanza tempo per mangiare l'uva." },
      { text: "Nel 1996/1997, per un errore tecnico, le campane suonarono il doppio più veloce del normale." },
      { text: "Il record di ascolti fu raggiunto da Televisión Española nel 2000/2001, con 10,55 milioni di spettatori." },
      { text: "Ramón García è il presentatore che ha condotto le campane più volte — 20 volte in quattro decenni." },
    ],
    backLabel: "Indietro",
  },
  pt: {
    title: "As varandas e os sinos",
    intro: "Se algo torna La Fonda de los Príncipes única, são as suas varandas.",
    paragraphs: [
      "As nossas varandas são o lugar onde todos os anos, no dia 31 de dezembro, diferentes canais de televisão transmitem os sinos de Ano Novo. Sim, ao longo de toda a nossa vida, na Passagem de Ano, temos desfrutado da transmissão dos sinos a partir deste lugar.",
      "Um lugar que traz maravilhosas memórias de um dos momentos mais emotivos do ano. Desde sempre, vivemos este momento em família, à volta da televisão.",
      "Estar aqui é algo mágico.",
      "Deves também saber que La Fonda de los Príncipes assistiu a todas as celebrações dos sinos de Ano Novo na Puerta del Sol, pois é mais antiga do que os próprios sinos.",
      "A tradição começou com a instalação do relógio da Real Casa de Correos em 1866, cinco anos após a abertura da fonda original.",
      "O relógio é o símbolo, e La Fonda é o melhor lugar para o desfrutar.",
    ],
    curiositiesTitle: "Curiosidades históricas sobre os sinos",
    curiosities: [
      { text: "A transmissão televisiva começou em 1962 pela Televisión Española. Até então, era transmitida na rádio." },
      { text: "Todos os anos foi transmitida da Puerta del Sol, exceto em 1973 e 1983, quando foi emitida de Barcelona e Tenerife respetivamente." },
      { text: "Em Espanha, celebra-se comendo 12 uvas, uma a cada badalada. A tradição está documentada desde o final do século XIX." },
      { text: "Os sinos soam de 3 em 3 segundos, para dar tempo suficiente para comer as uvas." },
      { text: "Em 1996/1997, por um erro técnico, os sinos soaram o dobro mais rápido do normal." },
      { text: "O recorde de audiência foi alcançado pela Televisión Española em 2000/2001, com 10,55 milhões de espectadores." },
      { text: "Ramón García é o apresentador que mais vezes apresentou os sinos — 20 vezes ao longo de quatro décadas." },
    ],
    backLabel: "Voltar",
  },
  zh: {
    title: "阳台与钟声",
    intro: "如果说有什么让拉丰达德洛斯普林西佩斯独一无二，那就是它的阳台。",
    paragraphs: [
      "我们的阳台是每年12月31日各大电视台播出新年钟声的地方。是的，我们一生中，在新年前夜，都从这里欣赏钟声的播出。",
      "这个地方承载着一年中最感人时刻的美好记忆。从我们有记忆起，我们都是和家人一起围坐在电视机旁度过这一时刻，缅怀逝去的人，为未来干杯。",
      "置身于此，是一种神奇的体验。",
      "此外，您还应该知道，拉丰达德洛斯普林西佩斯见证了太阳门广场举行的每一次新年钟声庆典，因为它比钟声本身还要古老。",
      "新年钟声的传统始于1866年皇家邮政大楼时钟的安装，比原始旅馆开业晚了五年。",
      "时钟是象征，而拉丰达是欣赏它的最佳场所。",
    ],
    curiositiesTitle: "钟声的历史趣闻",
    curiosities: [
      { text: "电视播出始于1962年的西班牙电视台。在此之前，通过广播播出。" },
      { text: "每年都从太阳门广场播出，除了1973年和1983年分别从巴塞罗那和特内里费播出。" },
      { text: "在西班牙，人们通过吃12颗葡萄来庆祝，每声钟响吃一颗。这一传统自19世纪末就有记载。" },
      { text: "钟声每3秒响一次，给人们足够的时间吃葡萄。" },
      { text: "1996/1997年，由于技术故障，钟声响得比正常速度快了一倍。" },
      { text: "收视率纪录由西班牙电视台在2000/2001年创下，达到1055万观众。" },
      { text: "拉蒙·加西亚是主持钟声次数最多的主持人，四十年间共主持了20次。" },
    ],
    backLabel: "返回",
  },
  ja: {
    title: "バルコニーと鐘の音",
    intro: "ラ・フォンダ・デ・ロス・プリンシペスを唯一無二にするものがあるとすれば、それはバルコニーです。",
    paragraphs: [
      "私たちのバルコニーは、毎年12月31日に様々なテレビ局が新年の鐘を中継する場所です。そう、私たちの生涯を通じて、大晦日には、まさにこの場所からの鐘の中継を楽しんできました。",
      "一年で最も感動的な瞬間の素晴らしい思い出をもたらす場所。記憶のある限り、私たちは皆、テレビの周りに家族で集まり、この瞬間を過ごしてきました。",
      "ここにいることは、魔法のようなものです。",
      "また、ラ・フォンダ・デ・ロス・プリンシペスは、プエルタ・デル・ソルで行われたすべての新年の鐘の祝典を目撃してきたことも知っておいてください。なぜなら、鐘そのものよりも古いからです。",
      "この伝統は、1866年に王立郵便局の時計が設置されたことで始まりました。元のフォンダが開業してから5年後のことです。",
      "時計はシンボルであり、ラ・フォンダはそれを楽しむ最高の場所です。",
    ],
    curiositiesTitle: "鐘にまつわる歴史的な豆知識",
    curiosities: [
      { text: "テレビ放送は1962年にテレビシオン・エスパニョーラによって始まりました。それまではラジオで放送されていました。" },
      { text: "毎年プエルタ・デル・ソルから放送されてきましたが、1973年と1983年はそれぞれバルセロナとテネリフェから放送されました。" },
      { text: "スペインでは、鐘が鳴るたびに1粒ずつ、12粒のブドウを食べてお祝いします。この伝統は19世紀末から記録されています。" },
      { text: "鐘は3秒ごとに鳴り、ブドウを食べるのに十分な時間を与えます。" },
      { text: "1996/1997年、技術的なミスにより、鐘が通常の2倍の速さで鳴りました。" },
      { text: "視聴率記録は2000/2001年にテレビシオン・エスパニョーラが達成し、1,055万人の視聴者を記録しました。" },
      { text: "ラモン・ガルシアは鐘を最も多く司会した人物で、40年間で20回を数えます。" },
    ],
    backLabel: "戻る",
  },
  ar: {
    title: "الشرفات وأجراس رأس السنة",
    intro: "إن كان ثمة شيء يجعل لا فوندا دي لوس برينسيبيس فريدة من نوعها، فهو شرفاتها.",
    paragraphs: [
      "شرفاتنا هي المكان الذي تبث منه قنوات التلفزيون المختلفة أجراس رأس السنة في الحادي والثلاثين من ديسمبر كل عام. نعم، طوال حياتنا، في ليلة رأس السنة، استمتعنا ببث الأجراس من هذا المكان بالذات.",
      "مكان يجلب ذكريات رائعة عن أحد أكثر لحظات العام عاطفية. منذ أن نتذكر، عشنا هذه اللحظة جميعاً مع العائلة حول التلفزيون.",
      "التواجد هنا شيء ساحر.",
      "يجب أن تعلم أيضاً أن لا فوندا دي لوس برينسيبيس شهدت جميع احتفالات أجراس رأس السنة في بويرتا ديل سول، إذ إنها أقدم من الأجراس ذاتها.",
      "بدأت التقليد بتركيب ساعة دار البريد الملكية عام 1866، بعد خمس سنوات من افتتاح الفوندا الأصلية.",
      "الساعة هي الرمز، ولا فوندا هي أفضل مكان للاستمتاع بها.",
    ],
    curiositiesTitle: "فضول تاريخي حول الأجراس",
    curiosities: [
      { text: "بدأ البث التلفزيوني عام 1962 على يد تلفزيون إسبانيا. حتى ذلك الحين، كان يُبث عبر الراديو." },
      { text: "يُبث كل عام من بويرتا ديل سول، باستثناء عامَي 1973 و1983 اللذين بُثّا من برشلونة وتينيريفي على التوالي." },
      { text: "في إسبانيا، يُحتفل بأكل 12 حبة عنب، واحدة مع كل قرعة. التقليد موثق منذ أواخر القرن التاسع عشر." },
      { text: "تدق الأجراس كل 3 ثوانٍ، لإعطاء وقت كافٍ لأكل العنب." },
      { text: "في 1996/1997، بسبب خطأ تقني، دقت الأجراس بسرعة ضعف السرعة الطبيعية." },
      { text: "سجل المشاهدة حققه تلفزيون إسبانيا في 2000/2001، بـ 10.55 مليون مشاهد." },
      { text: "رامون غارسيا هو المذيع الذي قدّم الأجراس أكثر مرة — 20 مرة على مدى أربعة عقود." },
    ],
    backLabel: "رجوع",
  },
  ru: {
    title: "Балконы и куранты",
    intro: "Если что-то делает La Fonda de los Príncipes уникальной, то это её балконы.",
    paragraphs: [
      "Наши балконы — это место, где каждый год 31 декабря различные телеканалы транслируют новогодние куранты. Да, всю нашу жизнь, в канун Нового года, мы наслаждались трансляцией курантов именно отсюда.",
      "Место, которое пробуждает чудесные воспоминания об одном из самых трогательных моментов года. Сколько себя помним, мы все переживали этот момент в семейном кругу, у телевизора.",
      "Быть здесь — это что-то волшебное.",
      "Вам также следует знать, что La Fonda de los Príncipes была свидетелем каждого новогоднего боя курантов на Пуэрта-дель-Соль, поскольку она старше самих курантов.",
      "Традиция началась с установкой часов на Королевском почтамте в 1866 году, через пять лет после открытия первоначальной фонды.",
      "Часы — это символ, а La Fonda — лучшее место, чтобы насладиться ими.",
    ],
    curiositiesTitle: "Исторические факты о курантах",
    curiosities: [
      { text: "Телетрансляция началась в 1962 году силами Televisión Española. До этого велась радиотрансляция." },
      { text: "Каждый год трансляция велась с Пуэрта-дель-Соль, кроме 1973 и 1983 годов, когда она велась из Барселоны и Тенерифе соответственно." },
      { text: "В Испании принято есть 12 виноградин — по одной на каждый удар курантов. Традиция задокументирована с конца XIX века." },
      { text: "Куранты бьют каждые 3 секунды, чтобы дать достаточно времени съесть виноград." },
      { text: "В 1996/1997 году из-за технической ошибки куранты пробили вдвое быстрее обычного." },
      { text: "Рекорд аудитории установила Televisión Española в 2000/2001 году — 10,55 миллиона зрителей." },
      { text: "Рамон Гарсиа — ведущий, который чаще всего вёл куранты: 20 раз на протяжении четырёх десятилетий." },
    ],
    backLabel: "Назад",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function CampanadasPage({ onBack }: CampanadasPageProps) {
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
    <PageLayout onBack={onBack}>
        {/* Title */}
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.6rem, 5.5vw, 2.2rem)",
            color: "var(--foreground)",
            lineHeight: 1.2,
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

        {/* Intro */}
        <p
          className="mb-7"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.05rem, 3.5vw, 1.2rem)",
            color: "var(--card-foreground)",
            lineHeight: 1.7,
          }}
        >
          {c.intro}
        </p>

        {/* Paragraphs */}
        <div className="flex flex-col gap-5 mb-12">
          {c.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.93rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.85,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Curiosities */}
        <div
          className="pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
              color: "var(--card-foreground)",
            }}
          >
            {c.curiositiesTitle}
          </h2>

          <div className="flex flex-col gap-4">
            {c.curiosities.map((item, i) => (
              <div
                key={i}
                className="flex gap-3"
                style={{
                  paddingBottom: "1rem",
                  borderBottom: i < c.curiosities.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    color: "var(--gold)",
                    opacity: 0.7,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    flexShrink: 0,
                    minWidth: "1.2rem",
                  }}
                >
                  {i + 1}.
                </span>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.8,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
    </PageLayout>
  );
}
