# Free tour y visitas guiadas: brief de diseño

Plantilla `free-tour` creada el 02/11/2026 a partir de `agencia-viajes` con `php artisan plantillas:nueva` y
rediseñada entera (tanda 4, «autónomos», fila 4 del brief). De la base solo queda la estructura técnica. Este fichero
se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: guías turísticos autónomos, free tours a la gorra y pequeñas empresas de visitas guiadas por la
  ciudad (`free-tour, guia-turistico, visitas-guiadas, rutas-ciudad, turismo`). Quien entra quiere saber qué tours hay,
  cuándo y dónde salen, en qué idioma, si de verdad es gratis y cómo reservar plaza.
- **Qué tiene que conseguir la web**: que reserven plaza (formulario con tour, fecha y personas; botón de cabecera;
  «Reservar» en cada tour y en el calendario, que elige el tour en el formulario) o que escriban por WhatsApp (botón en
  la cabecera, «Preguntar» en cada tour y barra fija inferior «Llamar / WhatsApp» en móvil). Enlace externo opcional a
  una web de reservas (`enlace_reservas`).
- **Tono y estilo** (`vivo`): cercano, alegre, de ciudad con historia; en primera persona («Soy Uxía…»). Sí: un sello
  de correos, un matasellos, una entrada de museo con su talón, los toldos y las fachadas de colores de una plaza. No:
  el billete de embarque y la señalética de aeropuerto de `agencia-viajes`, ni la caja centrada con tarjetas.
- **Concepto**: «sello de correos y matasellos de ciudad». La portada es un bloque rojo teja con el título enorme y la
  foto de la ciudad a sangre en la otra mitad; sobre la costura gira un sello azul «Reserva gratis · Paga con propina».
  Las bandas importantes terminan en un borde troquelado (medias lunas de su color que muerden la banda siguiente).
  Los tours son sellos de correos con el borde perforado, el precio como valor del sello y un matasellos redondo con la
  duración. El calendario es una hoja azul por días con las horas enormes. Las paradas, un mosaico de fotos de borde a
  borde. La reserva, una entrada de papel con talón.
- **Paleta de ejemplo**: primario `#b0412a` (rojo teja: portada, opiniones, insignias, barra «Llamar»), acento
  `#1d5c9e` (azul: botones, calendario, reserva, sello giratorio, barra «WhatsApp»), fondo `#f6eedd` (crema), texto
  `#2b1d16` (tinta). Derivados con `color-mix`: granito (texto + un toque de teja: guía y pie), piedra (crema +
  tinta), papel (crema + blanco: sellos y entrada), teja y azul legibles sobre claro. Texto sobre teja y azul: crema.
- **Tipografía** (del sistema, sin descargas): títulos en system-ui a 900 (Segoe UI Black, SF Pro Heavy), en minúsculas
  con interletrado cerrado (-0,035 a -0,045 em), de 2,4-2,75 rem en móvil a 5,25-6,5 rem en escritorio; antetítulos,
  citas, notas y cargos en serif cursiva del sistema (Iowan Old Style, Palatino, Georgia) con una línea corta delante;
  texto en system-ui. Botones en píldora (radio completo) a 800.
- **Ritmo de bandas** (ejemplo): portada teja partida con foto a sangre + troquel → tours crema → horarios azul +
  troquel → guía granito 50/50 con foto a sangre → qué verás piedra con mosaico de borde a borde → opiniones teja +
  troquel → preguntas papel → reserva azul con la entrada → contacto crema 50/50 con foto a sangre → pie granito con
  troquel arriba. Cabecera crema siempre sólida con filete teja.
- **Apartados** en orden:
  1. `hero`: bloque teja + foto a sangre (arriba en móvil, 46 svh), `antetitulo`, título enorme, `texto`, `items`
     como etiquetas con check, `cta` y `cta_secundario`, sello giratorio con `sello`.
  2. `tours` (`tours: [{titulo, texto, duracion, punto_encuentro, horario, idioma, precio, imagen, destacado}]`):
     sellos en 3 columnas (2 en tableta, 1 en móvil; la última fila centrada); el destacado primero a todo el ancho y
     en dos columnas con `etiqueta_destacado`; `cta` debajo.
  3. `horarios` (`horarios: [{dia, hora, tour}]`, `nota`): columnas por día que llenan el ancho, horas enormes.
  4. `guia` (`texto`, `imagen`, `items`: titulo, icono; `personas`; `cta`): granito 50/50 con foto a sangre.
  5. `que-veras` (`items`: titulo, texto, imagen): mosaico de borde a borde, la primera parada 2×2 con cinco o más y
     la última estirada para cerrar la fila; en móvil, dos columnas.
  6. `opiniones` (`testimonios`: texto, autor, nota): cita enorme en cursiva + columnas con línea de puntos.
  7. `preguntas`: titular fijo a la izquierda y acordeón con «+» en círculo teja.
  8. `reserva` (`items` pasos, `enlace_reservas`, `texto_reservas`, `boton`, `nota`): pasos numerados y entrada con
     talón y formulario (nombre, teléfono, tour, fecha, personas, mensaje opcional).
  9. `contacto` (`horario: [{dia, horas}]`, `boton`): teléfono enorme, llamar y WhatsApp, punto de encuentro con
     «Cómo llegar», horario de atención y foto a sangre.
- **Fotos** (`fotos.json`, 15): calle de granito mojada con las torres de la catedral al fondo para la portada; plaza
  de la catedral, soportales, escalinata de noche con niebla, puesto del mercado, parque romántico, paraguas rojo bajo
  un soportal (tours); callejón vertical con musgo (guía); seis paradas cuadradas (fachada, plaza en dos niveles,
  calle de tabernas, mercado por fuera, vista de postal desde el parque, monasterio); rincón de plaza junto a un
  palacio con arcos (contacto). Sin texto legible, sin logotipos, sin personas reconocibles.
- **Qué no hacer**: mayúsculas estrechas tipo DIN, billetes de embarque, franja de destinos en movimiento o el
  océano y naranja de `agencia-viajes`; tarjetas blancas con sombra en una columna estrecha; hablar en plural de
  empresa; más de un acento de color por banda.

## Hecho

- [x] `site.yaml` de ejemplo (Pedra e Chuvia, Santiago de Compostela), todo activo, al menos un elemento por lista,
  precios entre comillas, listas planas.
- [x] Secciones nuevas (`tours`, `horarios`, `guia`, `que-veras`, `reserva`) y las demás rediseñadas (`hero`,
  `opiniones`, `preguntas`, `contacto`, `texto`); cabecera con WhatsApp y pie con barra móvil «Llamar / WhatsApp»;
  `index.astro` sin tocar.
- [x] `template.yaml` con sectores `[{id, nombre}]`, secciones, estilo, plan mínimo gratis, orden 620 y guion
  `asistente:` (11 pasos).
- [x] `fotos.json` (15) y placeholders propios (`hero`, `tour`, `parada`, `foto`, `persona`), favicon.
- [x] `README.md`, `CLAUDE.md`, `aviso-legal.astro` y `404.astro` con el diseño.
- [x] `plantillas:comprobar free-tour --construir`: cumple, 0 errores y 0 avisos.
- [ ] Fotos y previews definitivas (`preview/card.jpg`, `preview/full.jpg` son provisionales, con los SVG de
  respaldo): las genera el paso de fotos.
