import { Component } from '@angular/core';
import { EstoqueCardsComponent } from '../estoque-cards/estoque-cards.component';
import { GraficoHistoricoComponent } from '../grafico-historico/grafico-historico.component';
import { PrevisaoRecargaComponent } from '../previsao-recarga/previsao-recarga.component';
import { SidebarComponent } from '../sidebar/sidebar.component';



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
export class DashboardComponent {
  insumoFiltrado: string | null = null;

  toggleGrafico(nome: string) {
    // Toggle: se clicar no mesmo insumo, remove o gráfico
    if (this.insumoFiltrado === nome) {
      this.insumoFiltrado = null;
    } else {
      this.insumoFiltrado = nome;
    }
  }
}
