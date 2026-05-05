/*
 * WifiPage — "Noche en Sol" design
 * Red: LaFondaDeLosPrincipes | Pass: LaFonda1861
 * Estructura: 1) Conexión automática (botón), 2) Si no funciona → conexión manual con datos
 */
import { Wifi, Copy, Check } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_BLANCO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400946394/Zow2LjuuZ5FiZzmS8gH7BA/logo-blanco-hd_6b7412e4.png";

const WIFI_SSID = "LaFondaDeLosPrincipes";
const WIFI_PASS = "LaFonda1861";
const WIFI_URI  = `wifi://WIFI:T:WPA;S:${WIFI_SSID};P:${WIFI_PASS};;`;

const WIFI_COPY: Record<string, {
  title: string;
  auto_title: string;
  auto_note: string;
  connect_button: string;
  manual_title: string;
  manual_intro: string;
  network_label: string;
  password_label: string;
  copy_label: string;
  copied_label: string;
}> = {
  es: {
    title: "WiFi",
    auto_title: "Conexión automática",
    auto_note: "Pulsa el botón para conectarte directamente.",
    connect_button: "Conectar ahora",
    manual_title: "Si no funciona",
    manual_intro: "Conéctate manualmente con estos datos:",
    network_label: "Red",
    password_label: "Contraseña",
    copy_label: "Copiar",
    copied_label: "Copiado",
  },
  en: {
    title: "WiFi",
    auto_title: "Automatic connection",
    auto_note: "Tap the button to connect directly.",
    connect_button: "Connect now",
    manual_title: "If it doesn't work",
    manual_intro: "Connect manually with these details:",
    network_label: "Network",
    password_label: "Password",
    copy_label: "Copy",
    copied_label: "Copied",
  },
  fr: {
    title: "WiFi",
    auto_title: "Connexion automatique",
    auto_note: "Appuyez sur le bouton pour vous connecter directement.",
    connect_button: "Se connecter",
    manual_title: "Si ça ne fonctionne pas",
    manual_intro: "Connectez-vous manuellement avec ces informations :",
    network_label: "Réseau",
    password_label: "Mot de passe",
    copy_label: "Copier",
    copied_label: "Copié",
  },
  de: {
    title: "WLAN",
    auto_title: "Automatische Verbindung",
    auto_note: "Tippen Sie auf die Schaltfläche, um sich direkt zu verbinden.",
    connect_button: "Jetzt verbinden",
    manual_title: "Falls es nicht klappt",
    manual_intro: "Verbinden Sie sich manuell mit diesen Daten:",
    network_label: "Netzwerk",
    password_label: "Passwort",
    copy_label: "Kopieren",
    copied_label: "Kopiert",
  },
  it: {
    title: "WiFi",
    auto_title: "Connessione automatica",
    auto_note: "Premi il pulsante per connetterti direttamente.",
    connect_button: "Connetti ora",
    manual_title: "Se non funziona",
    manual_intro: "Connettiti manualmente con questi dati:",
    network_label: "Rete",
    password_label: "Password",
    copy_label: "Copia",
    copied_label: "Copiato",
  },
  pt: {
    title: "WiFi",
    auto_title: "Conexão automática",
    auto_note: "Toque no botão para se conectar diretamente.",
    connect_button: "Conectar agora",
    manual_title: "Se não funcionar",
    manual_intro: "Conecte-se manualmente com estes dados:",
    network_label: "Rede",
    password_label: "Senha",
    copy_label: "Copiar",
    copied_label: "Copiado",
  },
  zh: {
    title: "WiFi",
    auto_title: "自动连接",
    auto_note: "点击按钮直接连接。",
    connect_button: "立即连接",
    manual_title: "如果无法连接",
    manual_intro: "请使用以下信息手动连接：",
    network_label: "网络名称",
    password_label: "密码",
    copy_label: "复制",
    copied_label: "已复制",
  },
  ja: {
    title: "WiFi",
    auto_title: "自動接続",
    auto_note: "ボタンをタップして直接接続してください。",
    connect_button: "今すぐ接続",
    manual_title: "うまくいかない場合",
    manual_intro: "以下の情報で手動接続してください：",
    network_label: "ネットワーク名",
    password_label: "パスワード",
    copy_label: "コピー",
    copied_label: "コピー済み",
  },
  ar: {
    title: "واي فاي",
    auto_title: "الاتصال التلقائي",
    auto_note: "اضغط الزر للاتصال مباشرة.",
    connect_button: "اتصل الآن",
    manual_title: "إذا لم ينجح",
    manual_intro: "اتصل يدوياً باستخدام هذه البيانات:",
    network_label: "اسم الشبكة",
    password_label: "كلمة المرور",
    copy_label: "نسخ",
    copied_label: "تم النسخ",
  },
  ru: {
    title: "WiFi",
    auto_title: "Автоматическое подключение",
    auto_note: "Нажмите кнопку для прямого подключения.",
    connect_button: "Подключиться",
    manual_title: "Если не сработало",
    manual_intro: "Подключитесь вручную, используя эти данные:",
    network_label: "Сеть",
    password_label: "Пароль",
    copy_label: "Копировать",
    copied_label: "Скопировано",
  },
};

interface WifiPageProps {
  onBack: () => void;
}

function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all duration-200 flex-shrink-0"
      style={{
        background: copied ? "oklch(0.25 0.05 150)" : "oklch(0.18 0.01 72)",
        border: `1px solid ${copied ? "oklch(0.45 0.1 150)" : "oklch(0.28 0.015 72)"}`,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: copied ? "oklch(0.75 0.12 150)" : "oklch(0.55 0.015 85)",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

// Shared text style for both SSID and password values
const valueStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 400,
  fontSize: "1.15rem",
  color: "oklch(0.90 0.025 85)",
  letterSpacing: "0.01em",
  wordBreak: "break-all",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 500,
  fontSize: "0.6rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "oklch(0.45 0.01 85)",
};

export default function WifiPage({ onBack }: WifiPageProps) {
  const { lang, t } = useLanguage();
  const c = WIFI_COPY[lang] ?? WIFI_COPY["en"];
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
        <img src={LOGO_BLANCO} alt="La Fonda de los Príncipes" className="h-8" style={{ opacity: 0.85 }} />
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
          className="mb-8"
          style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", width: "60%" }}
        />

        {/* ── SECCIÓN 1: Conexión automática ── */}
        <h2
          className="mb-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {c.auto_title}
        </h2>

        <p
          className="mb-5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.88rem",
            color: "oklch(0.62 0.015 85)",
            lineHeight: 1.6,
          }}
        >
          {c.auto_note}
        </p>

        <a
          href={WIFI_URI}
          className="flex items-center justify-center gap-3 w-full rounded-sm mb-10 transition-all duration-200"
          style={{
            background: "var(--gold)",
            color: "oklch(0.08 0 0)",
            padding: "1rem 1.5rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.82 0.08 72)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)"; }}
        >
          <Wifi size={18} strokeWidth={2} />
          {c.connect_button}
        </a>

        {/* Separator */}
        <div
          className="mb-8"
          style={{ height: 1, background: "oklch(0.16 0.01 72)" }}
        />

        {/* ── SECCIÓN 2: Conexión manual ── */}
        <h2
          className="mb-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "oklch(0.50 0.015 85)",
          }}
        >
          {c.manual_title}
        </h2>

        <p
          className="mb-5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.88rem",
            color: "oklch(0.55 0.012 85)",
            lineHeight: 1.6,
          }}
        >
          {c.manual_intro}
        </p>

        {/* Network info card */}
        <div
          className="rounded-sm p-5"
          style={{ background: "oklch(0.11 0 0)", border: "1px solid oklch(0.18 0.01 72)" }}
        >
          {/* SSID row — solo visible */}
          <div className="flex flex-col gap-0.5 mb-4">
            <span style={labelStyle}>{c.network_label}</span>
            <span style={valueStyle}>{WIFI_SSID}</span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "oklch(0.17 0.01 72)", marginBottom: "1rem" }} />

          {/* Password row — con botón copiar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span style={labelStyle}>{c.password_label}</span>
              <span style={valueStyle}>{WIFI_PASS}</span>
            </div>
            <CopyButton text={WIFI_PASS} label={c.copy_label} copiedLabel={c.copied_label} />
          </div>
        </div>

      </main>
    </div>
  );
}
