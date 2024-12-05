import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMensualComponent } from './total-mensual.component';

describe('TotalMensualComponent', () => {
  let component: TotalMensualComponent;
  let fixture: ComponentFixture<TotalMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalMensualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
