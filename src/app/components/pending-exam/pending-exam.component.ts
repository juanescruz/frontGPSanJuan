import { Component, OnInit } from '@angular/core';
import { PendingExamItemComponent } from "../pending-exam-item/pending-exam-item.component";
import { UserServiceService } from '../../services/ui-services/user-service.service';
import { ExamDue } from '../../dtos/Exam';

@Component({
    selector: 'app-pending-exam',
    standalone: true,
    templateUrl: './pending-exam.component.html',
    styleUrl: './pending-exam.component.css',
    imports: [PendingExamItemComponent]
})
export class PendingExamComponent implements OnInit{

    exams?:ExamDue[];

    constructor(private userService: UserServiceService) {
        this.exams = [];
    }

    ngOnInit(): void {
        
    }
}
