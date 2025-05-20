import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDTO } from '../../dtos/autenticacion/TokenDTO';
import { environment } from '../../enviroments/BackendURL';
import { LoginDTO } from '../../dtos/autenticacion/Login';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private URL_API: string = environment.ApiUrl;

  constructor(private http: HttpClient) {}



  login(user: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.URL_API}/auth/login`, user);
  }
}
