import {Injectable } from '@angular/core';
import { Course } from '../../dtos/estudiante/Course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamDone } from '../../dtos/ExamDone';
import { CourseInfo } from '../../dtos/CourseInfo';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  

  constructor(private http:HttpClient) { }


}
