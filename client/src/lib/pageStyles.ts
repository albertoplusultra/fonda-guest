/**
 * pageStyles.ts — Design System de La Fonda de los Príncipes
 * ──────────────────────────────────────────────────────────
 * Filosofía "Noche en Sol":
 *   • Tipografía: Cormorant Garamond (display/precios) + DM Sans (cuerpo/UI)
 *   • Paleta: negro profundo · crema · dorado cálido · bordes sutiles
 *   • Forma: esquinas casi rectas (radius 0.25–0.35rem), sin redondeos exagerados
 *   • Iconos: lucide-react, strokeWidth 1.25–1.4, color var(--gold), sin colores adicionales
 *   • Botones: outline dorado, fondo transparente — NUNCA fondo sólido de color
 *   • Tono: tuteo (tú/tu) en español; adaptar en cada idioma
 *
 * USO: import { ps } from "@/lib/pageStyles";
 *      <p style={ps.body}>...</p>
 *      <button style={ps.actionButton}>...</button>
 *
 * REGLA: No añadir estilos inline en los componentes de página si ya existe
 *        un token aquí. Extender este archivo si hace falta un nuevo patrón.
 */

export const ps = {
  // ─── LAYOUT ────────────────────────────────────────────────────────────────

  /** Contenedor raíz de página: fondo adaptativo, max-width 480px, centrado */
  page: {
    background: "var(--background)",
    color: "var(--foreground)",
    minHeight: "100dvh",
    maxWidth: 480,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
  },

  /** Área de contenido principal */
  main: {
    flex: 1,
    padding: "2.5rem 1.5rem 3.5rem",
  },

  // ─── TIPOGRAFÍA ─────────────────────────────────────────────────────────────

  /** Título de página — Cormorant Garamond, light */
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
    color: "var(--foreground)",
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
    marginBottom: "1.5rem",
  },

  /** Subtítulo de sección — DM Sans, uppercase, dorado */
  sectionLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--gold)",
    marginBottom: "0.75rem",
  },

  /** Título de ítem de lista/sección — Cormorant Garamond, medium */
  itemTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "1.1rem",
    color: "var(--foreground)",
    lineHeight: 1.3,
    margin: 0,
    marginBottom: "0.4rem",
  },

  /** Texto de cuerpo principal — DM Sans */
  body: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.95rem",
    lineHeight: 1.7,
    color: "var(--foreground)",
  },

  /** Texto secundario / muted */
  muted: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.6,
    color: "var(--muted-foreground)",
  },

  /** Precio en carta/menú — Cormorant Garamond, dorado */
  menuPrice: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400,
    fontSize: "1.05rem",
    color: "var(--gold)",
    letterSpacing: "0.02em",
  },

  /** Nota / aviso en cursiva — Cormorant Garamond */
  note: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "0.95rem",
    color: "var(--muted-foreground)",
    lineHeight: 1.6,
  },

  // ─── COMPONENTES ────────────────────────────────────────────────────────────

  /** Tarjeta / card */
  card: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "0.35rem",
    padding: "1rem 1.25rem",
  },

  /** Icono en tarjeta — cuadrado muted con borde */
  iconBox: {
    background: "var(--muted)",
    border: "1px solid var(--border)",
    borderRadius: "0.35rem",
    padding: "0.6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--gold)",
    flexShrink: 0,
  },

  /** Fila icono + texto — icono centrado verticalmente con el texto (para títulos de sección de una línea) */
  iconRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
  },

  /** Fila icono + bloque de texto largo — icono alineado con la primera línea del título */
  iconRowTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
  },

  /** Icono en fila iconRowTop — alineado con la primera línea del título h3 (lineHeight 1.3 × 1.1rem ≈ 1.43rem, centrado en 1.43rem) */
  iconRowTopIcon: {
    flexShrink: 0,
    width: "1.5rem",
    display: "flex",
    justifyContent: "center",
    paddingTop: "0.15rem",
    color: "var(--gold)",
    opacity: 0.85,
  },

  /** Botón de acción principal — outline dorado, fondo transparente */
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.85rem 1.5rem",
    borderRadius: "0.35rem",
    border: "1px solid var(--gold)",
    background: "transparent",
    color: "var(--gold)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.875rem",
    letterSpacing: "0.06em",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  /** Enlace inline — dorado, sin subrayado por defecto */
  inlineLink: {
    color: "var(--gold)",
    textDecoration: "underline",
    textDecorationColor: "var(--gold-dim)",
    textUnderlineOffset: "3px",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 500,
  },

  // ─── SEPARADORES ────────────────────────────────────────────────────────────

  /** Separador horizontal neutro */
  divider: {
    height: 1,
    background: "var(--border)",
    border: "none",
    margin: "0.5rem 0",
  },

  /** Línea dorada decorativa */
  goldLine: {
    height: 1,
    background: "linear-gradient(90deg, var(--gold), transparent)",
    width: "60%",
    margin: "0.5rem 0 1.5rem",
  },

  // ─── TABLAS / LISTAS ────────────────────────────────────────────────────────

  /** Etiqueta de fila de tabla */
  rowLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    color: "var(--foreground)",
  },

  /** Valor de fila de tabla — dorado, alineado a la derecha */
  rowValue: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.875rem",
    color: "var(--gold)",
    textAlign: "right" as const,
  },

  /** Fila de tabla con borde superior (excepto la primera) */
  tableRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "0.55rem",
    paddingBottom: "0.55rem",
  },
} as const;
