import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalCrearLigaComponent } from './principal-crear-liga.component';

describe('PrincipalCrearLigaComponent', () => {
  let component: PrincipalCrearLigaComponent;
  let fixture: ComponentFixture<PrincipalCrearLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalCrearLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalCrearLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
