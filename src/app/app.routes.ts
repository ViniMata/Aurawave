import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { TabelaLogsComponent } from './features/tabela-logs/tabela-logs.component';
import { LoginComponent } from './features/login/login.component';



export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'tabela-logs', component: TabelaLogsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
