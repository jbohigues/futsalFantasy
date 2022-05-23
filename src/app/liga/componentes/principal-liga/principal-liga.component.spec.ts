import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalLigaComponent } from './principal-liga.component';

describe('PrincipalLigaComponent', () => {
  let component: PrincipalLigaComponent;
  let fixture: ComponentFixture<PrincipalLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
