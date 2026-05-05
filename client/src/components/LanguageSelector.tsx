/*
 * LanguageSelector — "Noche en Sol" design
 * Dropdown elegante con fondo oscuro y acento dorado
 */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LANGUAGES, useLanguage, type LangCode } from "@/contexts/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (code: LangCode) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative z-50">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-sm text-xs font-medium tracking-widest uppercase transition-all duration-200"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          borderColor: "transparent",
          color: open ? "var(--gold)" : "oklch(0.65 0.02 85)",
          background: "transparent",
          letterSpacing: "0.12em",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none" style={{ fontFamily: "'Noto Color Emoji', sans-serif" }}>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown
          size={11}
          style={{
            color: open ? "var(--gold)" : "oklch(0.50 0.02 85)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-1 w-44 rounded-sm overflow-hidden shadow-2xl"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.72 0.09 72 / 0.08)",
          }}
          role="listbox"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => select(l.code)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-xs transition-colors duration-150"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: l.code === lang ? "var(--gold)" : "var(--muted-foreground)",
                background: l.code === lang ? "var(--tile-hover-bg)" : "transparent",
                borderBottom: "1px solid var(--muted)",
              }}
              onMouseEnter={(e) => {
                if (l.code !== lang) {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--muted)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--card-foreground)";
                }
              }}
              onMouseLeave={(e) => {
                if (l.code !== lang) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
                }
              }}
            >
              <span className="text-base leading-none" style={{ fontFamily: "'Noto Color Emoji', sans-serif" }}>{l.flag}</span>
              <span>{l.nativeName}</span>
              {l.code === lang && (
                <span className="ml-auto" style={{ color: "var(--gold)" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
