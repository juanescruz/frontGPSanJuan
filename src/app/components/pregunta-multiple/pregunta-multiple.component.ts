import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pregunta-multiple',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pregunta-multiple.component.html',
  styleUrl: './pregunta-multiple.component.css'
})
export class PreguntaMultipleComponent {
  
  seleccionar(seleccionada:String): void {
    console.log('seleccionada', seleccionada);
  }

}
