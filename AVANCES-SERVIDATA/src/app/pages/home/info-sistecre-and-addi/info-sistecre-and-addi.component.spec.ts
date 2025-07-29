import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSistecreAndAddiComponent } from './info-sistecre-and-addi.component';

describe('InfoSistecreAndAddiComponent', () => {
  let component: InfoSistecreAndAddiComponent;
  let fixture: ComponentFixture<InfoSistecreAndAddiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoSistecreAndAddiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSistecreAndAddiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
