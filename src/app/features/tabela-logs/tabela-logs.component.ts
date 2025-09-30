import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LogsService } from '../services/logs.service';


@Component({
  selector: 'app-tabela-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-logs.component.html',
  styleUrls: ['./tabela-logs.component.scss']
})
export class TabelaLogsComponent {
  logs$: Observable<any[]>;
  logSelecionado: any = null;

  constructor(private logsService: LogsService) {
    this.logs$ = this.logsService.logs$;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getEventClass(tipoEvento: string): string {
    const tipo = tipoEvento?.toLowerCase() || 'acesso';
    
    switch (tipo) {
      case 'acesso':
        return 'event-access';
      case 'retirada':
        return 'event-removal';
      case 'reposição':
      case 'reposicao':
        return 'event-restock';
      case 'erro':
        return 'event-error';
      default:
        return 'event-default';
    }
  }

  calcularDuracao(inicio: Date | string, fim: Date | string): string {
    if (!inicio || !fim) {
      return 'N/A';
    }

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    
    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
      return 'N/A';
    }

    const diferencaMs = dataFim.getTime() - dataInicio.getTime();
    
    if (diferencaMs < 0) {
      return 'N/A';
    }

    const segundos = Math.floor(diferencaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) {
      const minutosRestantes = minutos % 60;
      return `${horas}h ${minutosRestantes}min`;
    } else if (minutos > 0) {
      const segundosRestantes = segundos % 60;
      return `${minutos}min ${segundosRestantes}s`;
    } else {
      return `${segundos}s`;
    }
  }

  abrirItens(log: any, event: Event) {
    event.preventDefault();
    this.logSelecionado = log;
  }

  fecharModal() {
    this.logSelecionado = null;
  }
}
