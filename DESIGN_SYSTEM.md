# Design System — La Fonda de los Príncipes · Guía del Huésped

**Filosofía: "Noche en Sol"**
Oscuridad profunda y dorado cálido. La interfaz evoca la atmósfera de un hotel boutique histórico de Madrid: elegante, sobrio y acogedor. Cada decisión de diseño refuerza ese carácter.

---

## 1. Tokens de color

Los colores se definen como variables CSS en `client/src/index.css` y se adaptan automáticamente al tema claro/oscuro.

| Token | Uso |
|---|---|
| `var(--gold)` | Acento principal: iconos, precios, etiquetas, bordes de botones |
| `var(--gold-dim)` | Dorado atenuado: subrayados de enlaces inline |
| `var(--foreground)` | Texto principal |
| `var(--muted-foreground)` | Texto secundario, notas, pies de página |
| `var(--background)` | Fondo de página |
| `var(--card)` | Fondo de tarjetas |
| `var(--border)` | Bordes de tarjetas, separadores, filas de tabla |
| `var(--muted)` | Fondo de iconBoxes y elementos secundarios |

**Regla crítica:** No usar colores de marca adicionales (verde WhatsApp, azul, etc.). Todos los botones y elementos interactivos usan dorado sobre fondo transparente.

---

## 2. Tipografía

| Rol | Fuente | Peso | Tamaño |
|---|---|---|---|
| Títulos de página | Cormorant Garamond | 300 (light) | `clamp(1.8rem, 6vw, 2.4rem)` |
| Títulos de ítem | Cormorant Garamond | 500 | `1.1rem` |
| Precios de carta | Cormorant Garamond | 400 | `1.05rem` |
| Notas / citas | Cormorant Garamond | 400 italic | `0.95rem` |
| Etiquetas de sección | DM Sans | 500 | `0.65rem`, uppercase, tracking `0.12em` |
| Cuerpo de texto | DM Sans | 400 | `0.95rem`, line-height `1.7` |
| Texto secundario | DM Sans | 400 | `0.875rem`, line-height `1.6` |
| Botones | DM Sans | 500 | `0.875rem`, tracking `0.06em` |

**Regla:** Cormorant Garamond para todo lo que sea display o decorativo. DM Sans para todo lo que sea UI o cuerpo de texto. No usar otras fuentes.

---

## 3. Forma y espaciado

- **Border radius:** `0.25rem` (global) / `0.35rem` (tarjetas y botones). Sin redondeos exagerados.
- **Padding de tarjeta:** `1rem 1.25rem` (estándar). Usar siempre este valor salvo excepción justificada.
- **Max-width de página:** `480px`, centrado con `margin: 0 auto`.
- **Padding de contenido:** `2.5rem 1.5rem 3.5rem`.

---

## 4. Iconos

- **Librería:** `lucide-react` exclusivamente.
- **strokeWidth:** `1.25` (iconos de lista) / `1.4` (iconos de UI/botones).
- **Color:** siempre `var(--gold)` o `style={{ color: "var(--gold)" }}`. Sin colores adicionales.
- **Tamaño en iconBox:** `18–20px`. Tamaño en botones: `16px`.
- **Regla:** No usar emojis como iconos. No usar imágenes externas como iconos (salvo el SVG de la tecla de recepción en ContactoPage).

---

## 5. Componentes

### Importar el design system

```tsx
import { ps } from "@/lib/pageStyles";
```

### Tokens disponibles en `ps`

| Token | Descripción |
|---|---|
| `ps.page` | Contenedor raíz de página |
| `ps.main` | Área de contenido principal |
| `ps.title` | Título de página (Cormorant, light) |
| `ps.sectionLabel` | Etiqueta de sección (DM Sans, uppercase, dorado) |
| `ps.itemTitle` | Título de ítem de lista (Cormorant, medium) |
| `ps.body` | Texto de cuerpo (DM Sans) |
| `ps.muted` | Texto secundario (DM Sans, muted-foreground) |
| `ps.menuPrice` | Precio de carta (Cormorant, dorado) |
| `ps.note` | Nota en cursiva (Cormorant italic) |
| `ps.card` | Tarjeta con fondo y borde |
| `ps.iconBox` | Cuadrado muted para iconos |
| `ps.iconRow` | Fila flex icono + label |
| `ps.actionButton` | Botón outline dorado |
| `ps.inlineLink` | Enlace inline dorado |
| `ps.divider` | Separador horizontal neutro |
| `ps.goldLine` | Línea dorada decorativa |
| `ps.rowLabel` | Etiqueta de fila de tabla |
| `ps.rowValue` | Valor de fila de tabla (dorado, derecha) |
| `ps.tableRow` | Fila de tabla con padding vertical |

### Componentes reutilizables

| Componente | Archivo | Uso |
|---|---|---|
| `PageLayout` | `components/PageLayout.tsx` | Wrapper de todas las páginas secundarias |
| `PageTitle` | `components/PageTitle.tsx` | Título + línea dorada |
| `PageHeader` | `components/PageHeader.tsx` | Header con botón volver + logo + idioma |
| `InfoCard` | `components/InfoCard.tsx` | Tarjeta de información |
| `SectionLabel` | `components/SectionLabel.tsx` | Etiqueta de sección |
| `IconRow` | `components/IconRow.tsx` | Fila icono + label |
| `ActionButton` | `components/ActionButton.tsx` | Botón de acción (button o anchor) |
| `InlineLink` | `components/InlineLink.tsx` | Enlace inline dentro de texto |
| `ScrollToTop` | `components/ScrollToTop.tsx` | Reset de scroll en navegación |

---

## 6. Patrones de página

### Estructura estándar de página secundaria

```tsx
<PageLayout onBack={onBack}>
  <PageTitle>Título de la página</PageTitle>

  <InfoCard style={{ marginBottom: "1rem" }}>
    <IconRow icon={<Wind size={18} strokeWidth={1.4} />} label="Sección" />
    <p style={ps.muted}>Descripción del servicio.</p>
    <ActionButton href="tel:+34919891469" icon={<PhoneCall size={16} />}>
      Llamar al +34 919 891 469
    </ActionButton>
  </InfoCard>
</PageLayout>
```

### Fila de tabla (carta/menú)

```tsx
<div style={{ ...ps.tableRow, borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
  <span style={ps.rowLabel}>{item.name}</span>
  <span style={ps.menuPrice}>{item.price}</span>
</div>
```

### Enlace inline dentro de párrafo

```tsx
<p style={ps.muted}>
  Para solicitar el servicio,{" "}
  <InlineLink onClick={onContacto}>llame a recepción</InlineLink>.
</p>
```

---

## 7. Botones

**Regla absoluta:** Un solo estilo de botón en todo el sitio — outline dorado, fondo transparente.

```tsx
// Botón como elemento <button>
<ActionButton onClick={fn} icon={<Bell size={16} />}>
  Solicitar despertador
</ActionButton>

// Botón como enlace <a>
<ActionButton href="tel:+34919891469" icon={<PhoneCall size={16} />}>
  Llamar al +34 919 891 469
</ActionButton>

// Botón como enlace externo
<ActionButton href="https://wa.me/34919891469" target="_blank" rel="noopener noreferrer" icon={<WhatsAppIcon size={16} />}>
  Enviar WhatsApp al +34 919 891 469
</ActionButton>
```

---

## 8. Idiomas y tono

- **10 idiomas:** es, en, fr, de, it, pt, zh, ja, ar, ru.
- **Tono en español:** tuteo (tú/tu/te). No usar usted/su.
- **RTL:** árabe (`ar`) activa `direction: "rtl"` automáticamente en `PageLayout`.
- **Estructura de traducciones:** objeto `Record<string, {...}>` con fallback a `"es"`.

---

## 9. Lo que NO hacer

- No usar colores de marca adicionales (verde, azul, rojo…) en botones o iconos.
- No usar emojis como elementos de UI.
- No usar `border-radius` mayor de `0.5rem`.
- No usar `font-weight: 700` (bold) en DM Sans para cuerpo de texto.
- No usar `Inter` ni otras fuentes.
- No almacenar imágenes en `client/public/` o `client/src/assets/` — usar `manus-upload-file --webdev`.
- No usar `position: fixed` en el header de páginas secundarias.
- No mezclar usted/tu en el mismo idioma.

---

*Última actualización: mayo 2026*
