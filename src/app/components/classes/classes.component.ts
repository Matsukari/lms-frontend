import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  @Input() targetElement: HTMLElement | null = null;
  @Input() classes: any;
  visible: boolean = false;
  overlayStyle: { [key: string]: string } = {};

  ngOnInit() {
    if (this.targetElement) {
      this.updatePosition();
    }
  }

  updatePosition() {
    if (this.targetElement) {
      const rect = this.targetElement.getBoundingClientRect();
      this.overlayStyle = {
        top: `${rect.y}px`,
        left: `200px`,
      };
    }
  }

  showOverlay() {
    this.visible = true;
    this.updatePosition();
  }

  toggleOverlay() {
    this.visible = !this.visible;
    this.updatePosition()
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const region = document.getElementById('view-content');
    if (region && region.contains(event.target as Node)) {
      this.visible = false;
    }
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.visible = false;
  }
}
