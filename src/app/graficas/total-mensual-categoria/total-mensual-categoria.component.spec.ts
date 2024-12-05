import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMensualCategoriaComponent } from './total-mensual-categoria.component';

describe('TotalMensualCategoriaComponent', () => {
  let component: TotalMensualCategoriaComponent;
  let fixture: ComponentFixture<TotalMensualCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalMensualCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalMensualCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
