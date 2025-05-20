import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeftbarService {
  seePendingExams() {
    throw new Error('Method not implemented.');
  }

  constructor() { }



  seeCourses(){
    console.log("Courses");
  }

  seeExams(){
    console.log("Exams");
  }
    
}
