/*
 * DesayunoPage — "Noche en Sol" design
 * Buffet de desayuno de La Fonda de los Príncipes
 * Horario: 7:00 – 10:30 | Precio: 25 € / persona
 */
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

interface DesayunoPageProps {
  onBack: () => void;
}

interface MenuSection {
  title: string;
  items: string[];
}

interface ScheduleRow { days: string; time: string; }

interface DesayunoContent {
  title: string;
  scheduleLabel: string;
  scheduleRows: ScheduleRow[];
  priceLabel: string;
  price: string;
  notIncludedTitle: string;
  notIncludedBody: string;
  notIncludedCta: string;
  menuTitle: string;
  sections: MenuSection[];
  backLabel: string;
}

const CONTENT: Record<string, DesayunoContent> = {
  es: {
    title: "Desayuno",
    scheduleLabel: "Horario",
    scheduleRows: [
      { days: "Lun – Vie",          time: "07:00 – 10:30" },
      { days: "Sáb, Dom y festivos", time: "07:00 – 11:00" },
    ],
    priceLabel: "Precio",
    price: "25 €",
    notIncludedTitle: "¿No tienes el desayuno incluido?",
    notIncludedBody: "Puedes contratarlo en cualquier momento en recepción.",
    notIncludedCta: "Hablar con recepción",
    menuTitle: "Nuestro buffet",
    sections: [
      { title: "Platos calientes", items: ["Huevos revueltos", "Huevos escalfados", "Huevos fritos", "Tortilla de patata", "Tortilla francesa al gusto", "Bacon", "Champiñones salteados", "Tomates asados", "Frijoles", "Patatas"] },
      { title: "Embutidos ibéricos", items: ["Jamón Ibérico de Guijuelo DOP", "Lomo Ibérico de Extremadura DOP", "Salchichón Ibérico de Jabugo DOP", "Chorizo Ibérico de Los Pedroches DOP", "Fuet artesano del Delta del Ebro"] },
      { title: "Fiambres", items: ["Pavo (sin aditivos ni conservantes)", "Jamón York (sin aditivos ni conservantes)"] },
      { title: "Quesos", items: ["Queso Fresco", "Queso Havarti", "Queso Idiazabal", "Queso Payoyo", "Queso Tetilla", "Queso Brie", "Queso Comté"] },
      { title: "Fruta", items: ["Piña", "Melón", "Sandía", "Kiwi", "Naranja", "Pomelo", "Fresas", "Plátano", "Manzana", "Aguacate", "Membrillo"] },
      { title: "Zumos", items: ["Zumo de naranja natural", "Zumo Detox"] },
      { title: "Leche y bebida vegetal", items: ["Entera", "Semidesnatada", "Desnatada", "Sin lactosa", "Soja", "Avena"] },
      { title: "Lácteos", items: ["Yogur natural", "Yogur desnatado", "Yogur griego", "Yogur sin lactosa", "Pudding de chía"] },
      { title: "Ensaladas", items: ["Tomate en rodajas", "Tomate triturado", "Ventresca de atún", "Salmón ahumado", "Huevo cocido"] },
      { title: "Bollería", items: ["Croissant de mantequilla", "Napolitana de chocolate", "Mini donuts", "Mini snecken", "Mini palmeritas", "Bizcocho artesanal", "Tarta del día", "Churros con chocolate"] },
      { title: "Cereales", items: ["Special K", "Corn Flakes", "Granola / Muesli"] },
      { title: "Varios", items: ["Café y té", "Cola Cao / Nesquick", "Nocilla / Nutella", "Mermeladas artesanas", "Miel", "Pan sin gluten", "Bollería sin gluten", "Aceite Arbequina", "Aceite Picual", "Aceite Hojiblanca", "Vinagre de vino tinto", "Vinagre balsámico de Módena"] },
    ],
    backLabel: "Volver",
  },
  en: {
    title: "Breakfast",
    scheduleLabel: "Hours",
    scheduleRows: [
      { days: "Mon – Fri",            time: "7:00 – 10:30 AM" },
      { days: "Sat, Sun & holidays",  time: "7:00 – 11:00 AM" },
    ],
    priceLabel: "Price",
    price: "25 €",
    notIncludedTitle: "Breakfast not included in your stay?",
    notIncludedBody: "You can add it at any time at the front desk.",
    notIncludedCta: "Speak to reception",
    menuTitle: "Our buffet",
    sections: [
      { title: "Hot dishes", items: ["Scrambled eggs", "Poached eggs", "Fried eggs", "Spanish omelette", "French omelette to order", "Bacon", "Sautéed mushrooms", "Roasted tomatoes", "Baked beans", "Potatoes"] },
      { title: "Iberian cold cuts", items: ["Iberian Ham from Guijuelo DOP", "Iberian Loin from Extremadura DOP", "Iberian Salchichón from Jabugo DOP", "Iberian Chorizo from Los Pedroches DOP", "Artisan Fuet from Delta del Ebro"] },
      { title: "Cooked meats", items: ["Turkey (no additives or preservatives)", "York Ham (no additives or preservatives)"] },
      { title: "Cheeses", items: ["Fresh Cheese", "Havarti Cheese", "Idiazabal Cheese", "Payoyo Cheese", "Tetilla Cheese", "Brie Cheese", "Comté Cheese"] },
      { title: "Fruit", items: ["Pineapple", "Melon", "Watermelon", "Kiwi", "Orange", "Grapefruit", "Strawberries", "Banana", "Apple", "Avocado", "Quince"] },
      { title: "Juices", items: ["Fresh orange juice", "Detox juice"] },
      { title: "Milk & plant-based drinks", items: ["Whole milk", "Semi-skimmed", "Skimmed", "Lactose-free", "Soy", "Oat"] },
      { title: "Dairy", items: ["Natural yogurt", "Low-fat yogurt", "Greek yogurt", "Lactose-free yogurt", "Chia pudding"] },
      { title: "Salads", items: ["Sliced tomato", "Crushed tomato", "Tuna belly", "Smoked salmon", "Boiled egg"] },
      { title: "Pastries", items: ["Butter croissant", "Chocolate croissant", "Mini donuts", "Mini snecken", "Mini palmiers", "Artisan sponge cake", "Cake of the day", "Churros with hot chocolate"] },
      { title: "Cereals", items: ["Special K", "Corn Flakes", "Granola / Muesli"] },
      { title: "Extras", items: ["Coffee & tea", "Cola Cao / Nesquick", "Nocilla / Nutella", "Artisan jams", "Honey", "Gluten-free bread", "Gluten-free pastries", "Arbequina olive oil", "Picual olive oil", "Hojiblanca olive oil", "Red wine vinegar", "Balsamic vinegar from Modena"] },
    ],
    backLabel: "Back",
  },
  fr: {
    title: "Petit-déjeuner",
    scheduleLabel: "Horaires",
    scheduleRows: [
      { days: "Lun – Ven",                time: "7h00 – 10h30" },
      { days: "Sam, Dim & fériés",       time: "7h00 – 11h00" },
    ],
    priceLabel: "Prix",
    price: "25 €",
    notIncludedTitle: "Petit-déjeuner non inclus ?",
    notIncludedBody: "Vous pouvez le réserver à tout moment à la réception.",
    notIncludedCta: "Parler à la réception",
    menuTitle: "Notre buffet",
    sections: [
      { title: "Plats chauds", items: ["Œufs brouillés", "Œufs pochés", "Œufs au plat", "Omelette espagnole", "Omelette française à la demande", "Bacon", "Champignons sautés", "Tomates rôties", "Haricots blancs", "Pommes de terre"] },
      { title: "Charcuterie ibérique", items: ["Jambon Ibérique de Guijuelo DOP", "Longe Ibérique d'Estrémadure DOP", "Salchichón Ibérique de Jabugo DOP", "Chorizo Ibérique de Los Pedroches DOP", "Fuet artisanal du Delta de l'Èbre"] },
      { title: "Charcuterie cuite", items: ["Dinde (sans additifs ni conservateurs)", "Jambon blanc (sans additifs ni conservateurs)"] },
      { title: "Fromages", items: ["Fromage frais", "Havarti", "Idiazabal", "Payoyo", "Tetilla", "Brie", "Comté"] },
      { title: "Fruits", items: ["Ananas", "Melon", "Pastèque", "Kiwi", "Orange", "Pamplemousse", "Fraises", "Banane", "Pomme", "Avocat", "Coing"] },
      { title: "Jus", items: ["Jus d'orange frais", "Jus Detox"] },
      { title: "Lait et boissons végétales", items: ["Entier", "Demi-écrémé", "Écrémé", "Sans lactose", "Soja", "Avoine"] },
      { title: "Produits laitiers", items: ["Yaourt nature", "Yaourt allégé", "Yaourt grec", "Yaourt sans lactose", "Pudding de chia"] },
      { title: "Salades", items: ["Tomate en tranches", "Tomate concassée", "Ventrèche de thon", "Saumon fumé", "Œuf dur"] },
      { title: "Viennoiseries", items: ["Croissant au beurre", "Croissant au chocolat", "Mini donuts", "Mini snecken", "Mini palmiers", "Gâteau artisanal", "Gâteau du jour", "Churros au chocolat chaud"] },
      { title: "Céréales", items: ["Special K", "Corn Flakes", "Granola / Muesli"] },
      { title: "Divers", items: ["Café et thé", "Cola Cao / Nesquick", "Nocilla / Nutella", "Confitures artisanales", "Miel", "Pain sans gluten", "Viennoiseries sans gluten", "Huile d'olive Arbequina", "Huile d'olive Picual", "Huile d'olive Hojiblanca", "Vinaigre de vin rouge", "Vinaigre balsamique de Modène"] },
    ],
    backLabel: "Retour",
  },
  de: {
    title: "Frühstück",
    scheduleLabel: "Öffnungszeiten",
    scheduleRows: [
      { days: "Mo – Fr",              time: "7:00 – 10:30 Uhr" },
      { days: "Sa, So & Feiertage",  time: "7:00 – 11:00 Uhr" },
    ],
    priceLabel: "Preis",
    price: "25 €",
    notIncludedTitle: "Frühstück nicht inbegriffen?",
    notIncludedBody: "Sie können es jederzeit an der Rezeption hinzubuchen.",
    notIncludedCta: "Zur Rezeption",
    menuTitle: "Unser Buffet",
    sections: [
      { title: "Warme Speisen", items: ["Rühreier", "Pochierte Eier", "Spiegeleier", "Spanisches Omelett", "Französisches Omelett nach Wunsch", "Bacon", "Gebratene Champignons", "Geröstete Tomaten", "Gebackene Bohnen", "Kartoffeln"] },
      { title: "Iberische Wurstwaren", items: ["Iberico-Schinken aus Guijuelo DOP", "Iberisches Lendenstück aus Extremadura DOP", "Iberischer Salchichón aus Jabugo DOP", "Iberischer Chorizo aus Los Pedroches DOP", "Handwerklicher Fuet aus dem Ebro-Delta"] },
      { title: "Aufschnitt", items: ["Pute (ohne Zusatzstoffe)", "Kochschinken (ohne Zusatzstoffe)"] },
      { title: "Käse", items: ["Frischkäse", "Havarti", "Idiazabal", "Payoyo", "Tetilla", "Brie", "Comté"] },
      { title: "Obst", items: ["Ananas", "Melone", "Wassermelone", "Kiwi", "Orange", "Grapefruit", "Erdbeeren", "Banane", "Apfel", "Avocado", "Quitte"] },
      { title: "Säfte", items: ["Frisch gepresster Orangensaft", "Detox-Saft"] },
      { title: "Milch & Pflanzliche Getränke", items: ["Vollmilch", "Halbfett", "Magermilch", "Laktosefrei", "Soja", "Hafer"] },
      { title: "Milchprodukte", items: ["Naturjoghurt", "Fettarmer Joghurt", "Griechischer Joghurt", "Laktosefreier Joghurt", "Chia-Pudding"] },
      { title: "Salate", items: ["Tomatenscheiben", "Gehackte Tomaten", "Thunfischbauch", "Räucherlachs", "Hartgekochtes Ei"] },
      { title: "Gebäck", items: ["Buttercroissant", "Schokoladencroissant", "Mini-Donuts", "Mini-Schnecken", "Mini-Palmiers", "Handwerklicher Kuchen", "Tageskuchen", "Churros mit heißer Schokolade"] },
      { title: "Cerealien", items: ["Special K", "Corn Flakes", "Granola / Müsli"] },
      { title: "Sonstiges", items: ["Kaffee & Tee", "Cola Cao / Nesquick", "Nocilla / Nutella", "Handwerkliche Marmeladen", "Honig", "Glutenfreies Brot", "Glutenfreies Gebäck", "Arbequina-Olivenöl", "Picual-Olivenöl", "Hojiblanca-Olivenöl", "Rotweinessig", "Balsamico-Essig aus Modena"] },
    ],
    backLabel: "Zurück",
  },
  it: {
    title: "Colazione",
    scheduleLabel: "Orario",
    scheduleRows: [
      { days: "Lun – Ven",          time: "7:00 – 10:30" },
      { days: "Sab, Dom e festivi", time: "7:00 – 11:00" },
    ],
    priceLabel: "Prezzo",
    price: "25 €",
    notIncludedTitle: "Colazione non inclusa?",
    notIncludedBody: "Puoi aggiungerla in qualsiasi momento alla reception.",
    notIncludedCta: "Parla con la reception",
    menuTitle: "Il nostro buffet",
    sections: [
      { title: "Piatti caldi", items: ["Uova strapazzate", "Uova in camicia", "Uova al tegamino", "Frittata di patate", "Frittata francese su richiesta", "Bacon", "Funghi saltati", "Pomodori arrostiti", "Fagioli al forno", "Patate"] },
      { title: "Salumi iberici", items: ["Prosciutto Iberico di Guijuelo DOP", "Lonza Iberica dell'Estremadura DOP", "Salchichón Iberico di Jabugo DOP", "Chorizo Iberico di Los Pedroches DOP", "Fuet artigianale del Delta dell'Ebro"] },
      { title: "Affettati cotti", items: ["Tacchino (senza additivi)", "Prosciutto cotto (senza additivi)"] },
      { title: "Formaggi", items: ["Formaggio fresco", "Havarti", "Idiazabal", "Payoyo", "Tetilla", "Brie", "Comté"] },
      { title: "Frutta", items: ["Ananas", "Melone", "Anguria", "Kiwi", "Arancia", "Pompelmo", "Fragole", "Banana", "Mela", "Avocado", "Cotogna"] },
      { title: "Succhi", items: ["Succo d'arancia fresco", "Succo Detox"] },
      { title: "Latte e bevande vegetali", items: ["Intero", "Parzialmente scremato", "Scremato", "Senza lattosio", "Soia", "Avena"] },
      { title: "Latticini", items: ["Yogurt naturale", "Yogurt magro", "Yogurt greco", "Yogurt senza lattosio", "Pudding di chia"] },
      { title: "Insalate", items: ["Pomodoro a fette", "Pomodoro tritato", "Ventresca di tonno", "Salmone affumicato", "Uovo sodo"] },
      { title: "Pasticceria", items: ["Croissant al burro", "Croissant al cioccolato", "Mini donuts", "Mini girelle", "Mini palmier", "Torta artigianale", "Torta del giorno", "Churros con cioccolata calda"] },
      { title: "Cereali", items: ["Special K", "Corn Flakes", "Granola / Muesli"] },
      { title: "Varie", items: ["Caffè e tè", "Cola Cao / Nesquick", "Nocilla / Nutella", "Marmellate artigianali", "Miele", "Pane senza glutine", "Pasticceria senza glutine", "Olio Arbequina", "Olio Picual", "Olio Hojiblanca", "Aceto di vino rosso", "Aceto balsamico di Modena"] },
    ],
    backLabel: "Indietro",
  },
  pt: {
    title: "Pequeno-almoço",
    scheduleLabel: "Horário",
    scheduleRows: [
      { days: "Seg – Sex",             time: "7h00 – 10h30" },
      { days: "Sáb, Dom e feriados",  time: "7h00 – 11h00" },
    ],
    priceLabel: "Preço",
    price: "25 €",
    notIncludedTitle: "Pequeno-almoço não incluído?",
    notIncludedBody: "Pode adicioná-lo a qualquer momento na receção.",
    notIncludedCta: "Falar com a receção",
    menuTitle: "O nosso buffet",
    sections: [
      { title: "Pratos quentes", items: ["Ovos mexidos", "Ovos escalfados", "Ovos estrelados", "Tortilha espanhola", "Omelete francesa a gosto", "Bacon", "Cogumelos salteados", "Tomates assados", "Feijão cozido", "Batatas"] },
      { title: "Enchidos ibéricos", items: ["Presunto Ibérico de Guijuelo DOP", "Lombo Ibérico da Extremadura DOP", "Salchichón Ibérico de Jabugo DOP", "Chouriço Ibérico de Los Pedroches DOP", "Fuet artesanal do Delta do Ebro"] },
      { title: "Frios", items: ["Peru (sem aditivos)", "Fiambre (sem aditivos)"] },
      { title: "Queijos", items: ["Queijo fresco", "Havarti", "Idiazabal", "Payoyo", "Tetilla", "Brie", "Comté"] },
      { title: "Fruta", items: ["Ananás", "Melão", "Melancia", "Kiwi", "Laranja", "Toranja", "Morangos", "Banana", "Maçã", "Abacate", "Marmelo"] },
      { title: "Sumos", items: ["Sumo de laranja natural", "Sumo Detox"] },
      { title: "Leite e bebidas vegetais", items: ["Gordo", "Meio-gordo", "Magro", "Sem lactose", "Soja", "Aveia"] },
      { title: "Lacticínios", items: ["Iogurte natural", "Iogurte magro", "Iogurte grego", "Iogurte sem lactose", "Pudim de chia"] },
      { title: "Saladas", items: ["Tomate em rodelas", "Tomate triturado", "Barriga de atum", "Salmão fumado", "Ovo cozido"] },
      { title: "Pastelaria", items: ["Croissant de manteiga", "Croissant de chocolate", "Mini donuts", "Mini caracóis", "Mini palmiers", "Bolo artesanal", "Bolo do dia", "Churros com chocolate quente"] },
      { title: "Cereais", items: ["Special K", "Corn Flakes", "Granola / Muesli"] },
      { title: "Outros", items: ["Café e chá", "Cola Cao / Nesquick", "Nocilla / Nutella", "Compotas artesanais", "Mel", "Pão sem glúten", "Pastelaria sem glúten", "Azeite Arbequina", "Azeite Picual", "Azeite Hojiblanca", "Vinagre de vinho tinto", "Vinagre balsâmico de Modena"] },
    ],
    backLabel: "Voltar",
  },
  zh: {
    title: "早餐",
    scheduleLabel: "时间",
    scheduleRows: [
      { days: "周一至周五",   time: "7:00 – 10:30" },
      { days: "周六/周日/假日", time: "7:00 – 11:00" },
    ],
    priceLabel: "价格",
    price: "25 €",
    notIncludedTitle: "早餐未包含在您的预订中？",
    notIncludedBody: "您可以随时在前台添加早餐服务。",
    notIncludedCta: "联系前台",
    menuTitle: "我们的自助早餐",
    sections: [
      { title: "热食", items: ["炒蛋", "水波蛋", "煎蛋", "西班牙土豆蛋饼", "法式煎蛋卷", "培根", "炒蘑菇", "烤番茄", "烤豆", "土豆"] },
      { title: "伊比利亚火腿", items: ["Guijuelo DOP 伊比利亚火腿", "Extremadura DOP 伊比利亚腰肉", "Jabugo DOP 伊比利亚萨拉米", "Los Pedroches DOP 伊比利亚辣肠", "Ebro三角洲手工Fuet香肠"] },
      { title: "熟食", items: ["火鸡肉（无添加剂）", "约克火腿（无添加剂）"] },
      { title: "奶酪", items: ["新鲜奶酪", "哈瓦蒂奶酪", "伊迪亚萨巴尔奶酪", "帕约约奶酪", "特蒂利亚奶酪", "布里奶酪", "孔泰奶酪"] },
      { title: "水果", items: ["菠萝", "哈密瓜", "西瓜", "猕猴桃", "橙子", "葡萄柚", "草莓", "香蕉", "苹果", "牛油果", "木瓜"] },
      { title: "果汁", items: ["鲜榨橙汁", "排毒果汁"] },
      { title: "牛奶及植物饮品", items: ["全脂牛奶", "半脱脂牛奶", "脱脂牛奶", "无乳糖牛奶", "豆奶", "燕麦奶"] },
      { title: "乳制品", items: ["原味酸奶", "低脂酸奶", "希腊酸奶", "无乳糖酸奶", "奇亚籽布丁"] },
      { title: "沙拉", items: ["番茄片", "碎番茄", "金枪鱼腹肉", "烟熏三文鱼", "水煮蛋"] },
      { title: "糕点", items: ["黄油可颂", "巧克力可颂", "迷你甜甜圈", "迷你肉桂卷", "迷你棕榈饼", "手工蛋糕", "当日蛋糕", "热巧克力吉事果"] },
      { title: "谷物", items: ["Special K", "玉米片", "格兰诺拉 / 什锦麦片"] },
      { title: "其他", items: ["咖啡和茶", "可可粉 / 美禄", "Nocilla / 能多益", "手工果酱", "蜂蜜", "无麸质面包", "无麸质糕点", "阿尔贝基纳橄榄油", "皮夸尔橄榄油", "霍希布兰卡橄榄油", "红酒醋", "摩德纳香醋"] },
    ],
    backLabel: "返回",
  },
  ja: {
    title: "朝食",
    scheduleLabel: "時間",
    scheduleRows: [
      { days: "月曜〜金曜",   time: "7:00 – 10:30" },
      { days: "土/日/祝日",     time: "7:00 – 11:00" },
    ],
    priceLabel: "料金",
    price: "25 €",
    notIncludedTitle: "朝食が含まれていない場合",
    notIncludedBody: "フロントデスクにていつでもご追加いただけます。",
    notIncludedCta: "フロントに連絡",
    menuTitle: "ビュッフェメニュー",
    sections: [
      { title: "温かい料理", items: ["スクランブルエッグ", "ポーチドエッグ", "目玉焼き", "スペイン風オムレツ", "フレンチオムレツ（お好みで）", "ベーコン", "マッシュルームソテー", "ローストトマト", "ベイクドビーンズ", "ポテト"] },
      { title: "イベリコ生ハム・サラミ", items: ["グイフエロDOP イベリコハム", "エストレマドゥーラDOP イベリコロース", "ハブゴDOP イベリコサルチチョン", "ロス・ペドロチェスDOP イベリコチョリソ", "エブロデルタ産手作りフエット"] },
      { title: "加工肉", items: ["七面鳥（添加物不使用）", "ヨークハム（添加物不使用）"] },
      { title: "チーズ", items: ["フレッシュチーズ", "ハバルティ", "イディアサバル", "パヨヨ", "テティリャ", "ブリー", "コンテ"] },
      { title: "フルーツ", items: ["パイナップル", "メロン", "スイカ", "キウイ", "オレンジ", "グレープフルーツ", "イチゴ", "バナナ", "リンゴ", "アボカド", "マルメロ"] },
      { title: "ジュース", items: ["フレッシュオレンジジュース", "デトックスジュース"] },
      { title: "牛乳・植物性飲料", items: ["全乳", "低脂肪乳", "無脂肪乳", "ラクトースフリー", "豆乳", "オーツミルク"] },
      { title: "乳製品", items: ["プレーンヨーグルト", "低脂肪ヨーグルト", "ギリシャヨーグルト", "ラクトースフリーヨーグルト", "チアプディング"] },
      { title: "サラダ", items: ["スライストマト", "クラッシュトマト", "マグロのトロ", "スモークサーモン", "ゆで卵"] },
      { title: "パン・ペストリー", items: ["バタークロワッサン", "チョコクロワッサン", "ミニドーナツ", "ミニシナモンロール", "ミニパルミエ", "手作りスポンジケーキ", "本日のケーキ", "チョコレートソースのチュロス"] },
      { title: "シリアル", items: ["スペシャルK", "コーンフレーク", "グラノーラ / ミューズリー"] },
      { title: "その他", items: ["コーヒー・紅茶", "ココア / ネスクイック", "Nocilla / ヌテラ", "手作りジャム", "ハチミツ", "グルテンフリーパン", "グルテンフリーペストリー", "アルベキーナオリーブオイル", "ピクアルオリーブオイル", "ホヒブランカオリーブオイル", "赤ワインビネガー", "モデナバルサミコ酢"] },
    ],
    backLabel: "戻る",
  },
  ar: {
    title: "الإفطار",
    scheduleLabel: "الوقت",
    scheduleRows: [
      { days: "الإثنين – الجمعة",  time: "7:00 – 10:30" },
      { days: "سبت/أحد/عطل",       time: "7:00 – 11:00" },
    ],
    priceLabel: "السعر",
    price: "25 €",
    notIncludedTitle: "الإفطار غير مشمول في حجزك؟",
    notIncludedBody: "يمكنك إضافته في أي وقت من الاستقبال.",
    notIncludedCta: "التحدث مع الاستقبال",
    menuTitle: "بوفيه الإفطار",
    sections: [
      { title: "الأطباق الساخنة", items: ["بيض مخفوق", "بيض مسلوق", "بيض مقلي", "عجة البطاطا الإسبانية", "أومليت فرنسي حسب الطلب", "لحم مقدد", "فطر مقلي", "طماطم مشوية", "فاصوليا مخبوزة", "بطاطا"] },
      { title: "لحوم إيبيرية", items: ["خنزير إيبيري من غيخويلو DOP", "لحم خاصرة إيبيري من إكستريمادورا DOP", "سلشيشون إيبيري من خابوغو DOP", "تشوريثو إيبيري من لوس بيدروتشيس DOP", "نقانق فويت من دلتا الإيبرو"] },
      { title: "اللحوم المطبوخة", items: ["ديك رومي (بدون مواد حافظة)", "لحم خنزير مطبوخ (بدون مواد حافظة)"] },
      { title: "الجبن", items: ["جبن طازج", "هافارتي", "إيدياثابال", "بايويو", "تيتيا", "بري", "كونتيه"] },
      { title: "الفاكهة", items: ["أناناس", "شمام", "بطيخ", "كيوي", "برتقال", "جريب فروت", "فراولة", "موز", "تفاح", "أفوكادو", "سفرجل"] },
      { title: "العصائر", items: ["عصير برتقال طازج", "عصير ديتوكس"] },
      { title: "الحليب والمشروبات النباتية", items: ["حليب كامل الدسم", "حليب نصف دسم", "حليب خالي الدسم", "خالي اللاكتوز", "حليب الصويا", "حليب الشوفان"] },
      { title: "منتجات الألبان", items: ["زبادي طبيعي", "زبادي قليل الدسم", "زبادي يوناني", "زبادي خالي اللاكتوز", "بودينغ الشيا"] },
      { title: "السلطات", items: ["شرائح الطماطم", "طماطم مهروسة", "بطن التونة", "سلمون مدخن", "بيض مسلوق"] },
      { title: "المعجنات", items: ["كرواسون بالزبدة", "كرواسون بالشوكولاتة", "دونات صغير", "لفائف القرفة الصغيرة", "بالميرا صغيرة", "كعكة يدوية", "كعكة اليوم", "تشوروس بالشوكولاتة الساخنة"] },
      { title: "الحبوب", items: ["سبيشال K", "رقائق الذرة", "غرانولا / موسلي"] },
      { title: "متنوعات", items: ["قهوة وشاي", "كولا كاو / نسكويك", "نوسيا / نوتيلا", "مربى يدوية", "عسل", "خبز خالي الغلوتين", "معجنات خالية الغلوتين", "زيت أربيكينا", "زيت بيكوال", "زيت هوخيبلانكا", "خل النبيذ الأحمر", "خل بلسمي من مودينا"] },
    ],
    backLabel: "رجوع",
  },
  ru: {
    title: "Завтрак",
    scheduleLabel: "Время",
    scheduleRows: [
      { days: "Пн – Пт",           time: "7:00 – 10:30" },
      { days: "Сб/Вс/праздники",  time: "7:00 – 11:00" },
    ],
    priceLabel: "Цена",
    price: "25 €",
    notIncludedTitle: "Завтрак не включён?",
    notIncludedBody: "Вы можете добавить его в любое время на стойке регистрации.",
    notIncludedCta: "Обратиться на ресепшн",
    menuTitle: "Наш шведский стол",
    sections: [
      { title: "Горячие блюда", items: ["Яичница-болтунья", "Яйца пашот", "Яичница-глазунья", "Испанский омлет с картофелем", "Французский омлет на выбор", "Бекон", "Жареные грибы", "Запечённые помидоры", "Запечённая фасоль", "Картофель"] },
      { title: "Иберийские колбасы", items: ["Иберийский хамон из Гихуэло DOP", "Иберийская вырезка из Эстремадуры DOP", "Иберийский сальчичон из Хабуго DOP", "Иберийский чоризо из Лос-Педрочес DOP", "Фует из дельты Эбро"] },
      { title: "Варёные мясные изделия", items: ["Индейка (без добавок)", "Варёная ветчина (без добавок)"] },
      { title: "Сыры", items: ["Свежий сыр", "Хаварти", "Идиасабаль", "Пайойо", "Тетилья", "Бри", "Конте"] },
      { title: "Фрукты", items: ["Ананас", "Дыня", "Арбуз", "Киви", "Апельсин", "Грейпфрут", "Клубника", "Банан", "Яблоко", "Авокадо", "Айва"] },
      { title: "Соки", items: ["Свежевыжатый апельсиновый сок", "Детокс-сок"] },
      { title: "Молоко и растительные напитки", items: ["Цельное молоко", "Полуобезжиренное", "Обезжиренное", "Безлактозное", "Соевое", "Овсяное"] },
      { title: "Молочные продукты", items: ["Натуральный йогурт", "Обезжиренный йогурт", "Греческий йогурт", "Безлактозный йогурт", "Чиа-пудинг"] },
      { title: "Салаты", items: ["Нарезанные помидоры", "Измельчённые помидоры", "Брюшко тунца", "Копчёный лосось", "Варёное яйцо"] },
      { title: "Выпечка", items: ["Масляный круассан", "Шоколадный круассан", "Мини-пончики", "Мини-булочки с корицей", "Мини-пальмье", "Домашний кекс", "Торт дня", "Чуррос с горячим шоколадом"] },
      { title: "Хлопья", items: ["Special K", "Кукурузные хлопья", "Гранола / Мюсли"] },
      { title: "Прочее", items: ["Кофе и чай", "Какао / Несквик", "Nocilla / Нутелла", "Домашние джемы", "Мёд", "Безглютеновый хлеб", "Безглютеновая выпечка", "Оливковое масло Арбекина", "Оливковое масло Пикуаль", "Оливковое масло Охибланка", "Красный винный уксус", "Бальзамический уксус из Модены"] },
    ],
    backLabel: "Назад",
  },
};

const FALLBACK_LANGS = ["es", "en", "fr", "de", "it", "pt", "zh", "ja", "ar", "ru"];

export default function DesayunoPage({ onBack }: DesayunoPageProps) {
  const { lang: langCtx } = useLanguage();
  const lang = FALLBACK_LANGS.includes(langCtx) ? langCtx : "en";
  const c = CONTENT[lang] ?? CONTENT["en"];

  const isRtl = lang === "ar";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.08 0 0)", maxWidth: 480, margin: "0 auto" }}
      dir={isRtl ? "rtl" : "ltr"}
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
      <main className="flex-1 px-6 pt-10 pb-14">

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
          className="mb-7"
          style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", width: "60%" }}
        />

        {/* Schedule block */}
        <div
          className="mb-4 px-4 py-4 rounded-sm"
          style={{ background: "oklch(0.11 0 0)", border: "1px solid oklch(0.20 0.012 72)" }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.45 0.01 85)" }}>
            {c.scheduleLabel}
          </span>
          <div className="flex flex-col mt-2" style={{ gap: 0 }}>
            {c.scheduleRows.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
                style={{
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                  borderTop: i > 0 ? "1px solid oklch(0.16 0.01 72)" : undefined,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "oklch(0.62 0.012 85)" }}>
                  {row.days}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.05rem", color: "var(--gold)", letterSpacing: "0.02em" }}>
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price card */}
        <div
          className="mb-8 px-4 py-4 rounded-sm flex items-center justify-between"
          style={{ background: "oklch(0.11 0 0)", border: "1px solid oklch(0.20 0.012 72)" }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.45 0.01 85)" }}>
            {c.priceLabel}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--gold)", letterSpacing: "0.02em" }}>
            {c.price}
          </span>
        </div>

        {/* Menu title */}
        <h2
          className="mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.4rem", color: "oklch(0.75 0.02 85)", letterSpacing: "0.02em" }}
        >
          {c.menuTitle}
        </h2>

        {/* Menu sections */}
        <div className="flex flex-col gap-7">
          {c.sections.map((section) => (
            <div key={section.title}>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  opacity: 0.85,
                }}
              >
                {section.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-sm"
                    style={{
                      background: "oklch(0.12 0 0)",
                      border: "1px solid oklch(0.18 0.01 72)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.8rem",
                      color: "oklch(0.72 0.015 85)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
