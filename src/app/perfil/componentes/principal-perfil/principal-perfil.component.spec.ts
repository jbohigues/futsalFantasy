import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPerfilComponent } from './principal-perfil.component';

describe('PrincipalPerfilComponent', () => {
  let component: PrincipalPerfilComponent;
  let fixture: ComponentFixture<PrincipalPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
