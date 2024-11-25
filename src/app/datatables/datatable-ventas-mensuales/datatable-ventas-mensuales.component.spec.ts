import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableVentasMensualesComponent } from './datatable-ventas-mensuales.component';

describe('DatatableVentasMensualesComponent', () => {
  let component: DatatableVentasMensualesComponent;
  let fixture: ComponentFixture<DatatableVentasMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatableVentasMensualesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableVentasMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
