import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/BackendURL';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
 
  private URL_API: string = environment.ApiUrl;

  constructor(
    private htpp: HttpClient
  ) { }


  getName(id: string, rol:String): Observable<MensajeDTO> {
    return this.htpp.get<MensajeDTO>(`${this.URL_API}/docente/nombre/${id}/${rol}`);
  }


  getCourses(id: string, rol:String): Observable<MensajeDTO> {
    return this.htpp.get<MensajeDTO>(`${this.URL_API}/docente/cursos/${id}/${rol}`);
  }
}
