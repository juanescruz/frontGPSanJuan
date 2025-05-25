import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserActivoService } from '../../services/general-service/user-activo.service';
import { DocenteService } from '../../services/http-services/docente.service';
import { UserServiceService } from '../../services/ui-services/user-service.service';
import { EstudianteService } from '../../services/http-services/estudiante.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
   constructor(private userActivoService: UserActivoService, private docenteService: DocenteService,
          private estudianteService: EstudianteService){}
 
  @Input('style') style!: string;
  @Input('username') username: string = '';
  
  ngOnInit(): void {
    if (!this.style) {
      this.style = '';
    }
    this.loadName();
  }

  loadName() {
    if (this.userActivoService.getRol() == 'estudiante') {
      this.estudianteService.getName(this.userActivoService.getId(), this.userActivoService.getRol()).subscribe(
        (data) => {
          this.username = data.respuesta;
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.userActivoService.getRol() == 'docente') {
      this.docenteService.getName(this.userActivoService.getId(), this.userActivoService.getRol()).subscribe(
        (data) => {
          this.username = data.respuesta;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
