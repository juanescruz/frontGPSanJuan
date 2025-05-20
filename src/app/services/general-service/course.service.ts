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
  }

  getCourse() {
    return this.course;
  }
}
