import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalClasificacionComponent } from './principal-clasificacion.component';

describe('PrincipalClasificacionComponent', () => {
  let component: PrincipalClasificacionComponent;
  let fixture: ComponentFixture<PrincipalClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalClasificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
