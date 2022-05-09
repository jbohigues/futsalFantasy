import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalMercadoComponent } from './principal-mercado.component';

describe('PrincipalMercadoComponent', () => {
  let component: PrincipalMercadoComponent;
  let fixture: ComponentFixture<PrincipalMercadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalMercadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalMercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
