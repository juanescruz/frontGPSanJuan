import { Component, Input } from '@angular/core';
import { ExamDue } from '../../dtos/Exam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-exam-item',
  standalone: true,
  imports: [],
  templateUrl: './pending-exam-item.component.html',
  styleUrl: './pending-exam-item.component.css'
})
export class PendingExamItemComponent {


  @Input() exam!: ExamDue;

  constructor(private router: Router) {

  }

  presentarExamen() {
    
    this.router.navigate(['/presentar-examen', this.exam]);


  }
}
