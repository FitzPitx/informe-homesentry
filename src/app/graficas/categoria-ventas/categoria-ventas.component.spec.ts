import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaVentasComponent } from './categoria-ventas.component';

describe('CategoriaVentasComponent', () => {
  let component: CategoriaVentasComponent;
  let fixture: ComponentFixture<CategoriaVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
