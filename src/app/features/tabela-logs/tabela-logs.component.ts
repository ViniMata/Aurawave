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

  abrirItens(log: any, event: Event) {
    event.preventDefault();
    this.logSelecionado = log;
  }

  fecharModal() {
    this.logSelecionado = null;
  }
}
