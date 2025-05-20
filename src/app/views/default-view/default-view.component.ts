import { Component } from '@angular/core';
import { LeftBarComponent } from "../../components/left-bar/left-bar.component";
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-default-view',
    standalone: true,
    templateUrl: './default-view.component.html',
    styleUrl: './default-view.component.css',
    imports: [LeftBarComponent, NavBarComponent]
})
export class DefaultViewComponent {

    component?: Component;

    constructor() {
    }
}
