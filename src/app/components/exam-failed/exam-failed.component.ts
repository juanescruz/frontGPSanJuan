import { Component, Input } from '@angular/core';
import { ExamDone } from '../../dtos/ExamDone';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-exam-failed',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './exam-failed.component.html',
  styleUrl: './exam-failed.component.css'
})
export class ExamFailedComponent {

  @Input() exam?: ExamDone;
}
