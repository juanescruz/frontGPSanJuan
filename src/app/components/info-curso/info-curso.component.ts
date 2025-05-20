import { Component, Input } from '@angular/core';

interface CourseData {
  [key: string]: any; 
}

@Component({
  selector: 'app-info-curso',
  standalone: true,
  imports: [],
  templateUrl: './info-curso.component.html',
  styleUrl: './info-curso.component.css'
})
export class InfoCursoComponent {
  @Input('title') title!: string;
  @Input('subtitle') subtitle!: string;
  @Input('description') description!: string;
  @Input('course_data') course_data!: CourseData;

  getObjectKeys(obj: object){
    return Object.keys(obj);
  }
}
