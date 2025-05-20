import { Component, EventEmitter, Input, Output } from '@angular/core';
import { True_False } from '../../dtos/TiposPreguntas/True_False';

type responseData = {
  points: number;
  index: number;
};

@Component({
  selector: 'app-verdadero-falso',
  standalone: true,
  imports: [],
  templateUrl: './verdadero-falso.component.html',
  styleUrl: './verdadero-falso.component.css',
})
export class VerdaderoFalsoComponent {
  @Input('questions') questions!: True_False;
  @Input('question_number') question_number!: number;
  @Output() valueChange = new EventEmitter<responseData>();
  answered = new Set();

  onSelectionChange(e: any, indice: number) {
    let valorCadena = e.target.value == 'VERDADERO' ? true : false;

    if (valorCadena == this.questions.responses[indice]) {
      this.valueChange.emit({
        points: this.questions.points / this.questions.questions.length,
        index: this.question_number,
      });
    } else {
      if (this.answered.has(indice))
        this.valueChange.emit({
          points: -this.questions.points / this.questions.questions.length,
          index: this.question_number,
        });
      else
        this.valueChange.emit({
          points: 0,
          index: this.question_number,
        });
    }
    this.answered.add(indice);
  }
}
