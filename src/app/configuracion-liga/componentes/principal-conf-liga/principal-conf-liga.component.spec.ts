import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalConfLigaComponent } from './principal-conf-liga.component';

describe('PrincipalConfLigaComponent', () => {
  let component: PrincipalConfLigaComponent;
  let fixture: ComponentFixture<PrincipalConfLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalConfLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalConfLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
