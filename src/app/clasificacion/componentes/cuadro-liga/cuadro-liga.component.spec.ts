import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroLigaComponent } from './cuadro-liga.component';

describe('CuadroLigaComponent', () => {
  let component: CuadroLigaComponent;
  let fixture: ComponentFixture<CuadroLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadroLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
