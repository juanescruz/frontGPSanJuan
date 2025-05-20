import { Component } from '@angular/core';
import { CourseComponent } from "../course/course.component";
import { Course } from '../../dtos/estudiante/Course';

@Component({
    selector: 'app-desc-curso',
    standalone: true,
    templateUrl: './desc-curso.component.html',
    styleUrl: './desc-curso.component.css',
    imports: [CourseComponent]
})
export class DescCursoComponent {
    course!:Course;

    constructor() {
        this.course = {
            id_grupo: 0,
            nombre_curso: '',
            nombre_grupo: ''
           
        };
    }
}

