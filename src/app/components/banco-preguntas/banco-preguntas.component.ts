import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel en checkboxes si decides usarlo así

import { PreguntaBancoDTO } from '../../dtos/PreguntaBancoDTO';
import { ExamService } from '../../services/http-services/exam.service'; // Ajusta ruta
import { AlertService } from '../../utils/alert.service';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';

@Component({
  selector: 'app-banco-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banco-preguntas.component.html',
  styleUrls: ['./banco-preguntas.component.css']
})
export class BancoPreguntasComponent implements OnChanges {
  @Input()
  idTema!: number | null; // Puede ser null o undefined, pero no debe ser 0
  @Output() preguntasSeleccionadasChange = new EventEmitter<PreguntaBancoDTO[]>();

  bancoPreguntasFiltrado: PreguntaBancoDTO[] = [];
  // Mantener una copia local para el estado de 'seleccionada'
  todasLasPreguntasDelTema: PreguntaBancoDTO[] = [];

  isLoading: boolean = false;

  constructor(private examenService: ExamService, private alertService: AlertService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTema'] && this.idTema !== null && this.idTema !== undefined) {
      this.cargarBancoPreguntas();
    } else if (changes['idTema'] && (this.idTema === null || this.idTema === undefined)) {
        this.todasLasPreguntasDelTema = [];
        this.bancoPreguntasFiltrado = [];
        this.emitirSeleccion();
    }
  }

  cargarBancoPreguntas(): void {
    if (!this.idTema) { // Doble verificación, aunque ngOnChanges ya lo maneja
      // console.log('BancoPreguntasComponent: idTema es null o undefined, no se cargan preguntas.');
      this.todasLasPreguntasDelTema = [];
      this.bancoPreguntasFiltrado = [];
      this.emitirSeleccion();
      return;
    }

    this.isLoading = true;
    console.log('BancoPreguntasComponent: Cargando banco de preguntas para el tema con ID:', this.idTema);

    this.examenService.getBancoPreguntas(Number(this.idTema)).subscribe(
      (mensaje: MensajeDTO) => { // Callback para el éxito (next)
        // console.log('BancoPreguntasComponent: Respuesta del servicio getBancoPreguntas:', mensaje);
        this.isLoading = false; // Mover isLoading aquí para que se desactive incluso si hay error lógico

        if (mensaje.error === false) {
          if (mensaje.respuesta && Array.isArray(mensaje.respuesta)) {
            this.todasLasPreguntasDelTema = (mensaje.respuesta as PreguntaBancoDTO[]).map(p => ({ ...p, seleccionada: false }));
            this.bancoPreguntasFiltrado = [...this.todasLasPreguntasDelTema];
            console.log('BancoPreguntasComponent: Preguntas del banco cargadas:', this.todasLasPreguntasDelTema);
            if (this.todasLasPreguntasDelTema.length === 0) {
              // this.alertService.showMessage('Información', 'No hay preguntas en el banco para este tema.', 'info');
              console.log('No hay preguntas en el banco para este tema.');
            }
          } else {
            console.error('BancoPreguntasComponent: Respuesta del backend no contiene un array de preguntas válido:', mensaje.respuesta);
            this.alertService.showMessage('Formato de respuesta inesperado al cargar el banco de preguntas.');
            this.todasLasPreguntasDelTema = [];
            this.bancoPreguntasFiltrado = [];
          }
        } else {
          // Hubo un error lógico reportado por el backend en MensajeDTO
          console.error('BancoPreguntasComponent: Error del backend al cargar el banco de preguntas:', mensaje.mensaje);
          this.alertService.showMessage(mensaje.mensaje);
          this.todasLasPreguntasDelTema = [];
          this.bancoPreguntasFiltrado = [];
        }
        this.emitirSeleccion(); // Emitir la selección actual (podría estar vacía)
      },
      (errorHttp) => { // Callback para el error HTTP
        this.isLoading = false;
        console.error("BancoPreguntasComponent: Error HTTP cargando banco de preguntas:", errorHttp);
        const detalleError = errorHttp.error?.mensaje || 'Error de conexión al cargar el banco de preguntas.';
        this.alertService.showMessage(detalleError);
        this.todasLasPreguntasDelTema = [];
        this.bancoPreguntasFiltrado = [];
        this.emitirSeleccion(); // Emitir la selección vacía en caso de error
      }
    );
  }
  

  toggleSeleccionPregunta(pregunta: PreguntaBancoDTO): void {
    // Modificar la instancia en todasLasPreguntasDelTema para persistir el estado de seleccionada
    const preguntaEnListaCompleta = this.todasLasPreguntasDelTema.find(p => p.id_pregunta === pregunta.id_pregunta);
    if (preguntaEnListaCompleta) {
        preguntaEnListaCompleta.seleccionada = !preguntaEnListaCompleta.seleccionada;
    }
    // Actualizar la vista (si usas una lista filtrada, asegúrate de que el objeto 'pregunta' también se actualice)
    pregunta.seleccionada = preguntaEnListaCompleta?.seleccionada;
    this.emitirSeleccion();
  }

  emitirSeleccion(): void {
    const seleccionadas = this.todasLasPreguntasDelTema.filter(p => p.seleccionada);
    this.preguntasSeleccionadasChange.emit(seleccionadas);
  }

  // Opcional: Filtrar el banco de preguntas localmente por enunciado
  filtrarPreguntas(event: any): void {
    const termino = event.target.value.toLowerCase();
    if (!termino) {
      this.bancoPreguntasFiltrado = [...this.todasLasPreguntasDelTema];
    } else {
      this.bancoPreguntasFiltrado = this.todasLasPreguntasDelTema.filter(p =>
        p.enunciado.toLowerCase().includes(termino)
      );
    }
  }
}