import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { LeftBarComponent } from '../../components/left-bar/left-bar.component';
import { ActivatedRoute } from '@angular/router';
import { SyllabusComponentComponent } from '../../components/syllabus-component/syllabus-component.component';
import { TemaSyllabusComponent } from '../../components/tema-syllabus/tema-syllabus.component';

interface Topic {
  [key: string]: any;
}

@Component({
  selector: 'app-syllabus',
  standalone: true,
  imports: [
    NavBarComponent,
    LeftBarComponent,
    SyllabusComponentComponent,
    TemaSyllabusComponent,
  ],
  templateUrl: './syllabus.component.html',
  styleUrl: './syllabus.component.css',
})
export class SyllabusComponent {
  public title!: string;
  public unities!: Topic[];

  constructor(private route: ActivatedRoute) {
    this.unities = [
      {
        title: 'SQL basics',
        'Roll up': 'this is topics #1',
        'Grouping sets': 'this is topics #2',
        Pivot: 'this is topics #3',
        Coalesce: 'this is topics #4',
      },
      {
        title: 'SQL basics 2',
        'Roll up': 'this is topics #1',
        'Grouping sets': 'this is topics #2',
        Pivot: 'this is topics #3',
        Coalesce: 'this is topics #4',
      },
      {
        title: 'SQL basics 2',
        'Roll up': 'this is topics #1',
        'Grouping sets': 'this is topics #2',
        Pivot: 'this is topics #3',
        Coalesce: 'this is topics #4',
      },
    ];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const course = params['course'];
    });
  }
}
