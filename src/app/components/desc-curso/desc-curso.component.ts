import { Component } from '@angular/core';
import { CourseComponent } from "../course/course.component";
import { Course } from '../../dtos/estudiante/Course';
import { Router } from '@angular/router';
import { CourseService } from '../../services/general-service/course.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';
import { CommonModule } from '@angular/common';     
@Component({
    selector: 'app-desc-curso',
    standalone: true,
    templateUrl: './desc-curso.component.html',
    styleUrl: './desc-curso.component.css',
    imports: [CourseComponent]
})
export class DescCursoComponent {

    course!:Course;
    
    constructor(private router:Router,
    private courseService: CourseService, private userActivoService: UserActivoService) {
        this.course = courseService.getCourse();
    }
}

