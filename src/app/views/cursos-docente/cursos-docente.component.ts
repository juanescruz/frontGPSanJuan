import { Component } from '@angular/core';
import { LeftBarComponent } from "../../components/left-bar/left-bar.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { DescCursoComponent } from "../../components/desc-curso/desc-curso.component";
import { ListExamsComponent } from "../../components/list-exams/list-exams.component";

@Component({
    selector: 'app-cursos-docente',
    standalone: true,
    templateUrl: './cursos-docente.component.html',
    styleUrl: './cursos-docente.component.css',
    imports: [LeftBarComponent, NavBarComponent, DescCursoComponent, ListExamsComponent]
})
export class CursosDocenteComponent {

}
