import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfLigaComponent } from './form-conf-liga.component';

describe('FormConfLigaComponent', () => {
  let component: FormConfLigaComponent;
  let fixture: ComponentFixture<FormConfLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConfLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
