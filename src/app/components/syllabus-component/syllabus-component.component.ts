import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-syllabus-component',
  standalone: true,
  imports: [],
  templateUrl: './syllabus-component.component.html',
  styleUrl: './syllabus-component.component.css',
})
export class SyllabusComponentComponent {
  @Input('title') title!: string;
  @Input('teacher') teacher!: string;
}
