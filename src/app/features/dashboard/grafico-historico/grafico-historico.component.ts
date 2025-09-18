import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { graficoMockCompleto } from '../../../../mock-historico';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-historico',
  standalone: true,
  templateUrl: './grafico-historico.component.html',
  styleUrls: ['./grafico-historico.component.scss']
})
export class GraficoHistoricoComponent implements AfterViewInit, OnChanges {

  @Input() filtroInsumo: string | null = null;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  graficoMock = graficoMockCompleto;
  chart!: Chart;

  ngAfterViewInit() {
    this.atualizarGrafico(); // inicia vazio
  }

  ngOnChanges(changes: SimpleChanges) {
  if (changes['filtroInsumo']) {
    this.atualizarGrafico();
  }
}

  atualizarGrafico() {
    if (!this.canvas) return;

    const ctx = this.canvas.nativeElement;
    const labels = this.graficoMock[0].historico.map(h => h.data);

    const datasets = this.graficoMock
      .filter(insumo => this.filtroInsumo ? insumo.nome === this.filtroInsumo : false)
      .map(insumo => ({
        label: insumo.nome,
        data: insumo.historico.map(h => h.quantidade),
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false
      }));

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
