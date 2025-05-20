import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  @ViewChild('email') email!: ElementRef;
  validMail: boolean = true;
  constructor(private router: Router) { }

  validateMail() {
    const emailField = this.email.nativeElement;
    const emailValue = emailField.value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue.match(emailRegex)) {
      this.validMail = true;
      this.router.navigate(['/recovery-code'])
    } else {
      this.validMail = false;
    }
  }

}
