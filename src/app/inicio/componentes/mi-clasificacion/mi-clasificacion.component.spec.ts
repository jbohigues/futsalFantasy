import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiClasificacionComponent } from './mi-clasificacion.component';

describe('MiClasificacionComponent', () => {
  let component: MiClasificacionComponent;
  let fixture: ComponentFixture<MiClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiClasificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
