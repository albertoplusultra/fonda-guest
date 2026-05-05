/*
 * ServiciosPage — "Noche en Sol" design
 * Servicios de la habitación: caja fuerte, Smart TV, room service, despertador, lavandería
 */
import { Shield, Tv, Bell, AlarmClock, WashingMachine, Phone, Wind, Umbrella, Luggage, BedDouble, Baby, Car, Plug, Printer, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";

interface ServiciosPageProps { onBack: () => void; onContacto: () => void; onClimati: () => void; }

interface ServiceSection {
  iconKey: string;
  heading: string;
  paragraphs: string[];
  cta?: string; // si tiene botón de contacto
  ctaLink?: string; // si tiene enlace a página secundaria
  linkLabel?: string; // texto del enlace a página secundaria
  inlineLink?: string; // texto exacto dentro del párrafo que se convierte en enlace a contacto
}

interface ServiciosContent {
  title: string;
  sections: ServiceSection[];
}

const ICONS: Record<string, LucideIcon> = {
  safe: Shield,
  tv: Tv,
  roomservice: Bell,
  alarm: AlarmClock,
  laundry: WashingMachine,
  climati: Wind,
  umbrella: Umbrella,
  luggage: Luggage,
  pillow: BedDouble,
  baby: Baby,
  taxi: Car,
  plug: Plug,
  printer: Printer,
};

const CONTENT: Record<string, ServiciosContent> = {
  es: {
    title: "Servicios",
    sections: [
      {
        iconKey: "safe",
        heading: "Caja fuerte",
        paragraphs: [
          "Su habitación dispone de una caja fuerte digital en el armario. Para programarla, introduzca su código personal de 4 dígitos y pulse el botón de confirmación. Para abrirla, introduzca el mismo código.",
          "Si olvida el código o necesita ayuda, llame a recepción y le asistiremos de inmediato.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "La televisión de su habitación es una Smart TV con acceso a internet. Puede iniciar sesión con su cuenta de Netflix, HBO Max, Disney+, Prime Video o cualquier otra plataforma de streaming.",
          "Al hacer el check-out en el hotel, tus datos se eliminarán de forma automática para asegurar tu privacidad.",
        ],
      },
      {
        iconKey: "climati",
        heading: "Climatización",
        paragraphs: [
          "El mando del aire acondicionado y calefacción está en la pared, al lado de la puerta.",
        ],
        ctaLink: "climati",
        linkLabel: "Ver cómo funciona",
      },
      {
        iconKey: "alarm",
        heading: "Servicio de despertador",
        paragraphs: [
          "Si desea que le despertemos a una hora determinada, contacte con recepción e indíquenos la hora. Estaremos encantados de ayudarle.",
        ],
        inlineLink: "contacte con recepción",
      },
      {
        iconKey: "laundry",
        heading: "Lavandería",
        paragraphs: [
          "Disponemos de servicio de lavandería. Los precios están detallados en la bolsa del armario.",
          "Servicio regular: recogida antes de las 11h, entrega a partir de las 18h.",
          "Servicio express (+25%): recogida antes de las 11h, entrega antes de las 15h; o recogida entre 11h y 15h, entrega antes de las 21h.",
          "Servicio express nocturno (+50%): recogida después de las 18h, entrega antes de las 9h.",
          "Lavado en seco: recogida antes de las 8:30h, entrega a partir de las 18h. No disponible los domingos.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Paraguas",
        paragraphs: [
          "Encontrará dos paraguas en el armario de su habitación por si le sorprende la lluvia durante su visita a Madrid. Úselos con total libertad.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Consigna de equipaje",
        paragraphs: [
          "Si llega antes del check-in o necesita dejar su equipaje después del check-out, puede dejarlo en recepción. Estaremos encantados de guardarlo hasta que lo necesite.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Almohadas",
        paragraphs: [
          "Disponemos de diferentes tipos de almohadas para adaptarnos a sus preferencias. Si desea cambiar la almohada de su habitación, contacte con recepción y se la llevamos.",
        ],
        inlineLink: "contacte con recepción",
      },
      {
        iconKey: "baby",
        heading: "Cuna de bebé",
        paragraphs: [
          "Si viajas con un bebé, podemos instalar una cuna en tu habitación sin coste adicional, sujeto a disponibilidad. Solicítala en recepción al hacer el check-in o con antelación.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Taxi y traslados",
        paragraphs: [
          "Si necesita un taxi o un traslado al aeropuerto, al tren o a cualquier otro destino, contacte con recepción y lo gestionamos por usted.",
        ],
        inlineLink: "contacte con recepción",
      },
      {
        iconKey: "plug",
        heading: "Adaptadores de corriente",
        paragraphs: [
          "Si necesita un adaptador de corriente, pásese por recepción y le facilitamos uno sin coste.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Impresión de documentos",
        paragraphs: [
          "Si necesita imprimir una tarjeta de embarque, una reserva u otro documento, acérquese a recepción y se lo imprimimos.",
        ],
      },
    ],
  },
  en: {
    title: "Room Services",
    sections: [
      {
        iconKey: "climati",
        heading: "Air conditioning",
        paragraphs: [
          "The air conditioning and heating controller is on the wall, next to the door.",
        ],
        ctaLink: "climati",
        linkLabel: "See how it works",
      },
      {
        iconKey: "safe",
        heading: "Safe",
        paragraphs: [
          "Your room has a digital safe in the wardrobe. To set it, enter your personal 4-digit code and press the confirm button. To open it, enter the same code.",
          "If you forget the code or need assistance, call reception and we will help you immediately.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "Your room television is a Smart TV with internet access. You can log in with your Netflix, HBO Max, Disney+, Prime Video or any other streaming platform account.",
          "When you check out of the hotel, your data will be automatically deleted to ensure your privacy.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "Wake-up call",
        paragraphs: [
          "If you would like a wake-up call at a specific time, please contact reception and let us know. We will be happy to help.",
        ],
        inlineLink: "contact reception",
      },
      {
        iconKey: "laundry",
        heading: "Laundry",
        paragraphs: [
          "We offer a laundry service. Prices are detailed on the bag in your wardrobe.",
          "Regular service: pick up before 11am, delivery from 6pm.",
          "Express service (+25%): pick up before 11am, delivery before 3pm; or pick up between 11am and 3pm, delivery before 9pm.",
          "Night express service (+50%): pick up after 6pm, delivery before 9am.",
          "Dry cleaning: pick up before 8:30am, delivery from 6pm. Not available on Sundays.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Umbrella",
        paragraphs: [
          "You will find two umbrellas in your wardrobe in case you get caught in the rain during your visit to Madrid. Please feel free to use them.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Luggage storage",
        paragraphs: [
          "If you arrive before check-in or need to leave your luggage after check-out, you can leave it at reception. We will be happy to keep it until you need it.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Pillows",
        paragraphs: [
          "We have different types of pillows to suit your preferences. If you would like to change the pillow in your room, please contact reception and we will bring it to you.",
        ],
        inlineLink: "contact reception",
      },
      {
        iconKey: "baby",
        heading: "Baby cot",
        paragraphs: [
          "If you are travelling with a baby, we can set up a cot in your room at no extra charge. Please request it at reception when checking in or in advance.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Taxi and transfers",
        paragraphs: [
          "If you need a taxi or a transfer to the airport, train station or any other destination, please contact reception and we will arrange it for you.",
        ],
        inlineLink: "contact reception",
      },
      {
        iconKey: "plug",
        heading: "Power adapters",
        paragraphs: [
          "If you need a power adapter, please come to reception and we will provide one free of charge.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Document printing",
        paragraphs: [
          "If you need to print a boarding pass, a booking confirmation or any other document, come to reception and we will print it for you.",
        ],
      },
    ],
  },
  fr: {
    title: "Services",
    sections: [
      {
        iconKey: "climati",
        heading: "Climatisation",
        paragraphs: [
          "Le thermostat de la climatisation et du chauffage se trouve sur le mur, à côté de la porte.",
        ],
        ctaLink: "climati",
        linkLabel: "Voir comment ça fonctionne",
      },
      {
        iconKey: "safe",
        heading: "Coffre-fort",
        paragraphs: [
          "Votre chambre dispose d'un coffre-fort numérique dans l'armoire. Pour le programmer, entrez votre code personnel à 4 chiffres et appuyez sur le bouton de confirmation. Pour l'ouvrir, entrez le même code.",
          "Si vous oubliez le code ou avez besoin d'aide, appelez la réception et nous vous aiderons immédiatement.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "La télévision de votre chambre est une Smart TV avec accès à internet. Vous pouvez vous connecter avec votre compte Netflix, HBO Max, Disney+, Prime Video ou toute autre plateforme de streaming.",
          "Lors du check-out à l'hôtel, vos données seront automatiquement supprimées pour garantir votre confidentialité.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "Réveil",
        paragraphs: [
          "Si vous souhaitez être réveillé à une heure précise, contactez la réception et indiquez-nous l'heure. Nous serons ravis de vous aider.",
        ],
        inlineLink: "contactez la réception",
      },
      {
        iconKey: "laundry",
        heading: "Blanchisserie",
        paragraphs: [
          "Nous proposons un service de blanchisserie. Les tarifs sont indiqués sur le sac dans votre armoire.",
          "Service régulier : collecte avant 11h, livraison à partir de 18h.",
          "Service express (+25%) : collecte avant 11h, livraison avant 15h ; ou collecte entre 11h et 15h, livraison avant 21h.",
          "Service express nocturne (+50%) : collecte après 18h, livraison avant 9h.",
          "Nettoyage à sec : collecte avant 8h30, livraison à partir de 18h. Non disponible le dimanche.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Parapluie",
        paragraphs: [
          "Vous trouverez deux parapluies dans l'armoire de votre chambre en cas de pluie pendant votre séjour à Madrid. N'hésitez pas à les utiliser.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Consigne à bagages",
        paragraphs: [
          "Si vous arrivez avant le check-in ou si vous souhaitez laisser vos bagages après le check-out, vous pouvez les déposer à la réception. Nous les garderons jusqu'à ce que vous en ayez besoin.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Oreillers",
        paragraphs: [
          "Nous disposons de différents types d'oreillers pour répondre à vos préférences. Si vous souhaitez changer l'oreiller de votre chambre, contactez la réception et nous vous l'apporterons.",
        ],
        inlineLink: "contactez la réception",
      },
      {
        iconKey: "baby",
        heading: "Lit bébé",
        paragraphs: [
          "Si vous voyagez avec un bébé, nous pouvons installer un lit bébé dans votre chambre sans frais supplémentaires. Veuillez le demander à la réception lors du check-in ou à l'avance.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Taxi et transferts",
        paragraphs: [
          "Si vous avez besoin d'un taxi ou d'un transfert vers l'aéroport, la gare ou toute autre destination, contactez la réception et nous nous en occuperons pour vous.",
        ],
        inlineLink: "contactez la réception",
      },
      {
        iconKey: "plug",
        heading: "Adaptateurs secteur",
        paragraphs: [
          "Si vous avez besoin d'un adaptateur secteur, passez à la réception et nous vous en fournirons un gratuitement.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Impression de documents",
        paragraphs: [
          "Si vous avez besoin d'imprimer une carte d'embarquement, une réservation ou tout autre document, venez à la réception et nous l'imprimerons pour vous.",
        ],
      },
    ],
  },
  de: {
    title: "Zimmerservices",
    sections: [
      {
        iconKey: "climati",
        heading: "Klimaanlage",
        paragraphs: [
          "Die Steuerung für Klimaanlage und Heizung befindet sich an der Wand neben der Tür.",
        ],
        ctaLink: "climati",
        linkLabel: "So funktioniert es",
      },
      {
        iconKey: "safe",
        heading: "Tresor",
        paragraphs: [
          "Ihr Zimmer verfügt über einen digitalen Tresor im Schrank. Um ihn einzurichten, geben Sie Ihren persönlichen 4-stelligen Code ein und drücken Sie die Bestätigungstaste. Um ihn zu öffnen, geben Sie denselben Code ein.",
          "Wenn Sie den Code vergessen oder Hilfe benötigen, rufen Sie die Rezeption an.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "Der Fernseher in Ihrem Zimmer ist ein Smart TV mit Internetzugang. Sie können sich mit Ihrem Netflix-, HBO Max-, Disney+-, Prime Video- oder einem anderen Streaming-Konto anmelden.",
          "Beim Check-out im Hotel werden Ihre Daten automatisch gelöscht, um Ihre Privatsphäre zu schützen.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "Weckruf",
        paragraphs: [
          "Wenn Sie zu einer bestimmten Zeit geweckt werden möchten, kontaktieren Sie die Rezeption und teilen Sie uns die Uhrzeit mit. Wir helfen Ihnen gerne.",
        ],
        inlineLink: "kontaktieren Sie die Rezeption",
      },
      {
        iconKey: "laundry",
        heading: "Wäscheservice",
        paragraphs: [
          "Wir bieten einen Wäscheservice an. Die Preise finden Sie auf dem Beutel im Schrank.",
          "Regulärer Service: Abholung vor 11 Uhr, Lieferung ab 18 Uhr.",
          "Expressservice (+25%): Abholung vor 11 Uhr, Lieferung vor 15 Uhr; oder Abholung zwischen 11 und 15 Uhr, Lieferung vor 21 Uhr.",
          "Nacht-Expressservice (+50%): Abholung nach 18 Uhr, Lieferung vor 9 Uhr.",
          "Chemische Reinigung: Abholung vor 8:30 Uhr, Lieferung ab 18 Uhr. Sonntags nicht verfügbar.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Regenschirm",
        paragraphs: [
          "Im Schrank Ihres Zimmers finden Sie zwei Regenschirme für den Fall, dass Sie während Ihres Aufenthalts in Madrid vom Regen überrascht werden. Nutzen Sie sie gerne.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Gepäckaufbewahrung",
        paragraphs: [
          "Wenn Sie vor dem Check-in ankommen oder Ihr Gepäck nach dem Check-out lassen möchten, können Sie es an der Rezeption abgeben. Wir bewahren es gerne für Sie auf.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Kissen",
        paragraphs: [
          "Wir haben verschiedene Kissenarten, um Ihren Vorlieben gerecht zu werden. Wenn Sie das Kissen in Ihrem Zimmer wechseln möchten, kontaktieren Sie die Rezeption und wir bringen es Ihnen.",
        ],
        inlineLink: "kontaktieren Sie die Rezeption",
      },
      {
        iconKey: "baby",
        heading: "Babybett",
        paragraphs: [
          "Wenn Sie mit einem Baby reisen, können wir ein Babybett in Ihrem Zimmer aufstellen – kostenlos. Bitten Sie darum an der Rezeption beim Check-in oder im Voraus.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Taxi und Transfers",
        paragraphs: [
          "Wenn Sie ein Taxi oder einen Transfer zum Flughafen, Bahnhof oder einem anderen Ziel benötigen, kontaktieren Sie die Rezeption und wir organisieren es für Sie.",
        ],
        inlineLink: "kontaktieren Sie die Rezeption",
      },
      {
        iconKey: "plug",
        heading: "Steckdosenadapter",
        paragraphs: [
          "Wenn Sie einen Steckdosenadapter benötigen, kommen Sie zur Rezeption und wir stellen Ihnen einen kostenlos zur Verfügung.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Dokumentendruck",
        paragraphs: [
          "Wenn Sie eine Bordkarte, eine Buchungsbestätigung oder ein anderes Dokument drucken müssen, kommen Sie zur Rezeption und wir drucken es für Sie aus.",
        ],
      },
    ],
  },
  it: {
    title: "Servizi",
    sections: [
      {
        iconKey: "climati",
        heading: "Climatizzazione",
        paragraphs: [
          "Il telecomando del condizionatore e del riscaldamento si trova sul muro, vicino alla porta.",
        ],
        ctaLink: "climati",
        linkLabel: "Vedi come funziona",
      },
      {
        iconKey: "safe",
        heading: "Cassaforte",
        paragraphs: [
          "La sua camera dispone di una cassaforte digitale nell'armadio. Per impostarla, inserisca il suo codice personale di 4 cifre e prema il tasto di conferma. Per aprirla, inserisca lo stesso codice.",
          "Se dimentica il codice o ha bisogno di assistenza, chiami la reception e la aiuteremo immediatamente.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "Il televisore della sua camera è una Smart TV con accesso a internet. Può accedere con il suo account Netflix, HBO Max, Disney+, Prime Video o qualsiasi altra piattaforma di streaming.",
          "Al momento del check-out dall'hotel, i tuoi dati verranno eliminati automaticamente per garantire la tua privacy.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "Sveglia",
        paragraphs: [
          "Se desidera essere svegliato a un'ora specifica, contatti la reception e ci indichi l'orario. Saremo felici di aiutarla.",
        ],
        inlineLink: "contatti la reception",
      },
      {
        iconKey: "laundry",
        heading: "Lavanderia",
        paragraphs: [
          "Offriamo un servizio di lavanderia. I prezzi sono indicati sul sacchetto nell'armadio.",
          "Servizio regolare: ritiro entro le 11:00, consegna dalle 18:00.",
          "Servizio express (+25%): ritiro entro le 11:00, consegna entro le 15:00; o ritiro tra le 11:00 e le 15:00, consegna entro le 21:00.",
          "Servizio express notturno (+50%): ritiro dopo le 18:00, consegna entro le 9:00.",
          "Lavaggio a secco: ritiro entro le 8:30, consegna dalle 18:00. Non disponibile la domenica.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Ombrello",
        paragraphs: [
          "Troverà due ombrelli nell'armadio della sua camera nel caso in cui la pioggia la sorprenda durante la sua visita a Madrid. Li utilizzi pure liberamente.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Deposito bagagli",
        paragraphs: [
          "Se arriva prima del check-in o ha bisogno di lasciare i bagagli dopo il check-out, può lasciarli alla reception. Li custodiremo con piacere fino a quando ne avrà bisogno.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Cuscini",
        paragraphs: [
          "Disponiamo di diversi tipi di cuscini per adattarci alle sue preferenze. Se desidera cambiare il cuscino della sua camera, contatti la reception e glielo portiamo.",
        ],
        inlineLink: "contatti la reception",
      },
      {
        iconKey: "baby",
        heading: "Culla per neonati",
        paragraphs: [
          "Se viaggi con un neonato, possiamo installare una culla nella tua camera senza costi aggiuntivi, soggetto a disponibilità. Richiedila alla reception al momento del check-in o in anticipo.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Taxi e trasferimenti",
        paragraphs: [
          "Se ha bisogno di un taxi o di un trasferimento all'aeroporto, alla stazione o a qualsiasi altra destinazione, contatti la reception e lo organizziamo per lei.",
        ],
        inlineLink: "contatti la reception",
      },
      {
        iconKey: "plug",
        heading: "Adattatori di corrente",
        paragraphs: [
          "Se ha bisogno di un adattatore di corrente, si rechi alla reception e gliene forniremo uno gratuitamente.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Stampa documenti",
        paragraphs: [
          "Se ha bisogno di stampare una carta d'imbarco, una prenotazione o qualsiasi altro documento, venga alla reception e lo stamperemo per lei.",
        ],
      },
    ],
  },
  pt: {
    title: "Serviços",
    sections: [
      {
        iconKey: "climati",
        heading: "Climatização",
        paragraphs: [
          "O comando do ar condicionado e aquecimento está na parede, ao lado da porta.",
        ],
        ctaLink: "climati",
        linkLabel: "Ver como funciona",
      },
      {
        iconKey: "safe",
        heading: "Cofre",
        paragraphs: [
          "O seu quarto dispõe de um cofre digital no roupeiro. Para o programar, introduza o seu código pessoal de 4 dígitos e prima o botão de confirmação. Para o abrir, introduza o mesmo código.",
          "Se se esquecer do código ou precisar de ajuda, ligue para a receção e ajudamo-lo de imediato.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "A televisão do seu quarto é uma Smart TV com acesso à internet. Pode iniciar sessão com a sua conta Netflix, HBO Max, Disney+, Prime Video ou qualquer outra plataforma de streaming.",
          "No check-out do hotel, os seus dados serão eliminados automaticamente para garantir a sua privacidade.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "Serviço de despertar",
        paragraphs: [
          "Se desejar ser acordado a uma hora específica, contacte a receção e indique-nos a hora. Teremos todo o gosto em ajudar.",
        ],
        inlineLink: "contacte a receção",
      },
      {
        iconKey: "laundry",
        heading: "Lavandaria",
        paragraphs: [
          "Dispomos de serviço de lavandaria. Os preços estão detalhados no saco do roupeiro.",
          "Serviço regular: recolha antes das 11h, entrega a partir das 18h.",
          "Serviço expresso (+25%): recolha antes das 11h, entrega antes das 15h; ou recolha entre as 11h e as 15h, entrega antes das 21h.",
          "Serviço expresso noturno (+50%): recolha depois das 18h, entrega antes das 9h.",
          "Lavagem a seco: recolha antes das 8:30h, entrega a partir das 18h. Não disponível aos domingos.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Guarda-chuva",
        paragraphs: [
          "Encontrará dois guarda-chuvas no roupeiro do seu quarto caso seja surpreendido pela chuva durante a sua visita a Madrid. Utilize-os à vontade.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Depósito de bagagem",
        paragraphs: [
          "Se chegar antes do check-in ou precisar de deixar a bagagem após o check-out, pode deixá-la na receção. Teremos todo o gosto em guardá-la até precisar dela.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Almofadas",
        paragraphs: [
          "Dispomos de diferentes tipos de almofadas para nos adaptarmos às suas preferências. Se desejar trocar a almofada do seu quarto, contacte a receção e levamo-la.",
        ],
        inlineLink: "contacte a receção",
      },
      {
        iconKey: "baby",
        heading: "Berço para bebé",
        paragraphs: [
          "Se viajar com um bebé, podemos instalar um berço no seu quarto sem custo adicional, sujeito a disponibilidade. Solicite-o na receção no check-in ou com antecedência.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Táxi e transferes",
        paragraphs: [
          "Se precisar de um táxi ou de um transfer para o aeroporto, estação de comboios ou qualquer outro destino, contacte a receção e tratamos de tudo por si.",
        ],
        inlineLink: "contacte a receção",
      },
      {
        iconKey: "plug",
        heading: "Adaptadores de corrente",
        paragraphs: [
          "Se precisar de um adaptador de corrente, dirija-se à receção e fornecemos um gratuitamente.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Impressão de documentos",
        paragraphs: [
          "Se precisar de imprimir um cartão de embarque, uma reserva ou qualquer outro documento, venha à receção e imprimimos por si.",
        ],
      },
    ],
  },
  zh: {
    title: "客房服务",
    sections: [
      {
        iconKey: "climati",
        heading: "空调与暖气",
        paragraphs: [
          "空调和暖气的控制面板安装在门旁边的墙上。",
        ],
        ctaLink: "climati",
        linkLabel: "查看使用说明",
      },
      {
        iconKey: "safe",
        heading: "保险箱",
        paragraphs: [
          "您的房间衣柜内设有数字保险箱。设置时，请输入您的4位个人密码并按确认键。开箱时，输入相同密码即可。",
          "如果忘记密码或需要帮助，请致电前台，我们将立即为您提供协助。",
        ],
      },
      {
        iconKey: "tv",
        heading: "智能电视",
        paragraphs: [
          "您房间的电视是可联网的智能电视。您可以登录Netflix、HBO Max、Disney+、Prime Video或其他流媒体平台账户。",
          "退房时，您的数据将自动删除，以保护您的隐私。",
        ],
      },
      {
        iconKey: "alarm",
        heading: "叫醒服务",
        paragraphs: [
          "如需叫醒服务，请联系前台告知所需时间，我们将很乐意为您安排。",
        ],
        inlineLink: "联系前台",
      },
      {
        iconKey: "laundry",
        heading: "洗衣服务",
        paragraphs: [
          "我们提供洗衣服务。价格详见衣柜中的洗衣袋。",
          "普通服务：11时前取件，18时起送回。",
          "快递服务（+25%）：11时前取件，15时前送回；或11时至15时取件，21时前送回。",
          "夜间快递服务（+50%）：18时后取件，次日9时前送回。",
          "干洗：8:30前取件，18时起送回。周日不可用。",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "雨伞",
        paragraphs: [
          "如果在马德里游览期间遇到下雨，您可以在衣柜中找到两把雨伞，请随意使用。",
        ],
      },
      {
        iconKey: "luggage",
        heading: "行李寄存",
        paragraphs: [
          "如果您在入住前到达或需要在退房后寄存行李，可以将行李放在前台。我们很乐意为您保管，直到您需要取走为止。",
        ],
      },
      {
        iconKey: "pillow",
        heading: "枕头",
        paragraphs: [
          "我们提供不同类型的果子以满足您的偏好。如果您想更换房间里的果子，请联系前台，我们会为您送去。",
        ],
        inlineLink: "联系前台",
      },
      {
        iconKey: "baby",
        heading: "婴儿床",
        paragraphs: [
          "如果您携带婴儿出行，我们可以免费在您的房间安装婴儿床（视供应情况而定）。请在入住时或提前向前台申请。",
        ],
      },
      {
        iconKey: "taxi",
        heading: "出租车和接送服务",
        paragraphs: [
          "如果您需要前往机场、火车站或其他目的地的出租车或接送服务，请联系前台，我们将为您安排。",
        ],
        inlineLink: "联系前台",
      },
      {
        iconKey: "plug",
        heading: "电源适配器",
        paragraphs: [
          "如果您需要电源适配器，请前往前台，我们将免费为您提供。",
        ],
      },
      {
        iconKey: "printer",
        heading: "文件打印",
        paragraphs: [
          "如果您需要打印登机牌、预订确认单或其他文件，请前往前台，我们将为您打印。",
        ],
      },
    ],
  },
  ja: {
    title: "客室サービス",
    sections: [
      {
        iconKey: "climati",
        heading: "エアコン・暖房",
        paragraphs: [
          "エアコンと暖房のコントローラーはドアの横の壁にあります。",
        ],
        ctaLink: "climati",
        linkLabel: "使い方を見る",
      },
      {
        iconKey: "safe",
        heading: "金庫",
        paragraphs: [
          "お部屋のクローゼット内にデジタル金庫がございます。設定するには、4桁の個人コードを入力し、確認ボタンを押してください。開錠する際は同じコードを入力してください。",
          "コードをお忘れの場合やお困りの際は、フロントにご連絡ください。",
        ],
      },
      {
        iconKey: "tv",
        heading: "スマートTV",
        paragraphs: [
          "お部屋のテレビはインターネット接続可能なスマートTVです。Netflix、HBO Max、Disney+、Prime Videoなどのストリーミングサービスにログインしてご利用いただけます。",
          "チェックアウト時に、お客様のデータは自動的に削除され、プライバシーが保護されます。",
        ],
      },
      {
        iconKey: "alarm",
        heading: "モーニングコール",
        paragraphs: [
          "ゴ希望の時刻にモーニングコールをご希望の場合は、フロントにお問い合わせください。喜んで対応いたします。",
        ],
        inlineLink: "フロントにお問い合わせください",
      },
      {
        iconKey: "laundry",
        heading: "ランドリーサービス",
        paragraphs: [
          "ランドリーサービスをご利用いただけます。料金はクローゼット内の袋に記載されています。",
          "通常サービス：11時前に回収、18時以降にお届け。",
          "エクスプレスサービス（+25%）：11時前回収・15時前お届け、または11時〜15時回収・21時前お届け。",
          "夜間エクスプレスサービス（+50%）：18時以降回収、翌朝9時前お届け。",
          "ドライクリーニング：8:30前に回収、18時以降にお届け。日曜日は不可。",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "傘",
        paragraphs: [
          "マドリード滞在中に雨に降られた場合に備えて、クローゼットに傘を2本ご用意しています。ご自由にお使いください。",
        ],
      },
      {
        iconKey: "luggage",
        heading: "手荷物預かり",
        paragraphs: [
          "チェックイン前にご到着の場合や、チェックアウト後に荷物を預けたい場合は、フロントにお預けください。必要になるまで喜んでお預かりします。",
        ],
      },
      {
        iconKey: "pillow",
        heading: "枕",
        paragraphs: [
          "お好みに合わせてさまざまな種類の枚をご用意しています。枚を交換ご希望の場合は、フロントにお問い合わせください。",
        ],
        inlineLink: "フロントにお問い合わせください",
      },
      {
        iconKey: "baby",
        heading: "ベビーベッド",
        paragraphs: [
          "赤ちゃん連れのお客様には、空き状況に応じて追加料金なしでお部屋にベビーベッドをご用意できます。チェックイン時または事前にフロントへお申し付けください。",
        ],
      },
      {
        iconKey: "taxi",
        heading: "タクシー・送迎",
        paragraphs: [
          "空港、駅、またはその他の目的地へのタクシーや送迎が必要な場合は、フロントにお問い合わせください。手配いたします。",
        ],
        inlineLink: "フロントにお問い合わせください",
      },
      {
        iconKey: "plug",
        heading: "電源アダプター",
        paragraphs: [
          "電源アダプターが必要な場合は、フロントにお越しください。無料でご提供します。",
        ],
      },
      {
        iconKey: "printer",
        heading: "書類の印刷",
        paragraphs: [
          "搭乗券、予約確認書、その他の書類を印刷する必要がある場合は、フロントにお越しください。印刷いたします。",
        ],
      },
    ],
  },
  ar: {
    title: "خدمات الغرفة",
    sections: [
      {
        iconKey: "climati",
        heading: "التكييف والتدفئة",
        paragraphs: [
          "يوجد جهاز التحكم في التكييف والتدفئة على الجدار بجانب الباب.",
        ],
        ctaLink: "climati",
        linkLabel: "انظر كيف يعمل",
      },
      {
        iconKey: "safe",
        heading: "الخزنة الآمنة",
        paragraphs: [
          "تحتوي غرفتك على خزنة رقمية في الخزانة. لضبطها، أدخل رمزك الشخصي المكوّن من 4 أرقام واضغط على زر التأكيد. لفتحها، أدخل نفس الرمز.",
          "إذا نسيت الرمز أو احتجت إلى مساعدة، اتصل بالاستقبال وسنساعدك فوراً.",
        ],
      },
      {
        iconKey: "tv",
        heading: "التلفاز الذكي",
        paragraphs: [
          "تلفاز غرفتك هو تلفاز ذكي متصل بالإنترنت. يمكنك تسجيل الدخول بحساب Netflix أو HBO Max أو Disney+ أو Prime Video أو أي منصة بث أخرى.",
          "عند المغادرة من الفندق، سيتم حذف بياناتك تلقائياً لضمان خصوصيتك.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "خدمة الإيقاظ",
        paragraphs: [
          "إذا كنت تريد أن يوقظك أحدنا في وقت محدد، تواصل مع الاستقبال وأخبرنا بالوقت المطلوب. يسعدنا مساعدتك.",
        ],
        inlineLink: "تواصل مع الاستقبال",
      },
      {
        iconKey: "laundry",
        heading: "خدمة الغسيل",
        paragraphs: [
          "نوفر خدمة غسيل الملابس. الأسعار مفصّلة على الكيس الموجود في الخزانة.",
          "الخدمة العادية: الاستلام قبل 11:00، التسليم من 18:00.",
          "الخدمة السريعة (+25%): الاستلام قبل 11:00 والتسليم قبل 15:00؛ أو الاستلام بين 11:00 و15:00 والتسليم قبل 21:00.",
          "الخدمة السريعة الليلية (+50%): الاستلام بعد 18:00، التسليم قبل 9:00 صباحاً.",
          "التنظيف الجاف: الاستلام قبل 8:30، التسليم من 18:00. غير متاح أيام الأحد.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "مظلة",
        paragraphs: [
          "ستجد مظلتين في خزانة غرفتك في حال فاجأتك الأمطار أثناء زيارتك لمدريد. استخدمهما بكل حرية.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "حفظ الأمتعة",
        paragraphs: [
          "إذا وصلت قبل موعد تسجيل الوصول أو احتجت إلى ترك أمتعتك بعد تسجيل المغادرة، يمكنك تركها في الاستقبال. يسعدنا الاحتفاظ بها حتى تحتاجها.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "الوسائد",
        paragraphs: [
          "لدينا أنواع مختلفة من الوسائد لتناسب تفضيلاتك. إذا أردت تغيير وسادة غرفتك، تواصل مع الاستقبال وسنحضرها لك.",
        ],
        inlineLink: "تواصل مع الاستقبال",
      },
      {
        iconKey: "baby",
        heading: "سرير الأطفال",
        paragraphs: [
          "إذا كنت مسافراً مع رضيع، يمكننا تركيب سرير أطفال في غرفتك مجاناً، حسب التوفر. اطلبه من الاستقبال عند تسجيل الوصول أو مسبقاً.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "سيارة أجرة والنقل",
        paragraphs: [
          "إذا كنت بحاجة إلى سيارة أجرة أو نقل إلى المطار أو المحطة أو أي وجهة أخرى، تواصل مع الاستقبال وسنرتب ذلك لك.",
        ],
        inlineLink: "تواصل مع الاستقبال",
      },
      {
        iconKey: "plug",
        heading: "محولات الكهرباء",
        paragraphs: [
          "إذا كنت بحاجة إلى محول كهربائي، تفضل بالمجيء إلى الاستقبال وسنوفر لك واحداً مجاناً.",
        ],
      },
      {
        iconKey: "printer",
        heading: "طباعة المستندات",
        paragraphs: [
          "إذا كنت بحاجة إلى طباعة بطاقة صعود أو تأكيد حجز أو أي مستند آخر، تفضل بالمجيء إلى الاستقبال وسنطبعه لك.",
        ],
      },
    ],
  },
  ru: {
    title: "Услуги номера",
    sections: [
      {
        iconKey: "climati",
        heading: "Кондиционер и отопление",
        paragraphs: [
          "Пульт управления кондиционером и отоплением находится на стене рядом с дверью.",
        ],
        ctaLink: "climati",
        linkLabel: "Посмотреть инструкцию",
      },
      {
        iconKey: "safe",
        heading: "Сейф",
        paragraphs: [
          "В вашем номере в шкафу находится цифровой сейф. Чтобы его настроить, введите личный 4-значный код и нажмите кнопку подтверждения. Чтобы открыть, введите тот же код.",
          "Если вы забыли код или вам нужна помощь, позвоните на ресепшн — мы поможем немедленно.",
        ],
      },
      {
        iconKey: "tv",
        heading: "Smart TV",
        paragraphs: [
          "Телевизор в вашем номере — это Smart TV с доступом в интернет. Вы можете войти в свой аккаунт Netflix, HBO Max, Disney+, Prime Video или любой другой стриминговой платформы.",
          "При выезде из отеля ваши данные будут автоматически удалены для защиты вашей конфиденциальности.",
        ],
      },
      {
        iconKey: "alarm",
        heading: "Услуга побудки",
        paragraphs: [
          "Если вы хотите, чтобы вас разбудили в определённое время, свяжитесь с ресепшн и сообщите нам. Мы с удовольствием поможем.",
        ],
        inlineLink: "свяжитесь с ресепшн",
      },
      {
        iconKey: "laundry",
        heading: "Прачечная",
        paragraphs: [
          "Мы предоставляем услуги прачечной. Цены указаны на пакете в шкафу.",
          "Обычный сервис: сбор до 11:00, доставка с 18:00.",
          "Экспресс-сервис (+25%): сбор до 11:00, доставка до 15:00; или сбор с 11:00 до 15:00, доставка до 21:00.",
          "Ночной экспресс (+50%): сбор после 18:00, доставка до 9:00.",
          "Химчистка: сбор до 8:30, доставка с 18:00. Недоступно по воскресеньям.",
        ],
      },
      {
        iconKey: "umbrella",
        heading: "Зонт",
        paragraphs: [
          "В шкафу вашего номера вы найдёте два зонта на случай дождя во время прогулок по Мадриду. Пользуйтесь ими свободно.",
        ],
      },
      {
        iconKey: "luggage",
        heading: "Хранение багажа",
        paragraphs: [
          "Если вы приезжаете до заезда или вам нужно оставить багаж после выезда, вы можете оставить его на ресепшн. Мы с удовольствием сохраним его до тех пор, пока он вам не понадобится.",
        ],
      },
      {
        iconKey: "pillow",
        heading: "Подушки",
        paragraphs: [
          "У нас есть подушки разных видов на любой вкус. Если вы хотите заменить подушку в номере, свяжитесь с ресепшн и мы принесём её.",
        ],
        inlineLink: "свяжитесь с ресепшн",
      },
      {
        iconKey: "baby",
        heading: "Детская кроватка",
        paragraphs: [
          "Если вы путешествуете с младенцем, мы можем установить детскую кроватку в вашем номере бесплатно. Запросите её на ресепшн при заезде или заранее.",
        ],
      },
      {
        iconKey: "taxi",
        heading: "Такси и трансферы",
        paragraphs: [
          "Если вам нужно такси или трансфер в аэропорт, на вокзал или в любое другое место, свяжитесь с ресепшн и мы всё организуем.",
        ],
        inlineLink: "свяжитесь с ресепшн",
      },
      {
        iconKey: "plug",
        heading: "Переходники для розеток",
        paragraphs: [
          "Если вам нужен переходник для розетки, зайдите на ресепшн — мы предоставим его бесплатно.",
        ],
      },
      {
        iconKey: "printer",
        heading: "Печать документов",
        paragraphs: [
          "Если вам нужно распечатать посадочный талон, подтверждение бронирования или любой другой документ, зайдите на ресепшн — мы распечатаем для вас.",
        ],
      },
    ],
  },
};

export default function ServiciosPage({ onBack, onContacto, onClimati }: ServiciosPageProps) {
  const { lang } = useLanguage();
  const content = CONTENT[lang] ?? CONTENT["es"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{content.title}</PageTitle>

      <div className="flex flex-col gap-0">
        {content.sections.map((section, i) => {
          const IconComp = ICONS[section.iconKey];
          return (
            <div key={i} className="py-6" style={{ borderTop: "1px solid var(--border)" }}>
              {/* Heading con icono */}
              <div style={{ ...ps.iconRow, marginBottom: "0.75rem" }}>
                <div style={{ flexShrink: 0, color: "var(--gold)", opacity: 0.85, display: "flex", alignItems: "center" }}>
                  <IconComp size={18} strokeWidth={1.25} />
                </div>
                <h3 style={{ ...ps.itemTitle, margin: 0, fontSize: "1.15rem", letterSpacing: "0.01em" }}>
                  {section.heading}
                </h3>
              </div>

              {/* Párrafos */}
              <div className="flex flex-col gap-2 mb-3">
                {section.paragraphs.map((p, j) => {
                  if (section.inlineLink && p.includes(section.inlineLink)) {
                    const [before, after] = p.split(section.inlineLink);
                    return (
                      <p key={j} style={{ ...ps.muted, fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>
                        {before}
                        <button
                          onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); onContacto(); }}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "var(--gold)",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            textDecoration: "underline",
                            textUnderlineOffset: "2px",
                            cursor: "pointer",
                            display: "inline",
                          }}
                        >
                          {section.inlineLink}
                        </button>
                        {after}
                      </p>
                    );
                  }
                  return (
                    <p key={j} style={{ ...ps.muted, fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* CTA opcional */}
              {section.cta && (
                <button
                  onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); onContacto(); }}
                  className="flex items-center gap-2 rounded-sm cursor-pointer transition-all duration-200 mt-2"
                  style={{
                    ...ps.actionButton,
                    width: "auto",
                    padding: "0.6rem 1.1rem",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  <Phone size={13} strokeWidth={1.5} />
                  {section.cta}
                </button>
              )}
              {/* Enlace a página secundaria */}
              {section.ctaLink && section.linkLabel && (
                <button
                  onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); onClimati(); }}
                  className="cursor-pointer transition-colors duration-200 mt-1"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "var(--gold)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    cursor: "pointer",
                  }}
                >
                  {section.linkLabel} →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
