/*
 * HistoriaPage — "Noche en Sol" design
 * Contenido real de la historia de La Fonda de los Príncipes
 * Incluye dos enlaces al final: Viajeros Memorables y Las Campanadas
 */
import { Users, Bell } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface HistoriaPageProps {
  onBack: () => void;
  onViajeros: () => void;
  onCampanadas: () => void;
}

// ── Historia content by language ─────────────────────────────────────────────

const HISTORIA_CONTENT: Record<string, {
  title: string;
  intro: string;
  paragraphs: string[];
  quote: string;
  quoteSource: string;
  readMore: string;
  viajerosLabel: string;
  campanasLabel: string;
}> = {
  es: {
    title: "Nuestra Historia",
    intro: "Inaugurada el 1 de octubre de 1861 bajo el reinado de Isabel II, La Fonda de los Príncipes fue uno de los primeros y más lujosos alojamientos de la Puerta del Sol.",
    paragraphs: [
      "La Fonda de los Príncipes marcó un hito al ser el primer gran hotel inaugurado en la Puerta del Sol tras la gran reforma urbanística que transformó la plaza en el centro neurálgico de Madrid.",
      "Nuestro edificio, Puerta del Sol 11, fue construido exprofeso para ser un hotel de categoría. La Fonda de los Príncipes tenía lujos nunca vistos en Madrid: ascensor, calefacción central, cuartos de baño en cada planta y un restaurante de primera categoría.",
      "Lamentablemente, todos los alojamientos históricos de la plaza han desaparecido a excepción de dos: La Fonda de los Príncipes y el antiguo Gran Hotel de París. La Fonda de los Príncipes es el único que ha dado alojamiento, de forma ininterrumpida, durante más de 160 años.",
      "Algo que tampoco ha cambiado es lo que hizo famosa a la Fonda de los Príncipes: sus balcones con las mejores vistas de la Puerta del Sol. Henry Blackburn describe en 1866 cómo son sus tardes observando la animada Puerta del Sol.",
      "El término fonda fue sustituido por hotel, luego por Gran Hotel de la Paix, después por Gran Hotel Americano, más tarde por Pensión Americana —época en que se alojó Jorge Luis Borges— y finalmente por Hostal Americano.",
      "En 2024, el hostal cambió de manos para tratar de recuperar su glorioso pasado. Tras más de 18 meses de obras, el 5 de enero de 2026, renace La Fonda de los Príncipes, haciendo honor a su nombre original.",
      "Bienvenido a La Fonda de los Príncipes, el único alojamiento que ha sobrevivido en la Puerta del Sol durante más de 160 años.",
    ],
    quote: "Enteramente amueblado de nuevo, con sus cuatro fachadas y 120 balcones a la calle, con su situación excepcional en el punto más céntrico de Madrid, ofrece a los señores viajeros todas las condiciones de comodidad y lujo que puedan desear.",
    quoteSource: "Biblioteca Nacional de España, julio de 1876",
    readMore: "Sigue leyendo",
    viajerosLabel: "Viajeros memorables",
    campanasLabel: "Los balcones y las campanadas",
  },
  en: {
    title: "Our History",
    intro: "Inaugurated on October 1st, 1861 under the reign of Queen Isabella II, La Fonda de los Príncipes was one of the first and most luxurious accommodations at Puerta del Sol.",
    paragraphs: [
      "La Fonda de los Príncipes marked a milestone as the first grand hotel inaugurated at Puerta del Sol after the major urban reform that transformed the square into the nerve centre of Madrid.",
      "Our building, Puerta del Sol 11, was purpose-built to be a luxury hotel. La Fonda de los Príncipes offered never-before-seen luxuries in Madrid: an elevator, central heating, bathrooms on every floor, and a first-class restaurant.",
      "Sadly, all the historic accommodations in the square have disappeared except for two: La Fonda de los Príncipes and the former Gran Hotel de París. La Fonda is the only one that has provided accommodation continuously for over 160 years.",
      "What also has not changed is what made La Fonda de los Príncipes famous: its balconies with the best views of Puerta del Sol. Henry Blackburn described in 1866 his afternoons observing the lively square.",
      "The name changed over time — from hotel to Gran Hotel de la Paix, then Gran Hotel Americano, then Pensión Americana (where Jorge Luis Borges stayed), and finally Hostal Americano.",
      "In 2024, the hostal changed hands to recover its glorious past. After more than 18 months of renovations, on January 5th, 2026, La Fonda de los Príncipes was reborn, honouring its original name.",
      "Welcome to La Fonda de los Príncipes, the only accommodation that has survived at Puerta del Sol for over 160 years.",
    ],
    quote: "Entirely refurnished, with its four facades and 120 balconies overlooking the street, with its exceptional location at the most central point of Madrid, it offers travellers all the conditions of comfort and luxury they could desire.",
    quoteSource: "Biblioteca Nacional de España, July 1876",
    readMore: "Keep reading",
    viajerosLabel: "Memorable travellers",
    campanasLabel: "The balconies & the bells",
  },
  fr: {
    title: "Notre Histoire",
    intro: "Inaugurée le 1er octobre 1861 sous le règne d'Isabelle II, La Fonda de los Príncipes fut l'un des premiers et des plus luxueux hébergements de la Puerta del Sol.",
    paragraphs: [
      "La Fonda de los Príncipes a marqué un tournant en étant le premier grand hôtel inauguré à la Puerta del Sol après la grande réforme urbaine qui a transformé la place en centre névralgique de Madrid.",
      "Notre bâtiment, Puerta del Sol 11, a été construit expressément pour être un hôtel de catégorie, avec des luxes jamais vus à Madrid : ascenseur, chauffage central, salles de bains à chaque étage et un restaurant de première classe.",
      "Malheureusement, tous les hébergements historiques de la place ont disparu sauf deux : La Fonda de los Príncipes et l'ancien Gran Hotel de París. La Fonda est le seul à avoir accueilli des voyageurs sans interruption pendant plus de 160 ans.",
      "Ce qui n'a pas changé non plus, c'est ce qui a rendu La Fonda célèbre : ses balcons avec les meilleures vues sur la Puerta del Sol.",
      "Le nom a évolué au fil du temps — de Gran Hotel de la Paix à Gran Hotel Americano, puis Pensión Americana (où séjourna Jorge Luis Borges), et enfin Hostal Americano.",
      "En 2024, l'hostal a changé de mains pour retrouver sa gloire passée. Après plus de 18 mois de travaux, le 5 janvier 2026, La Fonda de los Príncipes renaît.",
      "Bienvenue à La Fonda de los Príncipes, le seul hébergement qui a survécu à la Puerta del Sol pendant plus de 160 ans.",
    ],
    quote: "Entièrement remeublé, avec ses quatre façades et 120 balcons sur la rue, avec sa situation exceptionnelle au point le plus central de Madrid, il offre aux voyageurs toutes les conditions de confort et de luxe qu'ils peuvent désirer.",
    quoteSource: "Biblioteca Nacional de España, juillet 1876",
    readMore: "Continuer à lire",
    viajerosLabel: "Voyageurs mémorables",
    campanasLabel: "Les balcons et les cloches",
  },
  de: {
    title: "Unsere Geschichte",
    intro: "Am 1. Oktober 1861 unter der Herrschaft von Königin Isabella II. eröffnet, war La Fonda de los Príncipes eine der ersten und luxuriösesten Unterkünfte an der Puerta del Sol.",
    paragraphs: [
      "La Fonda de los Príncipes setzte einen Meilenstein als erstes Grandhotel an der Puerta del Sol nach der großen Stadtreform, die den Platz zum Nervenzentrum Madrids machte.",
      "Unser Gebäude, Puerta del Sol 11, wurde eigens als Luxushotel gebaut, mit nie zuvor gesehenen Annehmlichkeiten in Madrid: Aufzug, Zentralheizung, Badezimmer auf jeder Etage und ein erstklassiges Restaurant.",
      "Leider sind alle historischen Unterkünfte auf dem Platz verschwunden, außer zweien: La Fonda de los Príncipes und dem ehemaligen Gran Hotel de París. La Fonda ist die einzige, die ununterbrochen über 160 Jahre lang Gäste beherbergt hat.",
      "Was sich ebenfalls nicht geändert hat, ist das, was La Fonda berühmt machte: ihre Balkone mit dem besten Blick auf die Puerta del Sol.",
      "Der Name änderte sich im Laufe der Zeit — von Gran Hotel de la Paix zu Gran Hotel Americano, dann Pensión Americana (wo Jorge Luis Borges wohnte), und schließlich Hostal Americano.",
      "2024 wechselte das Hostal den Besitzer, um seine glorreiche Vergangenheit zurückzugewinnen. Nach mehr als 18 Monaten Renovierung wurde La Fonda de los Príncipes am 5. Januar 2026 wiedergeboren.",
      "Willkommen in La Fonda de los Príncipes, der einzigen Unterkunft, die über 160 Jahre an der Puerta del Sol überlebt hat.",
    ],
    quote: "Vollständig neu möbliert, mit vier Fassaden und 120 Balkonen zur Straße, mit seiner außergewöhnlichen Lage am zentralsten Punkt Madrids, bietet es Reisenden alle Bedingungen des Komforts und Luxus, die sie sich wünschen können.",
    quoteSource: "Biblioteca Nacional de España, Juli 1876",
    readMore: "Weiterlesen",
    viajerosLabel: "Unvergessliche Reisende",
    campanasLabel: "Die Balkone und die Glocken",
  },
  it: {
    title: "La Nostra Storia",
    intro: "Inaugurata il 1° ottobre 1861 sotto il regno di Isabella II, La Fonda de los Príncipes fu uno dei primi e più lussuosi alloggi della Puerta del Sol.",
    paragraphs: [
      "La Fonda de los Príncipes segnò una pietra miliare come primo grande hotel inaugurato alla Puerta del Sol dopo la grande riforma urbana che trasformò la piazza nel centro nevralgico di Madrid.",
      "Il nostro edificio, Puerta del Sol 11, fu costruito appositamente come hotel di categoria, con lussi mai visti a Madrid: ascensore, riscaldamento centrale, bagni ad ogni piano e un ristorante di prima classe.",
      "Purtroppo, tutti gli alloggi storici della piazza sono scomparsi tranne due: La Fonda de los Príncipes e l'ex Gran Hotel de París. La Fonda è l'unica ad aver ospitato viaggiatori ininterrottamente per oltre 160 anni.",
      "Ciò che non è cambiato è ciò che ha reso famosa La Fonda: i suoi balconi con le migliori viste sulla Puerta del Sol.",
      "Il nome è cambiato nel tempo — da Gran Hotel de la Paix a Gran Hotel Americano, poi Pensión Americana (dove soggiornò Jorge Luis Borges), e infine Hostal Americano.",
      "Nel 2024, l'hostal è cambiato di proprietà per recuperare il suo glorioso passato. Dopo più di 18 mesi di lavori, il 5 gennaio 2026, La Fonda de los Príncipes è rinata.",
      "Benvenuto a La Fonda de los Príncipes, l'unico alloggio sopravvissuto alla Puerta del Sol per oltre 160 anni.",
    ],
    quote: "Interamente arredato di nuovo, con le sue quattro facciate e 120 balconi sulla strada, con la sua posizione eccezionale nel punto più centrale di Madrid, offre ai viaggiatori tutte le condizioni di comfort e lusso che possono desiderare.",
    quoteSource: "Biblioteca Nacional de España, luglio 1876",
    readMore: "Continua a leggere",
    viajerosLabel: "Viaggiatori memorabili",
    campanasLabel: "I balconi e le campane",
  },
  pt: {
    title: "A Nossa História",
    intro: "Inaugurada a 1 de outubro de 1861 sob o reinado de Isabel II, La Fonda de los Príncipes foi um dos primeiros e mais luxuosos alojamentos da Puerta del Sol.",
    paragraphs: [
      "La Fonda de los Príncipes marcou um marco ao ser o primeiro grande hotel inaugurado na Puerta del Sol após a grande reforma urbana que transformou a praça no centro nevrálgico de Madrid.",
      "O nosso edifício, Puerta del Sol 11, foi construído propositadamente para ser um hotel de categoria, com luxos nunca vistos em Madrid: elevador, aquecimento central, casas de banho em cada andar e um restaurante de primeira classe.",
      "Infelizmente, todos os alojamentos históricos da praça desapareceram, exceto dois: La Fonda de los Príncipes e o antigo Gran Hotel de París. La Fonda é o único que alojou viajantes ininterruptamente durante mais de 160 anos.",
      "O que também não mudou é o que tornou La Fonda famosa: as suas varandas com as melhores vistas da Puerta del Sol.",
      "O nome foi mudando ao longo do tempo — de Gran Hotel de la Paix a Gran Hotel Americano, depois Pensión Americana (onde ficou Jorge Luis Borges), e finalmente Hostal Americano.",
      "Em 2024, o hostal mudou de mãos para recuperar o seu glorioso passado. Após mais de 18 meses de obras, a 5 de janeiro de 2026, La Fonda de los Príncipes renasceu.",
      "Bem-vindo a La Fonda de los Príncipes, o único alojamento que sobreviveu na Puerta del Sol durante mais de 160 anos.",
    ],
    quote: "Inteiramente mobilado de novo, com as suas quatro fachadas e 120 varandas para a rua, com a sua situação excecional no ponto mais central de Madrid, oferece aos viajantes todas as condições de conforto e luxo que possam desejar.",
    quoteSource: "Biblioteca Nacional de España, julho de 1876",
    readMore: "Continuar a ler",
    viajerosLabel: "Viajantes memoráveis",
    campanasLabel: "As varandas e os sinos",
  },
  zh: {
    title: "我们的历史",
    intro: "1861年10月1日，在伊莎贝拉二世女王统治下，拉丰达德洛斯普林西佩斯正式开业，成为太阳门广场最早、最豪华的住宿场所之一。",
    paragraphs: [
      "拉丰达德洛斯普林西佩斯是太阳门广场城市改造后开业的第一家大型酒店，这次改造将广场变成了马德里的神经中枢。",
      "我们的建筑位于太阳门11号，专门建造为高档酒店，拥有马德里前所未有的奢华设施：电梯、中央供暖、每层楼的浴室和一流餐厅。",
      "遗憾的是，广场上所有历史悠久的住宿场所都已消失，只剩下两处：拉丰达德洛斯普林西佩斯和前巴黎大酒店。拉丰达是唯一一家连续160多年接待旅客的场所。",
      "没有改变的是让拉丰达闻名的东西：俯瞰太阳门广场的阳台。",
      "名称随时间变化——从和平大酒店到美国大酒店，再到美国旅馆（豪尔赫·路易斯·博尔赫斯曾在此居住），最后到美国招待所。",
      "2024年，招待所易主，以恢复其昔日辉煌。经过18个月的翻修，2026年1月5日，拉丰达德洛斯普林西佩斯重生。",
      "欢迎来到拉丰达德洛斯普林西佩斯，太阳门广场唯一存续160余年的住宿场所。",
    ],
    quote: "全新装修，四面外墙，120个临街阳台，位于马德里最中心的绝佳位置，为旅客提供所有舒适与奢华的条件。",
    quoteSource: "西班牙国家图书馆，1876年7月",
    readMore: "继续阅读",
    viajerosLabel: "难忘的旅客",
    campanasLabel: "阳台与钟声",
  },
  ja: {
    title: "私たちの歴史",
    intro: "1861年10月1日、イサベル2世女王の治世下に開業したラ・フォンダ・デ・ロス・プリンシペスは、プエルタ・デル・ソルで最初かつ最も豪華な宿泊施設の一つでした。",
    paragraphs: [
      "ラ・フォンダ・デ・ロス・プリンシペスは、広場をマドリードの中心地に変えた大規模な都市改革後、プエルタ・デル・ソルに開業した最初の大型ホテルとして歴史的な節目を刻みました。",
      "私たちの建物、プエルタ・デル・ソル11番地は、高級ホテルとして専用に建てられ、マドリードで前例のない贅沢な設備を備えていました：エレベーター、セントラルヒーティング、各階のバスルーム、一流レストラン。",
      "残念ながら、広場の歴史的な宿泊施設はすべて姿を消しましたが、二つだけ残っています：ラ・フォンダ・デ・ロス・プリンシペスと旧グラン・ホテル・デ・パリ。ラ・フォンダは160年以上にわたって途切れることなく旅人を迎え続けた唯一の場所です。",
      "変わっていないのは、ラ・フォンダを有名にしたもの：プエルタ・デル・ソルの最高の眺めを誇るバルコニーです。",
      "名前は時代とともに変わりました——グラン・ホテル・デ・ラ・ペ、グラン・ホテル・アメリカーノ、ペンシオン・アメリカーナ（ホルヘ・ルイス・ボルヘスが滞在）、そして最終的にオスタル・アメリカーノへ。",
      "2024年、かつての栄光を取り戻すためにオーナーが変わりました。18ヶ月以上の改装工事を経て、2026年1月5日、ラ・フォンダ・デ・ロス・プリンシペスが生まれ変わりました。",
      "ラ・フォンダ・デ・ロス・プリンシペスへようこそ。プエルタ・デル・ソルで160年以上生き続けた唯一の宿泊施設です。",
    ],
    quote: "全面的に新装され、4つの外壁と通りに面した120のバルコニーを持ち、マドリードの最も中心的な場所という卓越したロケーションで、旅人が望むあらゆる快適さと贅沢の条件を提供しています。",
    quoteSource: "スペイン国立図書館、1876年7月",
    readMore: "続きを読む",
    viajerosLabel: "忘れられない旅人たち",
    campanasLabel: "バルコニーと鐘の音",
  },
  ar: {
    title: "تاريخنا",
    intro: "افتُتحت لا فوندا دي لوس برينسيبيس في الأول من أكتوبر 1861 في عهد الملكة إيزابيل الثانية، لتكون واحدة من أولى وأفخم أماكن الإقامة في بويرتا ديل سول.",
    paragraphs: [
      "شكّلت لا فوندا دي لوس برينسيبيس علامة فارقة بوصفها أول فندق كبير يُفتتح في بويرتا ديل سول بعد الإصلاح العمراني الكبير الذي حوّل الميدان إلى مركز مدريد.",
      "مبنانا في بويرتا ديل سول 11 بُني خصيصاً ليكون فندقاً فاخراً، بمرافق لم تشهدها مدريد من قبل: مصعد، تدفئة مركزية، حمامات في كل طابق، ومطعم من الدرجة الأولى.",
      "للأسف، اختفت جميع أماكن الإقامة التاريخية في الميدان باستثناء اثنتين: لا فوندا دي لوس برينسيبيس وفندق غران هوتيل دي باريس السابق. لا فوندا هي الوحيدة التي استقبلت المسافرين دون انقطاع لأكثر من 160 عاماً.",
      "ما لم يتغير أيضاً هو ما جعل لا فوندا مشهورة: شرفاتها ذات أجمل الإطلالات على بويرتا ديل سول.",
      "تغيّر الاسم عبر الزمن — من غران هوتيل دي لا بيه إلى غران هوتيل أمريكانو، ثم بنسيون أمريكانا (حيث أقام خورخي لويس بورخيس)، وأخيراً أوستال أمريكانو.",
      "في عام 2024، انتقلت الملكية لاستعادة مجدها الغابر. وبعد أكثر من 18 شهراً من الأعمال، وُلدت لا فوندا دي لوس برينسيبيس من جديد في 5 يناير 2026.",
      "مرحباً بكم في لا فوندا دي لوس برينسيبيس، مكان الإقامة الوحيد الذي صمد في بويرتا ديل سول لأكثر من 160 عاماً.",
    ],
    quote: "مُجدَّد الأثاث بالكامل، بواجهاته الأربع و120 شرفة تطل على الشارع، وموقعه الاستثنائي في أكثر نقطة مركزية في مدريد، يوفر للمسافرين جميع شروط الراحة والفخامة التي يرغبون فيها.",
    quoteSource: "المكتبة الوطنية الإسبانية، يوليو 1876",
    readMore: "تابع القراءة",
    viajerosLabel: "مسافرون لا يُنسون",
    campanasLabel: "الشرفات وأجراس رأس السنة",
  },
  ru: {
    title: "Наша История",
    intro: "Открытая 1 октября 1861 года в правление королевы Изабеллы II, La Fonda de los Príncipes стала одним из первых и самых роскошных мест размещения на площади Пуэрта-дель-Соль.",
    paragraphs: [
      "La Fonda de los Príncipes стала вехой как первый крупный отель, открытый на Пуэрта-дель-Соль после масштабной городской реформы, превратившей площадь в нервный центр Мадрида.",
      "Наше здание, Пуэрта-дель-Соль 11, было специально построено как отель категории люкс с невиданными в Мадриде удобствами: лифт, центральное отопление, ванные комнаты на каждом этаже и ресторан первого класса.",
      "К сожалению, все исторические гостиницы на площади исчезли, за исключением двух: La Fonda de los Príncipes и бывшего Gran Hotel de París. La Fonda — единственная, непрерывно принимающая гостей более 160 лет.",
      "Не изменилось и то, что прославило La Fonda: её балконы с лучшим видом на Пуэрта-дель-Соль.",
      "Название менялось со временем — от Gran Hotel de la Paix до Gran Hotel Americano, затем Pensión Americana (где жил Хорхе Луис Борхес), и наконец Hostal Americano.",
      "В 2024 году хостал сменил владельца, чтобы вернуть себе былую славу. После более чем 18 месяцев ремонта 5 января 2026 года La Fonda de los Príncipes возродилась.",
      "Добро пожаловать в La Fonda de los Príncipes — единственное место размещения, пережившее на Пуэрта-дель-Соль более 160 лет.",
    ],
    quote: "Полностью обставленный заново, с четырьмя фасадами и 120 балконами на улицу, с исключительным расположением в самой центральной точке Мадрида, он предлагает путешественникам все условия комфорта и роскоши, которые они могут пожелать.",
    quoteSource: "Национальная библиотека Испании, июль 1876 г.",
    readMore: "Читать дальше",
    viajerosLabel: "Незабываемые путешественники",
    campanasLabel: "Балконы и куранты",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function HistoriaPage({ onBack, onViajeros, onCampanadas }: HistoriaPageProps) {
  const { lang } = useLanguage();
  const c = HISTORIA_CONTENT[lang] ?? HISTORIA_CONTENT.es;

  const goldStyle = { color: "var(--gold)" };
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
      <main className="flex-1 px-6 pt-10 pb-12">
        {/* Title */}
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
            color: "oklch(0.96 0.025 85)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {c.title}
        </h1>

        {/* Gold divider */}
        <div
          className="mb-8"
          style={{
            height: 1,
            background: "linear-gradient(90deg, var(--gold), transparent)",
            width: "60%",
          }}
        />

        {/* Intro */}
        <p
          className="mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.05rem, 3.5vw, 1.2rem)",
            color: "oklch(0.82 0.025 85)",
            lineHeight: 1.7,
          }}
        >
          {c.intro}
        </p>

        {/* Paragraphs */}
        <div className="flex flex-col gap-5">
          {c.paragraphs.map((p, i) => (
            <p
              key={i}
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

        {/* Historical quote block */}
        <blockquote
          className="mt-10 mb-10 px-5 py-5"
          style={{
            borderLeft: "2px solid var(--gold)",
            background: "oklch(0.11 0.005 72)",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 3.2vw, 1.05rem)",
              color: "oklch(0.78 0.025 85)",
              lineHeight: 1.75,
              marginBottom: "0.75rem",
            }}
          >
            "{c.quote}"
          </p>
          <cite
            style={{
              ...labelStyle,
              color: "oklch(0.50 0.015 85)",
              fontStyle: "normal",
            }}
          >
            — {c.quoteSource}
          </cite>
        </blockquote>

        {/* ── Read more section ── */}
        <div
          className="mt-2 mb-4"
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, oklch(0.22 0.012 72), transparent)",
          }}
        />

        <p
          className="mb-5 text-center"
          style={{ ...labelStyle, color: "oklch(0.45 0.01 85)" }}
        >
          {c.readMore}
        </p>

        <div className="flex flex-col gap-3">
          {/* Viajeros memorables */}
          <button
            onClick={onViajeros}
            className="flex items-center gap-4 w-full px-5 py-4 text-left transition-all duration-200"
            style={{
              background: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.20 0.012 72)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.13 0.03 72 / 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.20 0.012 72)";
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.11 0 0)";
            }}
          >
            <span
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 38,
                height: 38,
                border: "1px solid oklch(0.22 0.015 72)",
                borderRadius: "2px",
                ...goldStyle,
              }}
            >
              <Users size={18} strokeWidth={1.25} />
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 3.5vw, 1.1rem)",
                color: "oklch(0.88 0.025 85)",
                lineHeight: 1.2,
              }}
            >
              {c.viajerosLabel}
            </span>
            <span className="ml-auto" style={{ ...goldStyle, opacity: 0.6 }}>›</span>
          </button>

          {/* Las campanadas */}
          <button
            onClick={onCampanadas}
            className="flex items-center gap-4 w-full px-5 py-4 text-left transition-all duration-200"
            style={{
              background: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.20 0.012 72)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.13 0.03 72 / 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.20 0.012 72)";
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.11 0 0)";
            }}
          >
            <span
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 38,
                height: 38,
                border: "1px solid oklch(0.22 0.015 72)",
                borderRadius: "2px",
                ...goldStyle,
              }}
            >
              <Bell size={18} strokeWidth={1.25} />
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 3.5vw, 1.1rem)",
                color: "oklch(0.88 0.025 85)",
                lineHeight: 1.2,
              }}
            >
              {c.campanasLabel}
            </span>
            <span className="ml-auto" style={{ ...goldStyle, opacity: 0.6 }}>›</span>
          </button>
        </div>
      </main>
    </div>
  );
}
