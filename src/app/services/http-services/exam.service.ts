import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';
import { environment } from '../../enviroments/BackendURL';
import { Nota } from '../../dtos/estudiante/Nota';

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
}
