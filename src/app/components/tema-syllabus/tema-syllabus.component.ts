import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Topic {
  [key: string]: any;
}

@Component({
  selector: 'app-tema-syllabus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tema-syllabus.component.html',
  styleUrl: './tema-syllabus.component.css',
})
export class TemaSyllabusComponent {
  @Input('title') title!: string;
  @Input('unities') unities!: Topic[];

  getObjectKeys(obj: object) {
    return Object.keys(obj).filter((key) => key !== 'title');
  }
}
