# Plantilla «Free tour y visitas guiadas» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **vivo**
(«sello de correos y matasellos de ciudad»: bandas a todo el ancho que alternan rojo teja, azul, crema y granito;
bordes troquelados; tours como sellos con matasellos; títulos en sans muy pesada y antetítulos en serif cursiva).
Es la web de un autónomo: habla en primera persona («Soy Uxía…»), y el teléfono y el WhatsApp mandan. Todo en
castellano de España, frases cortas, sin jerga.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (también las listas `tours` y `horarios`); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = rojo teja de la portada y las opiniones, acento = azul de botones, calendario y reserva, fondo = crema, texto = tinta). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…); los derivados (granito, piedra, papel, teja y azul legibles sobre claro) se calculan con `color-mix` en `src/styles/global.css`. Sobre teja y azul el texto va en el color de fondo (crema).
- **Tipografías y aspecto general**: `src/styles/global.css` (`--fuente-titulos`: system-ui a 900; `--fuente-serif`: Iowan / Palatino / Georgia en cursiva para antetítulos y citas; bandas `.banda--crema|piedra|papel|teja|azul|granito`; borde troquelado `.troquel`; botones `.btn`/`.btn-sec`/`.btn-claro`; sellos `.sello`, `.matasellos`; mosaico `.mosaico`; entrada `.entrada`; cabecera `.cabecera--tour`; pie `.pie--tour`; barra móvil `.barra-movil`). Fuentes del sistema: no añadas fuentes externas.
- **Imágenes**: en `public/`. Las fotos van en `public/fotos/` (se generan aparte a partir de `fotos.json`); las de respaldo en `public/placeholders/` (`Imagen.astro` cambia a la de respaldo si la foto falta). En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). Calles y plazas sin personas reconocibles.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = matasellos en un círculo teja + nombre.
- **Cabecera**: fija y siempre sólida (crema con filete teja); botón redondo de WhatsApp (`contacto.whatsapp`); menú completo desde 1180 px, plegable por debajo; `boton_cabecera` como píldora azul (desde 640 px y dentro del menú plegable).
- **Barra fija inferior en móvil** (menos de 768 px): «Llamar» (`contacto.telefono`) y «WhatsApp» (`contacto.whatsapp`), en `src/components/Footer.astro`.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie`.

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`. Se pintan en el orden en que aparecen en `site.yaml`. Un apartado nuevo puede reutilizar un diseño con `tipo: <id>`.
- `hero` → `hero.astro`: bloque teja partido con la foto a sangre (`imagen`; arriba en móvil), `antetitulo`, `titulo` enorme, `texto`, `items` (titulo) como etiquetas con check, `cta` y `cta_secundario`; sello azul giratorio con el texto de `sello`. Sin imagen, bloque teja a todo el ancho.
- `tours` → `tours.astro`: `tours` como sellos de correos: foto con el `precio` como valor del sello y el matasellos con la `duracion`; `horario`, `punto_encuentro`, `idioma`; botones «Reservar» (elige el tour en el formulario) y «Preguntar» (WhatsApp con el tour). El `destacado` va primero, a todo el ancho, con `etiqueta_destacado`. `cta` debajo.
- `horarios` → `horarios.astro`: banda azul con `horarios` agrupados por `dia` en columnas (hora enorme y el tour, que lleva a la reserva) y `nota` con botón de WhatsApp. Sin salidas no se pinta.
- `guia` → `guia.astro`: banda granito 50/50 con foto a sangre a la izquierda, `texto` en primera persona, `items` (titulo, icono) como credenciales, `personas` (nombre, cargo, foto, texto) y `cta`.
- `que-veras` → `que-veras.astro`: titular y mosaico de fotos de borde a borde con `items` (titulo, texto, imagen) numerados; con cinco o más, la primera es grande.
- `opiniones` → `opiniones.astro`: banda teja; `testimonios` (texto, autor, nota), el primero como cita enorme en cursiva y el resto en columnas. Sin testimonios no se pinta.
- `preguntas` → `preguntas.astro`: titular fijo a la izquierda y acordeón a la derecha. Sin preguntas no se pinta.
- `reserva` → `reserva.astro`: banda azul; pasos (`items`: titulo, texto), botón a `enlace_reservas` si lo hay (`texto_reservas`) y formulario corto en una entrada con talón: nombre, teléfono, tour (de `tours`), fecha y personas; `boton`, `nota`.
- `contacto` → `contacto.astro`: teléfono enorme, botones de llamar y WhatsApp, email, punto de encuentro (`contacto.direccion`) con «Cómo llegar», `horario` (lista de esta sección o `contacto.horario`) y foto a sangre a la derecha. Si no hay apartado de reserva activo, lleva aquí el formulario corto (nombre, teléfono, qué necesitas).
- `texto` → `texto.astro`: apartado genérico (`tipo: texto`) con `imagen` 50/50 opcional, `items` y `cta`.

## Campos propios de esta plantilla (además del esquema común)
- `hero.sello`: texto del sello giratorio («Reserva gratis · Paga con propina ·»); vacío = sin sello. `hero.items`: `[{titulo}]`.
- `tours.tours`: `[{titulo, texto, duracion, punto_encuentro, horario, idioma, precio, imagen, destacado}]`. Todo cadena; `precio` siempre entre comillas («Free tour (propina)», «28 € por persona»), vacío = no se muestra. `destacado: true` en uno como mucho. Máximo 24.
- `tours.etiqueta_destacado`: texto del distintivo del tour destacado («El más reservado»).
- `horarios.horarios`: `[{dia, hora, tour}]`; `dia` agrupa (escribe igual los del mismo grupo). `horarios.nota`.
- `reserva.enlace_reservas` (web externa de reservas, opcional), `reserva.texto_reservas`, `reserva.boton`, `reserva.nota`.
- `contacto.horario`: `[{dia, horas}]` (si falta, se usa `contacto.horario` de arriba). `contacto.boton`.
- `testimonios[].nota`: detalle bajo el nombre («Free tour por la zona vieja, marzo de 2026»).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, precios, fotos**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }`, ponlo entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Para varios valores, una cadena con comas.
5. **No inventes** precios, horarios, cifras, opiniones ni datos: si el cliente no los da, deja `precio: ""`, `horarios: []` o `testimonios: []`; el componente lo oculta.
6. **Primera persona**: los textos hablan como el guía («te enseño», «mis tours»), nunca «nuestra empresa».
7. **Página nueva**: crea `src/pages/<slug>.astro` usando `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
8. **Sección nueva**: mejor un id nuevo con `tipo:` (`texto`, `tours`, `que-veras`…). Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)`, `Seccion` (con su `banda`) y `Titular`. `src/pages/index.astro` la recoge sola.
9. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio —`LocalBusiness`— y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
10. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), JavaScript mínimo (menú, sello y elegir tour en la reserva), 16 px de margen lateral (`.contenedor`), sin scroll horizontal en móvil, ids `hero` y `contacto`. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
11. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

Fotos: `fotos.json` describe las fotos de `public/fotos/` (se generan aparte, sin personas reconocibles); los SVG de `public/placeholders/` quedan de respaldo.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.tours.tours` → `/tours/<slug>/` (tour).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (precio, duración…) salen en la tabla de datos de la ficha.
- Una orden «añade una página para X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/tours/`: salen solas de `src/pages/[coleccion]/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y servicio/producto con precio si lo hay).
