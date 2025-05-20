import { Component } from '@angular/core';
import { LeftBarComponent } from "../../components/left-bar/left-bar.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { ItemEstudiante } from '../../dtos/itemEstudiantes';

@Component({
    selector: 'app-lista-estudiantes',
    standalone: true,
    templateUrl: './lista-estudiantes.component.html',
    styleUrl: './lista-estudiantes.component.css',
    imports: [LeftBarComponent, NavBarComponent]
})
export class ListaEstudiantesComponent {

    estudiantes!: ItemEstudiante[];

    constructor() {
        this.estudiantes = [
            { name: 'Juan', lastName: 'Perez', ID: '123456789' },
            { name: 'Maria', lastName: 'Gomez', ID: '987654321' },
            { name: 'Carlos', lastName: 'Lopez', ID: '456789123' },
            { name: 'Ana', lastName: 'Rodriguez', ID: '321654987' },
            { name: 'Pedro', lastName: 'Martinez', ID: '654987321' },
            { name: 'Laura', lastName: 'Garcia', ID: '789321654' },
            { name: 'Luis', lastName: 'Fernandez', ID: '987321654' },
            { name: 'Sofia', lastName: 'Hernandez', ID: '654321987' },
            { name: 'Andres', lastName: 'Sanchez', ID: '321987654' },
            { name: 'Gabriela', lastName: 'Torres', ID: '654321987' },
            { name: 'Alejandro', lastName: 'Vargas', ID: '987654321' },
            { name: 'Valeria', lastName: 'Jimenez', ID: '321654987' },
            { name: 'Javier', lastName: 'Gutierrez', ID: '654987321' },
            { name: 'Catalina', lastName: 'Rojas', ID: '789321654' },
            { name: 'Esteban', lastName: 'Diaz', ID: '987321654' },
            { name: 'Camila', lastName: 'Santos', ID: '654321987' },
            { name: 'Ricardo', lastName: 'Ospina', ID: '321987654' },
            { name: 'Isabella', lastName: 'Zapata', ID: '654321987' },
            { name: 'Miguel', lastName: 'Gomez', ID: '987654321' },
            { name: 'Daniela', lastName: 'Garcia', ID: '321654987' },
            { name: 'Fernando', lastName: 'Hernandez', ID: '654987321' },
            { name: 'Natalia', lastName: 'Sanchez', ID: '789321654' },
            { name: 'Diego', lastName: 'Torres', ID: '987321654' },
            { name: 'Paula', lastName: 'Vargas', ID: '654321987' },
            { name: 'Sebastian', lastName: 'Jimenez', ID: '321987654' },
            { name: 'Valentina', lastName: 'Gutierrez', ID: '654321987' },
            { name: 'Juan', lastName: 'Rojas', ID: '789321654' },
            { name: 'Maria', lastName: 'Diaz', ID: '987321654' },
            { name: 'Carlos', lastName: 'Santos', ID: '654321987' },
            { name: 'Ana', lastName: 'Ospina', ID: '321987654' },
            { name: 'Pedro', lastName: 'Zapata', ID: '654321987' },
            { name: 'Laura', lastName: 'Gomez', ID: '987654321' }
        ];
    }
}
