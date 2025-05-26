import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';
import { environment } from '../../enviroments/BackendURL';
import { Nota } from '../../dtos/estudiante/Nota';
import { CrearExamenDTO } from '../../dtos/CrearExamenDTO';
import { CrearPreguntaDTO } from '../../dtos/CrearPreguntaDTO';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private URL_API: string = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  getExamByID(id: number): Observable<MensajeDTO> {
    //${this.URL_API}/examenes/${id}
    return this.http.get<MensajeDTO>('http://localhost:8000');
  }

  postExam(data: Nota) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post('http://localhost:8000', data, { headers });
  }
  crearExamen(examenData: CrearExamenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.URL_API}/crear`, examenData);
  }

  crearPregunta(preguntaData: CrearPreguntaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.URL_API}/crear`, preguntaData);
  }

  getBancoPreguntas(idTema: number): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.URL_API}/docente/listarBancoPreguntas`, idTema);
  }
  getTemasByCurso(idCurso: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.URL_API}/docente/temasCurso/${idCurso}`);
  }
}
