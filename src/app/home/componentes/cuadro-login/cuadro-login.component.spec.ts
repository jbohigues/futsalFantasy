import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroLoginComponent } from './cuadro-login.component';

describe('CuadroLoginComponent', () => {
  let component: CuadroLoginComponent;
  let fixture: ComponentFixture<CuadroLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadroLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
