import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


  showMessage(message: string) {
    Swal.fire({
      title: "Oops!",
      text: message,
      icon: "question"
    });
  }
}
