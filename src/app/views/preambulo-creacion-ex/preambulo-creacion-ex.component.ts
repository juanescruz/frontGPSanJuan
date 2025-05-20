import { Component } from '@angular/core';
import {DescCursoComponent} from "../../components/desc-curso/desc-curso.component";
import {LeftBarComponent} from "../../components/left-bar/left-bar.component";
import {ListExamsComponent} from "../../components/list-exams/list-exams.component";
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-preambulo-creacion-ex',
  standalone: true,
    imports: [
        DescCursoComponent,
        LeftBarComponent,
        ListExamsComponent,
        NavBarComponent
    ],
  templateUrl: './preambulo-creacion-ex.component.html',
  styleUrl: './preambulo-creacion-ex.component.css'
})
export class PreambuloCreacionExComponent {

}
