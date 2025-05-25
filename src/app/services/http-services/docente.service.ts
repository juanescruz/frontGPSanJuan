import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/BackendURL';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';
import { ExamenDocenteDTO } from '../../dtos/ExamenDocenteDTO';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
 
  private URL_API: string = environment.ApiUrl;

  constructor(
    private http: HttpClient
  ) { }


  getName(id: string, rol:String): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.URL_API}/docente/nombre/${id}/${rol}`);
  }


  getCourses(id: string, rol:String): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.URL_API}/docente/cursos/${id}/${rol}`);
  }
  
  getExamenesByDocente(idDocente: string): Observable<MensajeDTO> {
    // El backend espera un Integer en el @RequestBody.
    // HttpClient.post() serializará el número a JSON, enviándolo como el cuerpo de la petición.
    return this.http.post<MensajeDTO>(`${this.URL_API}/docente/obtenerExamenesDocente`,  Number(idDocente) );
  }
}
