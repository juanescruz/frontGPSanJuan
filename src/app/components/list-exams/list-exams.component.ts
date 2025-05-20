import { Component, OnInit } from '@angular/core';
import { examDocente } from '../../dtos/itemDocenteExam';
import { ItemDocenteExamComponent } from "../item-docente-exam/item-docente-exam.component";

@Component({
    selector: 'app-list-exams',
    standalone: true,
    templateUrl: './list-exams.component.html',
    styleUrl: './list-exams.component.css',
    imports: [ItemDocenteExamComponent]
})
export class ListExamsComponent implements OnInit{

  items!: examDocente[];

  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        id: 1,
        name: 'Examen 1',
        value: 10,
        question: 10,
        limit_time: 60
      },
      {
        id: 2,
        name: 'Examen 2',
        value: 20,
        question: 20,
        limit_time: 120
      },
      {
        id: 3,
        name: 'Examen 3',
        value: 20,
        question: 20,
        limit_time: 120
      },{
        id: 4,
        name: 'Examen 4',
        value: 20,
        question: 20,
        limit_time: 120
      },{
        id: 5,
        name: 'Examen 5',
        value: 20,
        question: 20,
        limit_time: 120
      },{
        id: 6,
        name: 'Examen 6',
        value: 20,
        question: 20,
        limit_time: 120
      },

    ];
  }

}
