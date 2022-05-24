import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnirseLigaComponent } from './form-unirse-liga.component';

describe('FormUnirseLigaComponent', () => {
  let component: FormUnirseLigaComponent;
  let fixture: ComponentFixture<FormUnirseLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUnirseLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUnirseLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
