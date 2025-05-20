export class LoginDTO {
    rol!: string;
    id!: string;

    constructor(rol: string, id: string) {
        this.rol = rol;
        this.id = id;
    }

    getRol() {
        return this.rol;
    }

    getId() {
        return this.id;
    }
       
}