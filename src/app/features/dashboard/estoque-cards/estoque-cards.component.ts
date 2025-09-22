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

  sessionAtiva = false;
  sessionStartTime: Date | null = null;
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

  processarMensagem(data: any) {
    // ⚡ agora msg já é objeto JSON, sem data
    if (!data || !data.eventType) return;

    if (data.eventType === 'access') {
      if (!this.sessionAtiva) {
        this.sessionAtiva = true;
        this.sessionStartTime = new Date();
      } else {
        this.sessionAtiva = false;
        // Criar log ao finalizar sessão
        const novoLog = {
          codigoItem: 'I-' + Math.floor(Math.random() * 1000),
          modelo: 'Modelo padrão',
          produto: 'Garrafa',
          dataEvento: new Date(),
          tipoEvento: 'Saída',
          sessoes: [
            {
              numero: 1,
              colaborador: data.log?.name || 'Pedro',
              almoxarifado: 'Padrão',
              laboratorio: 'Padrão',
              inicio: this.sessionStartTime,
              fim: new Date()
            }
          ]
        };
        this.logsService.adicionarLog(novoLog);
      }
    }

    if (data.eventType === 'item' && this.sessionAtiva) {
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
