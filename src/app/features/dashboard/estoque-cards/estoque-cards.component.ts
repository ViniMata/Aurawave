import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttService } from '../../services/mqtt.service';

@Component({
  selector: 'app-estoque-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque-cards.component.html',
  styleUrls: ['./estoque-cards.component.scss']
})
export class EstoqueCardsComponent implements OnInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef<HTMLDivElement>;
  @Output() itemSelecionado = new EventEmitter<string>();

  sessionAtiva = false;

  // estoque inicial
  estoque = [
    { nome: 'Garrafa', quantidade: 1 }
  ];

  constructor(private mqttService: MqttService) {}

  ngOnInit() {
  this.mqttService.mensagemRecebida.subscribe((msg: any) => {
    try {
      console.log('[ESTOQUE] Mensagem recebida:', msg);

      // Alterna sessão quando Pedro entra/sai
      if (msg.eventType === 'access') {
        this.sessionAtiva = !this.sessionAtiva;
        console.log('[ESTOQUE] Sessão alterada. Ativa?', this.sessionAtiva);
      }

      // Pedro pega a garrafa
      if (msg.eventType === 'item' && this.sessionAtiva) {
        const item = this.estoque.find(i => i.nome === 'Garrafa');
        if (item) item.quantidade = 0;
        console.log('[ESTOQUE] Item retirado, estoque atualizado:', this.estoque);
      }

    } catch (e) {
      console.error('Erro ao processar mensagem MQTT', e, msg);
    }
  });
}


  scrollLeft() {
    if (!this.cardsContainer) return;
    const cardEl = this.cardsContainer.nativeElement.querySelector('.card') as HTMLElement;
    if (!cardEl) return;
    const cardWidth = cardEl.offsetWidth;
    const gap = 16;
    const cardsToScroll = 5;
    this.cardsContainer.nativeElement.scrollBy({ left: -(cardWidth + gap) * cardsToScroll, behavior: 'smooth' });
  }

  scrollRight() {
    if (!this.cardsContainer) return;
    const cardEl = this.cardsContainer.nativeElement.querySelector('.card') as HTMLElement;
    if (!cardEl) return;
    const cardWidth = cardEl.offsetWidth;
    const gap = 16;
    const cardsToScroll = 5;
    this.cardsContainer.nativeElement.scrollBy({ left: (cardWidth + gap) * cardsToScroll, behavior: 'smooth' });
  }

  selecionarItem(nome: string) {
    this.itemSelecionado.emit(nome);
    console.log(nome);
  }
}
