import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { graficoMockCompleto } from '../../../../mock-historico';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-historico',
  standalone: true,
  imports: [CommonModule],
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
        borderColor: '#015efe',
        backgroundColor: 'rgba(1, 94, 254, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#015efe',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#015efe',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3
      }));

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#050505',
            bodyColor: '#64748b',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 12,
            titleFont: {
              family: 'Inter',
              size: 14,
              weight: 600
            },
            bodyFont: {
              family: 'Inter',
              size: 13
            },
            displayColors: false,
            callbacks: {
              title: function(context) {
                return `Data: ${context[0].label}`;
              },
              label: function(context) {
                return `Quantidade: ${context.parsed.y} unidades`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                family: 'Inter',
                size: 12
              },
              maxRotation: 0
            }
          },
          y: {
            beginAtZero: true,
            display: true,
            grid: {
              color: '#f1f5f9'
            },
            border: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                family: 'Inter',
                size: 12
              },
              callback: function(value) {
                return value + ' un';
              }
            }
          }
        },
        elements: {
          point: {
            hoverBorderWidth: 3
          }
        }
      }
    });
  }
}
