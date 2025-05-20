export class ExamDTO{
    id_alumno!: String;
    id_grupo!: number;

    constructor(id_alumno: String, id_grupo: number){
        this.id_alumno = id_alumno;
        this.id_grupo = id_grupo;
    }

    getIdAlumno(){
        return this.id_alumno;
    }

    getIdGrupo(){
        return this.id_grupo;
    }

    setIdAlumno(id_alumno: String){
        this.id_alumno = id_alumno;
    }

    setIdGrupo(id_grupo: number){
        this.id_grupo = id_grupo;
    }
}