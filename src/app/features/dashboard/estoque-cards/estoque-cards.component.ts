import { Component, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { graficoMockCompleto } from '../../../../mock-historico';

@Component({
  selector: 'app-estoque-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque-cards.component.html',
  styleUrls: ['./estoque-cards.component.scss']
})
export class EstoqueCardsComponent {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef<HTMLDivElement>;

  estoqueMock = [
    { nome: 'Luvas', quantidade: 50 },
    { nome: 'Seringas', quantidade: 30 },
    { nome: 'Algodão', quantidade: 20 },
    { nome: 'Máscaras cirúrgicas', quantidade: 100 },
    { nome: 'Álcool 70%', quantidade: 40 },
    { nome: 'Pipetas', quantidade: 60 },
    { nome: 'Tubos de ensaio', quantidade: 80 },
    { nome: 'Placas de Petri', quantidade: 25 },
    { nome: 'Micropipetas', quantidade: 15 },
    { nome: 'Lamínulas', quantidade: 50 },
    { nome: 'Lâminas para microscópio', quantidade: 50 },
    { nome: 'Bico de Bunsen', quantidade: 10 },
    { nome: 'Espátulas', quantidade: 20 },
    { nome: 'Frascos reagentes', quantidade: 30 },
    { nome: 'Balões volumétricos', quantidade: 10 }
  ];

  

  scrollLeft() {
  const cardEl = this.cardsContainer.nativeElement.querySelector('.card') as HTMLElement;
  const cardWidth = cardEl?.offsetWidth || 0;
  const gap = 16;
  const cardsToScroll = 5;
  this.cardsContainer.nativeElement.scrollBy({ left: -(cardWidth + gap) * cardsToScroll, behavior: 'smooth' });
}

scrollRight() {
  const cardEl = this.cardsContainer.nativeElement.querySelector('.card') as HTMLElement;
  const cardWidth = cardEl?.offsetWidth || 0;
  const gap = 16;
  const cardsToScroll = 5;
  this.cardsContainer.nativeElement.scrollBy({ left: (cardWidth + gap) * cardsToScroll, behavior: 'smooth' });
}

   
  
  selecionarItem(nome: string) {
    this.itemSelecionado.emit(nome);
    console.log(nome);
  }
  @Output() itemSelecionado = new EventEmitter<string>();
}
