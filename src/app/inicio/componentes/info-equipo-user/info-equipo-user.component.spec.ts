import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEquipoUserComponent } from './info-equipo-user.component';

describe('InfoEquipoUserComponent', () => {
  let component: InfoEquipoUserComponent;
  let fixture: ComponentFixture<InfoEquipoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEquipoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEquipoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
