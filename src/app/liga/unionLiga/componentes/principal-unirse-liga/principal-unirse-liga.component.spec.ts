import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalUnirseLigaComponent } from './principal-unirse-liga.component';

describe('PrincipalUnirseLigaComponent', () => {
  let component: PrincipalUnirseLigaComponent;
  let fixture: ComponentFixture<PrincipalUnirseLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalUnirseLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalUnirseLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
