import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogsService {
  private logsSubject = new BehaviorSubject<any[]>([]);
  logs$ = this.logsSubject.asObservable();

  adicionarLog(log: any) {
    this.logsSubject.next([log, ...this.logsSubject.value]);
  }
}
