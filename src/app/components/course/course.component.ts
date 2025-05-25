import { Component, Inject, Input } from '@angular/core';
import { Course } from '../../dtos/estudiante/Course';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../services/general-service/course.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  @Input() course!: Course;

  constructor(private router:Router,
    private courseService: CourseService, private userActivoService: UserActivoService
  ) {
  }


  loadCourse(){
    this.courseService.setCourse(this.course);
    
    if(this.userActivoService.getRol() == 'estudiante'){
      this.router.navigate(['/exams']);
    }else if(this.userActivoService.getRol() == 'docente'){
      this.router.navigate(['/curso-docente']);
    }

}
}