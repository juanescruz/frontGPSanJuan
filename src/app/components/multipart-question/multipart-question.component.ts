import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { SingleChoiceQuestionComponent } from '../single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from '../multiple-choice-question/multiple-choice-question.component';
import { TruFalseQuestionComponent } from '../tru-false-question/tru-false-question.component';
import { SimpleQuestion } from '../../dtos/TiposPreguntas/SimpleQuestion';
type responseData = {
  points: number;
  index: number;
};

@Component({
  selector: 'app-multipart-question',
  standalone: true,
  imports: [
    CardComponent,
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent,
    TruFalseQuestionComponent,
  ],
  templateUrl: './multipart-question.component.html',
  styleUrl: './multipart-question.component.css',
})
export class MultipartQuestionComponent {
  @Input('statement') statement!: string;
  @Input('subquestions') subquestions!: SimpleQuestion[];
  @Input('points') points!: number;
  @Output() valueChange = new EventEmitter<responseData>();

  emitGrade(responseData: { points: number; index: number }) {
    this.valueChange.emit(responseData);
  }
}
