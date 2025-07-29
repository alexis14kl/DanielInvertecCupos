import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorDeCreditoComponent } from './simulador-de-credito.component';

describe('SimuladorDeCreditoComponent', () => {
  let component: SimuladorDeCreditoComponent;
  let fixture: ComponentFixture<SimuladorDeCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorDeCreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorDeCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
