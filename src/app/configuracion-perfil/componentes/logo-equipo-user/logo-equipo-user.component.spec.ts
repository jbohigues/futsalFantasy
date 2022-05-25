import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoEquipoUserComponent } from './logo-equipo-user.component';

describe('LogoEquipoUserComponent', () => {
  let component: LogoEquipoUserComponent;
  let fixture: ComponentFixture<LogoEquipoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoEquipoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoEquipoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
