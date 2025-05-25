import { Component, OnInit } from '@angular/core';
import { examDocente } from '../../dtos/itemDocenteExam';
import { ItemDocenteExamComponent } from "../item-docente-exam/item-docente-exam.component";
import { ExamenDocenteDTO } from '../../dtos/ExamenDocenteDTO';
import { DocenteService } from '../../services/http-services/docente.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';
import { Router } from '@angular/router';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';

@Component({
    selector: 'app-list-exams',
    standalone: true,
    templateUrl: './list-exams.component.html',
    styleUrl: './list-exams.component.css',
    imports: [ItemDocenteExamComponent]
})
export class ListExamsComponent implements OnInit{

  items: ExamenDocenteDTO[] = [];
  isLoading: boolean = true;
  errorAlCargar: string | null = null;

  constructor(private docenteService: DocenteService,
    private userActivoService: UserActivoService,
    private router: Router) {
    this.items = [];
  }

  ngOnInit(): void {
    this.cargarExamenes();
  }
  cargarExamenes() {
    this.isLoading = true;
    this.errorAlCargar = null;
    const idDocente = this.userActivoService.getId();

    if (!idDocente) {
      console.error('ListExamsComponent: No se pudo obtener el ID del docente.');
      this.errorAlCargar = 'No se pudo identificar al docente. Por favor, inicie sesión nuevamente.';
      this.isLoading = false;
      this.items = [];
      return;
    }
    console.log('Llamando a getCourses con ID:', idDocente, 'y Rol:', this.userActivoService.getRol());
    this.docenteService.getExamenesByDocente(idDocente).subscribe({
      next: (mensaje: MensajeDTO) => { // El tipo de mensaje es MensajeDTO
        console.log('Respuesta del servicio getExamenesByDocente:', mensaje);
        if (!mensaje.error && mensaje.respuesta) {
          // Como mensaje.respuesta es 'any', hacemos un cast a ExamenDocenteFE[]
          this.items = mensaje.respuesta;
          console.log('Exámenes cargados en items:', this.items);
        } else {
          console.error('ListExamsComponent: Error en la respuesta del backend -', mensaje.mensaje); // Usar mensaje.mensaje
          this.errorAlCargar = mensaje.mensaje || 'No se pudieron cargar los exámenes.';
          this.items = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('ListExamsComponent: Error HTTP al cargar exámenes -', err);
        // Puedes intentar acceder a err.error.mensaje si el backend envía un MensajeDTO en el error HTTP
        const detalleError = err.error?.mensaje || 'Ocurrió un error de comunicación al cargar los exámenes.';
        this.errorAlCargar = detalleError;
        this.isLoading = false;
        this.items = [];
      }
    });
  }
  

}
