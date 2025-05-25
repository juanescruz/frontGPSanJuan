// En src/app/components/item-docente-exam/item-docente-exam.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core'; // Añadido Output y EventEmitter
import { ExamenDocenteDTO } from '../../dtos/ExamenDocenteDTO';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-docente-exam',
  standalone: true,
  imports: [CommonModule], // Bootstrap Icons se importan globalmente o en angular.json/index.html
  providers: [DatePipe],
  templateUrl: './item-docente-exam.component.html',
  styleUrl: './item-docente-exam.component.css'
})
export class ItemDocenteExamComponent {
  @Input() item!: ExamenDocenteDTO;
  // Si quieres que el componente padre (ListExamsComponent) maneje la lógica de eliminación:
  @Output() onEliminar = new EventEmitter<number>();

  constructor(private router: Router, private datePipe: DatePipe) { }

  get fechaInicioFormateada(): string {
    if (!this.item || !this.item.fecha_hora_inicio) return 'N/A';
    try {
      return this.datePipe.transform(this.item.fecha_hora_inicio, 'dd/MM/yyyy HH:mm') || 'N/A';
    } catch (e) {
      console.warn("Error formateando fecha_hora_inicio:", this.item.fecha_hora_inicio, e);
      return String(this.item.fecha_hora_inicio);
    }
  }

  get fechaLimiteFormateada(): string {
    if (!this.item || !this.item.fecha_hora_limite) return 'N/A';
    try {
      return this.datePipe.transform(this.item.fecha_hora_limite, 'dd/MM/yyyy HH:mm') || 'N/A';
    } catch (e) {
      console.warn("Error formateando fecha_hora_limite:", this.item.fecha_hora_limite, e);
      return String(this.item.fecha_hora_limite);
    }
  }

  editarExamen(idExamen: number): void {
    console.log('Editar examen ID:', idExamen);
    this.router.navigate(['/docente/editar-examen', idExamen]); // Ajusta la ruta
  }

  eliminarExamen(idExamen: number): void {
    // Podrías mostrar una confirmación aquí antes de emitir
    console.log('Solicitando eliminar examen ID:', idExamen);
    this.onEliminar.emit(idExamen);
    // La lógica de llamar al servicio de backend para eliminar
    // estaría en el componente padre (ListExamsComponent) o en un servicio.
  }

  verResultados(idExamen: number): void {
    console.log('Ver resultados examen ID:', idExamen);
    this.router.navigate(['/docente/examen', idExamen, 'resultados']); // Ajusta la ruta
  }
}