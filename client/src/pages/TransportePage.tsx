/**
 * TransportePage — Moverse por Madrid
 * Design: Deep black, gold accents, DM Sans body, Cormorant display
 * Sections: Metro · Bus · Cercanías · Taxi · Aeropuerto · Consejos de ahorro
 */
import { Train, Bus, Car, Plane, Bike, Banknote, MapPin, Smartphone } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

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
  apps: { title: string; items: string[] };
}

const GOLD = "var(--gold)";
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
          note: "La Tarjeta Multi se compra en cualquier máquina del metro. Puedes elegir el idioma en pantalla.",
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
      apps: {
        title: "Apps útiles",
        items: ["Citymapper — rutas en tiempo real", "Moovit — horarios y paradas", "Google Maps — funciona perfectamente en Madrid", "FreeNow (MyTaxi) — taxis oficiales"],
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
          note: "Buy the Tarjeta Multi at any metro machine. You can select English on the screen.",
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
            { label: "Luggage", value: "Leave bags at reception and travel light" },
          ],
          note: "Atocha is the main station for high-speed trains south (Seville, Málaga, Valencia). Chamartín connects north (Barcelona, Bilbao, San Sebastián).",
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
      apps: {
        title: "Useful apps",
        items: ["Citymapper — real-time routes", "Moovit — timetables and stops", "Google Maps — works perfectly in Madrid", "FreeNow (MyTaxi) — official taxis"],
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
      apps: {
        title: "Applications utiles",
        items: ["Citymapper — itinéraires en temps réel", "Moovit — horaires et arrêts", "Google Maps — fonctionne parfaitement à Madrid", "FreeNow — taxis officiels"],
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
          "Von Sol aus können Sie zu vielen Orten laufen: Retiro (20 Min.), Prado (15 Min.).",
          "Die Tarjeta Multi kostet 2,50 € und hält 10 Jahre. Behalten Sie sie für Ihren nächsten Besuch.",
        ],
      },
      apps: {
        title: "Nützliche Apps",
        items: ["Citymapper — Echtzeit-Routen", "Moovit — Fahrpläne und Haltestellen", "Google Maps — funktioniert perfekt in Madrid", "FreeNow — offizielle Taxis"],
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
          note: "Da T4, prendi il Cercanías C1 o C10 fino a Chamartín, poi cambia al metro L10 o L1 — diretto a Sol senza passare per Atocha.",
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
      apps: {
        title: "App utili",
        items: ["Citymapper — percorsi in tempo reale", "Moovit — orari e fermate", "Google Maps — funziona perfettamente a Madrid", "FreeNow — taxi ufficiali"],
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
      apps: {
        title: "Apps úteis",
        items: ["Citymapper — rotas em tempo real", "Moovit — horários e paragens", "Google Maps — funciona perfeitamente em Madrid", "FreeNow — táxis oficiais"],
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
            { label: "最低票价", value: "从1.60 €起" },
            { label: "付款方式", value: "银行卡直接在闸机刷卡" },
            { label: "主要车站", value: "Atocha站和Chamartín站" },
            { label: "适合", value: "快速穿越城市" },
          ],
          note: "可直接用银行卡在闸机刷卡，无需购票。",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "出租车和网约车",
          items: [
            { label: "市区费用", value: "约10 – 20 €" },
            { label: "机场固定价格", value: "33 €（M-30环路内任意地点）" },
            { label: "夜间/节假日费率", value: "费率2（较贵）" },
            { label: "应用程序", value: "FreeNow、Uber、Cabify" },
          ],
          note: "出租车为白色车身配红色斜条纹。Uber和Cabify价格相近。",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "从机场出发",
          items: [
            { label: "地铁T1-T2-T3 → Sol", value: "约45分钟 · 5 €（票价+3 €附加费）" },
            { label: "近郊铁路T4 → Sol", value: "约30分钟 · 2.60 €（银行卡）" },
            { label: "机场快线203路", value: "约35分钟 · 5 €，停靠Cibeles和Atocha" },
            { label: "出租车（固定价格）", value: "33 €至La Fonda" },
          ],
          note: "从T4出发，乘Cercanías C1或C10至Chamartín，再换乘地铁L10或L1直达Sol，无需经过Atocha。",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD和电动滑板车",
          items: [
            { label: "BiciMAD（电动自行车）", value: "2 €激活 + 0.04 €/分钟" },
            { label: "取车地点", value: "太阳门广场及周边站点" },
            { label: "电动滑板车", value: "Lime、Voi、Tier — 该区域均有" },
          ],
          note: "适合短途出行。丽池公园和西部公园有专用自行车道。",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "火车站",
          items: [
            { label: "Atocha站（高铁和区域列车）", value: "从Sol乘地铁L1 — 2站（3分钟）" },
            { label: "Chamartín站（高铁和长途列车）", value: "从Sol乘地铁L10 — 6站（12分钟）" },
            { label: "购票", value: "renfe.com、RENFE应用程序或车站售票处" },
            { label: "行李", value: "可将行李寄存在前台，轻装出行" },
          ],
          note: "Atocha是前往南部（塞维利亚、马拉加、瓦伦西亚）高铁的主要车站。Chamartín连接北部（巴塞罗那、毕尔巴鄂、圣塞巴斯蒂安）。",
        }
      ],
      tips: {
        title: "我们的省钱建议",
        items: [
          "如果地铁乘坐超过5次，10次卡总比单程票划算。",
          "旅游通票（1至7天）涵盖地铁、公交、近郊铁路及机场附加费。每天从10 €起。可在任何地铁自动售票机购买（选择'Tourist Pass'）或在城市旅游信息中心购买。",
          "0路公交在Atocha和Moncloa之间（途经格兰大道）完全免费。",
          "从Sol步行可达许多景点：丽池公园（20分钟）、普拉多博物馆（15分钟）。",
          "Tarjeta Multi只需2.50 €，可用10年。下次来马德里时还能用。",
        ],
      },
      apps: {
        title: "实用应用程序",
        items: ["Citymapper — 实时路线", "Moovit — 时刻表和站点", "Google Maps — 在马德里完美运行", "FreeNow — 官方出租车"],
      },
    },
    ja: {
      title: "マドリードの移動ガイド",
      subtitle: "プエルタ・デル・ソルから、街全体があなたの足元に",
      fromHotel: "La Fondaから",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "地下鉄（メトロ）",
          items: [
            { label: "最寄り駅", value: "Sol駅（L1・L2・L3）— 徒歩2分" },
            { label: "Aゾーン片道", value: "1.50 €" },
            { label: "10回カード", value: "7.30 €（1回0.73 €）" },
            { label: "Tarjeta Multi（カード）", value: "2.50 €（10年間再利用可）" },
            { label: "運行時間", value: "6:00 – 1:30（終電）" },
          ],
          note: "Tarjeta Multiはどの地下鉄の券売機でも購入できます。日本語を選択できます。",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "市バス（EMT）",
          items: [
            { label: "片道チケット", value: "1.50 €（バス内でカード払い可）" },
            { label: "10回カード", value: "7.30 €" },
            { label: "0番バス（無料）", value: "Atocha → グラン・ビア → Moncloa（電動）" },
            { label: "夜間サービス", value: "Búhos（N）夜行バスが終夜運行" },
          ],
          note: "0番バスは完全無料でグラン・ビアを通ります。前面に001と表示されています。",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "近郊列車（Cercanías）",
          items: [
            { label: "最低運賃", value: "1.60 €から" },
            { label: "支払い方法", value: "改札でデビットカードをタッチ" },
            { label: "主要駅", value: "AtocharとChamartín" },
            { label: "おすすめ用途", value: "市内を素早く移動する場合" },
          ],
          note: "改札でデビットカードをタッチするだけで乗車できます。切符購入不要。",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "タクシーと配車サービス",
          items: [
            { label: "市内料金", value: "約10 – 20 €" },
            { label: "空港（固定料金）", value: "M-30環状道路内のどこへでも33 €" },
            { label: "夜間・祝日料金", value: "料金2（高め）" },
            { label: "アプリ", value: "FreeNow、Uber、Cabify" },
          ],
          note: "タクシーは白地に赤い斜めストライプ。UberとCabifyも同程度の料金です。",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "空港から",
          items: [
            { label: "地下鉄T1-T2-T3 → Sol", value: "約45分 · 5 €（チケット+3 €追加料金）" },
            { label: "Cercanías T4 → Sol", value: "約30分 · 2.60 €（カード払い）" },
            { label: "空港急行バス203", value: "約35分 · 5 €、CibelesとAtocha停車" },
            { label: "タクシー（固定料金）", value: "La Fondaまで33 €" },
          ],
          note: "T4からはCercanías C1またはC10線でChamartínへ、その後地下鉄L10またはL1でSolへ直行。Atochaを経由せずに行けます。",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMADと電動スクーター",
          items: [
            { label: "BiciMAD（電動自転車）", value: "2 €アクティベーション + 0.04 €/分" },
            { label: "乗り場", value: "プエルタ・デル・ソル広場周辺のステーション" },
            { label: "電動スクーター", value: "Lime、Voi、Tier — エリア内で利用可" },
          ],
          note: "短距離移動に最適。レティーロ公園と西部公園には自転車専用レーンがあります。",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "鉄道駅",
          items: [
            { label: "Atocha駅（AVEと地域列車）", value: "SolからメトロL1 — 2駅（3分）" },
            { label: "Chamartín駅（AVEと長距離列車）", value: "SolからメトロL10 — 6駅（12分）" },
            { label: "チケット", value: "renfe.com、RENFEアプリ、または駅の窓口" },
            { label: "荷物", value: "フロントに荷物を預けて身軽に移動" },
          ],
          note: "Atochaは南部（セビリア、マラガ、バレンシア）への高速鉄道の主要駅です。Chamartínは北部（バルセロナ、ビルバオ、サン・セバスティアン）に接続します。",
        }
      ],
      tips: {
        title: "節約のためのアドバイス",
        items: [
          "地下鉄を5回以上利用する場合、10回カードは常に片道チケットより安くなります。",
          "観光パス（1〜7日間）は地下鉄・バス・Cercanías・空港追加料金を含みます。1日10 €から。地下鉄の券売機（'Tourist Pass'を選択）または観光案内所で購入できます。",
          "0番バスはAtocha〜Moncloa間（グラン・ビア経由）が完全無料です。",
          "Solから歩いて行ける場所が多い：レティーロ公園（20分）、プラド美術館（15分）。",
          "Tarjeta Multiは2.50 €で10年間使えます。次回の訪問のために保管しておきましょう。",
        ],
      },
      apps: {
        title: "便利なアプリ",
        items: ["Citymapper — リアルタイムルート", "Moovit — 時刻表と停留所", "Google Maps — マドリードで完璧に機能", "FreeNow — 公式タクシー"],
      },
    },
    ar: {
      title: "التنقل في مدريد",
      subtitle: "من بويرتا ديل سول، المدينة كلها عند قدميك",
      fromHotel: "من La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "المترو",
          items: [
            { label: "أقرب محطة", value: "Sol (L1، L2، L3) — دقيقتان سيراً" },
            { label: "تذكرة فردية المنطقة A", value: "1.50 €" },
            { label: "بطاقة 10 رحلات", value: "7.30 € (0.73 € / رحلة)" },
            { label: "Tarjeta Multi (البطاقة)", value: "2.50 € (قابلة لإعادة الاستخدام 10 سنوات)" },
            { label: "مواعيد التشغيل", value: "6:00 – 1:30 (آخر قطار)" },
          ],
          note: "اشترِ Tarjeta Multi من أي آلة في المترو. يمكنك اختيار اللغة العربية على الشاشة.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "الحافلة (EMT)",
          items: [
            { label: "تذكرة فردية", value: "1.50 € (الدفع بالبطاقة داخل الحافلة)" },
            { label: "10 رحلات", value: "7.30 €" },
            { label: "الحافلة 0 (مجانية)", value: "Atocha → غران فيا → Moncloa (كهربائية)" },
            { label: "الخدمة الليلية", value: "حافلات Búhos (N) طوال الليل" },
          ],
          note: "الحافلة 0 مجانية تماماً وتمر بغران فيا. ابحث عن الرقم 001 في المقدمة.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "قطار الضواحي (Cercanías)",
          items: [
            { label: "الحد الأدنى للتعرفة", value: "من 1.60 €" },
            { label: "طريقة الدفع", value: "البطاقة البنكية مباشرة عند البوابات" },
            { label: "المحطات الرئيسية", value: "Atocha و Chamartín" },
            { label: "الأفضل لـ", value: "عبور المدينة بسرعة" },
          ],
          note: "يمكنك الدفع بلمس بطاقتك البنكية عند البوابات — دون الحاجة لشراء تذكرة.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "سيارة الأجرة والتطبيقات",
          items: [
            { label: "التعرفة الحضرية", value: "حوالي 10 – 20 €" },
            { label: "المطار (سعر ثابت)", value: "33 € إلى أي نقطة داخل الطريق الدائري M-30" },
            { label: "التعرفة الليلية / العطل", value: "التعرفة 2 (أغلى)" },
            { label: "التطبيقات", value: "FreeNow، Uber، Cabify" },
          ],
          note: "سيارات الأجرة بيضاء مع شريط أحمر قطري. Uber و Cabify بأسعار مماثلة.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "من المطار",
          items: [
            { label: "Cercanías T4 → Sol ★ موصى به", value: "~30 دقيقة · 2.60 € (بطاقة بنكية)" },
            { label: "مترو T1-T2-T3 → Sol", value: "~45 دقيقة · 5 € (تذكرة + رسوم 3 €)" },
            { label: "حافلة المطار السريعة 203", value: "~35 دقيقة · 5 €، تتوقف في Cibeles و Atocha" },
            { label: "سيارة أجرة (سعر ثابت)", value: "33 € إلى La Fonda" },
          ],
          note: "الخيار الأفضل: من T4 خذ Cercanías C1 أو C10 إلى Chamartín، ثم انتقل إلى Cercanías C4 مباشرة إلى Sol دون مترو ودون المرور بـ Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD والسكوترات",
          items: [
            { label: "BiciMAD (دراجة كهربائية)", value: "2 € تفعيل + 0.04 €/دقيقة" },
            { label: "نقطة الاستلام", value: "محطة في Plaza del Sol والمحيط" },
            { label: "السكوترات", value: "Lime، Voi، Tier — متاحة في المنطقة" },
          ],
          note: "مثالية للمسافات القصيرة. حديقة El Retiro وParque del Oeste لديهما مسارات للدراجات.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "محطات القطار",
          items: [
            { label: "Atocha (AVE والقطارات الإقليمية)", value: "مترو L1 من Sol — محطتان (3 دقائق)" },
            { label: "Chamartín (AVE والمسافات الطويلة)", value: "مترو L10 من Sol — 6 محطات (12 دقيقة)" },
            { label: "تذاكر", value: "renfe.com، تطبيق RENFE أو شبابيك المحطة" },
            { label: "الأمتعة", value: "اترك الحقائب في الاستقبال وسافر خفيفاً" },
          ],
          note: "Atocha هي المحطة الرئيسية للقطارات فائقة السرعة جنوباً (إشبيلية، مالقة، بلنسية). Chamartín تربط بالشمال (برشلونة، بلباو، سان سيباستيان).",
        }
      ],
      tips: {
        title: "نصائحنا لتوفير المال",
        items: [
          "إذا كنت ستستخدم المترو أكثر من 5 مرات، فإن بطاقة 10 رحلات دائماً أرخص من التذاكر الفردية.",
          "تذكرة السياحة (1 إلى 7 أيام) تشمل المترو والحافلة و Cercanías ورسوم المطار. من 10 €/يوم. اشترها من أي آلة في المترو (اختر 'Tourist Pass') أو من مكاتب المعلومات السياحية.",
          "الحافلة 0 مجانية بين Atocha و Moncloa عبر غران فيا.",
          "من Sol يمكنك المشي إلى أماكن كثيرة: El Retiro (20 دقيقة)، Prado (15 دقيقة).",
          "Tarjeta Multi بـ 2.50 € وتدوم 10 سنوات. احتفظ بها لزيارتك القادمة.",
        ],
      },
      apps: {
        title: "تطبيقات مفيدة",
        items: ["Citymapper — مسارات في الوقت الفعلي", "Moovit — جداول المواعيد والمحطات", "Google Maps — يعمل بشكل مثالي في مدريد", "FreeNow — سيارات الأجرة الرسمية"],
      },
    },
    ru: {
      title: "Передвижение по Мадриду",
      subtitle: "С Пуэрта-дель-Соль весь город у ваших ног",
      fromHotel: "Из La Fonda",
      sections: [
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Метро",
          items: [
            { label: "Ближайшая станция", value: "Sol (L1, L2, L3) — 2 мин пешком" },
            { label: "Разовый билет Зона A", value: "1,50 €" },
            { label: "Карта на 10 поездок", value: "7,30 € (0,73 € / поездка)" },
            { label: "Tarjeta Multi (карта)", value: "2,50 € (многоразовая, 10 лет)" },
            { label: "Время работы", value: "6:00 – 1:30 (последний поезд)" },
          ],
          note: "Купите Tarjeta Multi в любом автомате метро. Можно выбрать язык интерфейса.",
        },
        {
          icon: <Bus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Городской автобус EMT",
          items: [
            { label: "Разовый билет", value: "1,50 € (оплата картой в автобусе)" },
            { label: "10 поездок", value: "7,30 €" },
            { label: "Автобус 0 (бесплатный)", value: "Atocha → Гран-Виа → Moncloa (электрический)" },
            { label: "Ночной сервис", value: "Ночные автобусы Búhos (N) всю ночь" },
          ],
          note: "Автобус 0 полностью бесплатный и едет по Гран-Виа. Ищите номер 001 спереди.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Пригородные поезда (Cercanías)",
          items: [
            { label: "Минимальный тариф", value: "От 1,60 €" },
            { label: "Оплата", value: "Банковской картой прямо на турникетах" },
            { label: "Ключевые станции", value: "Atocha и Chamartín" },
            { label: "Идеально для", value: "Быстрого пересечения города" },
          ],
          note: "Можно оплатить, приложив банковскую карту к турникету — без покупки билета.",
        },
        {
          icon: <Car size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Такси и каршеринг",
          items: [
            { label: "Городской тариф", value: "Около 10 – 20 €" },
            { label: "Аэропорт (фиксированная цена)", value: "33 € до любой точки внутри M-30" },
            { label: "Ночной / праздничный тариф", value: "Тариф 2 (дороже)" },
            { label: "Приложения", value: "FreeNow, Uber, Cabify" },
          ],
          note: "Такси белые с красной диагональной полосой. Uber и Cabify предлагают аналогичные цены.",
        },
        {
          icon: <Plane size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Из аэропорта",
          items: [
            { label: "Cercanías T4 → Sol ★ Рекомендуем", value: "~30 мин · 2,60 € (банковская карта)" },
            { label: "Метро T1-T2-T3 → Sol", value: "~45 мин · 5 € (билет + надбавка 3 €)" },
            { label: "Аэроэкспресс 203", value: "~35 мин · 5 €, остановки Cibeles и Atocha" },
            { label: "Такси (фиксированная цена)", value: "33 € до La Fonda" },
          ],
          note: "Лучший вариант: из T4 садитесь на Cercanías C1 или C10 до Chamartín, затем пересаживайтесь на Cercanías C4 — прямо до Sol без метро и без Atocha.",
        },
        {
          icon: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "BiciMAD и самокаты",
          items: [
            { label: "BiciMAD (электровелосипед)", value: "2 € активация + 0,04 €/мин" },
            { label: "Пункт выдачи", value: "Станция на Plaza del Sol и окрестностях" },
            { label: "Самокаты", value: "Lime, Voi, Tier — доступны в районе" },
          ],
          note: "Отлично подходит для коротких расстояний. В El Retiro и Parque del Oeste есть велодорожки.",
        },
        {
          icon: <Train size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
          title: "Железнодорожные вокзалы",
          items: [
            { label: "Atocha (AVE и региональные поезда)", value: "Метро L1 от Sol — 2 остановки (3 мин)" },
            { label: "Chamartín (AVE и дальнее следование)", value: "Метро L10 от Sol — 6 остановок (12 мин)" },
            { label: "Билеты", value: "renfe.com, приложение RENFE или кассы на вокзале" },
            { label: "Багаж", value: "Оставьте чемоданы на ресепшн и путешествуйте налегке" },
          ],
          note: "Atocha — главный вокзал для скоростных поездов на юг (Севилья, Малага, Валенсия). Chamartín связывает с севером (Барселона, Бильбао, Сан-Себастьян).",
        }
      ],
      tips: {
        title: "Наши советы по экономии",
        items: [
          "Если вы будете пользоваться метро более 5 раз, карта на 10 поездок всегда выгоднее разовых билетов.",
          "Туристический абонемент (1–7 дней) включает метро, автобус, Cercanías и надбавку за аэропорт. От 10 €/день. Купить можно в любом автомате метро (выберите 'Tourist Pass') или в туристических информационных центрах.",
          "Автобус 0 полностью бесплатный между Atocha и Moncloa через Гран-Виа.",
          "Из Sol можно дойти пешком до многих мест: Retiro (20 мин), Прадо (15 мин).",
          "Tarjeta Multi стоит 2,50 € и служит 10 лет. Сохраните её для следующего визита.",
        ],
      },
      apps: {
        title: "Полезные приложения",
        items: ["Citymapper — маршруты в реальном времени", "Moovit — расписания и остановки", "Google Maps — отлично работает в Мадриде", "FreeNow — официальные такси"],
      },
    },
  };

  return content[lang] ?? content["es"];
}

interface Props {
  onBack: () => void;
}

export default function TransportePage({ onBack }: Props) {
  const { lang } = useLanguage();
  const c = buildContent(lang);
  const isRtl = lang === "ar";

  return (
    <div
      style={{
        background: "oklch(0.08 0 0)",
        minHeight: "100dvh",
        maxWidth: 480,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
        direction: isRtl ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
      <div className="relative px-5 pt-6 pb-4">
        <BackButton onClick={onBack} />
        <div className="flex flex-col items-center text-center mt-8 mb-2">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `1px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              opacity: 0.85,
              color: GOLD,
            }}
          >
            <Train size={22} strokeWidth={1.25} />
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.7rem",
              fontWeight: 500,
              color: "oklch(0.93 0.03 72)",
              letterSpacing: "0.01em",
              marginBottom: 6,
            }}
          >
            {c.title}
          </h1>
          <p
            style={{
              fontSize: "0.78rem",
              color: "oklch(0.65 0.02 72)",
              letterSpacing: "0.03em",
              fontStyle: "italic",
            }}
          >
            {c.subtitle}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="px-4 pb-6 flex flex-col gap-4">
        {c.sections.map((section, i) => (
          <div
            key={i}
            style={{
              background: "oklch(0.11 0.005 72)",
              border: "1px solid oklch(0.20 0.01 72)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                borderBottom: "1px solid oklch(0.18 0.01 72)",
                color: GOLD,
              }}
            >
              {section.icon}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: "oklch(0.88 0.04 72)",
                }}
              >
                {section.title}
              </span>
            </div>

            {/* Items */}
            <div style={{ padding: "8px 0" }}>
              {section.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 8,
                    padding: "7px 16px",
                    borderBottom: j < section.items.length - 1 ? "1px solid oklch(0.15 0.005 72)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "oklch(0.55 0.015 72)",
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                      maxWidth: "45%",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "oklch(0.88 0.03 72)",
                      fontWeight: 500,
                      textAlign: isRtl ? "left" : "right",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Note */}
            {section.note && (
              <div
                style={{
                  padding: "8px 16px 12px",
                  borderTop: "1px solid oklch(0.15 0.005 72)",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <MapPin size={12} strokeWidth={1.5} style={{ color: GOLD, opacity: 0.7, marginTop: 2, flexShrink: 0 }} />
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "oklch(0.55 0.015 72)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {section.note}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Tips */}
        <div
          style={{
            background: "oklch(0.11 0.005 72)",
            border: `1px solid oklch(0.30 0.03 72 / 0.5)`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderBottom: "1px solid oklch(0.18 0.01 72)",
            }}
          >
            <Banknote size={ICON_SIZE} strokeWidth={ICON_STROKE} style={{ color: GOLD }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: "oklch(0.88 0.04 72)",
              }}
            >
              {c.tips.title}
            </span>
          </div>
          <div style={{ padding: "10px 16px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {c.tips.items.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: GOLD, fontSize: "0.65rem", marginTop: 3, flexShrink: 0, opacity: 0.8 }}>✦</span>
                <p style={{ fontSize: "0.73rem", color: "oklch(0.72 0.02 72)", lineHeight: 1.55, margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Apps */}
        <div
          style={{
            background: "oklch(0.11 0.005 72)",
            border: "1px solid oklch(0.20 0.01 72)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderBottom: "1px solid oklch(0.18 0.01 72)",
            }}
          >
            <Smartphone size={ICON_SIZE} strokeWidth={ICON_STROKE} style={{ color: GOLD }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: "oklch(0.88 0.04 72)",
              }}
            >
              {c.apps.title}
            </span>
          </div>
          <div style={{ padding: "10px 16px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
            {c.apps.items.map((app, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: GOLD, fontSize: "0.6rem", flexShrink: 0, opacity: 0.7 }}>▸</span>
                <p style={{ fontSize: "0.73rem", color: "oklch(0.72 0.02 72)", margin: 0 }}>{app}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
