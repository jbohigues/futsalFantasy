import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearLigaComponent } from './form-crear-liga.component';

describe('FormCrearLigaComponent', () => {
  let component: FormCrearLigaComponent;
  let fixture: ComponentFixture<FormCrearLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCrearLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
