import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExamService } from '../../services/http-services/exam.service'; // Ajusta ruta
import { AlertService } from '../../utils/alert.service';
import { CrearPreguntaDTO } from '../../dtos/CrearPreguntaDTO';
import { TemasCursoDTO } from '../../dtos/TemasCursoDTO';
import { PreguntaBancoDTO } from '../../dtos/PreguntaBancoDTO'; // Para el output

@Component({
  selector: 'app-crear-pregunta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-pregunta-form.component.html',
  styleUrls: ['./crear-pregunta-form.component.css']
})
export class CrearPreguntaFormComponent implements OnInit {
  @Input() idDocente!: string; // Recibe el ID del docente del padre
  @Input() idTemaDefault: number | null = null; // Tema preseleccionado si existe
  @Input() temasDisponibles: TemasCursoDTO[] = [];
  @Output() preguntaCreada = new EventEmitter<PreguntaBancoDTO>(); // Emite la pregunta creada
  @Output() cerrarForm = new EventEmitter<void>();

  nuevaPreguntaForm!: FormGroup;
  tiposPregunta = [ // Podrías obtener esto de un servicio o constante
    { valor: 'ABIERTA', texto: 'Abierta' },
    { valor: 'MULTIPLE_UNICA', texto: 'Opción Múltiple (Única Respuesta)' },
    { valor: 'MULTIPLE_VARIAS', texto: 'Opción Múltiple (Varias Respuestas)' },
    { valor: 'F_V', texto: 'Verdadero/Falso' }
  ];

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.nuevaPreguntaForm = this.fb.group({
      enunciado: ['', Validators.required],
      es_publica: ['N', Validators.required],
      tipo_pregunta: [this.tiposPregunta[0].valor, Validators.required],
      id_tema: [this.idTemaDefault || (this.temasDisponibles.length > 0 ? this.temasDisponibles[0].id_tema : null), Validators.required]
      // Lógica para opciones si es de opción múltiple
    });
  }

  guardarNuevaPregunta(): void {
    if (this.nuevaPreguntaForm.invalid) {
      this.alertService.showMessage('Por favor complete todos los campos requeridos para la pregunta.');
      this.nuevaPreguntaForm.markAllAsTouched();
      return;
    }

    const preguntaData: CrearPreguntaDTO = {
      enunciado: this.nuevaPreguntaForm.value.enunciado,
      es_publica: this.nuevaPreguntaForm.value.es_publica,
      tipo_pregunta: this.nuevaPreguntaForm.value.tipo_pregunta,
      id_tema: this.nuevaPreguntaForm.value.id_tema,
      // id_docente: Number(this.idDocente) // El backend debería tomarlo del usuario autenticado
    };

    this.examService.crearPregunta(preguntaData).subscribe({
      next: (data) => {
        if (!data.error) {
          // Asumimos que el backend, al crear, podría devolver la pregunta creada o un ID
          // Para este ejemplo, emitimos los datos que se enviaron, asumiendo que el SP da un mensaje de éxito
          // Idealmente, el backend devolvería la PreguntaBanco completa recién creada.
          const preguntaParaBanco: PreguntaBancoDTO = {
            id_pregunta: 0, // O un ID temporal, o el backend debería devolver el ID real
            enunciado: preguntaData.enunciado,
            es_publica: preguntaData.es_publica,
            tipo: preguntaData.tipo_pregunta,
            id_tema: preguntaData.id_tema // Para el output
          };
          this.preguntaCreada.emit(preguntaParaBanco);
          this.nuevaPreguntaForm.reset({
            es_publica: 'N',
            tipo_pregunta: this.tiposPregunta[0].valor,
            id_tema: this.idTemaDefault || (this.temasDisponibles.length > 0 ? this.temasDisponibles[0].id_tema : null)
          });
        } else {
          this.alertService.showMessage(data.mensaje || 'Error al crear la pregunta.');
        }
      },
      error: (err) => this.alertService.showMessage('Error de conexión al crear pregunta.')
    });
  }

  cancelar(): void {
    this.cerrarForm.emit();
  }
}