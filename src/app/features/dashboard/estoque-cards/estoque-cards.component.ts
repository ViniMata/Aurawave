import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttService } from '../../services/mqtt.service';
import { EstoqueService } from '../../services/estoque.service';
import { LogsService } from '../../services/logs.service';
import { Subject, takeUntil, Observable } from 'rxjs';

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

  constructor(
    private mqttService: MqttService,
    private estoqueService: EstoqueService,
    private logsService: LogsService
  ) {
    this.estoque$ = this.estoqueService.estoque$;
  }

  ngOnInit() {
    this.mqttService.mensagemRecebida
      .pipe(takeUntil(this.destroy$))
      .subscribe(msg => this.processarMensagem(msg));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private processarMensagem(data: any) {
    if (!data || !data.eventType) return;

    // Envia o evento para o LogsService
    this.logsService.processEvent(data);

    // Atualiza estoque se houver qualquer sessão ativa
    if (data.eventType === 'item' && Object.keys(this.logsService.activeSessions).length > 0) {
      this.estoqueService.atualizarItem('Garrafa', 0);
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
    this.itemSelecionado.emit(nome);
    console.log(nome);
  }
}
