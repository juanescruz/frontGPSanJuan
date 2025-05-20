import { Component } from '@angular/core';
import {DefaultViewComponent} from "../default-view/default-view.component";
import {PreambuloCreacionExamenComponent} from "../../components/preambulo-creacion-examen/preambulo-creacion-examen.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    DefaultViewComponent,
    PreambuloCreacionExamenComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
