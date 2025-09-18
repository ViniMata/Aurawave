import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-logs.component.html',
  styleUrls: ['./tabela-logs.component.scss']
})
export class TabelaLogsComponent {
  logsMock = [
    {
      codigoItem: 'I-101',
      modelo: 'Modelo A',
      produto: 'Luvas',
      dataEvento: new Date('2025-09-10T08:00'),
      tipoEvento: 'Entrada',
      sessoes: [
        { numero: 'S-001', colaborador: 'João', almoxarifado: 'Almox 1', laboratorio: 'Lab 1', inicio: new Date('2025-09-10T08:00'), fim: new Date('2025-09-10T12:00') },
        { numero: 'S-002', colaborador: 'Maria', almoxarifado: 'Almox 2', laboratorio: 'Lab 2', inicio: new Date('2025-09-10T13:00'), fim: new Date('2025-09-10T17:00') }
      ]
    },
    {
      codigoItem: 'I-102',
      modelo: 'Modelo B',
      produto: 'Máscara',
      dataEvento: new Date('2025-09-11T09:00'),
      tipoEvento: 'Saída',
      sessoes: [
        { numero: 'S-003', colaborador: 'Carlos', almoxarifado: 'Almox 1', laboratorio: 'Lab 1', inicio: new Date('2025-09-11T09:00'), fim: new Date('2025-09-11T11:00') }
      ]
    }
  ];

  logSelecionado: any = null;

  abrirItens(log: any, event: Event) {
    event.preventDefault();
    this.logSelecionado = log;
  }

  fecharModal() {
    this.logSelecionado = null;
  }
}
