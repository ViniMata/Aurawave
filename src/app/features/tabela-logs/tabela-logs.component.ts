import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttService } from '../services/mqtt.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tabela-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-logs.component.html',
  styleUrls: ['./tabela-logs.component.scss']
})
export class TabelaLogsComponent implements OnInit {
  private logsSubject = new BehaviorSubject<any[]>([]);
  logs$ = this.logsSubject.asObservable();

  logSelecionado: any = null;
  sessionAtiva = false;
  sessionStartTime: Date | null = null;

  constructor(private mqttService: MqttService) {}

  ngOnInit() {
    this.mqttService.mensagemRecebida.subscribe((msg: any) => {
      try {
        if (!msg.data || msg.data.trim() === "") return;

        const data = JSON.parse(msg.data);

        // Pedro inicia/finaliza sessão
        if (data.eventType === 'access') {
          if (!this.sessionAtiva) {
            this.sessionAtiva = true;
            this.sessionStartTime = new Date();
          } else {
            this.sessionAtiva = false;
            // Sessão finalizada: cria log
            const novoLog = {
              codigoItem: 'I-' + Math.floor(Math.random() * 1000),
              modelo: 'Modelo padrão',
              produto: 'Garrafa',
              dataEvento: new Date(),
              tipoEvento: 'Saída',
              sessoes: [
                {
                  numero: 1,
                  colaborador: 'Pedro',
                  almoxarifado: 'Padrão',
                  laboratorio: 'Padrão',
                  inicio: this.sessionStartTime,
                  fim: new Date()
                }
              ]
            };

            // Atualiza o BehaviorSubject
            const novosLogs = [novoLog, ...this.logsSubject.getValue()];
            this.logsSubject.next(novosLogs);
          }
        }

      } catch (e) {
        console.error('Erro ao processar log MQTT', e, msg.data);
      }
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
