import React, { createContext, useContext, useEffect, useState } from "react";

export type LangCode = "es" | "en" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ar" | "ru";

// ── Auto-detect browser language, persist choice in localStorage ─────────────
const SUPPORTED: LangCode[] = ["es","en","fr","de","it","pt","zh","ja","ar","ru"];

function detectLang(): LangCode {
  // 1. User's saved preference
  const saved = typeof localStorage !== "undefined" && localStorage.getItem("fonda_lang");
  if (saved && SUPPORTED.includes(saved as LangCode)) return saved as LangCode;
  // 2. Browser language (navigator.languages or navigator.language)
  const navLangs: string[] = typeof navigator !== "undefined"
    ? [...(navigator.languages ?? []), navigator.language ?? ""]
    : [];
  for (const nav of navLangs) {
    const base = nav.split("-")[0].toLowerCase() as LangCode;
    if (SUPPORTED.includes(base)) return base;
  }
  return "es"; // fallback
}

export interface Language {
  code: LangCode;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "es", label: "Español",    nativeName: "Español",    flag: "🇪🇸" },
  { code: "en", label: "English",    nativeName: "English",    flag: "🇬🇧" },
  { code: "fr", label: "Français",   nativeName: "Français",   flag: "🇫🇷" },
  { code: "de", label: "Deutsch",    nativeName: "Deutsch",    flag: "🇩🇪" },
  { code: "it", label: "Italiano",   nativeName: "Italiano",   flag: "🇮🇹" },
  { code: "pt", label: "Português",  nativeName: "Português",  flag: "🇵🇹" },
  { code: "zh", label: "中文",        nativeName: "中文",        flag: "🇨🇳" },
  { code: "ja", label: "日本語",      nativeName: "日本語",      flag: "🇯🇵" },
  { code: "ar", label: "العربية",    nativeName: "العربية",    flag: "🇸🇦" },
  { code: "ru", label: "Русский",    nativeName: "Русский",    flag: "🇷🇺" },
];

// ── Translations ──────────────────────────────────────────────────────────────

export interface Translations {
  tagline: string;
  categories: {
    habitacion: string;
    tuhabitacion: string;
    gastronomia: string;
    hotel: string;
    madrid: string;
  };
  services: {
    historia:     string;
    minibar:      string;
    bar:          string;
    desayuno:     string;
    horarios:     string;
    contacto:     string;
    restaurante:  string;
    habitaciones: string;
    experiencias: string;
    wifi:         string;
    mapa:         string;
    viajeros:        string;
    campanadas:      string;
    postal:          string;
    sostenibilidad:  string;
    top10:           string;
    servicios:       string;
    servicio:        string;
    transporte:      string;
  };
  // Detail pages
  detail: {
    back: string;
    historia_title: string;
    historia_body: string;
    horarios_title: string;
    horarios_body: string;
    contacto_title: string;
    contacto_body: string;
    restaurante_title: string;
    restaurante_body: string;
    habitaciones_title: string;
    habitaciones_body: string;
    experiencias_title: string;
    experiencias_body: string;
    experiencias_civitatis: string;
    wifi_title: string;
    wifi_body: string;
    mapa_title: string;
    mapa_body: string;
  };
}

const T: Record<LangCode, Translations> = {
  es: {
    tagline: "Un balcón, infinitas historias",
    categories: {
      habitacion: "Tu estancia",
      tuhabitacion: "Tu habitación",
      gastronomia: "Gastronomía",
      hotel: "El hotel",
      madrid: "Madrid",
    },
    services: {
      historia:     "Historia",
      minibar:      "Minibar",
      bar:          "Bar",
      desayuno:     "Desayuno",
      horarios:     "Horarios",
      contacto:     "Contacto",
      restaurante:  "Restaurante",
      habitaciones: "Habitaciones",
      experiencias: "Experiencias",
      wifi:         "WiFi",
      mapa:         "Mapa",
      viajeros:        "Viajeros",
      campanadas:      "Campanadas",
      postal:          "Postales",
      sostenibilidad:  "Sostenibilidad",
      top10:           "Top 10",
      servicios:       "Servicios",
      servicio:        "Room Service",
      transporte:      "Moverse",
    },
    detail: {
      back: "Volver",
      historia_title: "Nuestra Historia",
      historia_body: "La Fonda de los Príncipes abrió sus puertas por primera vez el 1 de octubre de 1861, siendo uno de los primeros alojamientos de la Puerta del Sol. Famoso por su lujo y exclusividad, renació el 5 de enero de 2026 tras una meticulosa reforma. Un balcón suspendido sobre la historia de Madrid.",
      horarios_title: "Horarios",
      horarios_body: "Recepción: 24 horas\nCheck-in: 15:00 h\nCheck-out: 12:00 h\nDesayuno: 07:00 – 10:30 h\nBar & Restaurante: 10:30 – 24:00 h",
      contacto_title: "Contacto",
      contacto_body: "Teléfono: +34 919 891 469\nWhatsApp: +34 919 891 469\nEmail: recepcion@lafondadelosprincipes.com\nDirección: Puerta del Sol, Madrid",
      restaurante_title: "Restaurante & Coctelería",
      restaurante_body: "Horario: 10:30 – 24:00 h\n\nEn La Fonda, cada copa es un brindis al pasado y una bienvenida al futuro. Nuestra coctelería ofrece creaciones únicas con alma madrileña. No hay que esperar al 31 de diciembre para brindar.",
      habitaciones_title: "Habitaciones",
      habitaciones_body: "Desde tu balcón en La Fonda, cada amanecer es una postal y cada atardecer, un espectáculo privado. Habitaciones diseñadas para el equilibrio perfecto entre el descanso y la ciudad.",
      experiencias_title: "Experiencias",
      experiencias_body: "Civitatis es la plataforma líder de visitas guiadas y actividades en Madrid. Reserva las mejores experiencias con guías expertos en español.",
      experiencias_civitatis: "https://www.civitatis.com/es/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "Red: LaFondaPrincipes\nContraseña: disponible en recepción\nVelocidad: fibra 600 Mbps\nCobertura en todas las habitaciones y zonas comunes.",
      mapa_title: "Cómo llegar",
      mapa_body: "Nos encontramos en el corazón de Madrid, en la Puerta del Sol.\n\nMetro: Sol (Líneas 1, 2 y 3)\nCercanías: Sol\nAutobus: múltiples líneas\n\nAeropuerto Barajas: 30 min en metro (Línea 8 + transbordo)",
    },
  },
  en: {
    tagline: "A balcony, infinite stories",
    categories: {
      habitacion: "Your stay",
      tuhabitacion: "Your room",
      gastronomia: "Gastronomy",
      hotel: "The hotel",
      madrid: "Madrid",
    },
    services: {
      historia:     "History",
      minibar:      "Minibar",
      bar:          "Bar",
      desayuno:     "Breakfast",
      horarios:     "Schedule",
      contacto:     "Contact",
      restaurante:  "Restaurant",
      habitaciones: "Rooms",
      experiencias: "Experiences",
      wifi:         "WiFi",
      mapa:         "Map",
      viajeros:        "Travellers",
      campanadas:      "The Bells",
      postal:          "Postcards",
      sostenibilidad:  "Sustainability",
      top10:           "Top 10 Madrid",
      servicios:       "Services",
      servicio:        "Room Service",
      transporte:      "Getting around",
    },
    detail: {
      back: "Back",
      historia_title: "Our History",
      historia_body: "La Fonda de los Príncipes first opened its doors on October 1st, 1861, as one of the first accommodations at Puerta del Sol. Famous for its luxury and exclusivity, it was reborn on January 5th, 2026 after a meticulous renovation. A balcony suspended over Madrid's history.",
      horarios_title: "Schedule",
      horarios_body: "Reception: 24 hours\nCheck-in: 3:00 PM\nCheck-out: 12:00 PM\nBreakfast: 7:00 AM – 10:30 AM\nBar & Restaurant: 10:30 AM – midnight",
      contacto_title: "Contact",
      contacto_body: "Phone: +34 919 891 469\nWhatsApp: +34 919 891 469\nEmail: recepcion@lafondadelosprincipes.com\nAddress: Puerta del Sol, Madrid",
      restaurante_title: "Restaurant & Cocktail Bar",
      restaurante_body: "Hours: 10:30 AM – midnight\n\nAt La Fonda, every glass is a toast to the past and a welcome to the future. Our cocktail bar offers unique creations with a Madrilenian soul. You don't need to wait for New Year's Eve to celebrate.",
      habitaciones_title: "Rooms",
      habitaciones_body: "From your balcony at La Fonda, every sunrise is a postcard and every sunset a private spectacle. Rooms designed for the perfect balance between rest and the city.",
      experiencias_title: "Experiences",
      experiencias_body: "Civitatis is the leading platform for guided tours and activities in Madrid. Book the best experiences with expert guides.",
      experiencias_civitatis: "https://www.civitatis.com/en/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "Network: LaFondaPrincipes\nPassword: available at reception\nSpeed: 600 Mbps fiber\nCoverage in all rooms and common areas.",
      mapa_title: "Getting Here",
      mapa_body: "We are located in the heart of Madrid, at Puerta del Sol.\n\nMetro: Sol (Lines 1, 2 & 3)\nCercanías: Sol\nBus: multiple lines\n\nBarajas Airport: 30 min by metro (Line 8 + transfer)",
    },
  },
  fr: {
    tagline: "Un balcon, des histoires infinies",
    categories: {
      habitacion: "Votre séjour",
      tuhabitacion: "Votre chambre",
      gastronomia: "Gastronomie",
      hotel: "L'hôtel",
      madrid: "Madrid",
    },
    services: {
      historia:     "Histoire",
      minibar:      "Minibar",
      bar:          "Bar",
      desayuno:     "Petit-déjeuner",
      horarios:     "Horaires",
      contacto:     "Contact",
      restaurante:  "Restaurant",
      habitaciones: "Chambres",
      experiencias: "Expériences",
      wifi:         "WiFi",
      mapa:         "Carte",
      viajeros:        "Les Voyageurs",
      campanadas:      "Les Cloches",
      postal:          "Cartes postales",
      sostenibilidad:  "Durabilité",
      top10:           "Top 10 Madrid",
      servicios:       "Services",
      servicio:        "Room Service",
      transporte:      "Se déplacer",
    },
    detail: {
      back: "Retour",
      historia_title: "Notre Histoire",
      historia_body: "La Fonda de los Príncipes a ouvert ses portes pour la première fois le 1er octobre 1861, comme l'un des premiers hébergements de la Puerta del Sol. Renaissant le 5 janvier 2026 après une rénovation méticuleuse. Un balcon suspendu sur l'histoire de Madrid.",
      horarios_title: "Horaires",
      horarios_body: "Réception : 24 heures\nArrivée : 15h00\nDépart : 12h00\nPetit-déjeuner : 07h00 – 10h30\nBar & Restaurant : 10h30 – 00h00",
      contacto_title: "Contact",
      contacto_body: "Téléphone: +34 919 891 469\nWhatsApp: +34 919 891 469\nEmail: recepcion@lafondadelosprincipes.com\nAdresse: Puerta del Sol, Madrid",
      restaurante_title: "Restaurant & Bar",
      restaurante_body: "Horaires : 10h30 – 00h00\n\nÀ La Fonda, chaque verre est un toast au passé et une bienvenue au futur. Notre bar propose des créations uniques avec une âme madrilène.",
      habitaciones_title: "Chambres",
      habitaciones_body: "Depuis votre balcon à La Fonda, chaque lever de soleil est une carte postale et chaque coucher, un spectacle privé.",
      experiencias_title: "Expériences",
      experiencias_body: "Civitatis est la plateforme leader des visites guidées et activités à Madrid. Réservez les meilleures expériences avec des guides experts.",
      experiencias_civitatis: "https://www.civitatis.com/fr/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "Réseau: LaFondaPrincipes\nMot de passe: disponible à la réception\nVitesse: fibre 600 Mbps",
      mapa_title: "Comment nous trouver",
      mapa_body: "Nous sommes situés au cœur de Madrid, à la Puerta del Sol.\n\nMétro: Sol (Lignes 1, 2 et 3)\nAéroport Barajas: 30 min en métro",
    },
  },
  de: {
    tagline: "Ein Balkon, unendliche Geschichten",
    categories: {
      habitacion: "Ihr Aufenthalt",
      tuhabitacion: "Ihr Zimmer",
      gastronomia: "Gastronomie",
      hotel: "Das Hotel",
      madrid: "Madrid",
    },
    services: {
      historia:     "Geschichte",
      minibar:      "Minibar",
      bar:          "Bar",
      desayuno:     "Frühstück",
      horarios:     "Zeiten",
      contacto:     "Kontakt",
      restaurante:  "Restaurant",
      habitaciones: "Zimmer",
      experiencias: "Erlebnisse",
      wifi:         "WLAN",
      mapa:         "Karte",
      viajeros:        "Die Reisenden",
      campanadas:      "Die Glocken",
      postal:          "Postkarten",
      sostenibilidad:  "Nachhaltigkeit",
      top10:           "Top 10 Madrid",
      servicios:       "Zimmerservice",
      servicio:        "Room Service",
      transporte:      "Verkehr",
    },
    detail: {
      back: "Zurück",
      historia_title: "Unsere Geschichte",
      historia_body: "La Fonda de los Príncipes öffnete erstmals am 1. Oktober 1861 seine Türen als eine der ersten Unterkünfte an der Puerta del Sol. Nach einer sorgfältigen Renovierung wurde es am 5. Januar 2026 wiedereröffnet.",
      horarios_title: "Öffnungszeiten",
      horarios_body: "Rezeption: 24 Stunden\nCheck-in: 15:00 Uhr\nCheck-out: 12:00 Uhr\nFrühstück: 07:00 – 10:30 Uhr\nBar & Restaurant: 10:30 – 24:00 Uhr",
      contacto_title: "Kontakt",
      contacto_body: "Telefon: +34 919 891 469\nWhatsApp: +34 919 891 469\nE-Mail: recepcion@lafondadelosprincipes.com\nAdresse: Puerta del Sol, Madrid",
      restaurante_title: "Restaurant & Bar",
      restaurante_body: "Öffnungszeiten: 10:30 – 24:00 Uhr\n\nIm La Fonda ist jedes Glas ein Toast auf die Vergangenheit und ein Willkommen an die Zukunft. Einzigartige Kreationen mit Madrider Seele.",
      habitaciones_title: "Zimmer",
      habitaciones_body: "Von Ihrem Balkon im La Fonda ist jeder Sonnenaufgang eine Postkarte und jeder Sonnenuntergang ein privates Spektakel.",
      experiencias_title: "Erlebnisse",
      experiencias_body: "Civitatis ist die führende Plattform für Stadtführungen und Aktivitäten in Madrid. Buchen Sie die besten Erlebnisse mit erfahrenen Guides.",
      experiencias_civitatis: "https://www.civitatis.com/en/madrid/?ag_aid=91489",
      wifi_title: "WLAN",
      wifi_body: "Netzwerk: LaFondaPrincipes\nPasswort: an der Rezeption erhältlich\nGeschwindigkeit: 600 Mbps Glasfaser",
      mapa_title: "Anfahrt",
      mapa_body: "Wir befinden uns im Herzen von Madrid, an der Puerta del Sol.\n\nU-Bahn: Sol (Linien 1, 2 und 3)\nFlughafen Barajas: 30 Min. mit der U-Bahn",
    },
  },
  it: {
    tagline: "Un balcone, storie infinite",
    categories: {
      habitacion: "Il tuo soggiorno",
      tuhabitacion: "La tua camera",
      gastronomia: "Gastronomia",
      hotel: "L'hotel",
      madrid: "Madrid",
    },
    services: {
      historia:     "Storia",
      minibar:      "Minibar",
      bar:          "Bar",
      desayuno:     "Colazione",
      horarios:     "Orari",
      contacto:     "Contatto",
      restaurante:  "Ristorante",
      habitaciones: "Camere",
      experiencias: "Esperienze",
      wifi:         "WiFi",
      mapa:         "Mappa",
      viajeros:        "I Viaggiatori",
      campanadas:      "Le Campane",
      postal:          "Cartoline",
      sostenibilidad:  "Sostenibilità",
      top10:           "Top 10 Madrid",
      servicios:       "Servizi",
      servicio:        "Room Service",
      transporte:      "Trasporti",
    },
    detail: {
      back: "Indietro",
      historia_title: "La Nostra Storia",
      historia_body: "La Fonda de los Príncipes aprì le sue porte per la prima volta il 1° ottobre 1861, come uno dei primi alloggi della Puerta del Sol. Rinata il 5 gennaio 2026 dopo una meticolosa ristrutturazione.",
      horarios_title: "Orari",
      horarios_body: "Reception: 24 ore\nCheck-in: 15:00\nCheck-out: 12:00\nColazione: 07:00 – 10:30\nBar & Ristorante: 10:30 – 24:00",
      contacto_title: "Contatto",
      contacto_body: "Telefono: +34 919 891 469\nWhatsApp: +34 919 891 469\nEmail: recepcion@lafondadelosprincipes.com\nIndirizzo: Puerta del Sol, Madrid",
      restaurante_title: "Ristorante & Bar",
      restaurante_body: "Orari: 10:30 – 24:00\n\nAl La Fonda, ogni bicchiere è un brindisi al passato e un benvenuto al futuro. Creazioni uniche con anima madrilena.",
      habitaciones_title: "Camere",
      habitaciones_body: "Dal tuo balcone al La Fonda, ogni alba è una cartolina e ogni tramonto uno spettacolo privato.",
      experiencias_title: "Esperienze",
      experiencias_body: "Civitatis è la piattaforma leader per tour guidati e attività a Madrid. Prenota le migliori esperienze con guide esperte.",
      experiencias_civitatis: "https://www.civitatis.com/it/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "Rete: LaFondaPrincipes\nPassword: disponibile alla reception\nVelocità: fibra 600 Mbps",
      mapa_title: "Come arrivare",
      mapa_body: "Siamo nel cuore di Madrid, alla Puerta del Sol.\n\nMetro: Sol (Linee 1, 2 e 3)\nAeroporto Barajas: 30 min in metro",
    },
  },
  pt: {
    tagline: "Uma varanda, histórias infinitas",
    categories: {
      habitacion: "A sua estadia",
      tuhabitacion: "O seu quarto",
      gastronomia: "Gastronomia",
      hotel: "O hotel",
      madrid: "Madrid",
    },
    services: {
      historia:     "História",
      minibar:      "Minibar",
      bar:          "Bar",
      desayuno:     "Pequeno-almoço",
      horarios:     "Horários",
      contacto:     "Contato",
      restaurante:  "Restaurante",
      habitaciones: "Quartos",
      experiencias: "Experiências",
      wifi:         "WiFi",
      mapa:         "Mapa",
      viajeros:        "Os Viajantes",
      campanadas:      "Os Sinos",
      postal:          "Postais",
      sostenibilidad:  "Sustentabilidade",
      top10:           "Top 10 Madrid",
      servicios:       "Serviços",
      servicio:        "Room Service",
      transporte:      "Transportes",
    },
    detail: {
      back: "Voltar",
      historia_title: "Nossa História",
      historia_body: "La Fonda de los Príncipes abriu suas portas pela primeira vez em 1º de outubro de 1861, como um dos primeiros alojamentos da Puerta del Sol. Renasceu em 5 de janeiro de 2026 após uma meticulosa renovação.",
      horarios_title: "Horários",
      horarios_body: "Recepção: 24 horas\nCheck-in: 15h00\nCheck-out: 12h00\nCafé da manhã: 07h00 – 10h30\nBar & Restaurante: 10h30 – 00h00",
      contacto_title: "Contato",
      contacto_body: "Telefone: +34 919 891 469\nWhatsApp: +34 919 891 469\nEmail: recepcion@lafondadelosprincipes.com\nEndereço: Puerta del Sol, Madrid",
      restaurante_title: "Restaurante & Bar",
      restaurante_body: "Horário: 10h30 – 00h00\n\nNo La Fonda, cada copo é um brinde ao passado e uma boas-vindas ao futuro. Criações únicas com alma madrilena.",
      habitaciones_title: "Quartos",
      habitaciones_body: "Da sua varanda no La Fonda, cada amanhecer é um postal e cada pôr do sol, um espetáculo privado.",
      experiencias_title: "Experiências",
      experiencias_body: "A Civitatis é a plataforma líder de visitas guiadas e atividades em Madrid. Reserve as melhores experiências com guias especializados.",
      experiencias_civitatis: "https://www.civitatis.com/es/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "Rede: LaFondaPrincipes\nSenha: disponível na recepção\nVelocidade: fibra 600 Mbps",
      mapa_title: "Como chegar",
      mapa_body: "Estamos no coração de Madrid, na Puerta del Sol.\n\nMetrô: Sol (Linhas 1, 2 e 3)\nAeroporto Barajas: 30 min de metrô",
    },
  },
  zh: {
    tagline: "一座阳台，无尽故事",
    categories: {
      habitacion: "您的入住",
      tuhabitacion: "您的客房",
      gastronomia: "美食",
      hotel: "酒店",
      madrid: "马德里",
    },
    services: {
      historia:     "历史",
      minibar:      "迷你吧",
      bar:          "酒吧",
      desayuno:     "早餐",
      horarios:     "时间表",
      contacto:     "联系",
      restaurante:  "餐厅",
      habitaciones: "客房",
      experiencias: "体验",
      wifi:         "WiFi",
      mapa:         "地图",
      viajeros:        "旅行者",
      campanadas:      "钟声",
      postal:          "明信片",
      sostenibilidad:  "可持续发展",
      top10:           "Top 10",
      servicios:       "客房服务",
      servicio:        "送餐服务",
      transporte:      "交通",
    },
    detail: {
      back: "返回",
      historia_title: "我们的历史",
      historia_body: "王子客栈于1861年10月1日首次开业，是太阳门广场最早的住宿场所之一。经过精心翻修后，于2026年1月5日重新开业。",
      horarios_title: "时间表",
      horarios_body: "前台：24小时\n入住：15:00\n退房：12:00\n早餐：07:00 – 10:30\n酒吧 & 餐厅：10:30 – 24:00",
      contacto_title: "联系方式",
      contacto_body: "电话：+34 919 891 469\nWhatsApp：+34 919 891 469\n邮箱：recepcion@lafondadelosprincipes.com\n地址：马德里太阳门广场",
      restaurante_title: "餐厅与酒吧",
      restaurante_body: "营业时间：10:30 – 24:00\n\n在王子客栈，每一杯都是对过去的致敬，对未来的欢迎。独特的马德里风情鸡尾酒。",
      habitaciones_title: "客房",
      habitaciones_body: "从您在王子客栈的阳台上，每个日出都是一张明信片，每个日落都是私人表演。",
      experiencias_title: "体验",
      experiencias_body: "Civitatis 是马德里导游游览和活动的领先平台。与专业导游一起预订最佳体验。",
      experiencias_civitatis: "https://www.civitatis.com/en/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "网络：LaFondaPrincipes\n密码：请咨询前台\n速度：600 Mbps光纤",
      mapa_title: "如何到达",
      mapa_body: "我们位于马德里市中心太阳门广场。\n\n地铁：Sol站（1、2、3号线）\n巴拉哈斯机场：地铁30分钟",
    },
  },
  ja: {
    tagline: "一つのバルコニー、無限の物語",
    categories: {
      habitacion: "ご滞在",
      tuhabitacion: "お部屋",
      gastronomia: "グルメ",
      hotel: "ホテル",
      madrid: "マドリード",
    },
    services: {
      historia:     "歴史",
      minibar:      "ミニバー",
      bar:          "バー",
      desayuno:     "朝食",
      horarios:     "スケジュール",
      contacto:     "お問い合わせ",
      restaurante:  "レストラン",
      habitaciones: "客室",
      experiencias: "体験",
      wifi:         "WiFi",
      mapa:         "地図",
      viajeros:        "旅人たち",
      campanadas:      "鐘の音",
      postal:          "ポストカード",
      sostenibilidad:  "サステナビリティ",
      top10:           "Top 10",
      servicios:       "客室サービス",
      servicio:        "ルームサービス",
      transporte:      "交通",
    },
    detail: {
      back: "戻る",
      historia_title: "私たちの歴史",
      historia_body: "ラ・フォンダ・デ・ロス・プリンシペスは1861年10月1日に初めて開業し、プエルタ・デル・ソルで最初の宿泊施設の一つでした。2026年1月5日に丁寧な改装を経て再オープンしました。",
      horarios_title: "スケジュール",
      horarios_body: "フロント：24時間\nチェックイン：15:00\nチェックアウト：12:00\n朝食：07:00 – 10:30\nバー & レストラン：10:30 – 24:00",
      contacto_title: "お問い合わせ",
      contacto_body: "電話：+34 919 891 469\nWhatsApp：+34 919 891 469\nメール：recepcion@lafondadelosprincipes.com\n住所：マドリード プエルタ・デル・ソル",
      restaurante_title: "レストラン＆バー",
      restaurante_body: "営業時間：10:30 – 24:00\n\nラ・フォンダでは、一杯一杯が過去への乾杯であり、未来への歓迎です。マドリードの魂を持つ独自のカクテル。",
      habitaciones_title: "客室",
      habitaciones_body: "ラ・フォンダのバルコニーから、毎朝の日の出はポストカードであり、夕暮れはプライベートショーです。",
      experiencias_title: "体験",
      experiencias_body: "Civitatis はマドリードのガイドツアーとアクティビティのトッププラットフォームです。専門ガイドと最高の体験を予約しましょう。",
      experiencias_civitatis: "https://www.civitatis.com/en/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "ネットワーク：LaFondaPrincipes\nパスワード：フロントにてご確認ください\n速度：光ファイバー600 Mbps",
      mapa_title: "アクセス",
      mapa_body: "マドリード中心部、プエルタ・デル・ソルに位置しています。\n\n地下鉄：Sol駅（1・2・3号線）\nバラハス空港：地下鉄で30分",
    },
  },
  ar: {
    tagline: "شرفة واحدة، قصص لا تنتهي",
    categories: {
      habitacion: "إقامتك",
      tuhabitacion: "غرفتك",
      gastronomia: "المطبخ",
      hotel: "الفندق",
      madrid: "مدريد",
    },
    services: {
      historia:     "التاريخ",
      minibar:      "ميني بار",
      bar:          "بار",
      desayuno:     "الإفطار",
      horarios:     "المواعيد",
      contacto:     "اتصل بنا",
      restaurante:  "المطعم",
      habitaciones: "الغرف",
      experiencias: "التجارب",
      wifi:         "واي فاي",
      mapa:         "الخريطة",
      viajeros:        "المسافرون",
      campanadas:      "الأجراس",
      postal:          "البطاقات البريدية",
      sostenibilidad:  "الاستدامة",
      top10:           "أفضل 10",
      servicios:       "خدمات الغرفة",
      servicio:        "خدمة الغرف",
      transporte:      "المواصلات",
    },
    detail: {
      back: "رجوع",
      historia_title: "تاريخنا",
      historia_body: "افتتح لا فوندا دي لوس برينسيبيس أبوابه لأول مرة في 1 أكتوبر 1861، كأحد أوائل دور الإقامة في بويرتا ديل سول. أعيد افتتاحه في 5 يناير 2026 بعد تجديد دقيق.",
      horarios_title: "المواعيد",
      horarios_body: "الاستقبال: 24 ساعة\nتسجيل الوصول: 15:00\nتسجيل المغادرة: 12:00\nالإفطار: 07:00 – 10:30\nالبار & المطعم: 10:30 – 24:00",
      contacto_title: "اتصل بنا",
      contacto_body: "هاتف: +34 919 891 469\nواتساب: +34 919 891 469\nالبريد الإلكتروني: recepcion@lafondadelosprincipes.com\nالعنوان: بويرتا ديل سول، مدريد",
      restaurante_title: "المطعم والبار",
      restaurante_body: "ساعات العمل: 10:30 – 24:00\n\nفي لا فوندا، كل كأس هو نخب للماضي وترحيب بالمستقبل. إبداعات فريدة بروح مدريدية.",
      habitaciones_title: "الغرف",
      habitaciones_body: "من شرفتك في لا فوندا، كل شروق شمس بطاقة بريدية وكل غروب عرض خاص.",
      experiencias_title: "التجارب",
      experiencias_body: "Civitatis هي المنصة الرائدة للجولات المرشدة والأنشطة في مدريد. احجز أفضل التجارب مع مرشدين خبراء.",
      experiencias_civitatis: "https://www.civitatis.com/en/madrid/?ag_aid=91489",
      wifi_title: "واي فاي",
      wifi_body: "الشبكة: LaFondaPrincipes\nكلمة المرور: متاحة في الاستقبال\nالسرعة: ألياف ضوئية 600 ميجابت",
      mapa_title: "كيفية الوصول",
      mapa_body: "نحن في قلب مدريد، في بويرتا ديل سول.\n\nمترو: محطة Sol (خطوط 1 و2 و3)\nمطار باراخاس: 30 دقيقة بالمترو",
    },
  },
  ru: {
    tagline: "Один балкон, бесконечные истории",
    categories: {
      habitacion: "Ваше пребывание",
      tuhabitacion: "Ваш номер",
      gastronomia: "Гастрономия",
      hotel: "Отель",
      madrid: "Мадрид",
    },
    services: {
      historia:     "История",
      minibar:      "Мини-бар",
      bar:          "Бар",
      desayuno:     "Завтрак",
      horarios:     "Расписание",
      contacto:     "Контакты",
      restaurante:  "Ресторан",
      habitaciones: "Номера",
      experiencias: "Впечатления",
      wifi:         "WiFi",
      mapa:         "Карта",
      viajeros:        "Путешественники",
      campanadas:      "Колокола",
      postal:          "Открытки",
      sostenibilidad:  "Устойчивость",
      top10:           "Топ 10",
      servicios:       "Услуги номера",
      servicio:        "Обслуживание в номере",
      transporte:      "Транспорт",
    },
    detail: {
      back: "Назад",
      historia_title: "Наша История",
      historia_body: "Ла Фонда де лос Принсипес впервые открыла свои двери 1 октября 1861 года, став одним из первых отелей на площади Пуэрта-дель-Соль. После тщательной реновации вновь открылась 5 января 2026 года.",
      horarios_title: "Расписание",
      horarios_body: "Ресепшн: 24 часа\nЗаезд: 15:00\nВыезд: 12:00\nЗавтрак: 07:00 – 10:30\nБар & Ресторан: 10:30 – 24:00",
      contacto_title: "Контакты",
      contacto_body: "Телефон: +34 919 891 469\nWhatsApp: +34 919 891 469\nEmail: recepcion@lafondadelosprincipes.com\nАдрес: Пуэрта-дель-Соль, Мадрид",
      restaurante_title: "Ресторан и Бар",
      restaurante_body: "Часы работы: 10:30 – 24:00\n\nВ Ла Фонда каждый бокал — это тост прошлому и приветствие будущему. Уникальные коктейли с мадридской душой.",
      habitaciones_title: "Номера",
      habitaciones_body: "С вашего балкона в Ла Фонда каждый рассвет — открытка, а каждый закат — частное представление.",
      experiencias_title: "Впечатления",
      experiencias_body: "Civitatis — ведущая платформа экскурсий и мероприятий в Мадриде. Забронируйте лучший опыт с опытными гидами.",
      experiencias_civitatis: "https://www.civitatis.com/en/madrid/?ag_aid=91489",
      wifi_title: "WiFi",
      wifi_body: "Сеть: LaFondaPrincipes\nПароль: уточняйте на ресепшн\nСкорость: оптоволокно 600 Мбит/с",
      mapa_title: "Как добраться",
      mapa_body: "Мы находимся в самом центре Мадрида, на площади Пуэрта-дель-Соль.\n\nМетро: Sol (линии 1, 2 и 3)\nАэропорт Барахас: 30 мин на метро",
    },
  },
};

export function getTranslations(lang: LangCode): Translations {
  return T[lang] ?? T["es"];
}

// ── Context ───────────────────────────────────────────────────────────────────

interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
  t: T["es"],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => detectLang());

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof localStorage !== "undefined") localStorage.setItem("fonda_lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getTranslations(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
