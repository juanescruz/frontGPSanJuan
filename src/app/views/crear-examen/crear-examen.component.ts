import { Component, OnInit } from '@angular/core';
import { LeftBarComponent } from '../../components/left-bar/left-bar.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BancoPreguntasComponent } from '../../components/banco-preguntas/banco-preguntas.component';
import { CrearPreguntaFormComponent } from '../../components/crear-pregunta-form/crear-pregunta-form.component';
import { ExamService } from '../../services/http-services/exam.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../utils/alert.service';
import { PreguntaBancoDTO } from '../../dtos/PreguntaBancoDTO';
import { TemasCursoDTO } from '../../dtos/TemasCursoDTO';
import { CrearExamenDTO } from '../../dtos/CrearExamenDTO';
import { CourseService } from '../../services/general-service/course.service';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';
@Component({
  selector: 'app-crear-examen',
  standalone: true,
  imports: [LeftBarComponent, NavBarComponent, CommonModule,
    ReactiveFormsModule,
    BancoPreguntasComponent,         // Importa el componente hijo
    CrearPreguntaFormComponent ],
  templateUrl: './crear-examen.component.html',
  styleUrl: './crear-examen.component.css'
})
export class CrearExamenComponent implements OnInit {
  examenForm!: FormGroup;
  temas: TemasCursoDTO[] = [];
  preguntasSeleccionadasDelBanco: PreguntaBancoDTO[] = [];
  idDocente!: string;
  idCursoActual: number | null = 6;
  mostrarFormularioNuevaPregunta: boolean = false;
  temaSeleccionadoParaBanco: number | null = null;
  temaSeleccionadoParaNuevaPregunta: number | null = null;

  constructor(
    private fb: FormBuilder,
    private examenService: ExamService,
    private userActivoService: UserActivoService,
    private router: Router,
    private alertService: AlertService,
    private courseService: CourseService 
  ) {}

  ngOnInit(): void {
    const idUser = this.userActivoService.getId();
    this.idCursoActual = this.courseService.getIdGrupo();
    if (!idUser) {
      this.alertService.showMessage('No se pudo obtener el ID del docente.');
      this.router.navigate(['/login']);
      return;
    }
    this.idDocente = idUser;
    this.inicializarFormularioExamen();
    this.cargarTemas();
  }

  inicializarFormularioExamen(): void {
    this.examenForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_tema: [null, Validators.required], // Este tema es para el examen en general y para filtrar el banco
      id_grupo: [null, Validators.required],
      tiempo_max: [60, [Validators.required, Validators.min(10)]],
      numero_preguntas: [0, [Validators.required, Validators.min(1)]], // Se actualizará desde el banco
      porcentaje_curso: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
      porcentaje_aprobatorio: [60, [Validators.required, Validators.min(0), Validators.max(100)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      num_preguntas_aleatorias: [0, Validators.min(0)],
      modo: ['manual', Validators.required],
      pct_facil: [0, [Validators.min(0), Validators.max(100)]],
      pct_media: [0, [Validators.min(0), Validators.max(100)]],
      pct_dificil: [0, [Validators.min(0), Validators.max(100)]],
    });

    this.examenForm.get('id_tema')?.valueChanges.subscribe(idTemaSeleccionado => {
      this.temaSeleccionadoParaBanco = idTemaSeleccionado;
      this.temaSeleccionadoParaNuevaPregunta = idTemaSeleccionado; // Sincronizar tema para nueva pregunta
      this.preguntasSeleccionadasDelBanco = []; // Limpiar selección si cambia el tema
      this.actualizarNumeroPreguntasForm();
    });

    this.examenForm.get('modo')?.valueChanges.subscribe(modo => {
      this.actualizarNumeroPreguntasForm();
    });
  }

  cargarTemas(): void {
    if (!this.idCursoActual) {
      console.error("ID del curso no disponible para cargar temas.");
      this.alertService.showMessage('ID del curso no especificado para cargar temas.'); // Mejorado el mensaje
      this.temas = [];
      return;
    }

    // console.log(`Cargando temas para el curso ID: ${this.idCursoActual}`); // Log para depuración

    this.examenService.getTemasByCurso(this.idCursoActual).subscribe(
      (mensaje: MensajeDTO) => { // El tipo MensajeDTO viene de tu servicio
        // console.log('Respuesta del servicio getTemasByCurso:', mensaje); // Log para depuración
        if (mensaje.error === false) { // Comprobación estricta de booleano
          if (mensaje.respuesta && Array.isArray(mensaje.respuesta)) {
            this.temas = mensaje.respuesta as TemasCursoDTO[]; // Asignación directa, asumiendo que respuesta es TemasCursoDTO[]
            console.log('Temas cargados:', this.temas);

            if (this.temas.length > 0) {
              // Opcional: preseleccionar el primer tema en el formulario del examen
              if (this.examenForm && this.examenForm.get('id_tema')) { // Verifica que examenForm exista
                 this.examenForm.get('id_tema')?.setValue(this.temas[0].id_tema);
              }
              // Si tienes nuevaPreguntaForm y quieres preseleccionar allí también:
              // if (this.nuevaPreguntaForm && this.nuevaPreguntaForm.get('id_tema_pregunta')) {
              //   this.nuevaPreguntaForm.get('id_tema_pregunta')?.setValue(this.temas[0].id_tema);
              // }
            } else {
              // this.alertService.showMessage('Información', 'No se encontraron temas para este curso.', 'info');
              console.log('No se encontraron temas para este curso.');
            }
          } else {
            // Esto podría ocurrir si mensaje.respuesta es null, undefined o no es un array
            console.error('Respuesta del backend no contiene un array de temas válido:', mensaje.respuesta);
            this.alertService.showMessage('Formato de respuesta inesperado al cargar temas.');
            this.temas = [];
          }
        } else {
          // Hubo un error reportado por el backend en MensajeDTO
          console.error('Error del backend al cargar temas:', mensaje.mensaje);
          this.alertService.showMessage('No se pudieron cargar los temas del curso.');
          this.temas = [];
        }
      },
      (errorHttp) => { // Manejo del error de la petición HTTP
        console.error("Error HTTP cargando temas:", errorHttp);
        // Puedes intentar acceder a errorHttp.error.mensaje si tu backend envía un MensajeDTO en el error HTTP
        const detalleError = errorHttp.error?.mensaje || 'Error de conexión al cargar temas.';
        this.alertService.showMessage(detalleError);
        this.temas = [];
      }
    );
  }

  // ---- Interacción con BancoPreguntasComponent ----
  onPreguntasSeleccionadasChange(preguntas: PreguntaBancoDTO[]): void {
    this.preguntasSeleccionadasDelBanco = preguntas;
    this.actualizarNumeroPreguntasForm();
  }

  actualizarNumeroPreguntasForm(): void {
    if (this.examenForm.get('modo')?.value === 'manual') {
      this.examenForm.get('numero_preguntas')?.setValue(this.preguntasSeleccionadasDelBanco.length);
    }
  }

  // ---- Interacción con CrearPreguntaFormComponent ----
  onPreguntaCreada(nuevaPregunta: PreguntaBancoDTO): void {
    this.mostrarFormularioNuevaPregunta = false;
    // Opcional: Si la pregunta creada es del tema actualmente seleccionado en el banco,
    // podrías querer que BancoPreguntasComponent se actualice.
    // Esto se puede manejar haciendo que BancoPreguntasComponent observe cambios en el tema
    // o emitiendo un evento para que se recargue.
    this.alertService.showMessage('Nueva pregunta guardada en el banco.');
    // Forzar recarga del banco si el tema coincide
    if (this.temaSeleccionadoParaBanco && nuevaPregunta.id_tema === this.temaSeleccionadoParaBanco) {
        // Esto es un poco un hack. Idealmente BancoPreguntasComponent se suscribiría a un observable
        // que le indique recargar. Por ahora, podemos resetear la variable para forzar la recarga.
        const currentTema = this.temaSeleccionadoParaBanco;
        this.temaSeleccionadoParaBanco = null; // truco para forzar el ngOnChanges en el hijo
        setTimeout(() => this.temaSeleccionadoParaBanco = currentTema, 0);
    }
  }

  toggleFormularioNuevaPregunta(): void {
    this.mostrarFormularioNuevaPregunta = !this.mostrarFormularioNuevaPregunta;
    if (this.mostrarFormularioNuevaPregunta && !this.temaSeleccionadoParaNuevaPregunta) {
        this.temaSeleccionadoParaNuevaPregunta = this.examenForm.get('id_tema')?.value;
    }
  }

  onSubmitExamen(): void {
    if (this.examenForm.invalid) {
      this.alertService.showMessage('Formulario de examen inválido.');
      this.examenForm.markAllAsTouched();
      return;
    }

    const { pct_facil, pct_media, pct_dificil, modo, numero_preguntas } = this.examenForm.value;
    if (modo !== 'manual' && (pct_facil + pct_media + pct_dificil !== 100)) {
      this.alertService.showMessage('La suma de porcentajes de dificultad debe ser 100%.');
      return;
    }
    if (modo === 'manual' && this.preguntasSeleccionadasDelBanco.length !== numero_preguntas) {
      this.alertService.showMessage( `El número de preguntas (${numero_preguntas}) no coincide con las seleccionadas (${this.preguntasSeleccionadasDelBanco.length}). Actualice el número o la selección.`);
      return;
    }
    if (modo === 'manual' && this.preguntasSeleccionadasDelBanco.length === 0) {
        this.alertService.showMessage('Debe seleccionar al menos una pregunta para el modo manual.');
        return;
    }

    const examenPayload: CrearExamenDTO = {
      ...this.examenForm.value,
      id_docente: Number(this.idDocente),
      fecha_inicio: new Date(this.examenForm.value.fecha_inicio).toISOString(),
      fecha_fin: new Date(this.examenForm.value.fecha_fin).toISOString(),
      preguntasSeleccionadas: modo === 'manual'
        ? this.preguntasSeleccionadasDelBanco.map(p => p.id_pregunta)
        : undefined // O un array vacío, según espere tu SP
    };

    console.log('Enviando examen:', examenPayload);
    this.examenService.crearExamen(examenPayload).subscribe({
      next: (data) => {
        if (!data.error) {
          this.alertService.showMessage(data.mensaje || 'Examen creado.');
          this.router.navigate(['/docente/examenes']); // Ajusta
        } else {
          this.alertService.showMessage(data.mensaje || 'Error al crear examen.');
        }
      },
      error: (err) => this.alertService.showMessage('No se pudo conectar.')
    });
  }
}
