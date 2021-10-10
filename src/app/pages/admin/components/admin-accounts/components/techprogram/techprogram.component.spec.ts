import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechprogramComponent } from './techprogram.component';

describe('TechprogramComponent', () => {
  let component: TechprogramComponent;
  let fixture: ComponentFixture<TechprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
