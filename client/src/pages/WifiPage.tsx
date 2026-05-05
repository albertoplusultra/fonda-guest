/*
 * WifiPage — "Noche en Sol" design
 * Red: LaFondaDeLosPrincipes | Pass: LaFonda1861
 */
import { Wifi, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import SectionLabel from "@/components/SectionLabel";
import InfoCard from "@/components/InfoCard";
import { ps } from "@/lib/pageStyles";

const WIFI_SSID = "LaFondaDeLosPrincipes";
const WIFI_PASS = "LaFonda1861";
const WIFI_URI  = `wifi://WIFI:T:WPA;S:${WIFI_SSID};P:${WIFI_PASS};;`;

const WIFI_COPY: Record<string, {
  title: string; auto_title: string; auto_note: string; connect_button: string;
  manual_title: string; manual_intro: string; network_label: string;
  password_label: string; copy_label: string; copied_label: string;
}> = {
  es: { title: "WiFi", auto_title: "Conexión automática", auto_note: "Pulsa el botón para conectarte directamente.", connect_button: "Conectar ahora", manual_title: "Conexión manual", manual_intro: "También puedes conectar manualmente con estos datos.", network_label: "Red", password_label: "Contraseña", copy_label: "Copiar", copied_label: "Copiado" },
  en: { title: "WiFi", auto_title: "Automatic connection", auto_note: "Tap the button to connect directly.", connect_button: "Connect now", manual_title: "Manual connection", manual_intro: "You can also connect manually with these details.", network_label: "Network", password_label: "Password", copy_label: "Copy", copied_label: "Copied" },
  fr: { title: "WiFi", auto_title: "Connexion automatique", auto_note: "Appuyez sur le bouton pour vous connecter directement.", connect_button: "Se connecter", manual_title: "Connexion manuelle", manual_intro: "Vous pouvez également vous connecter manuellement avec ces informations.", network_label: "Réseau", password_label: "Mot de passe", copy_label: "Copier", copied_label: "Copié" },
  de: { title: "WLAN", auto_title: "Automatische Verbindung", auto_note: "Tippen Sie auf die Schaltfläche, um sich direkt zu verbinden.", connect_button: "Jetzt verbinden", manual_title: "Manuelle Verbindung", manual_intro: "Sie können sich auch manuell mit diesen Daten verbinden.", network_label: "Netzwerk", password_label: "Passwort", copy_label: "Kopieren", copied_label: "Kopiert" },
  it: { title: "WiFi", auto_title: "Connessione automatica", auto_note: "Premi il pulsante per connetterti direttamente.", connect_button: "Connetti ora", manual_title: "Connessione manuale", manual_intro: "Puoi anche connetterti manualmente con questi dati.", network_label: "Rete", password_label: "Password", copy_label: "Copia", copied_label: "Copiato" },
  pt: { title: "WiFi", auto_title: "Conexão automática", auto_note: "Toque no botão para se conectar diretamente.", connect_button: "Conectar agora", manual_title: "Conexão manual", manual_intro: "Também pode conectar-se manualmente com estes dados.", network_label: "Rede", password_label: "Senha", copy_label: "Copiar", copied_label: "Copiado" },
  zh: { title: "WiFi", auto_title: "自动连接", auto_note: "点击按钮直接连接。", connect_button: "立即连接", manual_title: "手动连接", manual_intro: "您也可以使用以下信息手动连接。", network_label: "网络名称", password_label: "密码", copy_label: "复制", copied_label: "已复制" },
  ja: { title: "WiFi", auto_title: "自動接続", auto_note: "ボタンをタップして直接接続してください。", connect_button: "今すぐ接続", manual_title: "手動接続", manual_intro: "以下の情報で手動接続することもできます。", network_label: "ネットワーク名", password_label: "パスワード", copy_label: "コピー", copied_label: "コピー済み" },
  ar: { title: "واي فاي", auto_title: "الاتصال التلقائي", auto_note: "اضغط الزر للاتصال مباشرة.", connect_button: "اتصل الآن", manual_title: "الاتصال اليدوي", manual_intro: "يمكنك أيضاً الاتصال يدوياً بهذه البيانات.", network_label: "اسم الشبكة", password_label: "كلمة المرور", copy_label: "نسخ", copied_label: "تم النسخ" },
  ru: { title: "WiFi", auto_title: "Автоматическое подключение", auto_note: "Нажмите кнопку для прямого подключения.", connect_button: "Подключиться", manual_title: "Ручное подключение", manual_intro: "Также можно подключиться вручную, используя эти данные.", network_label: "Сеть", password_label: "Пароль", copy_label: "Копировать", copied_label: "Скопировано" },
};

interface WifiPageProps { onBack: () => void; }

function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 flex-shrink-0 transition-all duration-200"
      style={{ ...ps.actionButton, width: "auto", padding: "0.55rem 1rem", fontSize: "0.82rem", letterSpacing: "0.08em", border: copied ? "1px solid oklch(0.55 0.12 150)" : "1px solid var(--gold)", color: copied ? "oklch(0.7 0.14 150)" : "var(--gold)" }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

const valueStyle: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.15rem", color: "var(--foreground)", letterSpacing: "0.01em", wordBreak: "break-all" };
const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)" };

export default function WifiPage({ onBack }: WifiPageProps) {
  const { lang } = useLanguage();
  const c = WIFI_COPY[lang] ?? WIFI_COPY["en"];

  return (
    <PageLayout onBack={onBack}>
      <PageTitle>{c.title}</PageTitle>

      <SectionLabel style={{ marginBottom: "0.5rem" }}>{c.auto_title}</SectionLabel>
      <p style={{ ...ps.muted, marginBottom: "1.25rem" }}>{c.auto_note}</p>

      <a href={WIFI_URI} className="flex items-center justify-center gap-3 w-full rounded-sm mb-8 transition-all duration-200"
        style={{ ...ps.actionButton, textDecoration: "none" }}>
        <Wifi size={18} strokeWidth={2} />
        {c.connect_button}
      </a>

      <div style={ps.divider} className="mb-8" />

      <SectionLabel style={{ marginBottom: "0.5rem" }}>{c.manual_title}</SectionLabel>
      <p style={{ ...ps.muted, marginBottom: "1.25rem" }}>{c.manual_intro}</p>

      <InfoCard>
        <div className="flex flex-col gap-0.5 mb-4">
          <span style={labelStyle}>{c.network_label}</span>
          <span style={valueStyle}>{WIFI_SSID}</span>
        </div>
        <div style={{ height: 1, background: "var(--border)", marginBottom: "1rem" }} />
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span style={labelStyle}>{c.password_label}</span>
            <span style={valueStyle}>{WIFI_PASS}</span>
          </div>
          <CopyButton text={WIFI_PASS} label={c.copy_label} copiedLabel={c.copied_label} />
        </div>
      </InfoCard>
    </PageLayout>
  );
}
