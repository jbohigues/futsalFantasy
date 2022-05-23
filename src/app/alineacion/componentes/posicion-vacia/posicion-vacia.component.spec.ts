import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionVaciaComponent } from './posicion-vacia.component';

describe('PosicionVaciaComponent', () => {
  let component: PosicionVaciaComponent;
  let fixture: ComponentFixture<PosicionVaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosicionVaciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionVaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
