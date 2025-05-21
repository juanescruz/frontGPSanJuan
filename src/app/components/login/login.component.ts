import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/http-services/auth-service.service';
import { LoginDTO } from '../../dtos/autenticacion/Login';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../utils/alert.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  selectedRole!: string;
  formulario: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private activeUser: UserActivoService
  ) { 
    this.formulario = this.fb.group({
      id: ['']
    });
  }

  selectRole(rol: string) {
    this.selectedRole = rol;
  }

  signIn() {
    


    let id = this.formulario.get('id')?.value;

    if(id == null || id == '') {
      this.alertService.showMessage('Por favor, ingrese un ID válido');
      return;
    }


    let user = new LoginDTO(this.selectedRole.toLowerCase(), id);
    console.log('Enviando al backend: ID=', id, 'Rol=', this.selectedRole); 
    this.authService.login(user).subscribe(
      (data) => {
        if(data.error == false ) {
          this.alertService.showMessage('Inicio de sesión exitoso');

          this.activeUser.setId(id); 
        

          if( user.getRol() === 'alumno' ) {

            this.router.navigate(['/home']);
            this.activeUser.setRol('estudiante');
            
          } else {
            
            this.router.navigate(['/home-docente']);
            this.activeUser.setRol('docente');
           

            
          }


        } else {
          this.alertService.showMessage('Error al iniciar sesión');
        }
      },
      (error) => {
        console.log(error);
        this.alertService.showMessage('Error al iniciar sesión');
      }
    );    
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
