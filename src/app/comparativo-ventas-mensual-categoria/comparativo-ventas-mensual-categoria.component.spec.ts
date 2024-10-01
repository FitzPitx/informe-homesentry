import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoVentasMensualCategoriaComponent } from './comparativo-ventas-mensual-categoria.component';

describe('ComparativoVentasMensualCategoriaComponent', () => {
  let component: ComparativoVentasMensualCategoriaComponent;
  let fixture: ComponentFixture<ComparativoVentasMensualCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparativoVentasMensualCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparativoVentasMensualCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
