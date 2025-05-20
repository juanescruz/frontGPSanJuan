import { Component } from '@angular/core';
import { CourseComponent } from "../../components/course/course.component";
import { PendingExamComponent } from "../../components/pending-exam/pending-exam.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { LeftBarComponent } from "../../components/left-bar/left-bar.component";
import { UserServiceService } from '../../services/ui-services/user-service.service';
import { Course } from '../../dtos/estudiante/Course';
import { DocenteService } from '../../services/http-services/docente.service';
import { UserActivoService } from '../../services/general-service/user-activo.service';

@Component({
    selector: 'app-home-docente',
    standalone: true,
    templateUrl: './home-docente.component.html',
    styleUrl: './home-docente.component.css',
    imports: [CourseComponent, PendingExamComponent, NavBarComponent, LeftBarComponent]
})
export class HomeDocenteComponent {

    courses?: Course[];
    nombre: string;

    constructor(private userService: UserServiceService,
        private docenteService: DocenteService,
        private userActivo: UserActivoService
    ) {
        this.courses = [];
        this.nombre = '';
    }

    ngOnInit(): void {


        this.loadName();
        this.loadCourses();
    }


    loadName() {
        console.log("ID: "+this.userActivo.getId()+"ROLE: "+this.userActivo.getRol())
        this.docenteService.getName(this.userActivo.getId(), this.userActivo.getRol()).subscribe(
            (data) => {
                if(data.error == false) {
                    console.log("Obtener nombre: "+data);
                    this.nombre = data.mensaje;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }


    loadCourses() {
        this.docenteService.getCourses(this.userActivo.getId(), "docente").subscribe(
            (data) => {
                if(data.error == false) {
                    data.respuesta.forEach((element: Course) => {
                        this.courses?.push(element);
                    });
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

        
}
