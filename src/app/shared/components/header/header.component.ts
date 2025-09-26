import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() sidebarCollapse = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleSidebarCollapse() {
    this.sidebarCollapse.emit();
  }
}