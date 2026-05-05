/*
 * Top10Page — "Noche en Sol" design
 * Top 10 de Madrid según disfrutamadrid.com
 * Fuente: https://www.disfrutamadrid.com/top-10
 */
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface Top10PageProps {
  onBack: () => void;
}

// ── Content ───────────────────────────────────────────────────────────────────

interface Top10Item {
  name: string;
  desc: string;
}

const TOP10_DATA: Record<string, { title: string; subtitle: string; items: Top10Item[]; guide_label: string; guide_url: string }> = {
  es: {
    title: "Top 10 Madrid",
    subtitle: "Los 10 lugares imprescindibles de la capital",
    guide_label: "Guía completa de Madrid",
    guide_url: "https://www.disfrutamadrid.com/top-10",
    items: [
      { name: "Gran Vía",              desc: "La calle más conocida y transitada de Madrid. Construida entre 1910 y 1929, es el corazón comercial y teatral de la ciudad." },
      { name: "Puerta del Sol",        desc: "El Oso y el Madroño, el Kilómetro Cero y el famoso reloj de las campanadas. La plaza más emblemática de Madrid — y la más cercana a vosotros." },
      { name: "Plaza Mayor",           desc: "Inaugurada en 1619, a pocos metros de la Puerta del Sol. Un símbolo de la capital con sus soportales, terrazas y mercados." },
      { name: "Puerta de Alcalá",      desc: "Uno de los monumentos más famosos de Madrid. Preside la Plaza de la Independencia, junto al Parque del Retiro." },
      { name: "Parque del Retiro",     desc: "El pulmón de Madrid. Lleno de fuentes, plazas, músicos y espectáculos. Imprescindible en cualquier época del año." },
      { name: "Museo del Prado",       desc: "El museo más importante de Madrid. Alberga obras de Goya, Velázquez y El Bosco. Una visita que no tiene precio." },
      { name: "Plaza de Cibeles",      desc: "La plaza más famosa de Madrid. La Fuente de Cibeles es el lugar donde el Real Madrid y la Selección celebran sus victorias." },
      { name: "Templo de Debod",       desc: "Un templo egipcio en el corazón de Madrid. Regalo de Egipto a España, ofrece una de las mejores vistas del atardecer." },
      { name: "Palacio Real",          desc: "Residencia oficial de la Familia Real, construido en el siglo XVIII. El palacio más grande de Europa occidental." },
      { name: "Santiago Bernabéu",     desc: "El estadio del Real Madrid, uno de los más visitados de la ciudad. Un templo del fútbol con visitas guiadas todo el año." },
    ],
  },
  en: {
    title: "Top 10 Madrid",
    subtitle: "The 10 must-see places in the capital",
    guide_label: "Complete Madrid guide",
    guide_url: "https://www.introducingmadrid.com/",
    items: [
      { name: "Gran Vía",              desc: "Madrid's most famous and bustling street. Built between 1910 and 1929, it is the commercial and theatre heart of the city." },
      { name: "Puerta del Sol",        desc: "The Bear and the Strawberry Tree, Kilometre Zero and the famous New Year's Eve clock. The most iconic square in Madrid — and the closest to you." },
      { name: "Plaza Mayor",           desc: "Inaugurated in 1619, just steps from Puerta del Sol. A symbol of the capital with its arcades, terraces and markets." },
      { name: "Puerta de Alcalá",      desc: "One of Madrid's most famous monuments. It presides over Plaza de la Independencia, next to Retiro Park." },
      { name: "Retiro Park",           desc: "Madrid's green lung. Full of fountains, squares, musicians and shows. A must-visit at any time of year." },
      { name: "Museo del Prado",       desc: "Madrid's most important museum. Home to works by Goya, Velázquez and Bosch. A visit beyond price." },
      { name: "Plaza de Cibeles",      desc: "Madrid's most famous square. The Cibeles Fountain is where Real Madrid and the Spanish national team celebrate their victories." },
      { name: "Temple of Debod",       desc: "An Egyptian temple in the heart of Madrid. A gift from Egypt to Spain, it offers one of the best sunset views in the city." },
      { name: "Royal Palace",          desc: "The official residence of the Spanish Royal Family, built in the 18th century. The largest royal palace in Western Europe." },
      { name: "Santiago Bernabéu",     desc: "Real Madrid's stadium, one of the most visited sites in the city. A football temple with guided tours year-round." },
    ],
  },
  fr: {
    title: "Top 10 Madrid",
    subtitle: "Les 10 incontournables de la capitale",
    guide_label: "Guide complet de Madrid",
    guide_url: "https://www.madrid.fr/",
    items: [
      { name: "Gran Vía",              desc: "La rue la plus célèbre de Madrid, construite entre 1910 et 1929. Le cœur commercial et théâtral de la ville." },
      { name: "Puerta del Sol",        desc: "L'Ours et l'Arbousier, le Kilomètre Zéro et la célèbre horloge du Nouvel An. La place la plus emblématique de Madrid." },
      { name: "Plaza Mayor",           desc: "Inaugurée en 1619, à quelques pas de la Puerta del Sol. Un symbole de la capitale avec ses arcades et ses terrasses." },
      { name: "Puerta de Alcalá",      desc: "L'un des monuments les plus célèbres de Madrid. Il préside la Plaza de la Independencia, près du Parc du Retiro." },
      { name: "Parc du Retiro",        desc: "Le poumon vert de Madrid. Plein de fontaines, de musiciens et de spectacles. Incontournable toute l'année." },
      { name: "Musée du Prado",        desc: "Le musée le plus important de Madrid. Il abrite des œuvres de Goya, Velázquez et Bosch." },
      { name: "Plaza de Cibeles",      desc: "La place la plus célèbre de Madrid. La Fontaine de Cibeles est l'endroit où le Real Madrid célèbre ses victoires." },
      { name: "Temple de Debod",       desc: "Un temple égyptien au cœur de Madrid. Cadeau de l'Égypte à l'Espagne, il offre l'un des plus beaux couchers de soleil." },
      { name: "Palais Royal",          desc: "La résidence officielle de la Famille Royale espagnole, construit au XVIIIe siècle. Le plus grand palais royal d'Europe occidentale." },
      { name: "Santiago Bernabéu",     desc: "Le stade du Real Madrid, l'un des sites les plus visités de la ville. Un temple du football ouvert aux visites guidées." },
    ],
  },
  de: {
    title: "Top 10 Madrid",
    subtitle: "Die 10 Sehenswürdigkeiten der Hauptstadt",
    guide_label: "Vollständiger Madrid-Reiseführer",
    guide_url: "https://www.introducingmadrid.com/",
    items: [
      { name: "Gran Vía",              desc: "Madrids berühmteste Straße, zwischen 1910 und 1929 erbaut. Das kommerzielle und theatralische Herz der Stadt." },
      { name: "Puerta del Sol",        desc: "Der Bär und der Erdbeerbaum, Kilometer Null und die berühmte Silvesterglocke. Madrids ikonischster Platz." },
      { name: "Plaza Mayor",           desc: "1619 eingeweiht, wenige Schritte von der Puerta del Sol entfernt. Ein Symbol der Hauptstadt mit Arkaden und Terrassen." },
      { name: "Puerta de Alcalá",      desc: "Eines der berühmtesten Denkmäler Madrids. Es überblickt die Plaza de la Independencia neben dem Retiro-Park." },
      { name: "Retiro-Park",           desc: "Madrids grüne Lunge. Voller Brunnen, Musikern und Shows. Ein Muss zu jeder Jahreszeit." },
      { name: "Prado-Museum",          desc: "Madrids wichtigstes Museum. Beherbergt Werke von Goya, Velázquez und Bosch." },
      { name: "Plaza de Cibeles",      desc: "Madrids berühmtester Platz. Der Cibeles-Brunnen ist der Ort, an dem Real Madrid seine Siege feiert." },
      { name: "Tempel von Debod",      desc: "Ein ägyptischer Tempel im Herzen Madrids. Ein Geschenk Ägyptens an Spanien mit einem der schönsten Sonnenuntergänge." },
      { name: "Königspalast",          desc: "Der offizielle Wohnsitz der spanischen Königsfamilie aus dem 18. Jahrhundert. Der größte Königspalast Westeuropas." },
      { name: "Santiago Bernabéu",     desc: "Das Stadion von Real Madrid, eine der meistbesuchten Sehenswürdigkeiten der Stadt. Ganzjährig mit Führungen." },
    ],
  },
  it: {
    title: "Top 10 Madrid",
    subtitle: "I 10 luoghi imperdibili della capitale",
    guide_label: "Guida completa di Madrid",
    guide_url: "https://www.scoprimadrid.com/",
    items: [
      { name: "Gran Vía",              desc: "La strada più famosa di Madrid, costruita tra il 1910 e il 1929. Il cuore commerciale e teatrale della città." },
      { name: "Puerta del Sol",        desc: "L'Orso e il Corbezzolo, il Chilometro Zero e il famoso orologio di Capodanno. La piazza più iconica di Madrid." },
      { name: "Plaza Mayor",           desc: "Inaugurata nel 1619, a pochi passi dalla Puerta del Sol. Un simbolo della capitale con i suoi portici e terrazze." },
      { name: "Puerta de Alcalá",      desc: "Uno dei monumenti più famosi di Madrid. Presiede la Plaza de la Independencia, vicino al Parco del Retiro." },
      { name: "Parco del Retiro",      desc: "Il polmone verde di Madrid. Pieno di fontane, musicisti e spettacoli. Imperdibile in qualsiasi periodo dell'anno." },
      { name: "Museo del Prado",       desc: "Il museo più importante di Madrid. Ospita opere di Goya, Velázquez e Bosch." },
      { name: "Plaza de Cibeles",      desc: "La piazza più famosa di Madrid. La Fontana di Cibeles è il luogo dove il Real Madrid festeggia le sue vittorie." },
      { name: "Tempio di Debod",       desc: "Un tempio egiziano nel cuore di Madrid. Un dono dell'Egitto alla Spagna, offre uno dei migliori tramonti della città." },
      { name: "Palazzo Reale",         desc: "La residenza ufficiale della Famiglia Reale spagnola, costruita nel XVIII secolo. Il palazzo reale più grande dell'Europa occidentale." },
      { name: "Santiago Bernabéu",     desc: "Lo stadio del Real Madrid, uno dei siti più visitati della città. Un tempio del calcio con visite guidate tutto l'anno." },
    ],
  },
  pt: {
    title: "Top 10 Madrid",
    subtitle: "Os 10 lugares imperdíveis da capital",
    guide_label: "Guia completo de Madrid",
    guide_url: "https://www.tudosobremadrid.com/",
    items: [
      { name: "Gran Vía",              desc: "A rua mais famosa de Madrid, construída entre 1910 e 1929. O coração comercial e teatral da cidade." },
      { name: "Puerta del Sol",        desc: "O Urso e o Medronheiro, o Quilómetro Zero e o famoso relógio de Ano Novo. A praça mais icónica de Madrid." },
      { name: "Plaza Mayor",           desc: "Inaugurada em 1619, a poucos passos da Puerta del Sol. Um símbolo da capital com as suas arcadas e esplanadas." },
      { name: "Puerta de Alcalá",      desc: "Um dos monumentos mais famosos de Madrid. Preside a Plaza de la Independencia, junto ao Parque do Retiro." },
      { name: "Parque do Retiro",      desc: "O pulmão verde de Madrid. Cheio de fontes, músicos e espetáculos. Imperdível em qualquer época do ano." },
      { name: "Museu do Prado",        desc: "O museu mais importante de Madrid. Alberga obras de Goya, Velázquez e Bosch." },
      { name: "Plaza de Cibeles",      desc: "A praça mais famosa de Madrid. A Fonte de Cibeles é o local onde o Real Madrid celebra as suas vitórias." },
      { name: "Templo de Debod",       desc: "Um templo egípcio no coração de Madrid. Presente do Egito à Espanha, oferece um dos melhores pores do sol." },
      { name: "Palácio Real",          desc: "A residência oficial da Família Real espanhola, construída no século XVIII. O maior palácio real da Europa Ocidental." },
      { name: "Santiago Bernabéu",     desc: "O estádio do Real Madrid, um dos locais mais visitados da cidade. Um templo do futebol com visitas guiadas todo o ano." },
    ],
  },
  zh: {
    title: "马德里Top 10",
    subtitle: "首都10大必游景点",
    guide_label: "马德里完整旅游指南",
    guide_url: "https://www.introducingmadrid.com/",
    items: [
      { name: "格兰大道",              desc: "马德里最著名的街道，建于1910至1929年间，是城市的商业和剧院中心。" },
      { name: "太阳门广场",            desc: "熊与草莓树雕像、零公里标志和著名的新年倒计时钟楼。马德里最具标志性的广场，也是距离您最近的地方。" },
      { name: "马约尔广场",            desc: "1619年落成，距太阳门广场仅数步之遥。首都的象征，拥有拱廈、露台和市场。" },
      { name: "阿尔卡拉门",            desc: "马德里最著名的纪念碑之一，矗立于独立广场，紧邀丽池公园。" },
      { name: "丽池公园",              desc: "马德里的绻色肺脖，充满喉泉、音乐家和表演，一年四季都値得一游。" },
      { name: "普拉多博物馆",          desc: "马德里最重要的博物馆，收藏戈雅、委拉斯开兹和博斯的作品。" },
      { name: "西贝莱斯广场",          desc: "马德里最著名的广场，西贝莱斯喷泉是皇家马德里庆祝胜利的地方。" },
      { name: "德博德神庙",            desc: "马德里市中心的埃及神庙，埃及赠予西班牙的礼物，提供城市最美的日落景观之一。" },
      { name: "皇宫",                  desc: "西班牙王室的官邸，建于18世纪，是西欧最大的皇宫。" },
      { name: "圣地亚哥·伯纳乌球场",  desc: "皇家马德里足球信乐部的主场，是马德里参观人数最多的景点之一，全年提供导览服务。" },
    ],
  },
  ja: {
    title: "マドリード Top 10",
    subtitle: "首都の10大必見スポット",
    guide_label: "マドリード完全ガイド",
    guide_url: "https://www.introducingmadrid.com/",
    items: [
      { name: "グラン・ビア",              desc: "マドリード最も有名な通り。1910年から1929年に建設され、商業と演劇の中心地。" },
      { name: "プエルタ・デル・ソル",    desc: "クマとイチゴの木の彫刻、キロメートルゼロ、年越しの鐘。マドリード最も象徴的な広場——そしてあなたの最も近くにある場所。" },
      { name: "プラザ・マヨール",        desc: "1619年に開場した、プエルタ・デル・ソルから歩いてすぐの場所。アーケード、テラス、市場を持つ首都の象徴。" },
      { name: "アルカラ門",            desc: "マドリード最も有名な紀念碑の一つ。レティーロ公園の隔に立つ独立広場を見下ろす。" },
      { name: "レティーロ公園",          desc: "マドリードの緑の肺。年間を通じて訪れる価値のある、子山や音楽家、ショーに満ちた公園。" },
      { name: "プラド美術館",          desc: "マドリード最重要な美術館。ゴヤ、ベラスケス、ボッシュの作品を所蔵。" },
      { name: "シベレス広場",          desc: "マドリード最も有名な広場。シベレスの山の小屋はレアル・マドリードが勝利を祝う場所。" },
      { name: "デボド神殿",            desc: "マドリードの心臓にあるエジプト神殿。エジプトからスペインへの贈り物で、素晴らしい夕日を望める場所。" },
      { name: "王宮",                  desc: "スペイン王室の公式居宅。18世紀に建てられた西欧最大の王宮。" },
      { name: "サンティアゴ・ベルナベウスタジアム", desc: "レアル・マドリードのスタジアム。年間を通じてガイドツアーがあるサッカーの聖地。" },
    ],
  },
  ar: {
    title: "أفضل 10 معالم في مدريد",
    subtitle: "المعالم العشرة التي لا غنى عنها في العاصمة",
    guide_label: "دليل مدريد الشامل",
    guide_url: "https://www.introducingmadrid.com/",
    items: [
      { name: "غران فيا",              desc: "أشهر شوارع مدريد، بُنيت بين 1910 و 1929، وهي قلب التجارة والمسرح في المدينة." },
      { name: "بويرتا ديل سول",      desc: "تمثال الدب وشجرة التوت، الكيلومتر صفر، وساعة رأس السنة الشهيرة. أكثر ميادين مدريد رمزية — والأقرب إليك." },
      { name: "بلازا مايور",          desc: "افتُتحت عام 1619، على بعد خطوات من بويرتا ديل سول. رمز العاصمة بأروقتها ومطاعمها وأسواقها." },
      { name: "باب ألكالا",          desc: "أحد أشهر معالم مدريد، يطل على ميدان الاستقلال بجانب حديقة ريتيرو." },
      { name: "حديقة ريتيرو",          desc: "رئة مدريد الخضراء، مليئة بالنافورات والموسيقيين والعروض. لا غنى عنها في أي وقت من السنة." },
      { name: "متحف البرادو",          desc: "أهم متحف في مدريد، يضم أعمال غويا وفيلاسكيث وبوسخ." },
      { name: "ميدان سيبيليس",        desc: "أشهر ميادين مدريد، نافورة سيبيليس هي المكان الذي يحتفل فيه ريال مدريد بانتصاراته." },
      { name: "معبد ديبود",            desc: "معبد مصري في قلب مدريد، هدية مصر لإسبانيا، يوفر منظراً رائعاً للغروب." },
      { name: "القصر الملكي",          desc: "المقر الرسمي للعائلة الملكية الإسبانية، بُني في القرن 18، أكبر قصر ملكي في أوروبا الغربية." },
      { name: "ملعب سانتياغو بيرنابيو",  desc: "ملعب ريال مدريد، من أكثر المواقع زيارةً في المدينة، مع جولات إرشادية طوال العام." },
    ],
  },
  ru: {
    title: "Top 10 Мадрид",
    subtitle: "10 главных достопримечательностей столицы",
    guide_label: "Полный путеводитель по Мадриду",
    guide_url: "https://www.introducingmadrid.com/",
    items: [
      { name: "Гран-Виа",              desc: "Самая известная улица Мадрида, построенная в 1910–1929 гг. Торговый и театральный центр города." },
      { name: "Пуэрта-дель-Соль",    desc: "Медведь и земляничное дерево, Нулевой километр и знаменитые новогодние куранты. Самая знаковая площадь Мадрида — и ближайшая к вам." },
      { name: "Пласа-Майор",        desc: "Открыта в 1619 году, в нескольких шагах от Пуэрта-дель-Соль. Символ столицы с аркадами, террасами и рынками." },
      { name: "Ворота Алькала",          desc: "Один из самых знаменитых памятников Мадрида, рядом с парком Ретиро." },
      { name: "Парк Ретиро",          desc: "Зелёные лёгкие Мадрида. Фонтаны, музыканты, шоу. Обязательно посетить в любое время года." },
      { name: "Музей Прадо",          desc: "Главный музей Мадрида. Здесь хранятся полотна Гойи, Веласкеса и Босха." },
      { name: "Пласа Сибелес",        desc: "Самая известная площадь Мадрида. Фонтан Сибелес — место празднования побед Реала." },
      { name: "Храм Дебода",            desc: "Египетский храм в сердце Мадрида. Подарок Египта Испании, одно из лучших мест для наблюдения заката." },
      { name: "Королевский дворец",          desc: "Официальная резиденция испанской королевской семьи, построенная в XVIII веке. Крупнейший королевский дворец Западной Европы." },
      { name: "Стадион Сантьяго Бернабеу",  desc: "Стадион Реала, одно из самых посещаемых мест города. Храм футбола с экскурсиями круглый год." },
    ],
  },
};

export default function Top10Page({ onBack }: Top10PageProps) {
  const { lang } = useLanguage();
  const content = TOP10_DATA[lang] || TOP10_DATA.es;

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{content.title}</PageTitle>
      <p style={{ ...ps.muted, marginBottom: "1rem" }}>{content.subtitle}</p>

      <div className="space-y-4 mt-8">
        {content.items.map((item, index) => (
          <div key={index} style={ps.card}>
            <h3 style={{ ...ps.body, fontWeight: '500', color: 'var(--foreground)' }}>{item.name}</h3>
            <p style={{ ...ps.muted, marginTop: '0.25rem' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <a href={content.guide_url} target="_blank" rel="noopener noreferrer" style={{ ...ps.actionButton, marginTop: '2rem' }}>
        {content.guide_label}
        <ExternalLink size={16} />
      </a>
    </PageLayout>
  );
}
