import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxJornadaComponent } from './prox-jornada.component';

describe('ProxJornadaComponent', () => {
  let component: ProxJornadaComponent;
  let fixture: ComponentFixture<ProxJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProxJornadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
