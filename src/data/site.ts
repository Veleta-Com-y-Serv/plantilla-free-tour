// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
/** Elemento genérico (servicios, pasos…). Campos opcionales: vacíos no se pintan. */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; precio?: string; duracion?: string; url?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/**
 * Tour o visita (secciones.tours.tours). Todo cadena: `precio` («Free tour (propina)», «28 € por persona»; vacío = no se
 * muestra), `duracion` («2 h 30 min»), `punto_encuentro`, `horario` («Todos los días, 10:30»), `idioma`.
 * `destacado: true` = ficha grande con su sello (`etiqueta_destacado` de la sección).
 */
export interface Tour {
  titulo: string; texto: string; duracion: string; punto_encuentro: string; horario: string; idioma: string;
  precio: string; imagen: string; destacado: boolean;
  /** Opcionales de la ficha propia (src/lib/paginas.ts): texto largo en párrafos, fotos «a; b» y slug. */
  detalle?: string; imagenes?: string; slug?: string;
}
/** Salida del calendario semanal (secciones.horarios.horarios): `dia` agrupa («Todos los días»), `hora`, `tour`. */
export interface Salida { dia: string; hora: string; tour: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  tours: Tour[];
  horarios: Salida[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    tours: lista<Crudo>(s.tours).map(tour).filter((t) => t.titulo),
    horarios: lista<Crudo>(s.horarios).map(salida).filter((h) => h.hora || h.tour),
  } as Seccion;
}

const limpio = (v: unknown) => (v == null || typeof v === 'object' ? '' : String(v).trim());
function tour(v: Crudo): Tour {
  return {
    titulo: limpio(v.titulo) || limpio(v.nombre),
    texto: limpio(v.texto),
    duracion: limpio(v.duracion),
    punto_encuentro: limpio(v.punto_encuentro),
    horario: limpio(v.horario),
    idioma: limpio(v.idioma),
    precio: limpio(v.precio),
    imagen: limpio(v.imagen),
    destacado: v.destacado === true,
    ...(typeof v.detalle === "string" && v.detalle.trim() && { detalle: v.detalle }),
    ...(limpio(v.imagenes) && { imagenes: limpio(v.imagenes) }),
    ...(limpio(v.slug) && { slug: limpio(v.slug) }),
  };
}
function salida(v: Crudo): Salida {
  return { dia: limpio(v.dia), hora: limpio(v.hora), tour: limpio(v.tour) };
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#1f2937', acento: '#f59e0b', fondo: '#ffffff', texto: '#111827', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'LocalBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Valor escalar como cadena limpia ('' si falta o no es escalar): para campos propios opcionales. */
export const cadena = (v: unknown) => (v == null || typeof v === 'object' ? '' : String(v).trim());
/** Objeto {titulo, texto} opcional (p. ej. hero.destacado); null si no trae título ni texto. */
export const bloque = (v: unknown): { titulo: string; texto: string } | null => {
  if (!v || typeof v !== 'object') return null;
  const o = v as Crudo;
  const b = { titulo: cadena(o.titulo), texto: cadena(o.texto) };
  return b.titulo || b.texto ? b : null;
};
/** Enlace {texto, url} con los dos campos rellenos, o null. */
export const enlace = (v: unknown): Enlace | null => {
  if (!v || typeof v !== 'object') return null;
  const o = v as Crudo;
  return cadena(o.url) && cadena(o.texto) ? { texto: cadena(o.texto), url: cadena(o.url) } : null;
};

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? String(t).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** Lista a partir de una cadena separada por «;» (o por comas si no lleva «;»). */
export const partes = (t?: unknown) => {
  const c = cadena(t);
  return c ? c.split(c.includes(';') ? ';' : ',').map((x) => x.trim()).filter(Boolean) : [];
};
