import { Component } from '@angular/core';

import { PreguntaMultipleComponent } from '../pregunta-multiple/pregunta-multiple.component';
import { FormsModule } from '@angular/forms';
import { PreguntaUnicaComponent } from '../pregunta-unica/pregunta-unica.component';

@Component({
  selector: 'app-unique-answer-question',
  standalone: true,
  templateUrl: './unique-answer-question.component.html',
  styleUrl: './unique-answer-question.component.css',
  imports: [PreguntaMultipleComponent, FormsModule, PreguntaUnicaComponent],
})
export class UniqueAnswerQuestionComponent {
  pregunta!: string;
}
