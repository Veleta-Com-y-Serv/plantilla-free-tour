# Plantilla NoExpertise · Free tour y visitas guiadas

Web viva a todo el ancho para guías turísticos autónomos y free tours: portada partida con la ciudad a sangre y un
sello giratorio «reserva gratis · paga con propina», tours como sellos de correos con matasellos de duración,
calendario semanal, el guía en primera persona, paradas en mosaico de borde a borde, opiniones con cita grande,
preguntas frecuentes, reserva con tour, fecha y personas dentro de una entrada con talón, y contacto con el teléfono
enorme. En móvil, barra fija inferior «Llamar / WhatsApp».

- Sectores: free-tour, guia-turistico, visitas-guiadas, rutas-ciudad, turismo. Estilo: vivo. Plan mínimo: gratis.
- Secciones: hero, tours, horarios, guia, que-veras, opiniones, preguntas, reserva, contacto (+ `texto` genérico).
- Campos propios: `hero.sello`, `hero.items[]` {titulo}; `tours.tours[]` {titulo, texto, duracion, punto_encuentro,
  horario, idioma, precio, imagen, destacado}, `tours.etiqueta_destacado`; `horarios.horarios[]` {dia, hora, tour},
  `horarios.nota`; `guia.items[]` {titulo, icono}, `guia.personas[]`; `que-veras.items[]` {titulo, texto, imagen};
  `reserva.enlace_reservas`, `reserva.texto_reservas`, `reserva.boton`, `reserva.nota`; `contacto.horario[]`
  {dia, horas}, `contacto.boton`; `testimonios[].nota`.
- Diseño: rojo teja + azul + crema con granito, bandas a sangre con bordes troquelados, sans del sistema a 900 y
  serif cursiva en antetítulos y citas, botones píldora. Detalle en `DISEÑO.md`.
- Ejemplo: «Pedra e Chuvia», free tours ficticios de Santiago de Compostela.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD `LocalBusiness` y de las preguntas frecuentes,
  `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; reglas para el agente en
  `CLAUDE.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`).
Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.tours.tours` con `detalle` tiene su página en `/tours/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
