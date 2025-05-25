import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { LeftbarService } from '../../services/ui-services/leftbar.service';
import { Router } from '@angular/router';
import { UserActivoService } from '../../services/general-service/user-activo.service';
@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent {

  constructor(private leftService:LeftbarService, private router: Router, private userActivoService: UserActivoService){

  }


  seeCourses(){
    if(this.userActivoService.getRol() == 'docente'){
      this.router.navigate(['home-docente']);
  }
  else if(this.userActivoService.getRol() == 'estudiante'){
    this.router.navigate(['home']);
  }

  }
  logOut(){
    this.router.navigate(['sign-in']);
  }
}
