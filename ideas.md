# Ideas de Diseño — La Fonda de los Príncipes (Guía del Huésped)

## Contexto de Marca
Logo caligráfico en blanco sobre fondo oscuro. Identidad: elegante, atemporal, modernamente castiza.
Tagline: "Un balcón, infinitas historias". Paleta inferida: negro profundo, crema, dorado discreto.

---

<response>
<probability>0.08</probability>
<idea>

## Propuesta A — "Noche en Sol" (Dark Luxury Editorial)

**Design Movement:** Art Deco Noir + Luxury Editorial (Wallpaper*, Monocle)

**Core Principles:**
1. Fondo negro profundo como lienzo principal — el silencio antes del bullicio
2. Tipografía serif de alto contraste: titulares grandes en crema, cuerpo en gris claro
3. Líneas doradas ultra-finas como único ornamento — no decoración, sino arquitectura
4. Iconos de trazo fino (stroke, no fill) en dorado pálido

**Color Philosophy:**
- Fondo: #0A0A0A (negro casi absoluto, no puro)
- Superficie tarjetas: #141414 con borde #2A2A2A
- Dorado: #C9A96E (cálido, no brillante — como luz de vela)
- Crema: #F5EDD6 (texto principal)
- Gris medio: #8A8A8A (texto secundario)
Razón emocional: el negro evoca la noche madrileña, el dorado los detalles de época del edificio.

**Layout Paradigm:**
- Pantalla completa dividida en tres zonas verticales: header (logo + idioma), tagline evocador, grid de pastillas
- Las pastillas son rectangulares con esquinas mínimamente redondeadas (4px) — no pastillas burbuja
- Grid 2×4 con separadores dorados entre celdas
- El logo ocupa el 60% del ancho en header, centrado

**Signature Elements:**
1. Línea horizontal dorada de 1px que separa el header del contenido
2. Número de habitación o bienvenida personalizable en italic serif sobre el header
3. Al hover/tap en pastilla: fondo cambia a dorado muy oscuro (#1A1500) con texto crema

**Interaction Philosophy:**
- Transiciones lentas y suaves (300ms ease-out) — nunca abruptas
- Tap en pastilla: escala sutil (scale 1.02) + cambio de color
- Selector de idioma: dropdown minimalista con banderas pequeñas

**Animation:**
- Entrada: logo aparece con fade-in 800ms, luego línea dorada se dibuja de izquierda a derecha (600ms)
- Pastillas: stagger de 80ms entre cada una, entrada desde abajo con opacity 0→1
- Sin animaciones en loop — solo en carga inicial

**Typography System:**
- Display/Logo: Cormorant Garamond (serif, weight 300) — evoca los manuscritos del siglo XIX
- Títulos pastillas: Cormorant Garamond SemiBold 600
- Selector idioma + etiquetas: DM Sans Light 300 — contraste moderno con el serif
- Jerarquía: Logo grande → Tagline pequeño italic → Labels pastillas medianos

</idea>
</response>

---

<response>
<probability>0.07</probability>
<idea>

## Propuesta B — "Piedra y Luz" (Warm Minimalism + Tactile)

**Design Movement:** Wabi-Sabi Contemporáneo + Arquitectura Española Moderna

**Core Principles:**
1. Fondo crema envejecida — como las paredes del edificio del siglo XIX
2. Textura sutil de papel/grano superpuesta al fondo — tactilidad digital
3. Iconos con trazo irregular, casi dibujados a mano — humanidad sobre perfección
4. Tipografía serif clásica mezclada con sans-serif condensada

**Color Philosophy:**
- Fondo: #F2EDE4 (crema cálida, como pergamino)
- Superficie tarjetas: #FFFFFF con sombra suave cálida
- Acento: #8B6914 (ocre/dorado oscuro — tierra madrileña)
- Texto: #2C2416 (marrón muy oscuro, no negro puro)
- Secundario: #9A8A78 (gris tostado)
Razón emocional: la calidez del interior del hotel, la piedra caliza de los edificios de Sol.

**Layout Paradigm:**
- Header asimétrico: logo a la izquierda, selector de idioma a la derecha — no centrado
- Tagline en italic serif debajo del logo, alineado a la izquierda
- Grid de pastillas en 2 columnas, con tamaños alternados (una pastilla más ancha cada 4)
- Fondo con textura de ruido muy sutil (grain overlay)

**Signature Elements:**
1. Marca de agua del escudo de Madrid o silueta de la torre del reloj de Sol, muy tenue, en el fondo
2. Número de pastilla en romano (I, II, III...) en esquina superior izquierda de cada tarjeta
3. Línea de separación con forma de ornamento tipográfico (❧ o similar) entre secciones

**Interaction Philosophy:**
- Tap en pastilla: elevación de sombra (de shadow-sm a shadow-md) + borde ocre
- Selector de idioma: lista desplegable con nombres completos del idioma, no solo código
- Scroll suave si hay más de 8 servicios

**Animation:**
- Entrada: fade-in general 500ms, sin stagger — aparece todo a la vez como una página que se revela
- Pastillas: al tap, micro-bounce (scale 0.97 → 1.02 → 1.0)
- Sin animaciones de carga elaboradas — la textura ya da profundidad

**Typography System:**
- Display: Playfair Display (serif clásico, weight 400/700)
- Body/Labels: Barlow Condensed (sans condensada, weight 400/500)
- Tagline: Playfair Display Italic 400
- Jerarquía: Logo caligráfico → Tagline italic → Labels condensados en mayúsculas

</idea>
</response>

---

<response>
<probability>0.06</probability>
<idea>

## Propuesta C — "Balcón Flotante" (Dark + Imagen Inmersiva)

**Design Movement:** Luxury Hospitality App (Four Seasons, Rosewood) + Fotografía Inmersiva

**Core Principles:**
1. Imagen del hotel como fondo completo con overlay oscuro gradiente — inmersión total
2. Logo en blanco flotando sobre la fotografía — el hotel como escenario
3. Pastillas como "cristales" semitransparentes (glassmorphism discreto) — no opacas
4. El contenido emerge del espacio, no se impone sobre él

**Color Philosophy:**
- Fondo: fotografía real del hotel/Puerta del Sol con overlay #000000 al 55%
- Pastillas: rgba(255,255,255,0.10) con backdrop-blur(12px) y borde rgba(255,255,255,0.15)
- Texto pastillas: #FFFFFF
- Acento/hover: rgba(201,169,110,0.25) — dorado translúcido
- Selector idioma: píldora blanca semitransparente
Razón emocional: el huésped ya está en el hotel — la app debe sentirse como extensión del espacio físico.

**Layout Paradigm:**
- Pantalla completa con imagen de fondo fija (no hace scroll el fondo)
- Header: logo centrado en la parte superior con padding generoso
- Tagline muy pequeño debajo del logo en italic
- Grid 2×4 de pastillas de cristal en la mitad inferior de la pantalla
- Separación visual entre header y grid mediante gradiente de oscuridad

**Signature Elements:**
1. Efecto de luz ambiental: gradiente radial muy sutil centrado en el logo (como un halo)
2. Pastillas con borde que brilla suavemente al hover (box-shadow dorado)
3. Selector de idioma como píldora en esquina superior derecha con bandera + código

**Interaction Philosophy:**
- Tap en pastilla: el cristal se "ilumina" (aumenta opacidad del fondo de la pastilla)
- Transiciones de 250ms — más rápidas que las otras propuestas, sensación de app nativa
- Feedback háptico implícito en el diseño (escala sutil)

**Animation:**
- Entrada: imagen de fondo hace zoom-out muy lento (scale 1.05 → 1.0 en 2s) — efecto Ken Burns
- Logo: fade-in con blur 8px → 0 en 600ms — como enfocar una cámara
- Pastillas: stagger de 60ms, entrada desde abajo con slide de 12px

**Typography System:**
- Display: Cormorant Garamond Light 300 para el logo/tagline
- Labels pastillas: DM Sans Medium 500 — legible sobre fondo oscuro
- Selector idioma: DM Sans Regular 400
- Jerarquía: Logo grande caligráfico → Tagline minúsculo → Labels pastillas medianos en blanco

</idea>
</response>
