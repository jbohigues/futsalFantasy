import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroClasificacionComponent } from './cuadro-clasificacion.component';

describe('CuadroClasificacionComponent', () => {
  let component: CuadroClasificacionComponent;
  let fixture: ComponentFixture<CuadroClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadroClasificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
