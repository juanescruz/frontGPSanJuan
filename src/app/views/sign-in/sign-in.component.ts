import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css',
    imports: [LoginComponent, NgOptimizedImage, CommonModule]
})
export class SignInComponent {

}
