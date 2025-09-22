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

  // Sessões abertas por colaborador
  public activeSessions: { [colaborador: string]: Sessao } = {};

  constructor() {}

  processEvent(event: any) {
    if (!event || !event.eventType) return;

    const name = event.log?.name || 'Usuário desconhecido';

    if (event.eventType === 'access') {
      this.handleAccess(name);
    } else if (event.eventType === 'item') {
      this.handleItem(name); // aqui name é o item
    }
  }

  private handleAccess(colaborador: string) {
    if (!this.activeSessions[colaborador]) {
      // Sessão iniciada
      this.activeSessions[colaborador] = {
        numero: 1,
        colaborador,
        almoxarifado: 'Padrão',
        laboratorio: 'Padrão',
        inicio: new Date(),
        fim: new Date(),
        itens: []
      };
    } else {
      // Sessão finalizada: cria log
      const sessao = this.activeSessions[colaborador];
      sessao.fim = new Date();

      const novoLog: Log = {
        codigoItem: 'I-' + Math.floor(Math.random() * 10000),
        modelo: 'Modelo padrão',
        produto: 'Garrafa',
        dataEvento: new Date(),
        tipoEvento: 'Saída',
        sessoes: [sessao]
      };

      this.logsSubject.next([novoLog, ...this.logsSubject.value]);

      delete this.activeSessions[colaborador];
    }
  }

  private handleItem(item: string) {
    // Adiciona o item a todas as sessões ativas
    Object.keys(this.activeSessions).forEach(colaborador => {
      const sessao = this.activeSessions[colaborador];
      sessao.itens = sessao.itens || [];
      sessao.itens.push(item);
      console.log(`[LogsService] Item retirado: ${item} por ${colaborador}`);
    });
  }
}
