import { Component, Input } from '@angular/core';
import { examDocente } from '../../dtos/itemDocenteExam';

@Component({
  selector: 'app-item-docente-exam',
  standalone: true,
  imports: [],
  templateUrl: './item-docente-exam.component.html',
  styleUrl: './item-docente-exam.component.css'
})
export class ItemDocenteExamComponent {
  @Input() item!: examDocente;
}
