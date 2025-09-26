import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { LogsService } from '../../services/logs.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-estoque-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque-cards.component.html',
  styleUrls: ['./estoque-cards.component.scss']
})
export class EstoqueCardsComponent implements OnInit, OnDestroy {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef<HTMLDivElement>;
  @Output() itemSelecionado = new EventEmitter<string>();

  estoque$: Observable<{ nome: string; quantidade: number }[]>;
  private destroy$ = new Subject<void>();

  private sessionAtiva = false;
  private sessionStartTime: Date | null = null;
  
  selectedItem: string = '';
  scrollPosition: number = 0;

  constructor(
    private estoqueService: EstoqueService,
    private logsService: LogsService
  ) {
    this.estoque$ = this.estoqueService.estoque$;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Captura as teclas
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'p') {
      this.iniciarSessao();
    } else if (event.key === 'o') {
      this.retirarItem();
    } else if (event.key === 'i') {
      this.finalizarSessao();
    }
  }

  private iniciarSessao() {
    if (!this.sessionAtiva) {
      this.sessionAtiva = true;
      this.sessionStartTime = new Date();
      console.log('[Sessão] Iniciada por Pedro em', this.sessionStartTime);
    }
  }

  private retirarItem() {
    if (this.sessionAtiva) {
      this.estoqueService.atualizarItem('Garrafa', 0);
      console.log('[Estoque] Pedro retirou uma garrafa');
    }
  }

  private finalizarSessao() {
    if (this.sessionAtiva && this.sessionStartTime) {
      this.sessionAtiva = false;

      const novoLog = {
        codigoItem: 'I-' + Math.floor(Math.random() * 10000),
        modelo: 'Modelo padrão',
        produto: 'Garrafa',
        dataEvento: new Date(),
        tipoEvento: 'Saída',
        sessoes: [
          {
            numero: 1,
            colaborador: 'Pedro',
            almoxarifado: 'Padrão',
            laboratorio: 'Padrão',
            inicio: this.sessionStartTime,
            fim: new Date(),
            itens: ['Garrafa']
          }
        ]
      };

      this.logsService.adicionarLog(novoLog);
      console.log('[Sessão] Finalizada e log criado:', novoLog);
    }
  }

  scrollLeft() {
    const cardEl = this.cardsContainer?.nativeElement.querySelector('.card') as HTMLElement;
    if (!cardEl) return;
    this.cardsContainer.nativeElement.scrollBy({ left: -(cardEl.offsetWidth + 16) * 5, behavior: 'smooth' });
  }

  scrollRight() {
    const cardEl = this.cardsContainer?.nativeElement.querySelector('.card') as HTMLElement;
    if (!cardEl) return;
    this.cardsContainer.nativeElement.scrollBy({ left: (cardEl.offsetWidth + 16) * 5, behavior: 'smooth' });
  }

  selecionarItem(nome: string) {
    this.selectedItem = nome;
    this.itemSelecionado.emit(nome);
    console.log(nome);
  }

  trackByItem(index: number, item: { nome: string; quantidade: number }): string {
    return item.nome;
  }

  getStatusClass(quantidade: number): string {
    if (quantidade <= 50) return 'critical';
    if (quantidade <= 150) return 'low';
    return 'normal';
  }

  getStatusText(quantidade: number): string {
    if (quantidade <= 50) return 'Crítico';
    if (quantidade <= 150) return 'Baixo';
    return 'Normal';
  }

  getProgressWidth(quantidade: number): number {
    const max = 500; // Assumindo 500 como quantidade máxima
    return Math.min((quantidade / max) * 100, 100);
  }
}
