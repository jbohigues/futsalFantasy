import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPerfilComponent } from './tabs-perfil.component';

describe('TabsPerfilComponent', () => {
  let component: TabsPerfilComponent;
  let fixture: ComponentFixture<TabsPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
