import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { EstoqueCardsComponent } from './features/dashboard/estoque-cards/estoque-cards.component';
import { GraficoHistoricoComponent } from './features/dashboard/grafico-historico/grafico-historico.component';
import { PrevisaoRecargaComponent } from './features/dashboard/previsao-recarga/previsao-recarga.component';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';
import { TabelaLogsComponent } from './features/tabela-logs/tabela-logs.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'estoque-dashboard';
}
