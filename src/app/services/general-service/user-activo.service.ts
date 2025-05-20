import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserActivoService {
  

  private rol!: string;
  private id!: string;

  constructor() { }

  setRol(rol: string) {
    this.rol = rol;
  }

  getRol() {
    return this.rol;
  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setNombre(nombre: string) {
    localStorage.setItem('nombre', nombre);
  }
}
