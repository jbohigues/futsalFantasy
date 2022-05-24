import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLigaComponent } from './info-liga.component';

describe('InfoLigaComponent', () => {
  let component: InfoLigaComponent;
  let fixture: ComponentFixture<InfoLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
