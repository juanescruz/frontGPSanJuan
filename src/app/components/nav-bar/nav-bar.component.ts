import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  @Input('style') style!: string;
  @Input('username') username: string = 'Mclovin';

  ngOnInit(): void {
    if (!this.style) {
      this.style = '';
    }
  }
}
