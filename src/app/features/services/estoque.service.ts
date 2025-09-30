import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface EstoqueItem {
  nome: string;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private estoqueSubject = new BehaviorSubject<EstoqueItem[]>([
    { nome: 'Garrafa', quantidade: 1 }
  ]);

  estoque$ = this.estoqueSubject.asObservable();

  atualizarItem(nome: string, quantidade: number) {
    // Cria um novo array para disparar o Observable
    const novoEstoque = this.estoqueSubject.value.map(item =>
      item.nome === nome ? { ...item, quantidade } : item
    );
    this.estoqueSubject.next(novoEstoque);
  }

  // Opcional: adicionar novos itens
  adicionarItem(item: EstoqueItem) {
    const novoEstoque = [...this.estoqueSubject.value, item];
    this.estoqueSubject.next(novoEstoque);
  }
}
