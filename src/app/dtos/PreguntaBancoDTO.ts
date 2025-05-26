export interface PreguntaBancoDTO {
  id_pregunta: number;
  id_tema: number;
  es_publica: string;
  tipo: string;
  seleccionada?: boolean; // Para la UI
  enunciado: string;
}