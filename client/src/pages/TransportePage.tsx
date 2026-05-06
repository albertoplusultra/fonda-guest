/**
 * TransportePage — Moverse por Madrid
 * Design: Deep black, gold accents, DM Sans body, Cormorant display
 * Sections: Metro · Bus · Cercanías · Taxi · Aeropuerto · Consejos de ahorro
 */
import { Train, Bus, Car, Plane, Bike, Banknote, MapPin, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { ps } from "@/lib/pageStyles";
import InfoCard from "@/components/InfoCard";
import SectionLabel from "@/components/SectionLabel";

interface TransportSection {
  icon: React.ReactNode;
  title: string;
  items: { label: string; value: string }[];
  note?: string;
}

interface TransporteContent {
  title: string;
  subtitle: string;
  fromHotel: string;
  sections: TransportSection[];
  tips: { title: string; items: string[] };
}

const ICON_SIZE = 18;
const ICON_STROKE = 1.25;

function buildContent(lang: string): TransporteContent {
  const content: Record<string, TransporteContent> = {
    es: {
      title: "Moverse por Madrid",
      subtitle: "Desde la Puerta del Sol tienes el mundo a tus pies",
      fromHotel: "Desde La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Metro",
          items: [
            { label: "Estación más cercana", value: "Sol (L1, L2, L3) — en la puerta del hotel" },
            { label: "Billete sencillo Zona A", value: "1,50 €" },
            { label: "Tarjeta de 10 viajes", value: "7,30 € (0,73 € / viaje)" },
            { label: "Tarjeta Multi (soporte)", value: "2,50 € (reutilizable 10 años)" },
            { label: "Horario", value: "6:00 – 1:30 h (último tren)" },
          ],
          note: "La Tarjeta Multi se compra en cualquier máquina del metro. Puedes elegir el idioma en pantalla. El horario de apertura de la parada de Sol puede verse afectado por eventos en la Plaza del Sol.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Cercanías RENFE",
          items: [
            { label: "Estación más cercana", value: "Sol (líneas C3, C4, C7, C8, C10) — en la puerta del hotel" },
            { label: "Tarifa mínima", value: "Desde 1,60 €" },
            { label: "Pago", value: "Tarjeta bancaria directamente en los tornos" },
            { label: "Estaciones clave", value: "Atocha y Chamartín" },
            { label: "Ideal para", value: "Cruzar la ciudad rápido o llegar a Atocha" },
          ],
          note: "Puedes pagar con tarjeta bancaria tocando en los tornos, sin necesidad de comprar billete.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Autobús EMT",
          items: [
            { label: "Billete sencillo", value: "1,50 € (pago con tarjeta en el bus)" },
            { label: "10 viajes (Metrobús)", value: "7,30 €" },
            { label: "Bus 0 (gratuito)", value: "Atocha → Gran Vía → Moncloa (eléctrico)" },
            { label: "Horario nocturno", value: "Búhos (N) operan toda la noche" },
          ],
          note: "El Bus 0 es completamente gratuito y pasa por Gran Vía. Busca el número 001 en el frontal.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Taxi y VTC",
          items: [
            { label: "Tarifa urbana", value: "10 – 20 € aprox." },
            { label: "Tarifa aeropuerto (fija)", value: "33 € hasta cualquier punto dentro de la M-30" },
            { label: "Tarifa nocturna / festivos", value: "Tarifa 2 (más cara)" },
            { label: "Apps", value: "MyTaxi (FreeNow), Uber, Cabify" },
          ],
          note: "Los taxis son blancos con franja roja diagonal. Uber y Cabify ofrecen precios similares.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Desde el Aeropuerto",
          items: [
            { label: "Cercanías T4 → Sol ★ Recomendado", value: "~30 min · 2,60 € (paga con tarjeta)" },
            { label: "Metro T1-T2-T3 → Sol", value: "~45 min · 5 € (billete + suplemento 3 €)" },
            { label: "Bus Exprés 203", value: "~35 min · 5 € · Para en Cibeles y Atocha" },
            { label: "Taxi (tarifa fija)", value: "33 € hasta La Fonda" },
          ],
          note: "La opción más cómoda: desde T4 toma Cercanías C1 o C10 hasta Chamartín, y allí cambia al Cercanías C4 — llegas directo a Sol sin metro y sin pasar por Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD y Patinetes",
          items: [
            { label: "BiciMAD (bici eléctrica)", value: "2 € activación + 0,04 €/min" },
            { label: "Dónde coger la bici", value: "Estación en Plaza del Sol y alrededores" },
            { label: "Patinetes", value: "Lime, Voi, Tier — disponibles en la zona" },
          ],
          note: "Ideal para distancias cortas. El Retiro y el Parque del Oeste tienen carriles bici.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Estaciones de tren",
          items: [
            { label: "Atocha (AVE y Media Distancia)", value: "Metro L1 desde Sol — 2 paradas (3 min)" },
            { label: "Chamartín (AVE y Larga Distancia)", value: "Metro L10 desde Sol — 6 paradas (12 min)" },
            { label: "Compra de billetes", value: "renfe.com, app RENFE o taquillas en la estación" },
            { label: "Equipaje", value: "Puedes dejar maletas en recepción y ir ligero" },
          ],
          note: "Atocha es la estación principal para trenes de alta velocidad al sur (Sevilla, Málaga, Valencia). Chamartín conecta con el norte (Barcelona, Bilbao, San Sebastián).",
        }
      ],
      tips: {
        title: "Nuestros consejos para ahorrar",
        items: [
          "Si vas a usar el metro más de 5 veces, la tarjeta de 10 viajes es siempre más barata que el billete sencillo.",
          "El Abono Turístico (1–7 días) incluye metro, bus, cercanías y el suplemento del aeropuerto. Desde 10 €/día. Se compra en las máquinas del metro (selecciona 'Tourist Pass') o en los puntos de información turística de la ciudad.",
          "El Bus 0 es completamente gratuito entre Atocha y Moncloa pasando por Gran Vía.",
          "Desde Sol puedes ir andando a muchos sitios: el Retiro (20 min), el Prado (15 min), el Rastro (15 min).",
          "La Tarjeta Multi cuesta 2,50 € pero dura 10 años. Guárdala para tu próxima visita.",
        ],
      },
    },
    en: {
      title: "Getting Around Madrid",
      subtitle: "From Puerta del Sol, the whole city is at your feet",
      fromHotel: "From La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Metro",
          items: [
            { label: "Nearest station", value: "Sol (L1, L2, L3) — 2 min walk" },
            { label: "Single ticket Zone A", value: "€1.50" },
            { label: "10-trip card", value: "€7.30 (€0.73 / trip)" },
            { label: "Tarjeta Multi (card)", value: "€2.50 (reusable for 10 years)" },
            { label: "Hours", value: "6:00 AM – 1:30 AM (last train)" },
          ],
          note: "Buy the Tarjeta Multi at any metro machine. You can select English on the screen. Opening hours of Sol station may be affected by events taking place in Plaza del Sol.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "EMT City Bus",
          items: [
            { label: "Single ticket", value: "€1.50 (pay by card on the bus)" },
            { label: "10-trip Metrobús", value: "€7.30" },
            { label: "Bus 0 (free)", value: "Atocha → Gran Vía → Moncloa (electric)" },
            { label: "Night service", value: "Búhos (N) night buses run all night" },
          ],
          note: "Bus 0 is completely free and goes along Gran Vía. Look for 001 on the front.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Cercanías (Commuter Train)",
          items: [
            { label: "Minimum fare", value: "From €1.60" },
            { label: "Payment", value: "Tap your bank card directly at the gates" },
            { label: "Key stations", value: "Atocha and Chamartín" },
            { label: "Best for", value: "Crossing the city fast or reaching Atocha" },
          ],
          note: "You can pay by tapping your bank card at the gates — no need to buy a ticket.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Taxi & Rideshare",
          items: [
            { label: "City fare", value: "Approx. €10 – €20" },
            { label: "Airport fixed fare", value: "€33 to any point inside the M-30 ring road" },
            { label: "Night / holiday rate", value: "Tariff 2 (higher)" },
            { label: "Apps", value: "MyTaxi (FreeNow), Uber, Cabify" },
          ],
          note: "Taxis are white with a red diagonal stripe. Uber and Cabify offer similar prices.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "From the Airport",
          items: [
            { label: "Cercanías T4 → Sol ★ Recommended", value: "~30 min · €2.60 (pay by card)" },
            { label: "Metro T1-T2-T3 → Sol", value: "~45 min · €5 (ticket + €3 supplement)" },
            { label: "Airport Express Bus 203", value: "~35 min · €5 · Stops at Cibeles & Atocha" },
            { label: "Taxi (fixed fare)", value: "€33 to La Fonda" },
          ],
          note: "Best option: from T4 take Cercanías C1 or C10 to Chamartín, then change to Cercanías C4 — direct to Sol with no metro, no Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD & Scooters",
          items: [
            { label: "BiciMAD (e-bike)", value: "€2 activation + €0.04/min" },
            { label: "Pick up", value: "Station at Plaza del Sol and surroundings" },
            { label: "Scooters", value: "Lime, Voi, Tier — available in the area" },
          ],
          note: "Great for short distances. El Retiro and Parque del Oeste have dedicated bike lanes.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Train Stations",
          items: [
            { label: "Atocha (AVE & Regional trains)", value: "Metro L1 from Sol — 2 stops (3 min)" },
            { label: "Chamartín (AVE & Long Distance)", value: "Metro L10 from Sol — 6 stops (12 min)" },
            { label: "Tickets", value: "renfe.com, RENFE app or ticket offices at the station" },
            { label: "Luggage", value: "Leave your bags at reception and travel light" },
          ],
          note: "Atocha is the main station for high-speed trains to the south (Seville, Málaga, Valencia). Chamartín connects to the north (Barcelona, Bilbao, San Sebastián).",
        }
      ],
      tips: {
        title: "Our money-saving tips",
        items: [
          "If you'll use the metro more than 5 times, the 10-trip card is always cheaper than single tickets.",
          "The Tourist Pass (1–7 days) covers metro, bus, Cercanías and the airport supplement. From €10/day. Buy it at any metro machine (select 'Tourist Pass') or at city tourist information offices.",
          "Bus 0 is completely free between Atocha and Moncloa via Gran Vía.",
          "From Sol you can walk to many places: Retiro (20 min), Prado (15 min), El Rastro (15 min).",
          "The Tarjeta Multi costs €2.50 but lasts 10 years. Keep it for your next visit.",
        ],
      },
    },
    fr: {
      title: "Se déplacer à Madrid",
      subtitle: "Depuis la Puerta del Sol, toute la ville est à vos pieds",
      fromHotel: "Depuis La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Métro",
          items: [
            { label: "Station la plus proche", value: "Sol (L1, L2, L3) — 2 min à pied" },
            { label: "Ticket simple Zone A", value: "1,50 €" },
            { label: "Carnet 10 voyages", value: "7,30 € (0,73 € / trajet)" },
            { label: "Tarjeta Multi (carte)", value: "2,50 € (réutilisable 10 ans)" },
            { label: "Horaires", value: "6h00 – 1h30 (dernier train)" },
          ],
          note: "Achetez la Tarjeta Multi dans n'importe quelle machine du métro. Vous pouvez choisir le français à l'écran.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Bus EMT",
          items: [
            { label: "Ticket simple", value: "1,50 € (paiement par carte dans le bus)" },
            { label: "Carnet 10 voyages", value: "7,30 €" },
            { label: "Bus 0 (gratuit)", value: "Atocha → Gran Vía → Moncloa (électrique)" },
            { label: "Service nocturne", value: "Bus Búhos (N) toute la nuit" },
          ],
          note: "Le Bus 0 est entièrement gratuit et passe par Gran Vía. Cherchez le numéro 001 à l'avant.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Cercanías (Train de banlieue)",
          items: [
            { label: "Tarif minimum", value: "À partir de 1,60 €" },
            { label: "Paiement", value: "Carte bancaire directement aux portiques" },
            { label: "Gares principales", value: "Atocha et Chamartín" },
            { label: "Idéal pour", value: "Traverser la ville rapidement" },
          ],
          note: "Payez en touchant votre carte bancaire aux portiques — pas besoin d'acheter un billet.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Taxi et VTC",
          items: [
            { label: "Tarif urbain", value: "Environ 10 – 20 €" },
            { label: "Aéroport (tarif fixe)", value: "33 € jusqu'à n'importe quel point dans la M-30" },
            { label: "Tarif nuit / jours fériés", value: "Tarif 2 (plus cher)" },
            { label: "Applications", value: "FreeNow, Uber, Cabify" },
          ],
          note: "Les taxis sont blancs avec une bande rouge diagonale. Uber et Cabify proposent des prix similaires.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Depuis l'Aéroport",
          items: [
            { label: "Métro T1-T2-T3 → Sol", value: "~45 min · 5 € (billet + supplément 3 €)" },
            { label: "Cercanías T4 → Sol", value: "~30 min · 2,60 € (carte bancaire)" },
            { label: "Bus Express 203", value: "~35 min · 5 € · Arrêts Cibeles et Atocha" },
            { label: "Taxi (tarif fixe)", value: "33 € jusqu'à La Fonda" },
          ],
          note: "Depuis T4, prenez le Cercanías C1 ou C10 jusqu'à Chamartín, puis changez pour le métro L10 ou L1 — direct jusqu'à Sol sans passer par Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD et Trottinettes",
          items: [
            { label: "BiciMAD (vélo électrique)", value: "2 € activation + 0,04 €/min" },
            { label: "Prise en charge", value: "Station Plaza del Sol et environs" },
            { label: "Trottinettes", value: "Lime, Voi, Tier — disponibles dans la zone" },
          ],
          note: "Idéal pour les courtes distances. El Retiro et le Parque del Oeste ont des pistes cyclables.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Gares ferroviaires",
          items: [
            { label: "Atocha (AVE et trains régionaux)", value: "Métro L1 depuis Sol — 2 arrêts (3 min)" },
            { label: "Chamartín (AVE et longue distance)", value: "Métro L10 depuis Sol — 6 arrêts (12 min)" },
            { label: "Billets", value: "renfe.com, app RENFE ou guichets en gare" },
            { label: "Bagages", value: "Laissez vos valises à la réception et voyagez léger" },
          ],
          note: "Atocha est la gare principale pour les TGV vers le sud (Séville, Málaga, Valence). Chamartín dessert le nord (Barcelone, Bilbao, Saint-Sébastien).",
        }
      ],
      tips: {
        title: "Nos conseils pour économiser",
        items: [
          "Si vous utilisez le métro plus de 5 fois, le carnet 10 voyages est toujours moins cher.",
          "L'Abono Turístico (1 à 7 jours) couvre métro, bus, Cercanías et le supplément aéroport. À partir de 10 €/jour. Achetez-le dans les machines du métro (sélectionnez 'Tourist Pass') ou dans les offices de tourisme.",
          "Le Bus 0 est gratuit entre Atocha et Moncloa via Gran Vía.",
          "Depuis Sol, vous pouvez marcher jusqu'à de nombreux endroits : Retiro (20 min), Prado (15 min).",
          "La Tarjeta Multi coûte 2,50 € mais dure 10 ans. Gardez-la pour votre prochaine visite.",
        ],
      },
    },
    de: {
      title: "Durch Madrid bewegen",
      subtitle: "Von der Puerta del Sol aus liegt die ganze Stadt zu Ihren Füßen",
      fromHotel: "Von La Fonda aus",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "U-Bahn (Metro)",
          items: [
            { label: "Nächste Station", value: "Sol (L1, L2, L3) — 2 Min. zu Fuß" },
            { label: "Einzelticket Zone A", value: "1,50 €" },
            { label: "10-Fahrten-Karte", value: "7,30 € (0,73 € / Fahrt)" },
            { label: "Tarjeta Multi (Karte)", value: "2,50 € (10 Jahre wiederverwendbar)" },
            { label: "Betriebszeiten", value: "6:00 – 1:30 Uhr (letzter Zug)" },
          ],
          note: "Kaufen Sie die Tarjeta Multi an jedem U-Bahn-Automaten. Sie können Deutsch als Sprache wählen.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Stadtbus EMT",
          items: [
            { label: "Einzelticket", value: "1,50 € (Kartenzahlung im Bus)" },
            { label: "10-Fahrten-Karte", value: "7,30 €" },
            { label: "Bus 0 (kostenlos)", value: "Atocha → Gran Vía → Moncloa (elektrisch)" },
            { label: "Nachtbetrieb", value: "Búhos (N) Nachtbusse die ganze Nacht" },
          ],
          note: "Bus 0 ist völlig kostenlos und fährt durch die Gran Vía. Achten Sie auf die Nummer 001 vorne.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Cercanías (S-Bahn)",
          items: [
            { label: "Mindestpreis", value: "Ab 1,60 €" },
            { label: "Zahlung", value: "Bankkarte direkt an den Drehkreuzen" },
            { label: "Wichtige Bahnhöfe", value: "Atocha und Chamartín" },
            { label: "Ideal für", value: "Schnelles Durchqueren der Stadt" },
          ],
          note: "Sie können mit Ihrer Bankkarte an den Drehkreuzen bezahlen — kein Ticket kaufen nötig.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Taxi und Ridesharing",
          items: [
            { label: "Stadtfahrt", value: "Ca. 10 – 20 €" },
            { label: "Flughafen (Festpreis)", value: "33 € bis zu jedem Punkt innerhalb der M-30" },
            { label: "Nacht- / Feiertagstarif", value: "Tarif 2 (teurer)" },
            { label: "Apps", value: "FreeNow, Uber, Cabify" },
          ],
          note: "Taxis sind weiß mit rotem Diagonalstreifen. Uber und Cabify bieten ähnliche Preise.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Vom Flughafen",
          items: [
            { label: "Cercanías T4 → Sol ★ Empfohlen", value: "~30 Min. · 2,60 € (Kartenzahlung)" },
            { label: "Metro T1-T2-T3 → Sol", value: "~45 Min. · 5 € (Ticket + 3 € Zuschlag)" },
            { label: "Flughafenbus 203", value: "~35 Min. · 5 € · Hält an Cibeles & Atocha" },
            { label: "Taxi (Festpreis)", value: "33 € bis La Fonda" },
          ],
          note: "Beste Option: Von T4 nehmen Sie die Cercanías C1 oder C10 bis Chamartín, dann wechseln Sie zu Cercanías C4 — direkt nach Sol, ohne U-Bahn und ohne Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD und Scooter",
          items: [
            { label: "BiciMAD (E-Bike)", value: "2 € Aktivierung + 0,04 €/Min." },
            { label: "Abholung", value: "Station am Plaza del Sol und Umgebung" },
            { label: "Scooter", value: "Lime, Voi, Tier — in der Gegend verfügbar" },
          ],
          note: "Ideal für kurze Strecken. El Retiro und der Parque del Oeste haben Fahrradwege.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Bahnhöfe",
          items: [
            { label: "Atocha (AVE & Regionalzüge)", value: "Metro L1 von Sol — 2 Stationen (3 Min.)" },
            { label: "Chamartín (AVE & Fernzüge)", value: "Metro L10 von Sol — 6 Stationen (12 Min.)" },
            { label: "Tickets", value: "renfe.com, RENFE-App oder Schalter im Bahnhof" },
            { label: "Gepäck", value: "Koffer an der Rezeption lassen und leicht reisen" },
          ],
          note: "Atocha ist der Hauptbahnhof für Hochgeschwindigkeitszüge Richtung Süden (Sevilla, Málaga, Valencia). Chamartín verbindet den Norden (Barcelona, Bilbao, San Sebastián).",
        }
      ],
      tips: {
        title: "Unsere Spartipps",
        items: [
          "Wenn Sie die U-Bahn mehr als 5 Mal nutzen, ist die 10-Fahrten-Karte immer günstiger.",
          "Der Touristenpass (1–7 Tage) umfasst Metro, Bus, Cercanías und den Flughafenzuschlag. Ab 10 €/Tag. Erhältlich an jedem U-Bahn-Automaten ('Tourist Pass' wählen) oder in den Touristeninformationsbüros.",
          "Bus 0 ist kostenlos zwischen Atocha und Moncloa über die Gran Vía.",
          "Von Sol aus können Sie zu vielen Orten laufen: Retiro (20 min), Prado (15 min).",
          "Die Tarjeta Multi kostet 2,50 € und hält 10 Jahre. Behalten Sie sie für Ihren nächsten Besuch.",
        ],
      },
    },
    it: {
      title: "Muoversi a Madrid",
      subtitle: "Dalla Puerta del Sol, tutta la città è ai tuoi piedi",
      fromHotel: "Da La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Metro",
          items: [
            { label: "Stazione più vicina", value: "Sol (L1, L2, L3) — 2 min a piedi" },
            { label: "Biglietto singolo Zona A", value: "1,50 €" },
            { label: "Carnet 10 viaggi", value: "7,30 € (0,73 € / viaggio)" },
            { label: "Tarjeta Multi (tessera)", value: "2,50 € (riutilizzabile 10 anni)" },
            { label: "Orari", value: "6:00 – 1:30 (ultimo treno)" },
          ],
          note: "Acquista la Tarjeta Multi in qualsiasi macchinetta della metro. Puoi scegliere l'italiano.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Autobus EMT",
          items: [
            { label: "Biglietto singolo", value: "1,50 € (pagamento con carta sull'autobus)" },
            { label: "Carnet 10 viaggi", value: "7,30 €" },
            { label: "Bus 0 (gratuito)", value: "Atocha → Gran Vía → Moncloa (elettrico)" },
            { label: "Servizio notturno", value: "Bus Búhos (N) tutta la notte" },
          ],
          note: "Il Bus 0 è completamente gratuito e percorre la Gran Vía. Cerca il numero 001 davanti.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Cercanías (Treno suburbano)",
          items: [
            { label: "Tariffa minima", value: "Da 1,60 €" },
            { label: "Pagamento", value: "Carta bancaria direttamente ai tornelli" },
            { label: "Stazioni principali", value: "Atocha e Chamartín" },
            { label: "Ideale per", value: "Attraversare la città velocemente" },
          ],
          note: "Puoi pagare toccando la tua carta bancaria ai tornelli — senza bisogno di comprare biglietti.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Taxi e VTC",
          items: [
            { label: "Tariffa urbana", value: "Circa 10 – 20 €" },
            { label: "Aeroporto (tariffa fissa)", value: "33 € fino a qualsiasi punto dentro la M-30" },
            { label: "Tariffa notturna / festivi", value: "Tariffa 2 (più cara)" },
            { label: "App", value: "FreeNow, Uber, Cabify" },
          ],
          note: "I taxi sono bianchi con una striscia rossa diagonale. Uber e Cabify offrono prezzi simili.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Dall'Aeroporto",
          items: [
            { label: "Metro T1-T2-T3 → Sol", value: "~45 min · 5 € (biglietto + supplemento 3 €)" },
            { label: "Cercanías T4 → Sol", value: "~30 min · 2,60 € (carta bancaria)" },
            { label: "Bus Express 203", value: "~35 min · 5 € · Fermate Cibeles e Atocha" },
            { label: "Taxi (tariffa fissa)", value: "33 € fino a La Fonda" },
          ],
          note: "Da T4, prendi il Cercanías C1 o C10 fino a Chamartín, poi cambia con la metro L10 o L1 — diretto a Sol senza passare per Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD e Monopattini",
          items: [
            { label: "BiciMAD (bici elettrica)", value: "2 € attivazione + 0,04 €/min" },
            { label: "Ritiro", value: "Stazione a Plaza del Sol e dintorni" },
            { label: "Monopattini", value: "Lime, Voi, Tier — disponibili nella zona" },
          ],
          note: "Ideale per brevi distanze. El Retiro e il Parque del Oeste hanno piste ciclabili.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Stazioni ferroviarie",
          items: [
            { label: "Atocha (AVE e treni regionali)", value: "Metro L1 da Sol — 2 fermate (3 min)" },
            { label: "Chamartín (AVE e lunga percorrenza)", value: "Metro L10 da Sol — 6 fermate (12 min)" },
            { label: "Biglietti", value: "renfe.com, app RENFE o biglietterie in stazione" },
            { label: "Bagagli", value: "Lascia le valigie alla reception e viaggia leggero" },
          ],
          note: "Atocha è la stazione principale per i treni ad alta velocità verso sud (Siviglia, Málaga, Valencia). Chamartín collega il nord (Barcellona, Bilbao, San Sebastián).",
        }
      ],
      tips: {
        title: "I nostri consigli per risparmiare",
        items: [
          "Se usi la metro più di 5 volte, il carnet 10 viaggi è sempre più conveniente del biglietto singolo.",
          "L'Abono Turístico (1–7 giorni) copre metro, bus, Cercanías e il supplemento aeroporto. Da 10 €/giorno. Acquistalo in qualsiasi macchinetta della metro (seleziona 'Tourist Pass') o negli uffici di informazione turistica.",
          "Il Bus 0 è gratuito tra Atocha e Moncloa passando per la Gran Vía.",
          "Da Sol puoi camminare fino a molti posti: Retiro (20 min), Prado (15 min), El Rastro (15 min).",
          "La Tarjeta Multi costa 2,50 € ma dura 10 anni. Conservala per la prossima visita.",
        ],
      },
    },
    pt: {
      title: "Mover-se por Madrid",
      subtitle: "Da Puerta del Sol, toda a cidade está aos seus pés",
      fromHotel: "De La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Metro",
          items: [
            { label: "Estação mais próxima", value: "Sol (L1, L2, L3) — 2 min a pé" },
            { label: "Bilhete simples Zona A", value: "1,50 €" },
            { label: "Cartão 10 viagens", value: "7,30 € (0,73 € / viagem)" },
            { label: "Tarjeta Multi (cartão)", value: "2,50 € (reutilizável 10 anos)" },
            { label: "Horário", value: "6:00 – 1:30 (último comboio)" },
          ],
          note: "Compre a Tarjeta Multi em qualquer máquina do metro. Pode escolher o idioma no ecrã.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Autocarro EMT",
          items: [
            { label: "Bilhete simples", value: "1,50 € (pagamento com cartão no autocarro)" },
            { label: "10 viagens Metrobús", value: "7,30 €" },
            { label: "Bus 0 (gratuito)", value: "Atocha → Gran Vía → Moncloa (elétrico)" },
            { label: "Serviço noturno", value: "Búhos (N) toda a noite" },
          ],
          note: "O Bus 0 é completamente gratuito e percorre a Gran Vía. Procure o número 001 na frente.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Cercanías (Comboio suburbano)",
          items: [
            { label: "Tarifa mínima", value: "A partir de 1,60 €" },
            { label: "Pagamento", value: "Cartão bancário diretamente nas catracas" },
            { label: "Estações principais", value: "Atocha e Chamartín" },
            { label: "Ideal para", value: "Atravessar a cidade rapidamente" },
          ],
          note: "Pode pagar tocando o seu cartão bancário nas catracas — sem necessidade de comprar bilhete.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Táxi e VTC",
          items: [
            { label: "Tarifa urbana", value: "Aprox. 10 – 20 €" },
            { label: "Aeroporto (tarifa fixa)", value: "33 € até qualquer ponto dentro da M-30" },
            { label: "Tarifa noturna / feriados", value: "Tarifa 2 (mais cara)" },
            { label: "Apps", value: "FreeNow, Uber, Cabify" },
          ],
          note: "Os táxis são brancos com uma faixa vermelha diagonal. Uber e Cabify têm preços semelhantes.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Do Aeroporto",
          items: [
            { label: "Metro T1-T2-T3 → Sol", value: "~45 min · 5 € (bilhete + suplemento 3 €)" },
            { label: "Cercanías T4 → Sol", value: "~30 min · 2,60 € (cartão bancário)" },
            { label: "Bus Expresso 203", value: "~35 min · 5 € · Paragens Cibeles e Atocha" },
            { label: "Táxi (tarifa fixa)", value: "33 € até La Fonda" },
          ],
          note: "De T4, apanhe o Cercanías C1 ou C10 até Chamartín e mude para o metro L10 ou L1 — direto a Sol sem passar por Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD e Trotinetes",
          items: [
            { label: "BiciMAD (bicicleta elétrica)", value: "2 € ativação + 0,04 €/min" },
            { label: "Levantamento", value: "Estação na Plaza del Sol e arredores" },
            { label: "Trotinetes", value: "Lime, Voi, Tier — disponíveis na zona" },
          ],
          note: "Ideal para curtas distâncias. El Retiro e o Parque del Oeste têm ciclovias.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Estações de comboio",
          items: [
            { label: "Atocha (AVE e regionais)", value: "Metro L1 de Sol — 2 paragens (3 min)" },
            { label: "Chamartín (AVE e longa distância)", value: "Metro L10 de Sol — 6 paragens (12 min)" },
            { label: "Bilhetes", value: "renfe.com, app RENFE ou bilheteiras na estação" },
            { label: "Bagagem", value: "Deixe as malas na receção e viaje leve" },
          ],
          note: "Atocha é a estação principal para comboios de alta velocidade para o sul (Sevilha, Málaga, Valência). Chamartín liga ao norte (Barcelona, Bilbau, San Sebastián).",
        }
      ],
      tips: {
        title: "As nossas dicas para poupar",
        items: [
          "Se vai usar o metro mais de 5 vezes, o cartão de 10 viagens é sempre mais barato.",
          "O Abono Turístico (1–7 dias) inclui metro, autocarro, Cercanías e o suplemento do aeroporto. A partir de 10 €/dia. Compre nas máquinas do metro (selecione 'Tourist Pass') ou nos postos de informação turística.",
          "O Bus 0 é gratuito entre Atocha e Moncloa pela Gran Vía.",
          "De Sol pode caminhar até muitos sítios: Retiro (20 min), Prado (15 min), El Rastro (15 min).",
          "A Tarjeta Multi custa 2,50 € mas dura 10 anos. Guarde-a para a próxima visita.",
        ],
      },
    },
    zh: {
      title: "马德里交通指南",
      subtitle: "从太阳门广场出发，整个城市尽在脚下",
      fromHotel: "从La Fonda出发",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "地铁",
          items: [
            { label: "最近的地铁站", value: "Sol站（L1、L2、L3）— 步行2分钟" },
            { label: "A区单程票", value: "1.50 €" },
            { label: "10次卡", value: "7.30 €（每次0.73 €）" },
            { label: "Tarjeta Multi（交通卡）", value: "2.50 €（可用10年）" },
            { label: "运营时间", value: "6:00 – 1:30（末班车）" },
          ],
          note: "在任何地铁自动售票机购买Tarjeta Multi，可选择中文界面。",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "公共汽车",
          items: [
            { label: "单程票", value: "1.50 €（车上刷卡）" },
            { label: "10次卡", value: "7.30 €" },
            { label: "0路公交（免费）", value: "Atocha → 格兰大道 → Moncloa（电动）" },
            { label: "夜间服务", value: "Búhos（N）夜班车通宵运营" },
          ],
          note: "0路公交完全免费，途经格兰大道。车头显示001。",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "近郊铁路（Cercanías）",
          items: [
            { label: "最低票价", value: "1.60 €起" },
            { label: "支付方式", value: "在闸机口直接刷银行卡" },
            { label: "主要车站", value: "Atocha和Chamartín" },
            { label: "最适合", value: "快速穿越城市" },
          ],
          note: "您可以在闸机口刷银行卡支付，无需购票。",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "出租车和网约车",
          items: [
            { label: "市内费用", value: "约10 – 20 €" },
            { label: "机场固定费用", value: "33 € 到M-30环路内任何地点" },
            { label: "夜间/节假日费率", value: "费率2（更高）" },
            { label: "应用", value: "FreeNow, Uber, Cabify" },
          ],
          note: "出租车为白色，带有红色斜条纹。Uber和Cabify价格相似。",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "从机场出发",
          items: [
            { label: "地铁 T1-T2-T3 → Sol", value: "约45分钟 · 5 €（车票+3 €附加费）" },
            { label: "近郊铁路 T4 → Sol", value: "约30分钟 · 2.60 €（刷银行卡）" },
            { label: "机场快线 203", value: "约35分钟 · 5 € · 在Cibeles和Atocha停靠" },
            { label: "出租车（固定费用）", value: "33 € 到La Fonda" },
          ],
          note: "从T4航站楼，乘坐Cercanías C1或C10到Chamartín，然后换乘地铁L10或L1 — 直达Sol，无需经过Atocha。",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD和滑板车",
          items: [
            { label: "BiciMAD（电动自行车）", value: "2 €激活费 + 0.04 €/分钟" },
            { label: "取车点", value: "太阳门广场及周边站点" },
            { label: "滑板车", value: "Lime, Voi, Tier — 该区域可用" },
          ],
          note: "适合短途出行。丽池公园和西园有自行车道。",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "火车站",
          items: [
            { label: "Atocha（AVE和地区列车）", value: "从Sol乘地铁L1 — 2站（3分钟）" },
            { label: "Chamartín（AVE和长途列车）", value: "从Sol乘地铁L10 — 6站（12分钟）" },
            { label: "购票", value: "renfe.com、RENFE应用或车站售票处" },
            { label: "行李", value: "可将行李寄存在前台，轻装出行" },
          ],
          note: "Atocha是前往南部（塞维利亚、马拉加、瓦伦西亚）的高速列车主站。Chamartín连接北部（巴塞罗那、毕尔巴鄂、圣塞瓦斯蒂安）。",
        }
      ],
      tips: {
        title: "省钱小贴士",
        items: [
          "如果乘坐地铁超过5次，10次卡总是比单程票便宜。",
          "游客通票（1-7天）包括地铁、公交、近郊铁路和机场附加费。每天10欧元起。可在任何地铁自动售票机（选择'Tourist Pass'）或市旅游信息中心购买。",
          "0路公交在Atocha和Moncloa之间经格兰大道完全免费。",
          "从Sol可以步行到许多地方：丽池公园（20分钟）、普拉多博物馆（15分钟）、El Rastro市场（15分钟）。",
          "Tarjeta Multi交通卡售价2.50欧元，有效期10年。请保留以备下次访问使用。",
        ],
      },
    },
  };
  return content[lang] || content.es;
}

interface TransportePageProps {
  onBack: () => void;
}

export default function TransportePage({ onBack }: TransportePageProps) {
  const { lang } = useLanguage();
  const c = buildContent(lang);

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{c.title}</PageTitle>
      <p style={{ ...ps.muted, marginBottom: "1rem" }}>{c.subtitle}</p>

      {c.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>{section.title}</SectionLabel>
          <InfoCard>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <p style={{ ...ps.body, margin: 0, fontWeight: 500 }}>{item.label}</p>
                  <p style={{ ...ps.muted, margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
            {section.note && (
              <>
                <div style={{ ...ps.goldLine, margin: "1.25rem 0" }} />
                <p style={{ ...ps.muted, margin: 0, fontStyle: "italic" }}>{section.note}</p>
              </>
            )}
          </InfoCard>
        </div>
      ))}

      <div style={{ marginBottom: "2.5rem" }}>
        <SectionLabel>{c.tips.title}</SectionLabel>
        <InfoCard>
          <ul style={{ ...ps.body, margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {c.tips.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </InfoCard>
      </div>

    </PageLayout>
  );
}
