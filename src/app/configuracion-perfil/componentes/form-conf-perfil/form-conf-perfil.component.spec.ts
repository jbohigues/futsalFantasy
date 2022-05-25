import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfPerfilComponent } from './form-conf-perfil.component';

describe('FormConfPerfilComponent', () => {
  let component: FormConfPerfilComponent;
  let fixture: ComponentFixture<FormConfPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConfPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
