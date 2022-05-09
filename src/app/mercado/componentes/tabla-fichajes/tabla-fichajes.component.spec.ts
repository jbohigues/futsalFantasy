import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFichajesComponent } from './tabla-fichajes.component';

describe('TablaFichajesComponent', () => {
  let component: TablaFichajesComponent;
  let fixture: ComponentFixture<TablaFichajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaFichajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaFichajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
