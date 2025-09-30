import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarService } from './core/services/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'estoque-dashboard';
  private destroy$ = new Subject<void>();
  
  isOpen = false;
  isCollapsed = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Escutar mudanças no estado da sidebar
    this.sidebarService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => this.isOpen = isOpen);

    this.sidebarService.isCollapsed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isCollapsed => this.isCollapsed = isCollapsed);

    // Definir sidebar como aberta em desktop
    if (window.innerWidth >= 1200) {
      this.sidebarService.setSidebarOpen(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  onToggleCollapse(): void {
    this.sidebarService.toggleCollapse();
  }

  closeSidebar(): void {
    if (window.innerWidth <= 768) {
      this.sidebarService.setSidebarOpen(false);
    }
  }
}
