import { Component } from '@angular/core';
import { LeftBarComponent } from "../../components/left-bar/left-bar.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { DefaultViewComponent } from "../default-view/default-view.component";
import { PendingExamComponent } from "../../components/pending-exam/pending-exam.component";

@Component({
    selector: 'app-pending-exams',
    standalone: true,
    templateUrl: './pending-exams.component.html',
    styleUrl: './pending-exams.component.css',
    imports: [LeftBarComponent, NavBarComponent, DefaultViewComponent, PendingExamComponent]
})
export class PendingExamsComponent {

}
