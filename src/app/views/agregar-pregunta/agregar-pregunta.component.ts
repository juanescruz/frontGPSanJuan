import { Component } from '@angular/core';
import { LeftBarComponent } from "../../components/left-bar/left-bar.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { SelectTipoPrgeuntaComponent } from "../../components/select-tipo-prgeunta/select-tipo-prgeunta.component";

@Component({
    selector: 'app-agregar-pregunta',
    standalone: true,
    templateUrl: './agregar-pregunta.component.html',
    styleUrl: './agregar-pregunta.component.css',
    imports: [LeftBarComponent, NavBarComponent, SelectTipoPrgeuntaComponent]
})
export class AgregarPreguntaComponent {

}
