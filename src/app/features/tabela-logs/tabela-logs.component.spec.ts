import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaLogsComponent } from './tabela-logs.component';

describe('TabelaLogsComponent', () => {
  let component: TabelaLogsComponent;
  let fixture: ComponentFixture<TabelaLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
