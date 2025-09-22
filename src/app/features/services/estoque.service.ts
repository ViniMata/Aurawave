import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private estoqueSubject = new BehaviorSubject<{ nome: string; quantidade: number }[]>([
    { nome: 'Garrafa', quantidade: 1 }
  ]);
  estoque$ = this.estoqueSubject.asObservable();

  atualizarItem(nome: string, quantidade: number) {
    const atual = this.estoqueSubject.value.map(item =>
      item.nome === nome ? { ...item, quantidade } : item
    );
    this.estoqueSubject.next(atual);
  }

  resetar() {
    this.estoqueSubject.next([{ nome: 'Garrafa', quantidade: 1 }]);
  }
}
