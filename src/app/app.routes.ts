import { Routes } from '@angular/router';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { DefaultViewComponent } from './views/default-view/default-view.component';
import { HomeComponent } from './views/home/home.component';
import { ExamsComponent } from './views/exams/exams.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CodigoPasswordComponent } from './codigo-password/codigo-password.component';
import { InformacionCursoComponent } from './views/informacion-curso/informacion-curso.component';
import { SyllabusComponent } from './views/syllabus/syllabus.component';
import { ExamComponent } from './views/exam/exam.component';
import { AgregarPreguntaComponent } from './views/agregar-pregunta/agregar-pregunta.component';

import { HomeDocenteComponent } from './views/home-docente/home-docente.component';
import { CursosDocenteComponent } from './views/cursos-docente/cursos-docente.component';
import { ListaEstudiantesComponent } from './views/lista-estudiantes/lista-estudiantes.component';
import { TestComponent } from './views/test/test.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'default-view', component: DefaultViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'recovery-code', component: CodigoPasswordComponent },
  { path: 'info-curso', component: InformacionCursoComponent },
  { path: 'syllabus/:course', component: SyllabusComponent },
  { path: 'exam/:id', component: ExamComponent },

  { path: 'agregar-pregunta', component: AgregarPreguntaComponent },
  { path: 'home-docente', component: HomeDocenteComponent },
  { path: 'curso-docente', component: CursosDocenteComponent },
  { path: 'lista-estudiantes', component: ListaEstudiantesComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];
