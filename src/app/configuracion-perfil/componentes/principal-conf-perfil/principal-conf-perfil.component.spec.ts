import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalConfPerfilComponent } from './principal-conf-perfil.component';

describe('PrincipalConfPerfilComponent', () => {
  let component: PrincipalConfPerfilComponent;
  let fixture: ComponentFixture<PrincipalConfPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalConfPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalConfPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
