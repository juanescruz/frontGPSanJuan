import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CardComponent } from '../../components/card/card.component';
import { SingleChoiceQuestionComponent } from '../../components/single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from '../../components/multiple-choice-question/multiple-choice-question.component';
import { MultipartQuestionComponent } from '../../components/multipart-question/multipart-question.component';
import { FormsModule } from '@angular/forms';
import { TruFalseQuestionComponent } from '../../components/tru-false-question/tru-false-question.component';
import { VerdaderoFalsoComponent } from '../../components/verdadero-falso/verdadero-falso.component';
import { True_False } from '../../dtos/TiposPreguntas/True_False';
import { SimpleQuestion } from '../../dtos/TiposPreguntas/SimpleQuestion';
import { MultipartQuestion } from '../../dtos/TiposPreguntas/Multipart';
import { ExamService } from '../../services/http-services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientInMemoryWebApiModule,
  InMemoryWebApiModule,
} from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../services/http-services/in-memory-data.service';
import { MensajeDTO } from '../../dtos/GlobalDTO/MensajeDTO';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    NavBarComponent,
    CardComponent,
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent,
    MultipartQuestionComponent,
    VerdaderoFalsoComponent,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule,
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit {
  constructor(
    private examenService: ExamService,
    private route: ActivatedRoute
  ) {}

  exam_title!: string;
  time!: number;
  questions!: (SimpleQuestion | MultipartQuestion | True_False)[];
  exam_id!: number;

  points: number = 0;

  checked: boolean[] = [];
  initialTime!: number;
  timeString: string = '';
  gradesStyle!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.exam_id = parseInt(params.get('id')!);

      this.examenService
        .getExamByID(this.exam_id)
        .subscribe((res: MensajeDTO) => {
          console.log(`res is ${JSON.stringify(res)}`);
          this.time = parseInt(res.respuesta.time);
          this.initialTime = this.time;
          this.exam_title = res.respuesta.title;
          this.questions = res.respuesta.questions;
          setInterval(() => {
            this.updateTime();
          }, 1000);
          for (let question of this.questions) {
            this.checked.push(true);
          }
        });
    });
  }

  updateTime() {
    if (this.time <= 0) return;
    this.time = this.time - 1;
    let hours = Math.floor(this.time / 3600);
    let minutes = Math.floor((this.time - hours * 3600) / 60);
    let seconds = Math.floor(this.time - hours * 3600 - minutes * 60);
    this.timeString = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} `;

    let grades = this.parseTimeToGrades(this.time);
    this.gradesStyle = `clip-path: path("${this.parseGradesToPath(
      grades,
      120,
      120
    )}");`;
  }

  parseTimeToGrades(time: number) {
    return (this.time / this.initialTime) * 360;
  }

  parseGradesToPath(grades: number, height: number, width: number) {
    let { x, y } = { x: width / 2, y: height / 2 };
    let path = 'M' + x + ',' + y + ' L0,0';
    if (grades >= 90) path += ' L0,' + height;
    else {
      path += ' L0,' + height * ((grades % 90) / 90);
      path += ' Z';
      return path;
    }
    if (grades >= 180) path += ' L' + width + ',120';
    else {
      path += ' L' + width * ((grades % 90) / 90) + ',' + height;
      path += ' Z';
      return path;
    }
    if (grades >= 270) path += ' L' + width + ',0';
    else {
      path += ' L' + width + ',' + height * (1 - (grades % 90) / 90);
      path += ' Z';
      return path;
    }
    path += ' L' + width * (1 - (grades % 90) / 90) + ',0';
    path += ' Z';
    return path;
  }

  submitExam() {
    this.examenService
      .postExam({
        id_estudiante: 1,
        id_examen: this.exam_id,
        nota: this.points,
      })
      .subscribe((res) =>
        console.log(`response from server is ${JSON.stringify(res)}`)
      );
  }

  changeGrade(responseData: { points: number; index: number }) {
    this.points += responseData.points;
    this.checked[responseData.index] = false;
    console.log(`points are currently ${this.points}`);
  }
}
