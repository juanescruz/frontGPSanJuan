import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/ui-services/user-service.service';
import { ExamDone } from '../../dtos/ExamDone';
import { ExamPassedComponent } from "../exam-passed/exam-passed.component";
import { ExamFailedComponent } from "../exam-failed/exam-failed.component";

@Component({
    selector: 'app-done-exams',
    standalone: true,
    templateUrl: './done-exams.component.html',
    styleUrl: './done-exams.component.css',
    imports: [ExamPassedComponent, ExamFailedComponent]
})
export class DoneExamsComponent implements OnInit {

  @Input()exams!: ExamDone[];

  constructor(private userServicesService: UserServiceService) {
    this.exams = [];
  }

  ngOnInit(): void {

    

  }


}
