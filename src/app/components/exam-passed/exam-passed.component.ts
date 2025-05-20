import { Component, Input } from '@angular/core';
import { ExamDone } from '../../dtos/ExamDone';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-exam-passed',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './exam-passed.component.html',
  styleUrl: './exam-passed.component.css'
})
export class ExamPassedComponent {

  @Input() exam?: ExamDone;

}
