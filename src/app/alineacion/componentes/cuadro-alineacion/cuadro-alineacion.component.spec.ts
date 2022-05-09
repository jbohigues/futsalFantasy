import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroAlineacionComponent } from './cuadro-alineacion.component';

describe('CuadroAlineacionComponent', () => {
  let component: CuadroAlineacionComponent;
  let fixture: ComponentFixture<CuadroAlineacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadroAlineacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroAlineacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
