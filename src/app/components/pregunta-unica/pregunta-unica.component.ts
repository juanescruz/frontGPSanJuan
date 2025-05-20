import { Component } from '@angular/core';

@Component({
  selector: 'app-pregunta-unica',
  standalone: true,
  imports: [],
  templateUrl: './pregunta-unica.component.html',
  styleUrl: './pregunta-unica.component.css'
})
export class PreguntaUnicaComponent {

  seleccionar(seleccionada:String): void {
    console.log('seleccionada', seleccionada);
  }

}
