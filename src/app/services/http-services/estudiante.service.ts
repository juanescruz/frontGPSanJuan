import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/BackendURL';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';
import { ExamDTO } from '../../dtos/estudiante/Exam';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  
  private URL_API: string = environment.ApiUrl;

  constructor(private htpp: HttpClient) { }


  getName(id: string, rol:String): Observable<MensajeDTO> {
    return this.htpp.get<MensajeDTO>(`${this.URL_API}/estudiante/nombre/${id}/${rol}`);
  }

  getCourses(id: string, rol: string): Observable<MensajeDTO> {
    return this.htpp.get<MensajeDTO>(`${this.URL_API}/estudiante/cursos/${id}/${rol}`);
  }

  getExamsPendientes(exam: ExamDTO):Observable<MensajeDTO> {
    return this.htpp.get<MensajeDTO>(`${this.URL_API}/estudiante/examenes-pendientes/${exam.getIdAlumno()}/${exam.getIdGrupo()}`);
  }

  getExamsHechos(exam: ExamDTO):Observable<MensajeDTO> {
    return this.htpp.get<MensajeDTO>(`${this.URL_API}/estudiante/examenes-hechos/${exam.getIdAlumno()}/${exam.getIdGrupo()}`);
  }
}
