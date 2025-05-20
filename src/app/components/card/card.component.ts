import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input('style') style: string = 'width: 75%';
  @Input('class') class: string = 'border rounded p-4 shadow-md h-75 m-2';
}
