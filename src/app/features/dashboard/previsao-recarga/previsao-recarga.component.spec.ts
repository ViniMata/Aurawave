import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisaoRecargaComponent } from './previsao-recarga.component';

describe('PrevisaoRecargaComponent', () => {
  let component: PrevisaoRecargaComponent;
  let fixture: ComponentFixture<PrevisaoRecargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisaoRecargaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevisaoRecargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
