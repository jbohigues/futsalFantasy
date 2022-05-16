import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPujasComponent } from './mis-pujas.component';

describe('MisPujasComponent', () => {
  let component: MisPujasComponent;
  let fixture: ComponentFixture<MisPujasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisPujasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPujasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
