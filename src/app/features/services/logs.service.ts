import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Sessao {
  numero: number;
  colaborador: string;
  almoxarifado: string;
  laboratorio: string;
  inicio: Date;
  fim: Date;
  itens?: string[];
}

interface Log {
  codigoItem: string;
  modelo?: string;
  produto?: string;
  dataEvento: Date;
  tipoEvento?: string;
  sessoes?: Sessao[];
}

@Injectable({ providedIn: 'root' })
export class LogsService {
  private logsSubject = new BehaviorSubject<Log[]>([]);
  logs$ = this.logsSubject.asObservable();

  adicionarLog(log: Log) {
    this.logsSubject.next([log, ...this.logsSubject.value]);
  }
}
