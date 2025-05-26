import { Injectable } from '@angular/core';
import { Course } from '../../dtos/estudiante/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  

  private course!: Course;

  constructor() { }


  setCourse(course: Course) {
    this.course = course;
    console.log('Curso establecido:', this.course.id_grupo);
  }

  getCourse() {
    return this.course;
  }
  getIdGrupo() {
    return this.course.id_grupo;
  }
 
}
