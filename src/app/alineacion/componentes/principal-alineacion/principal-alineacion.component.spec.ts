import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAlineacionComponent } from './principal-alineacion.component';

describe('PrincipalAlineacionComponent', () => {
  let component: PrincipalAlineacionComponent;
  let fixture: ComponentFixture<PrincipalAlineacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalAlineacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalAlineacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
