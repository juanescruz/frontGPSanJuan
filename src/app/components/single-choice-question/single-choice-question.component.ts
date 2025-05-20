import { Component, EventEmitter, Input, Output } from '@angular/core';

type responseData = {
  points: number;
  index: number;
};
@Component({
  selector: 'app-single-choice-question',
  standalone: true,
  imports: [],
  templateUrl: './single-choice-question.component.html',
  styleUrl: './single-choice-question.component.css',
})
export class SingleChoiceQuestionComponent {
  @Input('statement') statement!: string;
  @Input('choices') choices!: string[];
  @Input('points') points!: number;
  @Input('gid') gid!: string;
  @Input('correct_option') correct_option!: number;
  @Input('question_number') question_number!: number;
  @Output() valueChange = new EventEmitter<responseData>();
  previously_correct: boolean = false;

  onRadioChange(event: Event, choice: string): void {
    const inputElement = event.target as HTMLInputElement;
    const index = this.choices.indexOf(choice);
    if (index === this.correct_option) {
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
}
