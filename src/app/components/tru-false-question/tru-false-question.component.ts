import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tru-false-question',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tru-false-question.component.html',
  styleUrl: './tru-false-question.component.css',
})
export class TruFalseQuestionComponent {
  pregunta!: string;
}
