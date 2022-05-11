import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVentaComponent } from './dialog-venta.component';

describe('DialogVentaComponent', () => {
  let component: DialogVentaComponent;
  let fixture: ComponentFixture<DialogVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
