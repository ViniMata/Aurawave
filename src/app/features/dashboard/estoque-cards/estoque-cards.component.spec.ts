import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueCardsComponent } from './estoque-cards.component';

describe('EstoqueCardsComponent', () => {
  let component: EstoqueCardsComponent;
  let fixture: ComponentFixture<EstoqueCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
