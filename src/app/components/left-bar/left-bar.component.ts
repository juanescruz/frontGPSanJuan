import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LeftbarService } from '../../services/ui-services/leftbar.service';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent {

  constructor(private leftService:LeftbarService){

  }


  seeCourses(){
    this.leftService.seeCourses();
  }

  seePendingExams(){
    this.leftService.seePendingExams();
  }
}
