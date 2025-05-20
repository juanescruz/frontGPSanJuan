import { Component, OnInit } from '@angular/core';
import { LeftBarComponent } from '../../components/left-bar/left-bar.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { DueExamsComponent } from '../../components/due-exams/due-exams.component';
import { DoneExamsComponent } from '../../components/done-exams/done-exams.component';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/http-services/estudiante.service';
import { CourseService } from '../../services/general-service/course.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';
import { ExamDTO } from '../../dtos/estudiante/Exam';
import { ExamDone } from '../../dtos/ExamDone';
import { ExamDue } from '../../dtos/Exam';

@Component({
  selector: 'app-exams',
  standalone: true,
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
  imports: [
    LeftBarComponent,
    NavBarComponent,
    DueExamsComponent,
    DoneExamsComponent,
  ],
})
export class ExamsComponent implements OnInit {

  examenesHechos!: ExamDone[];
  examenesPendientes!: ExamDue[];
  nombreCurso!: string;


  constructor(private router: ActivatedRoute,
      private estudianteService: EstudianteService,
      private courseService: CourseService,
      private userActivo: UserActivoService
  ) {}

  ngOnInit() {

    this.nombreCurso = this.courseService.getCourse().nombre_curso;
    this.loadExamsPendientes();
    this.loadExamsHechos();
  }

  loadExamsPendientes() {

    let exam = new ExamDTO(this.userActivo.getId(), this.courseService.getCourse().id_grupo);

    
    this.estudianteService.getExamsPendientes(exam).subscribe(
      (data) => {
        console.log("Exams pendientes");
        this.examenesPendientes = data.respuesta;
        console.log(this.examenesPendientes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadExamsHechos() {

    let exam = new ExamDTO(this.userActivo.getId(), this.courseService.getCourse().id_grupo);

    this.estudianteService.getExamsHechos(exam).subscribe(
      (data) => {
        this.examenesHechos = data.respuesta;
        console.log(this.examenesHechos);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
