import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private isCollapsedSubject = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpenSubject.asObservable();
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  get isOpen(): boolean {
    return this.isOpenSubject.value;
  }

  get isCollapsed(): boolean {
    return this.isCollapsedSubject.value;
  }

  toggleSidebar(): void {
    this.isOpenSubject.next(!this.isOpen);
  }

  toggleCollapse(): void {
    this.isCollapsedSubject.next(!this.isCollapsed);
  }

  setSidebarOpen(isOpen: boolean): void {
    this.isOpenSubject.next(isOpen);
  }

  setSidebarCollapsed(isCollapsed: boolean): void {
    this.isCollapsedSubject.next(isCollapsed);
  }
}