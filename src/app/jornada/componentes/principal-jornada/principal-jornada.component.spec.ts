import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalJornadaComponent } from './principal-jornada.component';

describe('PrincipalJornadaComponent', () => {
  let component: PrincipalJornadaComponent;
  let fixture: ComponentFixture<PrincipalJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalJornadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
