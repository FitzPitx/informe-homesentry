import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVentasMesCategoriaProveedorComponent } from './informe-ventas-mes-categoria-proveedor.component';

describe('InformeVentasMesCategoriaProveedorComponent', () => {
  let component: InformeVentasMesCategoriaProveedorComponent;
  let fixture: ComponentFixture<InformeVentasMesCategoriaProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeVentasMesCategoriaProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeVentasMesCategoriaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
