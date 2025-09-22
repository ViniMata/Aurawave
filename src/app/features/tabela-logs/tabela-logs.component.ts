import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LogsService } from '../services/logs.service';
import { MqttService } from '../services/mqtt.service';

@Component({
  selector: 'app-tabela-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-logs.component.html',
  styleUrls: ['./tabela-logs.component.scss']
})
export class TabelaLogsComponent implements OnInit {
  logs$: Observable<any[]>;
  logSelecionado: any = null;

  constructor(private logsService: LogsService, private mqttService: MqttService) {
    this.logs$ = this.logsService.logs$;
  }

  ngOnInit() {
    // Recebe eventos MQTT e envia para o LogsService
    this.mqttService.mensagemRecebida.subscribe(event => {
      this.logsService.processEvent(event);
    });
  }

  abrirItens(log: any, event: Event) {
    event.preventDefault();
    this.logSelecionado = log;
  }

  fecharModal() {
    this.logSelecionado = null;
  }
}
