import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreguntaMultipleComponent } from '../pregunta-multiple/pregunta-multiple.component';
import { OpcionRespuesta } from '../../dtos/OpcionRespuesta';

type responseData = {
  points: number;
  index: number;
};

@Component({
  selector: 'app-multiple-choice-question',
  standalone: true,
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.css',
  imports: [FormsModule, PreguntaMultipleComponent],
})
export class MultipleChoiceQuestionComponent {
  @Input('statement') statement!: string;
  @Input('choices') choices!: string[];
  @Input('correct_option') correct_option!: number[];
  @Input('points') points!: number;
  @Input('gid') gid!: string;
  @Input('question_number') question_number!: number;
  @Output() valueChange = new EventEmitter<responseData>();
  previously_correct: boolean = false;

  response: number[] = [];
  pregunta!: string;

  constructor() {}

  ngOnInit(): void {}

  onCheckboxChange(event: Event, choice: string): void {
    const inputElement = event.target as HTMLInputElement;
    const index = this.choices.indexOf(choice);
    if (inputElement.checked) {
      this.response.push(index);
    } else {
      const response_index = this.response.indexOf(index);
      this.response.splice(response_index, 1);
    }

    if (this.equalArrays(this.response, this.correct_option)) {
      this.previously_correct = true;
      this.valueChange.emit({
        points: this.points,
        index: this.question_number,
      });
    } else {
      if (this.previously_correct) {
        this.valueChange.emit({
          points: -this.points,
          index: this.question_number,
        });
      } else {
        this.previously_correct = false;
        this.valueChange.emit({ points: 0, index: this.question_number });
      }
    }
  }

  equalArrays(arr1: number[], arr2: number[]): boolean {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
