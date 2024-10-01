import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoVentas3AnosComponent } from './comparativo-ventas-3-anos.component';

describe('ComparativoVentas3AnosComponent', () => {
  let component: ComparativoVentas3AnosComponent;
  let fixture: ComponentFixture<ComparativoVentas3AnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparativoVentas3AnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparativoVentas3AnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
