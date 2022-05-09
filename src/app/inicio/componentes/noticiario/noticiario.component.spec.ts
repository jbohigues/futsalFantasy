import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiarioComponent } from './noticiario.component';

describe('NoticiarioComponent', () => {
  let component: NoticiarioComponent;
  let fixture: ComponentFixture<NoticiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
