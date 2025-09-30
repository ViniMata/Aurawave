import { Component, OnInit } from '@angular/core';
import { EstoqueCardsComponent } from '../estoque-cards/estoque-cards.component';
import { GraficoHistoricoComponent } from '../grafico-historico/grafico-historico.component';
import { PrevisaoRecargaComponent } from '../previsao-recarga/previsao-recarga.component';
import { MqttService } from '../../services/mqtt.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    EstoqueCardsComponent,
    GraficoHistoricoComponent,
    PrevisaoRecargaComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  insumoFiltrado: string | null = null;

  // Apenas para testar se a mensagem chegou
  ultimaMensagem: string | null = null;

  constructor(private mqttService: MqttService) {}

  ngOnInit(): void {
    this.mqttService.connect();

    // Apenas loga a mensagem e guarda para teste, sem interferir nos cards
    this.mqttService.mensagemRecebida.subscribe(msg => {
      console.log('[MQTT recebido]', msg);
      this.ultimaMensagem = JSON.stringify(msg);
    });

    // Loga o status da conexão também
    this.mqttService.statusConexao.subscribe(status => {
      console.log('[MQTT status]', status ? 'Conectado' : 'Desconectado');
    });
  }

  toggleGrafico(nome: string) {
    if (this.insumoFiltrado === nome) {
      this.insumoFiltrado = null;
    } else {
      this.insumoFiltrado = nome;
    }
  }
}
