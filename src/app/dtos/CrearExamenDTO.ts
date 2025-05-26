export interface CrearExamenDTO {
  tiempo_max: number;
  numero_preguntas: number;
  porcentaje_curso: number;
  nombre: string;
  descripcion: string;
  porcentaje_aprobatorio: number;
  fecha_inicio: string; // Manejar como string 'YYYY-MM-DDTHH:mm' para <input type="datetime-local">
  fecha_fin: string;
  num_preguntas_aleatorias: number;
  id_tema: number;
  // id_docente se obtendrá del UserActivoService
  id_grupo: number;
  pct_facil: number;
  pct_media: number;
  pct_dificil: number;
  modo: string; // Ej: 'automatico', 'manual'
  preguntasSeleccionadas?: number[]; // Array de IDs de preguntas si el modo es manual
}