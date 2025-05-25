export interface ExamenDocenteDTO {
tema: any;
  id_examen: number;
  tiempo_maximo: number; // Corresponde a tiempo_max en tu HTML
  numero_preguntas: number;
  porcentaje_curso: number; // Corresponde a valor en tu HTML
  nombre: string;
  descripcion?: string; // Opcional, como en el DTO de Java
  porcentaje_aprobatorio: number;
  fecha_hora_inicio: string | Date; // Recibir como string (ISO) o Date (si Jackson lo convierte) y luego formatear
  fecha_hora_limite: string | Date; // Recibir como string (ISO) o Date y luego formatear
  numero_preguntas_aleatorias?: number;
  grupo_id?: number;
  docente_id?: number; // Generalmente no lo necesitas en el item si ya lo tienes en contexto
  tema_id?: number;
  estado?: string;
}