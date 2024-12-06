import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUtilidadMensualComponent } from './total-utilidad-mensual.component';

describe('TotalUtilidadMensualComponent', () => {
  let component: TotalUtilidadMensualComponent;
  let fixture: ComponentFixture<TotalUtilidadMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalUtilidadMensualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalUtilidadMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
