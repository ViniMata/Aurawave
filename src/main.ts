import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

console.log('Rodando bootstrap...');
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // <- ESSENCIAL
  ]
}).catch((err) => console.error(err));
