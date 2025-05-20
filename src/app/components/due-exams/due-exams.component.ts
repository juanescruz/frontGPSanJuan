import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/ui-services/user-service.service';
import { PendingExamItemComponent } from "../pending-exam-item/pending-exam-item.component";
import { ExamDue } from '../../dtos/Exam';

@Component({
    selector: 'app-due-exams',
    standalone: true,
    templateUrl: './due-exams.component.html',
    styleUrl: './due-exams.component.css',
    imports: [PendingExamItemComponent]
})
export class DueExamsComponent implements OnInit {
  @Input()exams!:ExamDue[];

  constructor( private userServicesService: UserServiceService) {
    this.exams = [];
  }

  ngOnInit(): void {
    

    
  }
}
