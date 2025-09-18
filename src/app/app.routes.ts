import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { TabelaLogsComponent } from './features/tabela-logs/tabela-logs.component';



export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'tabela-logs', component: TabelaLogsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
